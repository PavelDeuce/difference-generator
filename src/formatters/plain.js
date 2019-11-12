const stringify = (item) => {
  if (typeof item === 'object') {
    return '[complex value]';
  }

  return `'${item}'`;
};

const plainRender = (ast, parents = []) => {
  const result = ast.reduce((acc, item) => {
    const newName = [...parents, item.name].join('.');
    switch (item.state) {
      case 'deleted':
        return `${acc}Property '${newName}' was removed\n`;
      case 'added':
        return `${acc}Property '${newName}' was added with value: ${stringify(item.nextValue)}\n`;
      case 'edited':
        return `${acc}Property '${newName}' was updated. From ${stringify(item.previousValue)} to ${stringify(item.nextValue)}\n`;
      case 'children':
        return `${acc}${plainRender(item.value, [...parents, item.name])}`;
      default:
        return acc;
    }
  }, '');

  return result;
};

export default plainRender;
