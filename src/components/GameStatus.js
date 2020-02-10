import React from 'react'

function GameStatus (props) {
  let {passTime, gameStatus} = props
  let {hours, minutes, seconds} = passTime
  let finishDisplay = gameStatus === 'finish' ? 'block' : 'none'
  return (
    <div className="game-status">
      <p>
        <span>已用时：</span>
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </p>
      <p className="game-result" style={{
        display: finishDisplay
      }}>通关了</p>
    </div>
  )
}

export default GameStatus