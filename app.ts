import 'dotenv/config';

import express from 'express';

import { LoggerController } from './src/controllers/loggerController';
import { LoggerRouter } from './src/routes/loggerRouter';
import { LoggerService } from './src/services/loggerService';
import { config } from './src/utils/config';

const app = express();
const port = config.PORT;
// app.use(
//   cors({
//     origin: [
//       'http://localhost:8081',
//       'http://localhost:5173',
//       'http://localhost:3004',
//     ],
//     credentials: true,
//   })
// );

app.use(express.json());

const loggerService = new LoggerService();
const loggerController = new LoggerController(loggerService);

app.use('/logs', new LoggerRouter(loggerController).router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});

