#!/usr/bin/env node

import commander from 'commander';

const test = () => {
  commander
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .arguments('')
    .action(() => {
      console.log('gendiff -h');
    })
    .parse(process.argv);
};

test();
