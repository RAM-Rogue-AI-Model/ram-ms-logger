import {
  ActionType,
  LogLevel,
  MicroserviceType,
} from '../../generated/prisma/enums';

interface CreateLogInput {
  microservice: MicroserviceType;
  action: ActionType;
  level: LogLevel;
  message: string;
  timestamp?: Date;
}

export { CreateLogInput, LogMessageJson };

interface LogMessageJson {
  microservice: MicroserviceType;
  action: ActionType;
  level: LogLevel;
  message: string;
  timestamp?: string;
}
