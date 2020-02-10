import React, { useState } from 'react'
import Board from './Board'
import SelectType from "./SelectType";
import { generateInitialMatrix, getColumnArray, updateMatrix } from '../utils'
import _ from 'lodash'

function Game () {
  const [matrixType, setMatrixType] = useState(5) // 矩阵是几乘几的
  const [gapWidth, setGapWidth] = useState(5) // 格子之间间隙的宽度
  const allTypes = [3, 4, 5, 6, 7, 8] // 所有的矩阵类型
  
  let initialMatrix = generateInitialMatrix(matrixType) // 初始的数字布局
  const [matrix, setMatrix] = useState(initialMatrix) // 当前数字布局
  
  
  function handleSelectType (matrixType) {
    setMatrixType(matrixType)
    setMatrix(generateInitialMatrix(matrixType))
  }
  
  function move (value, index) {
    if (value === null) return
    let newMatrix = _.cloneDeep(matrix)
    
    let [rowIndex, columnIndex] = index
    let rowArray = newMatrix[rowIndex] // 点击数字所在的行
    let columnArray = getColumnArray(newMatrix, columnIndex) // 点击数字所在的列的数字 组成的数组
    
    
    // 这一行有空格，在这一行移动
    if (rowArray.includes(null)) {
      let nullIndex = rowArray.indexOf(null) // 空格所在的索引
      rowArray.splice(nullIndex, 1)
      rowArray.splice(columnIndex, 0, null)
    }
    // 在列上有空格，在这一列移动
    else if (columnArray.includes(null)) {
      let nullIndex = columnArray.indexOf(null) // 空格所在的索引
      columnArray.splice(nullIndex, 1)
      columnArray.splice(rowIndex, 0, null)
      updateMatrix(newMatrix, columnIndex, columnArray)
    }
    
    setMatrix(newMatrix)
    
  }
  
  return (
    <div className="game">
      <Board matrixType={matrixType}
             matrix={matrix}
             gapWidth={gapWidth}
             move={move}
      />
      <div className="operation-area">
        {/*选择类型*/}
        <SelectType allTypes={allTypes}
                    handleSelectType={handleSelectType}
        />
      </div>
    </div>
  )
}

export default Game