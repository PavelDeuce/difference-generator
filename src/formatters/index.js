import plainRender from './plain';
import nestedRender from './nested';

export default (elements, format) => {
  switch (format) {
    case 'plain':
      return plainRender(elements);
    default:
      return nestedRender(elements);
  }
};
