import fs from 'fs'
import Levenshtein from 'levenshtein'
import { findMinIndex } from './helpers.js'

const localDb = './data/localdb.json'
const stats = './data/stats.json'

function readContent() {
  try {
    const data = fs.readFileSync(localDb, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error(`Error reading ${localDb}: ${err.message}`)
    return {}
  }
}

function addContent(content) {
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

function parseSince(since) {
  const unit = since.charAt(since.length - 1).toUpperCase()
  const amount = Number(since.slice(0, -1))

  if (!MS_PER_UNIT[unit]) {
    console.log(`Incorrect time unit: ${unit}`)
    return null
  }
  if (Number.isNaN(amount)) {
    console.log(`Incorrect amount: ${since.slice(0, -1)}`)
    return null
  }

  return amount * MS_PER_UNIT[unit]
}

function listItems(tags, since) {
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

  console.log(`${match.content}: created at ${match.date} (${match.tags})`)
}

export { readContent, addContent, listItems, searchEntry }