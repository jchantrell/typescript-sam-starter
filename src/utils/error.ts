import { inspect } from 'util';

// the reason we are defining our own class is to control Step Function retries via our own error.name. ome errors should be retryable, others should not
export class ErrorMessage extends Error {
  constructor(name: string, message: string | object | Error) {
    super(typeof message === 'string' ? message : inspect(message));
    this.name = name;
  }
}

// throw new ErrorMessage('ErrorName', 'Something went wrong...');
// throw new ErrorMessage('ErrorName', new Error('Something went wrong...'));
