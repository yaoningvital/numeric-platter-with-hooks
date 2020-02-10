/**
 *
 * @param matrixType : 是几乘几的矩阵
 * @returns {[]} 得到一个几乘几的矩阵
 */
export function generateInitialMatrix (matrixType) {
  let matrix = []
  for (let i = 1; i <= matrixType; i++) {
    let rowArray = []
    for (let j = 1; j <= matrixType; j++) {
      if (i === matrixType && j === matrixType) {
        rowArray.push(null)
      } else {
        rowArray.push((i - 1) * matrixType + j)
      }
    }
    matrix.push(rowArray)
  }
  return matrix;
}

/**
 *
 * @param matrix : 矩阵
 * @param columnIndex : 点击的数字所在的列
 * @returns {[]}: 返回点击数字所在列的数字 组成的数组
 */
export function getColumnArray (matrix, columnIndex) {
  let resultArray = []
  for (let i = 0; i < matrix.length; i++) {
    resultArray.push(matrix[i][columnIndex])
  }
  return resultArray
}

/**
 *
 * @param matrix : 要修改的矩阵
 * @param columnIndex : 要修改数字的列
 * @param newColumnArray : 这一列上的新的数字
 */
export function updateMatrix (matrix, columnIndex, newColumnArray) {
  for (let i = 0; i < matrix.length; i++) {
    matrix[i].splice(columnIndex, 1, newColumnArray[i])
  }
}