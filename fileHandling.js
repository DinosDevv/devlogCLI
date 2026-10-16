import fs from 'fs'

export default function readContent(fileName) {
  fs.readFile(`${fileName}`, 'utf8', (err, data) => {
    if(err) {
      console.log("Error")
      return
    }
    console.log(data)
  })
}
