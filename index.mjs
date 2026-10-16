#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('my-cli')
  .description('A CLI application built with Commander.js')
  .version('1.0.0')
  .option('-n, --niggas <PEOS>', 'This is a nigga in paris')

program.parse();

const options = program.opts()

if (options.niggas) console.log(`That's some niggas in paris ${options.niggas}`)
