import {
  MicroserviceType,
} from '../generated/prisma/enums';
import {CreateLogInput} from "../types/loginput";
import { prisma } from '../utils/mariaConnection';

class LoggerService {
  async create(data: CreateLogInput) {
      const dataSecured = {
            microservice: data.microservice,
            action: data.action,
            level: data.level,
            message: data.message,
            timestamp: data.timestamp || new Date(),
      }
    return prisma.log.create({ data: dataSecured });
  }

  async list() {
    return prisma.log.findMany();
  }

  async getByDate(date: Date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return prisma.log.findMany({
      where: {
        timestamp: {
          gte: start,
          lte: end,
        },
      },
    });
  }

  async getByMicroservice(microservice: MicroserviceType) {
    return prisma.log.findMany({
      where: {
        microservice: microservice,
      },
    });
  }

  async getByMicroserviceAndDate(microservice: MicroserviceType, date: Date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return prisma.log.findMany({
      where: {
        microservice: microservice,
        timestamp: {
          gte: start,
          lte: end,
        },
      },
    });
  }
}

export { LoggerService };
