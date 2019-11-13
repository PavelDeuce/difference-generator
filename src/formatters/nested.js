const stringify = (value, depth = 0) => {
  const indent = '    '.repeat(depth);
  if (typeof value === 'object') {
    const result = Object.keys(value).reduce((acc, item) => `${acc}${indent}    ${item}: ${value[item]}\n`, '');
    return `{\n${result}${indent}}`;
  }
  return value;
};

const nestedRender = (ast, depth = 0) => {
  const indent = '    '.repeat(depth);
  const diff = ast.reduce((acc, item) => {
    switch (item.state) {
      case 'equal':
        return `${acc}\n${indent}    ${item.name}: ${stringify(item.previousValue, depth + 1)}`;
      case 'deleted':
        return `${acc}\n${indent}  - ${item.name}: ${stringify(item.previousValue, depth + 1)}`;
      case 'added':
        return `${acc}\n${indent}  + ${item.name}: ${stringify(item.nextValue, depth + 1)}`;
      case 'edited':
        return `${acc}\n${indent}  - ${item.name}: ${stringify(item.previousValue, depth + 1)}\n${indent}  + ${item.name}: ${stringify(item.nextValue, depth + 1)}`;
      case 'children':
        return `${acc}\n${indent}    ${item.name}: ${nestedRender(item.previousValue, depth + 1)}`;
      default:
        return acc;
    }
  }, '');

  return `{${diff}\n${indent}}`;
};

export default nestedRender;
