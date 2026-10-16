#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

// This is just a test

program
  .name('devlog')
  .description('A CLI application for logging your development')
  .version('1.0.0')
  .option('-n, --niggas <PEOS>', 'This is a nigga in paris')

program.parse();

const options = program.opts()

if (options.niggas) console.log(`That's some niggas in paris ${options.niggas}`)
