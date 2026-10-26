#!/usr/bin/env node


// print process.argv

function parseArgv(argv) {
  let parser = {
    command: argv[2],
    positionals: [],
    flags: {}
  }
  
  for(let i = 3; i < argv.length; i++) {
    if(argv[i].charAt(0) == '-') {
      parser.flags[`${argv[i]}`] = `${argv[i+1]}`
      i++
    } else parser.positionals.push(argv[i])
  }
  return parser
}
function command(parser) {

}

export { parseArgv, command } 