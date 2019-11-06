import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsers = {
  '.json': (parseContent) => JSON.parse(parseContent),
  '.yaml': (parseContent) => yaml.safeLoad(parseContent),
};

const getFileContent = (pathToFile) => {
  const content = readFileSync(pathToFile, 'utf-8');
  const extname = path.extname(pathToFile);

  return parsers[extname](content);
};

export default getFileContent;
