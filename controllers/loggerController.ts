import { Request, Response } from 'express';

import { LoggerService } from '../services/loggerService';

class LoggerController {
  service: LoggerService;

  constructor(service: LoggerService) {
    this.service = service;
  }
  async create(req: Request, res: Response) {
    try {
      const payload = req.body;
      const log = await this.service.create(payload);
      res.status(201).json(log);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const log = await this.service.get(id);
    if (!log) return res.status(404).json({ error: 'Not found' });
    res.json(log);
  }

  async list(req: Request, res: Response) {
    const logs = await this.service.list();
    res.json(logs);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const updated = await this.service.update(id, req.body);
      res.json(updated);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}

export { LoggerController };
