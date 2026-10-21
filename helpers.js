function findMinIndex(list) {
  // All items must be >= 0

  let min = list[0]

  for(let value of list) {
    if(value < min) min = value
  }

  return list.indexOf(min)
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

export { findMinIndex, parseSince }