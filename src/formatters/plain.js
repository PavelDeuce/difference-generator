import _ from 'lodash';

import { diffsMapping } from '../utils';

const stringify = (item) => (_.isObject(item) ? '[complex value]' : `'${item}'`);

const plainRender = (ast, parents = []) =>
  ast
    .map((item) => {
      const newName = [...parents, item.name].join('.');
      const beginning = `Property '${newName}' was`;
      switch (item.state) {
        case diffsMapping.deleted:
          return `${beginning} removed`;
        case diffsMapping.added:
          return `${beginning} added with value: ${stringify(item.nextValue)}`;
        case diffsMapping.equal:
          return null;
        case diffsMapping.edited:
          return `${beginning} updated. From ${stringify(item.previousValue)} to ${stringify(
            item.nextValue
          )}`;
        case diffsMapping.nested:
          return `${plainRender(item.children, [...parents, item.name])}`;
        default:
          throw new Error(`Parse error. Unknown state: ${item.state}`);
      }
    })
    .filter((str) => str)
    .join('\n');

export default plainRender;
