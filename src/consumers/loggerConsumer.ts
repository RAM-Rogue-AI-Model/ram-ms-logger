import amqp from 'amqplib';

import { LoggerService } from '../services/loggerService';
import { CreateLogInput, LogMessageJson } from '../types/loginput';

const RABBITMQ_URL =
  process.env.RABBITMQ_URL ?? 'amqp://guest:guest@rabbitmq_test:5672';

const QUEUE = 'create_log_queue';

export class LoggerConsumer {
  constructor(private readonly loggerService: LoggerService) {}

  async start() {
    let retries = 10;

    while (retries > 0) {
      try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE, { durable: true });

        // eslint-disable-next-line no-console
        console.log('RabbitMQ Consumer prêt, en attente de messages...');

        await channel.consume(QUEUE, (msg) => {
          if (!msg) return;

          void (async () => {
            const contentString = msg.content.toString();
            // eslint-disable-next-line no-console
            console.log(`Message reçu: ${contentString} `);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const content: LogMessageJson = JSON.parse(contentString);
            // eslint-disable-next-line no-console
            console.log('Contenu du message:', content);

            try {
              const input: CreateLogInput = {
                microservice: content.microservice,
                action: content.action,
                level: content.level,
                message: content.message,
                timestamp: content.timestamp
                  ? new Date(content.timestamp)
                  : undefined,
              };

              await this.loggerService.create(input);

              channel.ack(msg);
            } catch (err) {
              console.error('Erreur création log:', err);
            }
          })();
        });

        return;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('RabbitMQ non prêt, retry dans 2s...', err);
        await new Promise((r) => setTimeout(r, 2000));
        retries--;
      }
    }

    console.error('Impossible de se connecter à RabbitMQ.');
    process.exit(1);
  }
}
