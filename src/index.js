import { has } from 'lodash';
import getFileContent from './parsers';

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

const stringify = (value, depth = 0) => {
  const indent = '    '.repeat(depth);
  if (typeof value === 'object') {
    const result = Object.keys(value).reduce((acc, item) => `${acc}${indent}    ${item}: ${value[item]}\n`, '');
    return `{\n${result}${indent}}`;
  }
  return value;
};

const render = (ast, depth = 0) => {
  const indent = '    '.repeat(depth);
  const diff = ast.reduce((acc, item) => {
    switch (item.state) {
      case 'equal':
        return `${acc}\n${indent}    ${item.name}: ${stringify(item.value, depth + 1)}`;
      case 'deleted':
        return `${acc}\n${indent}  - ${item.name}: ${stringify(item.previousValue, depth + 1)}`;
      case 'added':
        return `${acc}\n${indent}  + ${item.name}: ${stringify(item.nextValue, depth + 1)}`;
      case 'edited':
        return `${acc}\n${indent}  - ${item.name}: ${stringify(item.previousValue, depth + 1)}\n${indent}  + ${item.name}: ${stringify(item.nextValue, depth + 1)}`;
      case 'children':
        return `${acc}\n${indent}    ${item.name}: ${render(item.value, depth + 1)}`;
      default:
        return acc;
    }
  }, '');
  return `{${diff}\n${indent}}`;
};

export default (pathToBefore, pathToAfter) => {
  const [beforeContent, afterContent] = [getFileContent(pathToBefore), getFileContent(pathToAfter)];
  const astTree = buildAst([beforeContent, afterContent]);
  return render(astTree);
};
