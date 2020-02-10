import React, { useState } from 'react'
import Board from './Board'
import StartGameBtn from './StartGameBtn'
import GameStatus from './GameStatus'
import SelectType from "./SelectType";
import {
  calculatePassTime,
  generateInitialMatrix,
  generateRandomMatrix,
  getColumnArray,
  isFinish,
  updateMatrix
} from '../utils'
import _ from 'lodash'

function Game () {
  const [matrixType, setMatrixType] = useState(5) // 矩阵是几乘几的
  const [gapWidth, setGapWidth] = useState(5) // 格子之间间隙的宽度
  const allTypes = [3, 4, 5, 6, 7, 8] // 所有的矩阵类型
  const initialPassTime = {hours: '00', minutes: '00', seconds: '00'}
  const [gameStatus, setGameStatus] = useState('notBegin') // 游戏状态： notBegin、begin、finish
  const [passTime, setPassTime] = useState(initialPassTime) // 游戏耗时
  const [timer, setTimer] = useState(null)
  
  let initialMatrix = generateInitialMatrix(matrixType) // 初始的数字布局
  const [matrix, setMatrix] = useState(initialMatrix) // 当前数字布局
  
  
  function handleSelectType (matrixType) {
    setMatrixType(matrixType)
    setMatrix(generateInitialMatrix(matrixType))
    setGameStatus('notBegin')
    setPassTime(initialPassTime)
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
    
    if (isFinish(newMatrix, initialMatrix)) {
      // alert('通关了')
      setGameStatus('finish')
      clearInterval(timer)
    }
  }
  
  function startGame () {
    // 1、gameStatus变为 begin
    setGameStatus('begin')
    // 2、生成一个顺序随机的矩阵
    let randomMatrix = generateRandomMatrix(matrixType)
    console.log(randomMatrix)
    setMatrix(randomMatrix)
    // 3、开始计时
    let beginTime = Date.now()
    clearInterval(timer)
    let t = setInterval(() => {
      let currentTime = Date.now()
      let newPassTime = calculatePassTime(currentTime - beginTime)
      setPassTime(newPassTime)
    }, 1000)
    
    setTimer(t)
  }
  
  return (
    <div className="game">
      <div className="board-area">
        <Board matrixType={matrixType}
               matrix={matrix}
               gapWidth={gapWidth}
               move={move}
        />
        <StartGameBtn gameStatus={gameStatus}
                      startGame={startGame}
        />
      </div>
      
      <div className="operation-area">
        {/*选择类型*/}
        <SelectType allTypes={allTypes}
                    gameStatus={gameStatus}
                    handleSelectType={handleSelectType}
        />
        {/*游戏状态*/}
        <GameStatus gameStatus={gameStatus}
                    passTime={passTime}
        />
      
      </div>
    </div>
  )
}

export default Game