import 'dotenv/config';
import express from 'express';

import { LoggerController } from './controllers/loggerController';
import { LoggerRouter } from './routes/loggerRouter';
import { LoggerService } from './services/loggerService';
import { LoggerConsumer } from './consumers/loggerConsumer';
import { config } from './utils/config';

const app = express();
const port = config.PORT;

app.use(express.json());

const loggerService = new LoggerService();

const loggerController = new LoggerController(loggerService);

app.use('/logs', new LoggerRouter(loggerController).router);

const loggerConsumer = new LoggerConsumer(loggerService);
loggerConsumer.start().catch(console.error);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
