import React, { useState } from 'react'
import Board from './Board'
import StartGameBtn from './StartGameBtn'
import UseTime from './UseTime'
import {
  generateInitialMatrix,
  getColumnArray,
  isFinish,
  milliSecondsToShowPattern,
  updateColumnOfMatrix
} from '../utils'
import _ from 'lodash'
import SelectGameType from './SelectGameType'
import Finish from './Finish'


function Game () {
  const [showModal, setShowModal] = useState(true)
  const [matrixType, setMatrixType] = useState(5) // 矩阵是几乘几的
  const [gapWidth] = useState(5) // 格子之间间隙的宽度
  const allTypes = [3, 4, 5, 6, 7, 8] // 所有的矩阵类型
  const initialPassTime = {hours: '00', minutes: '00', seconds: '00'}
  const [gameStatus, setGameStatus] = useState('notBegin') // 游戏状态： notBegin、begin、finish
  const [passTime, setPassTime] = useState(initialPassTime) // 游戏耗时 格式：{hours: '00', minutes: '00', seconds: '00'}
  const [useMilliSeconds, setUseMilliSeconds] = useState(0) // 游戏耗时 毫秒格式
  const [timer, setTimer] = useState(null)
  const [startPos, setStartPos] = useState({pageX: 0, pageY: 0}) // 触摸开始位置
  const [moveToPos, setMoveToPos] = useState({pageX: 0, pageY: 0}) // 触摸移动时的位置
  
  let initialMatrix = generateInitialMatrix(matrixType) // 初始的数字布局
  const [matrix, setMatrix] = useState(initialMatrix) // 当前数字布局
  const [showFinishModal, setShowFinishModal] = useState(false)
  
  // 处理选择游戏类型
  function handleSelectType (matrixType) {
    setShowModal(false)
    setMatrixType(matrixType)
    setMatrix(generateInitialMatrix(matrixType))
    setGameStatus('notBegin')
    setPassTime(initialPassTime)
  }
  
  // 点击了一个数字
  function handleClick (value, index) {
    if (gameStatus === 'notBegin' || gameStatus === 'finish') return
    if (value === null) return
    let newMatrix = generateNewMatrix(value, index, matrix)
    setMatrix(newMatrix)
    hasFinished(newMatrix)
  }
  
  // 根据点击的数字的值 和 其所在的行列索引，将原来的矩阵更新为一个 新的矩阵
  function generateNewMatrix (value, index, oldMatrix) {
    if (value === null) return oldMatrix
    
    let newMatrix = _.cloneDeep(oldMatrix)
    
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
      updateColumnOfMatrix(newMatrix, columnIndex, columnArray)
    }
    return newMatrix
  }
  
  // 判断矩阵是否复原了
  function hasFinished (newMatrix) {
    if (isFinish(newMatrix, initialMatrix)) {
      // alert('通关了')
      setGameStatus('finish')
      clearInterval(timer)
      
      // 历史最短用时
      let historyShortestUseTime = window.localStorage.getItem('historyShortestTimeByMilliSeconds-' + matrixType)
      if (historyShortestUseTime) {
        if (+historyShortestUseTime > useMilliSeconds) {
          window.localStorage.setItem('historyShortestTimeByMilliSeconds-' + matrixType, useMilliSeconds)
        }
      } else {
        window.localStorage.setItem('historyShortestTimeByMilliSeconds-' + matrixType, useMilliSeconds)
      }
      
      setShowFinishModal(true)
      
    }
  }
  
  // 点击“开始游戏”按钮
  function startGame () {
    // 1、gameStatus变为 begin
    setGameStatus('begin')
    
    // 2、生成一个顺序被自动打乱的矩阵
    let disorderedMatrix = generateDisorderedMatrix()
    // console.log('disorderedMatrix:', disorderedMatrix)
    setMatrix(disorderedMatrix)
    
    // 3、开始计时
    let beginTime = Date.now()
    clearInterval(timer)
    let t = setInterval(() => {
      let currentTime = Date.now()
      let passMilliSeconds = currentTime - beginTime
      let newPassTime = milliSecondsToShowPattern(passMilliSeconds)
      setPassTime(newPassTime)
      setUseMilliSeconds(passMilliSeconds)
    }, 1000)
    
    setTimer(t)
  }
  
  // 生成一个顺序被自动打乱的矩阵
  function generateDisorderedMatrix () {
    let moveTimes = matrixType * 100 // 自动移动的次数
    let disorderedMatrix = _.cloneDeep(initialMatrix)
    for (let i = 0; i < moveTimes; i++) {
      // console.log('i:', i)
      disorderedMatrix = autoMove(disorderedMatrix)
    }
    
    return disorderedMatrix
    
  }
  
  // 自动移动一格数字
  function autoMove (oldMatrix) {
    // console.log('oldMatrix:', oldMatrix)
    // let totalNum = matrixType * matrixType
    
    let nullIndex = [] // 空格所在的索引
    for (let i = 0; i < oldMatrix.length; i++) {
      for (let j = 0; j < oldMatrix[i].length; j++) {
        if (oldMatrix[i][j] === null) {
          nullIndex = [i, j]
        }
      }
    }
    
    let canMoveIndices = [] // 可以移动的数字所在的索引
    for (let i = 0; i < oldMatrix.length; i++) {
      for (let j = 0; j < oldMatrix[i].length; j++) {
        let canMoveIndex = i * oldMatrix.length + j
        if (i === nullIndex[0] && oldMatrix[i][j] !== null) { // 找到空格所在的行
          canMoveIndices.push(canMoveIndex)
        }
        if (j === nullIndex[1] && oldMatrix[i][j] !== null) { // 空格所在的列
          canMoveIndices.push(canMoveIndex)
        }
      }
    }
    
    let randomIndex = canMoveIndices[Math.floor(Math.random() * canMoveIndices.length)]
    let value = []
    let index = []
    for (let i = 0; i < oldMatrix.length; i++) {
      for (let j = 0; j < oldMatrix[i].length; j++) {
        if (i * oldMatrix.length + j === randomIndex) {
          value = oldMatrix[i][j]
          index = [i, j]
          break
        }
      }
      if (index.length > 0) {
        break
      }
    }
    return generateNewMatrix(value, index, oldMatrix)
  }
  
  // 关闭完成的提示层
  function closeFinishMask () {
    setShowFinishModal(false)
    setPassTime(initialPassTime)
  }
  
  function handleTouchStart (e, value, index) {
    if (gameStatus === 'notBegin' || gameStatus === 'finish') return
    if (value === null) return
    setStartPos({
      pageX: e.targetTouches[0].pageX,
      pageY: e.targetTouches[0].pageY
    })
  }
  
  function handleTouchMove (e, value, index) {
    if (gameStatus === 'notBegin' || gameStatus === 'finish') return
    setMoveToPos({
      pageX: e.targetTouches[0].pageX,
      pageY: e.targetTouches[0].pageY,
    })
  }
  
  function handleTouchEnd (value, index) {
    if (gameStatus === 'notBegin' || gameStatus === 'finish') return
    
    let xDistance = startPos.pageX - moveToPos.pageX
    let yDistance = startPos.pageY - moveToPos.pageY
    let moveAxis = Math.abs(xDistance) > Math.abs(yDistance) ? 'horizontal' : 'vertical'
    
    let moveDirection = null
    if (moveAxis === 'horizontal') {
      if (xDistance > 10) {
        moveDirection = 'left'
        // console.log('向左移')
      } else if (xDistance < -10) {
        moveDirection = 'right'
        // console.log('向右移')
      }
    } else if (moveAxis === 'vertical') {
      if (yDistance > 10) {
        moveDirection = 'top'
        // console.log('向上移')
      } else if (yDistance < -10) {
        moveDirection = 'bottom'
        // console.log('向下移')
      }
    }
    
    if (moveDirection) {
      let newMatrix = generateNewMatrixBySlide(value, index, matrix, moveDirection)
      setMatrix(newMatrix)
      hasFinished(newMatrix)
    }
  }
  
  /**
   * @return 返回滑动后的数字布局
   * value: 滑动数字的值
   * index: 滑动数字所在的索引
   * oldMatrix: 滑动前的数字布局
   * moveDirection: 滑动的方向
   */
  function generateNewMatrixBySlide (value, index, oldMatrix, moveDirection) {
    let newMatrix = _.cloneDeep(oldMatrix)
    
    let [rowIndex, columnIndex] = index
    let rowArray = newMatrix[rowIndex] // 滑动数字所在的行
    let columnArray = getColumnArray(newMatrix, columnIndex) // 滑动数字所在的列的数字 组成的数组
    
    if (moveDirection === 'left') {
      if (rowArray.slice(0, columnIndex).includes(null)) { // 滑动数字的左边有空格，可以往左边移动
        let nullIndex = rowArray.indexOf(null) // 空格所在的索引
        rowArray.splice(nullIndex, 1)
        rowArray.splice(columnIndex, 0, null)
      }
    } else if (moveDirection === 'right') {
      if (rowArray.slice(columnIndex, matrixType).includes(null)) { // 滑动数字的右边有空格，可以往右边移动
        let nullIndex = rowArray.indexOf(null) // 空格所在的索引
        rowArray.splice(nullIndex, 1)
        rowArray.splice(columnIndex, 0, null)
      }
    } else if (moveDirection === 'top') {
      if (columnArray.slice(0, rowIndex).includes(null)) { // 滑动数字的上边有空格，可以往上边移动
        let nullIndex = columnArray.indexOf(null) // 空格所在的索引
        columnArray.splice(nullIndex, 1)
        columnArray.splice(rowIndex, 0, null)
        updateColumnOfMatrix(newMatrix, columnIndex, columnArray)
      }
    } else if (moveDirection === 'bottom') {
      if (columnArray.slice(rowIndex, matrixType).includes(null)) { // 滑动数字的下边有空格，可以往下边移动
        let nullIndex = columnArray.indexOf(null) // 空格所在的索引
        columnArray.splice(nullIndex, 1)
        columnArray.splice(rowIndex, 0, null)
        updateColumnOfMatrix(newMatrix, columnIndex, columnArray)
      }
    }
    
    return newMatrix
  }
  
  return (
    <div className="game">
      <SelectGameType showModal={showModal}
                      allTypes={allTypes}
                      gameStatus={gameStatus}
                      handleSelectType={handleSelectType}
      />
      {/*游戏状态*/}
      <UseTime gameStatus={gameStatus}
               passTime={passTime}
      >已用时</UseTime>
      <button className="select-type-btn"
              onClick={() => setShowModal(true)}
              disabled={gameStatus === 'begin'}
      >选择类型
      </button>
      {/*通关了，已用时*/}
      <Finish showFinishModal={showFinishModal}
              passTime={passTime}
              closeFinishMask={closeFinishMask}
              matrixType={matrixType}
      />
      
      <Board matrixType={matrixType}
             matrix={matrix}
             gapWidth={gapWidth}
             handleClick={handleClick}
             handleTouchStart={handleTouchStart}
             handleTouchMove={handleTouchMove}
             handleTouchEnd={handleTouchEnd}
      />
      <StartGameBtn gameStatus={gameStatus}
                    startGame={startGame}
      />
    </div>
  )
}

export default Game