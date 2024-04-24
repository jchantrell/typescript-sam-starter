import { logger } from '../../src/utils/logger';

describe('Logger', function () {
  const msg = 'Some message...';
  const params = { testKey: 'testValue' };
  test('It logs to info', () => {
    const spy = jest.spyOn(logger, 'info');
    logger.info(msg, params);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(msg, params);
  });
  test('It logs to warn', () => {
    const spy = jest.spyOn(logger, 'warn');
    logger.warn(msg, params);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(msg, params);
  });
  test('It logs to debug', () => {
    const spy = jest.spyOn(logger, 'debug');
    logger.debug(msg, params);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(msg, params);
  });
  test('It logs to error', () => {
    const spy = jest.spyOn(logger, 'error');
    const error = new Error();
    logger.error(msg, error);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(msg, error);
  });
});
