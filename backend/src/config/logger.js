import winston from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import dotenv from 'dotenv';
dotenv.config();

const logtail = new Logtail(process.env.BETTER_STACK_SOURCE_TOKEN, {
  endpoint: `https://${process.env.BETTER_STACK_INGESTING_HOST}`,
});

const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console(), new LogtailTransport(logtail)],
});

export { logger, logtail };
