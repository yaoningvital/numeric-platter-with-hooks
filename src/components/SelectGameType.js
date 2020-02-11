import { Modal } from 'antd-mobile';
import React from "react";

// console.log('Modal:', Modal)

function SelectGameType (props) {
  let {showModal, allTypes, gameStatus, handleSelectType} = props
  
  function closest (el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }
  
  function onWrapTouchStart () {
    return (e) => {
      // fix touch to scroll background page on iOS
      if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
      }
      const pNode = closest(e.target, '.am-modal-content');
      if (!pNode) {
        e.preventDefault();
      }
    }
  }
  
  return (
    <Modal
      visible={showModal}
      transparent
      maskClosable={false}
      // title="请选择游戏类型"
      wrapProps={{onTouchStart: onWrapTouchStart}}
    >
      <div className="select-types">
        {
          allTypes.map(matrixType => (
            <button key={matrixType}
                    onClick={() => handleSelectType(matrixType)}
                    disabled={gameStatus === 'begin'}
            >{matrixType} X {matrixType}</button>
          ))
        }
      </div>
    </Modal>
  )
}

export default SelectGameType