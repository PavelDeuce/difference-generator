import { has } from 'lodash';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const readFromFiles = ([pathToBefore, pathToAfter]) => [
  readFileSync(resolve(pathToBefore)), readFileSync(resolve(pathToAfter)),
];

const parseContent = ([beforeContent, afterContent]) => [
  JSON.parse(beforeContent), JSON.parse(afterContent),
];

const getUniqKeys = (beforeKeys, afterKeys) => {
  const unionOfKeys = beforeKeys.concat(afterKeys);
  const uniqSet = new Set(unionOfKeys);
  return Array.from(uniqSet);
};

export default (pathToBefore, pathToAfter) => {
  const reading = readFromFiles([pathToBefore, pathToAfter]);
  const parsing = parseContent(reading);
  const [beforeInJson, afterInJson] = parsing;
  const keys = getUniqKeys(Object.keys(beforeInJson), Object.keys(afterInJson));

  const diff = keys.reduce((acc, key) => {
    const mainAcc = [...acc];

    if (has(afterInJson, key)) {
      if (has(beforeInJson, key)) {
        if (beforeInJson[key] === afterInJson[key]) {
          mainAcc.push(`   ${key}: ${beforeInJson[key]}\n`);
        } else {
          mainAcc.push(` - ${key}: ${beforeInJson[key]}\n`);
          mainAcc.push(` + ${key}: ${afterInJson[key]}\n`);
        }
      } else {
        mainAcc.push(` + ${key}: ${afterInJson[key]}\n`);
      }
    } else {
      mainAcc.push(` - ${key}: ${beforeInJson[key]}\n`);
    }
    return mainAcc;
  }, []);

  return ['{\n', ...diff, '}'].join('');
};
