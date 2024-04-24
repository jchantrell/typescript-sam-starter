import { ErrorMessage } from '../../src/utils/error';

describe('ErrorMessage', function () {
  test('It creates a standard error object with a specific name and a string as the message', () => {
    const error = new ErrorMessage('CustomError', 'Something went wrong');
    expect(error.name).toStrictEqual('CustomError');
    expect(error.message).toStrictEqual('Something went wrong');
  });

  test('It creates an error object with a specific name and a stringified object as the message', () => {
    const details = { msg: 'Something went wrong', details: { function: 'flakeyFunction' } };
    const error = new ErrorMessage('CustomError', details);
    const expectedMsg = `{
  msg: 'Something went wrong',
  details: { function: 'flakeyFunction' }
}`;
    expect(error.name).toStrictEqual('CustomError');
    expect(error.message).toStrictEqual(expectedMsg);
  });

  test('It creates an error object with a specific name and a stringified error as the message', () => {
    const caughtError = new Error('Something went wrong somewhere else');
    const error = new ErrorMessage('CustomError', caughtError);
    const expectedMsgSubstring = `Error: Something went wrong somewhere else`;
    const errorMsgMatches = error.message.startsWith(expectedMsgSubstring);
    expect(error.name).toStrictEqual('CustomError');
    expect(errorMsgMatches).toBeTruthy();
  });
});
