#!/usr/bin/env node


// print process.argv

function parseArgv(argv) {
  let parser = {
    command: argv[2],
    positionals: [],
    flags: []  
  }
  
  for(let i = 3; i < argv.length; i++) {
    if(argv[i].charAt(0) == '-') {
      const flagObj = {
        "flagName": argv[i],
        "flagParameter": argv[i+1]
      }
      parser.flags.push(flagObj)
      i++
    } else parser.positionals.push(argv[i])
  }
  return parser
}
function command(parser) {

}

export { parseArgv, command } 