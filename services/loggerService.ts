import {
  ActionType,
  LogLevel,
  MicroserviceType,
} from '../generated/prisma/enums';
import { prisma } from '../utils/mariaConnection';

interface CreateLogInput {
  microservice: MicroserviceType;
  action: ActionType;
  level: LogLevel;
  message: string;
  timestamp?: Date;
}

class LoggerService {
  async create(data: CreateLogInput) {
    return await prisma.log.create({ data: data });
  }

  async get(id: number) {
    return prisma.log.findUnique({ where: { id } });
  }

  async list() {
    return prisma.log.findMany();
  }

  async update(
    id: number,
    patch: Partial<{
      action: ActionType;
      level: LogLevel;
      message: string;
      timestamp: Date;
    }>
  ) {
    return prisma.log.update({ where: { id }, data: patch });
  }
}

export { LoggerService };
