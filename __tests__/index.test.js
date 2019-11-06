import genDiff from '../src/index';

test('test for json content', () => {
  const pathToBefore = './__tests__/__fixtures__/configs/before.json';
  const pathToAfter = './__tests__/__fixtures__/configs/after.json';
  const result = `{
   host: hexlet.io
 - timeout: 50
 + timeout: 20
 - proxy: 123.234.53.22
 - follow: false
 + verbose: true
}`;

  expect(genDiff(pathToBefore, pathToAfter)).toBe(result);
});
