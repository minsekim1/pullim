import React, { useEffect, useRef } from 'react'

function CheckToolButton({setCheckTool, callAccepted}: any) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if(!buttonRef.current){
      return;
    }
    if(!callAccepted){
      buttonRef.current.style.background = "#255c8c";
      console.log('black');
    }else{
      buttonRef.current.style.background = "royalblue";
      console.log('royalblue');
    }

  },[callAccepted]);

  return (
    <button style={{
      width: "100px",
      height: "40px",
      background: "royalblue",
      borderRadius: "5px",
      color: "white",
      fontSize: "11px",
      margin: "3px"
    }}
    ref={buttonRef}
    disabled={!callAccepted}
    onClick={() =>setCheckTool(true)}>
      검사툴
    </button>
  )
}

export default CheckToolButton