import { readFileSync } from 'fs';
import path from 'path';

import gendiff from '../src';
import { formatMapping } from '../src/utils';

describe('Compares two configuration files', () => {
  test.each`
    extname   | format
    ${'json'} | ${formatMapping.nested}
    ${'json'} | ${formatMapping.plain}
    ${'json'} | ${formatMapping.json}
    ${'ini'}  | ${formatMapping.json}
    ${'ini'}  | ${formatMapping.nested}
    ${'yaml'} | ${formatMapping.plain}
    ${'yaml'} | ${formatMapping.nested}
    ${'ini'}  | ${formatMapping.json}
    ${'ini'}  | ${formatMapping.plain}
  `(
    'gendiff before.$extname after.$extname --format $format',

    ({ extname, format }) => {
      const commonPath = path.join(__dirname, '/__fixtures__/');
      const configsDirName = 'configs';
      const pathToBefore = path.join(commonPath, configsDirName, extname, `before.${extname}`);
      const pathToAfter = path.join(commonPath, configsDirName, extname, `after.${extname}`);
      const pathToResult = path.join(commonPath, 'result', `${format}Result.txt`);
      const result = readFileSync(pathToResult, 'utf-8');
      expect(gendiff(pathToBefore, pathToAfter, format)).toBe(result);
    }
  );
});
