import nestedRender from '../src/formatters/nested';
import plainRender from '../src/formatters/plain';
import { formatMapping } from '../src/utils';

describe('formatters', () => {
  test(`${formatMapping.nested} and ${formatMapping.plain} should to throw exceptions`, () => {
    const state = 'some';
    const testAst = [{ name: 'test', state }];
    const errorMessage = `Parse error. Unknown state: ${state}`;
    expect(() => nestedRender(testAst)).toThrowError(errorMessage);
    expect(() => plainRender(testAst)).toThrowError(errorMessage);
  });
});
