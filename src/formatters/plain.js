const stringify = (item) => {
  if (typeof item === 'object') {
    return '[complex value]';
  }

  return `'${item}'`;
};

const plainRender = (ast, parents = []) => {
  const result = ast.map((item) => {
    const newName = [...parents, item.name].join('.');
    switch (item.state) {
      case 'deleted':
        return `Property '${newName}' was removed\n`;
      case 'added':
        return `Property '${newName}' was added with value: ${stringify(item.nextValue)}\n`;
      case 'equal':
        return null;
      case 'edited':
        return `Property '${newName}' was updated. From ${stringify(item.previousValue)} to ${stringify(item.nextValue)}\n`;
      case 'children':
        return `${plainRender(item.previousValue, [...parents, item.name])}`;
      default:
        throw new Error('Parse error');
    }
  }).join('');

  return result;
};

export default plainRender;
