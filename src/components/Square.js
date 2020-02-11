import React from 'react'

function Square (props) {
  let {value, index, gapWidth, matrixType, handleMove} = props
  let clientWidth = document.body.clientWidth
  let width = clientWidth * 0.9 / matrixType + 'px'
  let backgroundColor = value ? '#e5b97c' : 'transparent'
  let backgroundImage = value ? 'linear-gradient(#f3c98f, #e5b97c)' : 'none'
  let boxShadow = value ? '-1px -1px 1px #fff' : 'none'
  let fontSize = 232 / matrixType + 'px'
  return (
    <button className="square"
            style={{
              width: width,
              height: width,
              // marginBottom: gapWidth + 'px',
              backgroundColor: backgroundColor,
              backgroundImage: backgroundImage,
              boxShadow: boxShadow,
              fontSize: fontSize
            }}
            onClick={() => handleMove(value, index)}
    >{value}</button>
  )
}

export default Square