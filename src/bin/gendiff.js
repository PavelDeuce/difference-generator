#!/usr/bin/env node

import commander from 'commander';
import genDiff from '..';

const printDiff = () => {
  commander
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      const diff = genDiff(firstConfig, secondConfig, commander.format);
      console.log(diff);
    })
    .parse(process.argv);
};

printDiff();
