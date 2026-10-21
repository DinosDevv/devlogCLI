import { readJSON } from "./fileHandling.js"

const sessionsPATH = './data/sessions.json'
const entriesPATH = './data/entries.json'

function calculateTotalTime() {
  const sessions = readJSON(sessionsPATH)
  let totalTime = 0

  for(const session of sessions) {
    totalTime += session.duration
  }

  return totalTime
}
function topTags() {
  const tags = {}
  const entries = readJSON(entriesPATH)

  for(const entry of entries) {
    for(const tag of entry.tags) {
      if(tags[tag] == null) tags[tag] = 1
      else tags[tag]++
    }
  }

  // Sort the tags

  const tagRank = Object.keys(tags).map(function(key) {
    return [key, tags[key]]
  })
  tagRank.sort(function(first, second) {
    return second[1] - first[1]
  })

  console.log(tags['kaka'])
  
  return tagRank
}
function calculateStreak() {
  const dates = []
  const entries = readJSON(entriesPATH)
  const sessions = readJSON(sessionsPATH)

  for(const entry of entries) dates.push(entry.date)
  for(const session of sessions) dates.push(session.date)

  dates.sort()

  for(const date of dates) {
    const newDate = new Date(date)
    console.log(newDate.toISOString())
  }


}
calculateStreak()
function calculateStats() {
  /*
    1) We need to fetch the total time of sessions DONE
    2) We need to calculate top tags (rank tags based on how many entries are submitted with the said tag)
    3) Current streak
  */
  const totalTime = calculateTotalTime()
  const tagRank = topTags()

  const stats = {}

  return stats

}

export { calculateStats }