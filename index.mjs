#!/usr/bin/env node

import { Command } from 'commander';
import { addEntry, listEntries, searchEntry } from './commands.js'

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
      "date": Date.parse(Date())
    }
    addEntry(entryObj)
    console.log(`Added entry ${entry} with tag ${tag}! `)

  })

program
  .command('list [tag] [since]')
  .option('--tag -t', 'Entry tag')
  .option('--since -s', 'Date since')
  .description('List all entries')
  .action((tag, since) => {
    if(tag) console.log(`All entries with tag: ${tag}`)
    listEntries(tag, since)
  })

program
  .command('search <entry>')
  .description('Search a specific entry Item')
  .action((entry) => {
    searchEntry(entry)
  })

program
  .command('session <time> <name>')
  .action((time, name) => {
    console.log(`${name}: ${time} mins`)
  })

program
  .command('stats')
  .description('Show stats')
  .action(() => {
    console.log('Stats')
  })
program.parse();

const options = program.opts()
