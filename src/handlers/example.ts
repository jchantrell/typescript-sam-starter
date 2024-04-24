import { ErrorMessage } from '../utils/error';
import { logger } from '../utils/logger';

export const handler = async (event: {}, context: {}) => {
  try {
    logger.info('Invoked', { event, context });
  } catch (err) {
    const error = new ErrorMessage('ProcessingError', err);
    throw error;
  }
};
