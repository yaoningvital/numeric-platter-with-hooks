import React from 'react'

function Square (props) {
  let {value, index, gapWidth, move} = props
  let backgroundColor = value ? '#e5b97c' : 'transparent'
  let backgroundImage = value ? 'linear-gradient(#f3c98f, #e5b97c)' : 'none'
  let boxShadow = value ? '-1px -1px 1px #fff' : 'none'
  return (
    <button className="square"
            style={{
              marginBottom: gapWidth + 'px',
              backgroundColor: backgroundColor,
              backgroundImage: backgroundImage,
              boxShadow: boxShadow
            }}
            onClick={() => move(value, index)}
    >{value}</button>
  )
}

export default Square