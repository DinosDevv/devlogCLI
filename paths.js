import path from "path"
import os from "os"

const folderPath = path.join(os.homedir(), '.devlog')
const sessionsPath = path.join(folderPath, 'sessions.json')
const entriesPath = path.join(folderPath, 'entries.json')

export { folderPath, sessionsPath, entriesPath }