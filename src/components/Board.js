import React from 'react'
import Square from './Square'

function Board (props) {
  let {matrixType, matrix, gapWidth, move} = props
  return (
    <div className="board"
         style={{
           width: (matrixType * 100 + (matrixType - 1) * gapWidth) + 'px',
           height: (matrixType * 100 + (matrixType - 1) * gapWidth) + 'px',
           padding: gapWidth + 'px'
         }}>
      {
        matrix.map((rowArray,rowIndex) => {
          return rowArray.map((num,columnIndex) => (
            <Square key={num}
                    value={num}
                    index={[rowIndex,columnIndex]}
                    gapWidth={gapWidth}
                    move={move}
            />
          ))
        })
      }
    </div>
  )
}


export default Board