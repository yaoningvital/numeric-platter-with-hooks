export function generateAllNums (matrix) {
  let array = []
  for (let i = 1; i < matrix * matrix; i++) {
    array.push(i)
  }
  array.push(null)
  return array;
}