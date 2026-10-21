import fs from 'fs'

function readJSON(PATH) {
  try {
    const data = fs.readFileSync(`${PATH}`, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error(`Error reading ${PATH}: ${err.message}`)
    return {}
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

export { readJSON, appendToJSON }