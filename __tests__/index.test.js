import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index';

test('test for json content', () => {
  const pathToBefore = path.join(__dirname, '/__fixtures__/configs/', 'before.json');
  const pathToAfter = path.join(__dirname, '/__fixtures__/configs/', 'after.json');
  const result = readFileSync(path.join(__dirname, '/__fixtures__/result/', 'result.txt'), 'utf8');

  expect(genDiff(pathToBefore, pathToAfter)).toBe(result);
});

test('test for yaml content', () => {
  const pathToBefore = path.join(__dirname, '/__fixtures__/configs/', 'before.yaml');
  const pathToAfter = path.join(__dirname, '/__fixtures__/configs/', 'after.yaml');
  const result = readFileSync(path.join(__dirname, '/__fixtures__/result/', 'result.txt'), 'utf8');

  expect(genDiff(pathToBefore, pathToAfter)).toBe(result);
});

test('test for ini content', () => {
  const pathToBefore = path.join(__dirname, '/__fixtures__/configs/', 'before.ini');
  const pathToAfter = path.join(__dirname, '/__fixtures__/configs/', 'after.ini');
  const result = readFileSync(path.join(__dirname, '/__fixtures__/result/', 'result.txt'), 'utf8');

  expect(genDiff(pathToBefore, pathToAfter)).toBe(result);
});

test('test for plain content json', () => {
  const pathToBefore = path.join(__dirname, '/__fixtures__/configs/', 'before.json');
  const pathToAfter = path.join(__dirname, '/__fixtures__/configs/', 'after.json');
  const result = readFileSync(path.join(__dirname, '/__fixtures__/result/', 'resultPlain.txt'), 'utf8');

  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(result);
});

test('test for plain content yaml', () => {
  const pathToBefore = path.join(__dirname, '/__fixtures__/configs/', 'before.yaml');
  const pathToAfter = path.join(__dirname, '/__fixtures__/configs/', 'after.yaml');
  const result = readFileSync(path.join(__dirname, '/__fixtures__/result/', 'resultPlain.txt'), 'utf8');

  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(result);
});

test('test for plain content ini', () => {
  const pathToBefore = path.join(__dirname, '/__fixtures__/configs/', 'before.ini');
  const pathToAfter = path.join(__dirname, '/__fixtures__/configs/', 'after.ini');
  const result = readFileSync(path.join(__dirname, '/__fixtures__/result/', 'resultPlain.txt'), 'utf8');

  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(result);
});

test('test for json content json', () => {
  const pathToBefore = path.join(__dirname, '/__fixtures__/configs/', 'before.json');
  const pathToAfter = path.join(__dirname, '/__fixtures__/configs/', 'after.json');
  const result = readFileSync(path.join(__dirname, '/__fixtures__/result/', 'resultJson.txt'), 'utf8');

  expect(genDiff(pathToBefore, pathToAfter, 'json')).toBe(result);
});

test('test for json content ini', () => {
  const pathToBefore = path.join(__dirname, '/__fixtures__/configs/', 'before.ini');
  const pathToAfter = path.join(__dirname, '/__fixtures__/configs/', 'after.ini');
  const result = readFileSync(path.join(__dirname, '/__fixtures__/result/', 'resultJson.txt'), 'utf8');

  expect(genDiff(pathToBefore, pathToAfter, 'json')).toBe(result);
});
