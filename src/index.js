import { _ } from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import getFileContent from './parsers';
import render from './formatters/index';

const createNode = (state, name, previousValue, nextValue) => ({
  state,
  name,
  previousValue,
  nextValue,
});

const buildAst = (beforeContent, afterContent) => {
  const keys = _.union(_.keys(beforeContent), _.keys(afterContent));
  const astTree = keys.map((key) => {
    const isKeyInBefore = _.has(beforeContent, key);
    const isKeyInAfter = _.has(afterContent, key);
    if (isKeyInBefore && isKeyInAfter) {
      if (typeof beforeContent[key] === 'object' && typeof afterContent[key] === 'object') {
        return createNode('children', key, buildAst(beforeContent[key], afterContent[key]), null);
      }
      if (beforeContent[key] === afterContent[key]) {
        return createNode('equal', key, beforeContent[key], afterContent[key]);
      }
      return createNode('edited', key, beforeContent[key], afterContent[key]);
    }
    if (isKeyInAfter) {
      return createNode('added', key, null, afterContent[key]);
    }
    return createNode('deleted', key, beforeContent[key], null);
  });
  return astTree;
};

export default (pathToBefore, pathToAfter, format = 'nested') => {
  const dataBefore = readFileSync(pathToBefore, 'utf-8');
  const dataAfter = readFileSync(pathToAfter, 'utf-8');
  const extnameBefore = path.extname(pathToBefore);
  const extnameAfter = path.extname(pathToAfter);

  const beforeContent = getFileContent(dataBefore, extnameBefore);
  const afterContent = getFileContent(dataAfter, extnameAfter);
  const astTree = buildAst(beforeContent, afterContent);

  return render(astTree, format);
};
