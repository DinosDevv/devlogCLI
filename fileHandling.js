import fs from 'fs'

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

export { readContent }