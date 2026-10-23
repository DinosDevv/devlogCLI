#!/usr/bin/env node

import { addEntry, listEntries, searchEntry, addSession, showStats } from './commands.js'
import { checkFolder } from './fileHandling.js'
import { folderPath } from './paths.js';
import { parseArgv, command } from './parser.js';
import { argv } from 'node:process';

checkFolder(folderPath)
console.log(parseArgv(argv))


/*
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
  .command('session <duration> <name>')
  .action((duration, name) => {
    const sessionObject = {
      "name": name,
      "duration": Number(duration), // in minutes
      "date": Date.parse(Date()) 
    }
    addSession(sessionObject)
  })

program
  .command('stats')
  .description('Show stats')
  .action(() => {
    showStats()
  })
program.parse();

const options = program.opts()
*/