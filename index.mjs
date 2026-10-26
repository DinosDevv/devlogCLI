#!/usr/bin/env node


import { checkFolder } from './fileHandling.js'
import { folderPath } from './paths.js';
import { parseArgv } from './parser.js';
import { argv } from 'node:process';
import { addCommand, listCommand, searchCommand, sessionCommand, statsCommand } from './commands.js';

checkFolder(folderPath)

const command = parseArgv(argv)
const commandObjects = [addCommand, listCommand, searchCommand, sessionCommand, statsCommand]

console.log(command)

function checkCommand(command) {
  for(comm of commandObjects) {
    if(command.command = comm.command) return comm
  }
}
const commandFound = checkCommand(command)
if(commandFound) validateCommand(command, commandFound)

function validateCommand(command, commandFound) {
  if(command.positionals.length == commandFound.positionalsExpected) {
    if(command.flags.length > 0) {

    } else {
      commandFound.action()
    }
  } 
}

if(command.command == 'add') {
  let tag = ""
  if(command.flags["-t"] || command.flags["--tag"]) {
    command.flags["-t"] ? tag = command.flags["-t"] : command.flags["--tag"] 
  }
}
