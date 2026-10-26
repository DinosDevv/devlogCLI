#!/usr/bin/env node

import { addEntry, listEntries, searchEntry, addSession, showStats } from './commands.js'
import { checkFolder } from './fileHandling.js'
import { folderPath } from './paths.js';
import { parseArgv } from './parser.js';
import { argv } from 'node:process';

checkFolder(folderPath)

const command = parseArgv(argv)
console.log(command)

if(command.command == 'add') {
  let tag = ""
  if(command.flags["-t"] || command.flags["--tag"]) {
    command.flags["-t"] ? tag = command.flags["-t"] : command.flags["--tag"] 
  }
  const entryObj = {
    "content": command.positionals[0],
    "tags": [tag],
    "date": Date.parse(Date())
  }
  addEntry(entryObj)
}
if(command.command == 'list') {
  let tag = ""
  let since = ""
  if(command.flags["-t"] || command.flags["--tag"]) {
    command.flags["-t"] ? tag = command.flags["-t"] : command.flags["--tag"] 
  }
  if(command.flags["-s"] || command.flags["--since"]) {
    command.flags["-s"] ? since = command.flags["-s"] : command.flags["--since"]
  }
  listEntries(tag, since)
}
if(command.command == 'search') {
  searchEntry(`${command.positionals[0]}`)
}
if(command.command == 'session') {
  console.log("Session")
  let duration = 0
  if(command.flags["-d"] || command.flags["--duration"]) {
    command.flags["-d"] ? duration = Number(command.flags["-d"]) : Number(command.flags["--duration"])
  }
  const sessionObject = {
    "name": command.positionals[0],
    "duration": duration, // in minutes
    "date": Date.parse(Date()) 
  }
  console.log(sessionObject)
  addSession(sessionObject)
}
if(command.command == 'stats') {
  showStats()
}