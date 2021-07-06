import yaml from 'js-yaml';
import ini from 'ini';

const parsersMapping = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (data, format) => {
  const parse = parsersMapping[format];
  return parse(data);
};
