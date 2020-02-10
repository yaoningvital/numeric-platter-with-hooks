import React from 'react'
import Square from './Square'

function Board (props) {
  let {matrixType, numsLayout, gapWidth, move} = props
  return (
    <div className="board"
         style={{
           width: (matrixType * 100 + (matrixType - 1) * gapWidth) + 'px',
           height: (matrixType * 100 + (matrixType - 1) * gapWidth) + 'px',
           padding: gapWidth + 'px'
         }}>
      {
        numsLayout.map(num => (
          <Square key={num}
                  value={num}
                  gapWidth={gapWidth}
                  move={move}
          />
        ))
      }
    </div>
  )
}

export default Board