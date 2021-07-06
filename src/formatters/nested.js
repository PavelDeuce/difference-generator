import _ from 'lodash';

import { diffsMapping } from '../utils';

const stringify = (value, depth = 0) => {
  if (!_.isObject(value)) return value;
  const indent = '    '.repeat(depth);
  const result = Object.keys(value)
    .map((item) =>
      _.isObject(value[item])
        ? `${indent}    ${item}: ${stringify(value[item], depth + 1)}`
        : `${indent}    ${item}: ${value[item]}`
    )
    .join('\n');
  return `{\n${result}\n${indent}}`;
};

const nestedRender = (ast, depth = 0) => {
  const indent = '    '.repeat(depth);
  const diff = ast
    .map((item) => {
      const newDepth = depth + 1;
      const beginning = (char) => `${indent}  ${char} ${item.name}: `;
      switch (item.state) {
        case diffsMapping.deleted:
          return `${beginning('-')}${stringify(item.previousValue, newDepth)}`;
        case diffsMapping.added:
          return `${beginning('+')}${stringify(item.nextValue, newDepth)}`;
        case diffsMapping.equal:
          return `${beginning(' ')}${stringify(item.previousValue, newDepth)}`;
        case diffsMapping.edited:
          return `${beginning('-')}${stringify(item.previousValue, newDepth)}\n${beginning(
            '+'
          )}${stringify(item.nextValue, newDepth)}`;
        case diffsMapping.nested:
          return `${beginning(' ')}${nestedRender(item.children, newDepth)}`;
        default:
          throw new Error(`Parse error. Unknown state: ${item.state}`);
      }
    })
    .join('\n');
  return `{\n${diff}\n${indent}}`;
};

export default nestedRender;
