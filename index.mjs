#!/usr/bin/env node

import { Command } from 'commander';
import { readContent, addContent } from './fileHandling.js'

const program = new Command();

program
  .name('devlog')
  .description('A CLI application for logging your development')
  .version('1.0.0')

program
  .command('add <entry> <tag>')
  .option('--tag -t', 'Tags entry')
  .description('Add an entry')
  .action((entry, tag) => {
    // Add an entry
    
    const entryObj = {
      "content": entry,
      "tags": [
        tag
      ],
      "date": Date.now().toString()
    }
    addContent(entryObj)
    console.log(`Added entry ${entry} with tag ${tag}! `)
    
  })

program
  .command('list [tag] [since]')
  .option('--tag -t', 'Entry tag')
  .option('--since -s', 'Date since')
  .description('List all entries')
  .action((tag, since) => {
    if(tag) console.log(`All entries with tag: ${tag}`)
    readContent('./myFile.txt')
  })

program
  .command('search <entry>')
  .description('Search a specific entry Item')
  .action((entry) => {
    console.log(`Here is your entry: ${entry}`)
  })

program
  .command('stats')
  .description('Show stats')
  .action(() => {
    console.log('Stats')
  })
program.parse();

const options = program.opts()

if (options.niggas) console.log(`That's some niggas in paris ${options.niggas}`)
