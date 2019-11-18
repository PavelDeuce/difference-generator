import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

const getFileContent = (data, extname) => {
  const parse = parsers[extname];
  return parse(data);
};

export default getFileContent;
