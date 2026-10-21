import { findMinIndex, parseSince } from "./helpers.js"
import { readJSON, appendToJSON } from "./fileHandling.js"
import { calculateStats } from "./stats.js"
import Levenshtein from 'levenshtein'
import { read } from "fs"

// add <entry> <tag>

const entriesPATH = './data/entries.json'
const sessionsPATH = './data/sessions.json'

function addEntry(content) {
  if(appendToJSON(entriesPATH, content)) console.log("Saved!")
}

// list [tag] [since]

function listEntries(tags, since) {
  const entries = readJSON(entriesPATH)
  const now = Date.now()

  let maxAge = null
  if (since) {
    maxAge = parseSince(since)
    if (maxAge === null) return
  }

  const output = []
  for (const entry of entries) {
    const matchesTags = !tags || entry.tags.includes(tags)
    const matchesTime = maxAge === null || now - entry.date <= maxAge

    if (matchesTags && matchesTime) output.push(entry)
  }

  for(const entry of output) {
    const entryDate = new Date(entry.date)
    console.log(`${entry.content}: created at ${entryDate.toLocaleString()} (${entry.tags})\n`)
  }

}

// search <entry>

function searchEntry(query) {
  const entries = readJSON(entriesPATH)
  const distances = []
  let match = null

  for (const entry of entries) {
    distances.push(Levenshtein(entry.content, query))
    if (entry.content.toUpperCase() === query.toUpperCase()) {
      match = entry
    }
  }

  if (!match) {
    const closestIndex = findMinIndex(distances)
    match = entries[closestIndex]
    console.log(`Did you mean "${match.content}"?`)
  }

  const entryDate = new Date(match.date)

  console.log(`${match.content}: created at ${entryDate.toLocaleString()} (${match.tags})`)
}

// session <time> <name>

function addSession(session) {
  if(appendToJSON(sessionsPATH, session)) console.log("Started session!")
}

// stats

function showStats() {
  const stats = calculateStats()

}

export { addEntry, listEntries, searchEntry, addSession, showStats }