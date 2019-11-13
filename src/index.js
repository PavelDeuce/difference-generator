import { has } from 'lodash';
import getFileContent from './parsers';
import render from './formatters/index';

const getUniqKeys = (beforeKeys, afterKeys) => {
  const unionOfKeys = beforeKeys.concat(afterKeys);
  const uniqSet = new Set(unionOfKeys);
  return Array.from(uniqSet);
};

const createNode = (state, name, previousValue, nextValue) => ({
  state,
  name,
  previousValue,
  nextValue,
});

const buildAst = ([beforeContent, afterContent]) => {
  const keys = getUniqKeys(Object.keys(beforeContent), Object.keys(afterContent));
  const astTree = keys.reduce((acc, key) => {
    const newAcc = [...acc];
    if (typeof beforeContent[key] === 'object' && typeof afterContent[key] === 'object') {
      newAcc.push(createNode('children', key, buildAst([beforeContent[key], afterContent[key]]), null));
    } else if ((has(beforeContent, key)) && (!has(afterContent, key))) {
      newAcc.push(createNode('deleted', key, beforeContent[key], null));
    } else if (!has(beforeContent, key) && has(afterContent, key)) {
      newAcc.push(createNode('added', key, null, afterContent[key]));
    } else if (beforeContent[key] === afterContent[key]) {
      newAcc.push(createNode('equal', key, beforeContent[key], afterContent[key]));
    } else if (beforeContent[key] !== afterContent[key]) {
      newAcc.push(createNode('edited', key, beforeContent[key], afterContent[key]));
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
