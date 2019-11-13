const stringify = (value, depth = 0) => {
  const indent = '    '.repeat(depth);
  if (typeof value === 'object') {
    const result = Object.keys(value).reduce((acc, item) => {
      if (typeof value[item] === 'object') {
        return `${indent}   ${item}: ${stringify(value[item], depth + 1)}\n`;
      }
      return `${acc}${indent}    ${item}: ${value[item]}\n`;
    }, '');
    return `{\n${result}${indent}}`;
  }
  return value;
};

const nestedRender = (ast, depth = 0) => {
  const indent = '    '.repeat(depth);
  const diff = ast.reduce((acc, item) => {
    const begining = (char) => `${acc}\n${indent}  ${char} ${item.name}: `;
    switch (item.state) {
      case 'equal':
        return `${begining(' ')}${stringify(item.previousValue, depth + 1)}`;
      case 'deleted':
        return `${begining('-')}${stringify(item.previousValue, depth + 1)}`;
      case 'added':
        return `${begining('+')}${stringify(item.nextValue, depth + 1)}`;
      case 'edited':
        return `${begining('-')}${stringify(item.previousValue, depth + 1)}\n${indent}  + ${item.name}: ${stringify(item.nextValue, depth + 1)}`;
      case 'children':
        return `${begining(' ')}${nestedRender(item.previousValue, depth + 1)}`;
      default:
        return acc;
    }
  }, '');

  return `{${diff}\n${indent}}`;
};

export default nestedRender;
