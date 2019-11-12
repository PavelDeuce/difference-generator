import { has } from 'lodash';
import getFileContent from './parsers';
import render from './formatters/index';

const getUniqKeys = (beforeKeys, afterKeys) => {
  const unionOfKeys = beforeKeys.concat(afterKeys);
  const uniqSet = new Set(unionOfKeys);
  return Array.from(uniqSet);
};

const buildAst = ([beforeContent, afterContent], depth = 1) => {
  const keys = getUniqKeys(Object.keys(beforeContent), Object.keys(afterContent));

  const astTree = keys.reduce((acc, key) => {
    const newAcc = [...acc];

    if (typeof beforeContent[key] === 'object' && typeof afterContent[key] === 'object') {
      newAcc.push({
        state: 'children', name: key, value: buildAst([beforeContent[key], afterContent[key]], depth + 1),
      });
    } else if ((has(beforeContent, key)) && (!has(afterContent, key))) {
      newAcc.push({
        state: 'deleted', name: key, previousValue: beforeContent[key],
      });
    } else if (!has(beforeContent, key) && has(afterContent, key)) {
      newAcc.push({
        state: 'added', name: key, nextValue: afterContent[key],
      });
    } else if (beforeContent[key] === afterContent[key]) {
      newAcc.push({
        state: 'equal', name: key, value: beforeContent[key],
      });
    } else if (beforeContent[key] !== afterContent[key]) {
      newAcc.push({
        state: 'edited', name: key, previousValue: beforeContent[key], nextValue: afterContent[key],
      });
    }

    return newAcc;
  }, []);

  return astTree;
};

export default (pathToBefore, pathToAfter, format = 'nested') => {
  const [beforeContent, afterContent] = [getFileContent(pathToBefore), getFileContent(pathToAfter)];
  const astTree = buildAst([beforeContent, afterContent]);
  return render(astTree, format);
};
