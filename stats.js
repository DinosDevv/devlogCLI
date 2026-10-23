import { readJSON } from "./fileHandling.js"
import { sessionsPath, entriesPath } from "./paths.js"

function calculateTotalTime() {
  const sessions = readJSON(sessionsPath)
  let totalTime = 0

  for(const session of sessions) {
    totalTime += session.duration
  }

  return totalTime
}
function topTags() {
  const tags = {}
  const entries = readJSON(entriesPath)

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

  
  return tagRank
}
function calculateStreak() {
  const dates = []
  const entries = readJSON(entriesPath)
  const sessions = readJSON(sessionsPath)
  let streak = 0

  for(const entry of entries) dates.push(entry.date)
  for(const session of sessions) dates.push(session.date)

  dates.sort()
  dates.reverse()

  let prevDate = dates[0]

  for(const date of dates) {
    const newDate = new Date(date)
    const previousDate = new Date(prevDate)
    
    const dateDifference = previousDate.getDate() - newDate.getDate()

    if(dateDifference == 1) streak++
    if(dateDifference > 1) return streak
    prevDate = date
  }
  return streak
}
function calculateStats() {
  /*
    1) We need to fetch the total time of sessions DONE
    2) We need to calculate top tags (rank tags based on how many entries are submitted with the said tag)
    3) Current streak
  */
  const totalTime = calculateTotalTime()
  const tagRank = topTags()
  const streak = calculateStreak()

  const stats = {
    "totalTime": totalTime,
    "tagRank": tagRank,
    "streak": streak
  }

  return stats

}

export { calculateStats }