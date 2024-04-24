import { camelCaseKey, convertStream } from '../../src/utils/helpers';
import { Readable } from 'stream';

describe('camelCaseKey', function () {
  test('Converts a string to camelCase', () => {
    const string = 'Bad Apples';
    const result = camelCaseKey(string);
    expect(result).toStrictEqual('badApples');
  });
});

describe('convertStream', function () {
  test('Converts a readable stream to a string', async () => {
    const strings = ['a', 'b', 'c', 'd', 'e'];
    const readableStream = new Readable();
    for (let i = 0; i < strings.length; i++) {
      readableStream.push(strings[i]);
    }
    readableStream.push(null);
    readableStream.pipe(process.stdout);
    const converted = await convertStream(readableStream);
    expect(converted).toStrictEqual('abcde');
  }, 10000);
});
