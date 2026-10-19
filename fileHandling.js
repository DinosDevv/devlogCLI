import fs from 'fs'
const localDb = './localdb.json'


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

export { readContent, addContent }