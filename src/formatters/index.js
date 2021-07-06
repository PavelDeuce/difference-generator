import plainRender from './plain';
import nestedRender from './nested';
import jsonRender from './json';
import { formatMapping } from '../utils';

export default (elements, format) => {
  switch (format) {
    case formatMapping.plain:
      return plainRender(elements);
    case formatMapping.json:
      return jsonRender(elements);
    default:
      return nestedRender(elements);
  }
};
