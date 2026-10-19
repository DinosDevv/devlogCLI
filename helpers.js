function findMinIndex(list) {
  // All items must be >= 0

  let min = list[0]

  for(let value of list) {
    if(value < min) min = value
  }

  return list.indexOf(min)
}
export { findMinIndex }