import React, { useState } from 'react'
import Board from './Board'
import SelectType from "./SelectType";
import { generateAllNums } from '../utils'

function Game () {
  const [matrixType, setMatrixType] = useState(5) // 矩阵是几乘几的
  const [gapWidth, setGapWidth] = useState(5) // 格子之间间隙的宽度
  const allTypes = [3, 4, 5, 6, 7, 8] // 所有的矩阵类型
  
  let initialNumsLayout = generateAllNums(matrixType) // 初始的数字布局
  const [numsLayout, setNumsLayout] = useState(initialNumsLayout) // 数字布局
  
  
  function handleSelectType (matrixType) {
    setMatrixType(matrixType)
    setNumsLayout(generateAllNums(matrixType))
  }
  
  function move (value) {
  
  }
  
  return (
    <div className="game">
      <Board matrixType={matrixType}
             numsLayout={numsLayout}
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