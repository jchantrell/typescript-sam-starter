import { camelCase } from 'lodash';
import { Readable } from 'stream';

export const convertStream = (stream: Readable): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
};

export const camelCaseKey = (key: string): string => {
  if (!key) return key;

  return camelCase(key.replace(/[^0-9a-z]/gi, ''));
};
