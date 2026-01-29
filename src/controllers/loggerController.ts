import { Request, Response } from 'express';

import { MicroserviceType } from '../../generated/prisma/enums';
import { LoggerService } from '../services/loggerService';
import {CreateLogInput} from "../types/loginput";
import { isMicroserviceType, parseDateQuery } from '../utils/typeValid';

class LoggerController {
  service: LoggerService;

  constructor(service: LoggerService) {
    this.service = service;
  }
  async create(req: Request, res: Response) {
    try {
        const body = req.body as Partial<CreateLogInput>;
        if (!body.microservice || !body.action || !body.level || !body.message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if (!isMicroserviceType(body.microservice)) {
            return res.status(400).json({ error: 'Invalid microservice' });
        }
      const payload : CreateLogInput  = body as CreateLogInput;
      const log = await this.service.create(payload);
      res.status(201).json(log);
    } catch (error) {
        console.error(error);
      res.status(400);
    }
  }

  async getByMicroservice(req: Request, res: Response) {
      const microServiceParam = req.params.microservice;
      if (!isMicroserviceType(microServiceParam)) {
          return res.status(400).json({ error: 'Invalid microservice type' });
      }
    const micro: MicroserviceType = microServiceParam;
    const date = parseDateQuery(req.query.date);
    let logs;
    if (date) {
      logs = await this.service.getByMicroserviceAndDate(micro, date);
    } else {
      logs = await this.service.getByMicroservice(micro);
    }
    res.json(logs);
  }

  async list(req: Request, res: Response) {
    const date = parseDateQuery(req.query.date);
    let logs;
    if (date) {
      logs = await this.service.getByDate(date);
    } else {
      logs = await this.service.list();
    }
    res.json(logs);
  }
}

export { LoggerController };
