import { inspect } from 'util';

export class Logger {
  info(msg: string, details?: Object) {
    console.info({ msg, details });
  }

  warn(msg: string, details?: Object) {
    console.warn({ msg, details });
  }

  debug(msg: string, details?: Object) {
    console.debug({ msg, details });
  }

  error(msg: string, details?: Error | Object) {
    console.debug({ msg, details: details ? (details instanceof Error ? inspect(details) : details) : undefined });
  }
}

export const logger = new Logger();
