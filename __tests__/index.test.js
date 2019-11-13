import { readFileSync } from 'fs';
import path from 'path';
import gendiff from '../src/index';

describe('Compares two configuration files', () => {
  test.each`
   extname       |   format
    ${'json'}    |    ${'nested'}

`('gendiff before.$extname after.$extname --format $format',


  ({ extname, format }) => {
    const commonPath = path.join(__dirname, '/__fixtures__/');

    const pathToBefore = path.join(commonPath, 'configs', extname, `before.${extname}`);
    const pathToAfter = path.join(commonPath, 'configs', extname, `after.${extname}`);
    const pathToResult = path.join(commonPath, 'result', `${format}Result.txt`);

    const result = readFileSync(pathToResult, 'utf-8');

    expect(gendiff(pathToBefore, pathToAfter, format)).toBe(result);
  });
});
