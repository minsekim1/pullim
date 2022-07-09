import React from 'react';


function DiagnosticHistoryButton({onClickHandler}: any) {
  return (
    <button style={{
        width: "100px",
        height: "40px",
        background: "royalblue",
        borderRadius: "5px",
        color: "white",
        fontSize: "11px",
        margin: "3px"
      }} onClick={onClickHandler('DiagnosticHistory')}>진단기록</button>
  )
}

export default DiagnosticHistoryButton;