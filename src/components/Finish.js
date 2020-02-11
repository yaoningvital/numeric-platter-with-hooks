import React from 'react'
import { Modal } from "antd-mobile";
import UseTime from './UseTime'
import { milliSecondsToShowPattern } from '../utils'

function Finish (props) {
  let {showFinishModal, passTime, closeFinishMask, matrixType} = props
  let historyShortestTimeByMilliSeconds = window.localStorage.getItem('historyShortestTimeByMilliSeconds-' + matrixType)
  let historyShortestTimeByShowPattern = null
  if (historyShortestTimeByMilliSeconds) {
    historyShortestTimeByShowPattern = milliSecondsToShowPattern(historyShortestTimeByMilliSeconds)
  }
  
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
      visible={showFinishModal}
      transparent
      maskClosable={false}
      wrapProps={{onTouchStart: onWrapTouchStart}}
      footer={[{text: '好的', onPress: () => closeFinishMask()}]}
    >
      <div className="finish">
        <h3>通关了</h3>
        <UseTime passTime={passTime}>用时</UseTime>
        <UseTime passTime={historyShortestTimeByShowPattern}
                 hide={!historyShortestTimeByShowPattern}>历史最短用时</UseTime>
      </div>
    </Modal>
  )
}

export default Finish