import React from 'react'

function UseTime (props) {
  let {passTime, children, hide} = props
  let {hours, minutes, seconds} = passTime
  return (
    <div className="use-time" style={{
      display: hide ? 'none' : 'block'
    }}>
      <p>
        <span>{children}：</span>
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </p>
    </div>
  )
}

export default UseTime