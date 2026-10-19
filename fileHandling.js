import fs from 'fs'
const localDb = './localdb.json'
import Levenshtein from 'levenshtein'
import { findMinIndex } from './helpers.js'

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

function listItems(tags, since) {
  const listOfEntries = readContent()
  let entriesToShow = []

  console.log(tags)
  // for (let entry of listOfEntries) {
  //   if(entry.tags.include(tags)) entriesToShow.push(entry)
  // }

  // parameters are either strings or null

  if(tags == null && since == null) entriesToShow = listOfEntries


  console.log(typeof(tags))
  console.log(typeof(since))

  // if(tags) {
  //   for(let entry of listOfEntries) {
  //     if(entry.tags.includes(tags)) entriesToShow.push(entry)
  //   }

  //   return entriesToShow
  // } else {
  //   return listOfEntries
  // }

  for (let entry of entriesToShow) console.log(entry)
}
function searchEntry(entry) {
  const list = []
  let foundMatch = false
  let index = 0
  const entries = readContent()

  for(let item of entries) {
    list.push(Levenshtein(item.content, entry))
    if(item.content.toUpperCase() == entry.toUpperCase()) foundMatch = true
  }
  
  if(!foundMatch) {
    index = findMinIndex(list)
    console.log(`Did you mean "${entries[index].content}"?`)
  }

  // console.log(`${item.content}: created at ${item.date} (${item.tags})`)
}


export { readContent, addContent, listItems, searchEntry }