import amqp from 'amqplib';
import { LoggerService } from '../services/loggerService';

const RABBITMQ_URL =
  process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq_test:5672';

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

        console.log('RabbitMQ Consumer prêt, en attente de messages...');

        channel.consume(QUEUE, async (msg) => {
          if (!msg) return;

          let content = msg.content.toString();
          console.log(`Message reçu: ${content}`);
          content = JSON.parse(content);
          console.log('Contenu du message:', content);
          try {
            await this.loggerService.create({
              microservice: content.microservice,
              action: content.action,
              level: content.level,
              message: content.message,
              timestamp: content.timestamp
                ? new Date(content.timestamp)
                : undefined,
            });

            channel.ack(msg);
          } catch (err) {
            console.error('Erreur création log:', err);
          }
        });

        return;
      } catch (err) {
        console.log('RabbitMQ non prêt, retry dans 2s...');
        await new Promise((r) => setTimeout(r, 2000));
        retries--;
      }
    }

    console.error('Impossible de se connecter à RabbitMQ.');
    process.exit(1);
  }
}
