import { has } from 'lodash';
import getFileContent from './parsers';

const getUniqKeys = (beforeKeys, afterKeys) => {
  const unionOfKeys = beforeKeys.concat(afterKeys);
  const uniqSet = new Set(unionOfKeys);
  return Array.from(uniqSet);
};

export default (pathToBefore, pathToAfter) => {
  const [beforeContent, afterContent] = [getFileContent(pathToBefore), getFileContent(pathToAfter)];
  const keys = getUniqKeys(Object.keys(beforeContent), Object.keys(afterContent));

  const diff = keys.reduce((acc, key) => {
    const mainAcc = [...acc];

    if (has(afterContent, key)) {
      if (has(beforeContent, key)) {
        if (beforeContent[key] === afterContent[key]) {
          mainAcc.push(`    ${key}: ${afterContent[key]}\n`);
        } else {
          mainAcc.push(`  - ${key}: ${beforeContent[key]}\n`);
          mainAcc.push(`  + ${key}: ${afterContent[key]}\n`);
        }
      } else {
        mainAcc.push(`  + ${key}: ${afterContent[key]}\n`);
      }
    } else {
      mainAcc.push(`  - ${key}: ${beforeContent[key]}\n`);
    }
    return mainAcc;
  }, []);

  return ['{\n', ...diff, '}'].join('');
};
