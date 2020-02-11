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
 * 更新矩阵的某一列的数字
 * @param matrix : 要修改的矩阵
 * @param columnIndex : 要修改数字的列
 * @param newColumnArray : 这一列上的新的数字
 */
export function updateColumnOfMatrix (matrix, columnIndex, newColumnArray) {
  for (let i = 0; i < matrix.length; i++) {
    matrix[i].splice(columnIndex, 1, newColumnArray[i])
  }
}

export function generateRandomMatrix (matrixType) {
  let allNum = []
  for (let i = 1; i < matrixType * matrixType; i++) {
    allNum.push(i)
  }
  allNum.push(null)
  
  let randomMatrix = []
  for (let i = 0; i < matrixType; i++) {
    let rowArray = []
    for (let j = 0; j < matrixType; j++) {
      let randomIndex = Math.floor(Math.random() * allNum.length)
      let pickNum = allNum.splice(randomIndex, 1)[0]
      rowArray.push(pickNum)
    }
    randomMatrix.push(rowArray)
  }
  
  return randomMatrix
}

/**
 *
 * @param currentMatrix :当前的矩阵
 * @param initialMatrix :最终要完成的矩阵
 * @returns {boolean} : 判断两个矩阵是否相等
 */
export function isFinish (currentMatrix, initialMatrix) {
  for (let i = 0; i < currentMatrix.length; i++) {
    for (let j = 0; j < currentMatrix[i].length; j++) {
      if (currentMatrix[i][j] !== initialMatrix[i][j]) {
        return false
      }
    }
  }
  return true
}

export function milliSecondsToShowPattern (passMilliseconds) {
  // {hours: '00', minutes: '00', seconds: '00'}
  let passSeconds = Math.floor(passMilliseconds / 1000)
  let seconds = passSeconds % 60
  let minutes = Math.floor(passSeconds / 60) % 60
  let hours = Math.floor(passSeconds / (60 * 60))
  
  if (seconds <= 9) {
    seconds = '0' + seconds
  } else {
    seconds = seconds.toString()
  }
  
  if (minutes <= 9) {
    minutes = '0' + minutes
  } else {
    minutes = minutes.toString()
  }
  
  if (hours <= 9) {
    hours = '0' + hours
  } else {
    hours = hours.toString()
  }
  
  return {
    hours,
    minutes,
    seconds
  }
}

