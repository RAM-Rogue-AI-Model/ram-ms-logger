import 'dotenv/config';

import fs from 'node:fs';

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as YAML from 'yaml';

import { LoggerConsumer } from './consumers/loggerConsumer';
import { LoggerController } from './controllers/loggerController';
import { LoggerRouter } from './routes/loggerRouter';
import { LoggerService } from './services/loggerService';
import { config } from './utils/config';

const app = express();
const port = config.PORT;

app.use(express.json());

const loggerService = new LoggerService();

const loggerController = new LoggerController(loggerService);

app.use('/logs', new LoggerRouter(loggerController).router);

const loggerConsumer = new LoggerConsumer(loggerService);
loggerConsumer.start().catch(console.error);

const file = fs.readFileSync('./openapi.yml', 'utf8');
const swaggerDocument = YAML.parse(file) as object;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`docs available at http://localhost:${port}/docs`);
});
