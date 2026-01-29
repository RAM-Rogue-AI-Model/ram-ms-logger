import express, { Router } from 'express';

import { LoggerController } from '../controllers/loggerController';

class LoggerRouter {
  public router: Router;

  constructor(loggerController: LoggerController) {
    this.router = express.Router();

    this.router
      .route('/')
      .post(async (req, res) => {
        await loggerController.create(req, res);
      })
      .get(async (req, res) => {
        await loggerController.list(req, res);
      });

    this.router.route('/:microservice').get(async (req, res) => {
      await loggerController.getByMicroservice(req, res);
    });
  }
}

export { LoggerRouter };
