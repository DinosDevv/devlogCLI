import fs from 'fs'
import { sessionsPath, entriesPath } from './paths';

function checkFolder(PATH) {
  try {
    if (!fs.existsSync(PATH)) {
      fs.mkdirSync(PATH);
      fs.writeFile(entriesPath, JSON.stringify([], null, 2), (err) => {
        if(err) {
          console.log(`Error: ${err.message}`)
        }
      })
      fs.writeFile(sessionsPath, JSON.stringify([], null, 2), (err) => {
        if(err) {
          console.log(`Error: ${err.message}`)
        }
      })
    }
  } catch (err) {
    console.error(err);
  }

}

function readJSON(PATH) {
  try {
    const data = fs.readFileSync(`${PATH}`, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    return []
  }
}
function appendToJSON(PATH, content) {
  let dataToStore = readJSON(PATH)
  dataToStore.push(content)
  
  fs.writeFile(`${PATH}`, JSON.stringify(dataToStore, null, 2), (err) => {
    if(err) {
      console.log(`Error: ${err}`)
      return false
    }
    return true
  })
}

export { readJSON, appendToJSON, checkFolder }