import express, { Router } from 'express';

import { LoggerController } from '../controllers/loggerController';
import { authenticate, requestDetails } from '../utils/auth';

class LoggerRouter {
  public router: Router;

  constructor(loggerController: LoggerController) {
    this.router = express.Router();

    this.router
      .route('/')
      .post(requestDetails, authenticate, async (req, res) => {
        await loggerController.create(req, res);
      })
      .get(requestDetails, authenticate, async (req, res) => {
        await loggerController.list(req, res);
      })

      .delete(requestDetails, authenticate, async (req, res) => {
        await loggerController.deleteAll(req, res);
      });

    this.router
      .route('/:microservice')
      .get(requestDetails, authenticate, async (req, res) => {
        await loggerController.getByMicroservice(req, res);
      });
  }
}

export { LoggerRouter };
