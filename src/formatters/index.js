import plainRender from './plain';
import nestedRender from './nested';
import jsonRender from './json';

export default (elements, format) => {
  switch (format) {
    case 'plain':
      return plainRender(elements);
    case 'json':
      return jsonRender(elements);
    default:
      return nestedRender(elements);
  }
};
