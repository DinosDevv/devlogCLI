import { findMinIndex, parseSince } from "./helpers.js"
import { readContent } from "./fileHandling.js"
import Levenshtein from 'levenshtein'

// add <entry> <tag>

function addEntry(content) {
  let dataToStore = readContent()
  dataToStore.push(content)
  
  fs.writeFile(`${localDb}`, JSON.stringify(dataToStore, null, 2), (err) => {
    if(err) console.log(`Error: ${err}`)
    console.log('Saved!')
  })
}

const MS_PER_UNIT = {
  H: 60 * 60 * 1000,
  D: 24 * 60 * 60 * 1000,
  W: 7 * 24 * 60 * 60 * 1000,
}

// list [tag] [since]

function listEntries(tags, since) {
  const entries = readContent()
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

  console.log(output)
}

// search <entry>

function searchEntry(query) {
  const entries = readContent()
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

export { addEntry, listEntries, searchEntry }

// session <time> <name>

// stats