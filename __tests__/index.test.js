import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index';

test('test for json content', () => {
  const pathToBefore = path.join(__dirname, '/__fixtures__/configs/', 'before.json');
  const pathToAfter = path.join(__dirname, '/__fixtures__/configs/', 'after.json');
  const result = readFileSync(path.join(__dirname, '/__fixtures__/result/', 'result.txt'), 'utf8');

  expect(genDiff(pathToBefore, pathToAfter)).toBe(result);
});
