import { addEntry, listEntries, searchEntry, addSession, showStats } from './actions.js'

const addCommand = {
  command: "add",
  flagsRequired: [
    {'tags': true}
  ],
  positionalsExpected: 1,
  action: function(content, tag) {
    const entryObj = {
      "content": content,
      "tags": [tag],
      "date": Date.parse(Date())
    }
    addEntry(entryObj)
  }
}
const listCommand = {
  command: "list",
  flagsRequired: [
    {'tags': false},
    {'since': false}
  ],
  positionalsExpected: 0,
  action: function(tag, since) {
    listEntries(tag, since)
  }
}
const searchCommand = {
  command: "search",
  flagsRequired: [],
  positionalsExpected: 1,
  action: function(query) {
    searchEntry(query)
  }
}
const sessionCommand = {
  command: "session",
  flagsRequired: [
    {'duration': true}
  ],
  positionalsExpected: 1,
  action: function(name, duration) {
    const sessionObject = {
      "name": name,
      "duration": duration, // in minutes
      "date": Date.parse(Date()) 
    }
     addSession(sessionObject)
  }
}
const statsCommand = {
  command: "stats",
  flagsRequired: [],
  positionalsExpected: 0,
  action: function() {
    showStats()
  }
}

export { addCommand, listCommand, searchCommand, sessionCommand, statsCommand }