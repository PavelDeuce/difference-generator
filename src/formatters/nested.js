const stringify = (value, depth = 0) => {
  if (typeof value !== 'object') {
    return value;
  }
  const indent = '    '.repeat(depth);
  const result = Object.keys(value)
    .map((item) => {
      if (typeof value[item] === 'object') {
        return `${indent}    ${item}: ${stringify(value[item], depth + 1)}`;
      }
      return `${indent}    ${item}: ${value[item]}`;
    })
    .join('\n');
  return `{\n${result}\n${indent}}`;
};

const nestedRender = (ast, depth = 0) => {
  const indent = '    '.repeat(depth);
  const diff = ast
    .map((item) => {
      const beginning = (char) => `${indent}  ${char} ${item.name}: `;
      switch (item.state) {
        case 'deleted':
          return `${beginning('-')}${stringify(item.previousValue, depth + 1)}`;
        case 'added':
          return `${beginning('+')}${stringify(item.nextValue, depth + 1)}`;
        case 'equal':
          return `${beginning(' ')}${stringify(item.previousValue, depth + 1)}`;
        case 'edited':
          return `${beginning('-')}${stringify(item.previousValue, depth + 1)}\n${beginning(
            '+'
          )}${stringify(item.nextValue, depth + 1)}`;
        case 'nested':
          return `${beginning(' ')}${nestedRender(item.children, depth + 1)}`;
        default:
          throw new Error(`Parse error. Unknown state: ${item.state}`);
      }
    })
    .join('\n');

  return `{\n${diff}\n${indent}}`;
};

export default nestedRender;
