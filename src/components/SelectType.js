import React from 'react'

function SelectType (props) {
  let {allTypes, gameStatus, handleSelectType} = props
  return (
    <div className="select-types">
      <h4>请选择类型：</h4>
      {
        allTypes.map(matrixType => (
          <button key={matrixType}
                  onClick={() => handleSelectType(matrixType)}
                  disabled={gameStatus === 'begin'}
          >{matrixType}X{matrixType}</button>
        ))
      }
    </div>
  )
}

export default SelectType