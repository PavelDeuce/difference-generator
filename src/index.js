import { _ } from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

import parse from './parsers';
import render from './formatters';

const createNode = (state, name, previousValue, nextValue, children) => ({
  state,
  name,
  previousValue,
  nextValue,
  children,
});

const buildAst = (beforeContent, afterContent) => {
  const keys = _.union(_.keys(beforeContent), _.keys(afterContent));
  return keys.map((key) => {
    const isKeyInBefore = _.has(beforeContent, key);
    const isKeyInAfter = _.has(afterContent, key);
    if (isKeyInBefore && isKeyInAfter) {
      if (typeof beforeContent[key] === 'object' && typeof afterContent[key] === 'object') {
        return createNode(
          'nested',
          key,
          null,
          null,
          buildAst(beforeContent[key], afterContent[key])
        );
      }
      if (beforeContent[key] === afterContent[key]) {
        return createNode('equal', key, beforeContent[key], afterContent[key], null);
      }
      return createNode('edited', key, beforeContent[key], afterContent[key], null);
    }
    if (isKeyInAfter) {
      return createNode('added', key, null, afterContent[key], null);
    }
    return createNode('deleted', key, beforeContent[key], null, null);
  });
};

export default (pathToBefore, pathToAfter, format = 'nested') => {
  const dataBefore = readFileSync(pathToBefore, 'utf-8');
  const dataAfter = readFileSync(pathToAfter, 'utf-8');
  const formatBefore = path.extname(pathToBefore).slice(1);
  const formatAfter = path.extname(pathToAfter).slice(1);

  const beforeContent = parse(dataBefore, formatBefore);
  const afterContent = parse(dataAfter, formatAfter);
  const astTree = buildAst(beforeContent, afterContent);

  return render(astTree, format);
};
