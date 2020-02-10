import React from 'react'

function StartGameBtn (props) {
  let {startGame, gameStatus} = props
  let color = gameStatus === 'begin' ? '#96908d' : '#79421e'
  return (
    <button className="begin-btn"
            onClick={startGame}
            disabled={gameStatus === 'begin'}
            style={{
              color: color
            }}
    >开始游戏
    </button>
  )
}

export default StartGameBtn