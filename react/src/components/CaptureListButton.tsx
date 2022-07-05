import React, { useRef, useState } from "react";

function CaptureListButton({onClickHandler}: any) {
  //ref는 고정적으로 값을 가지고 있음
  const btnIdRef = useRef() as any;

  return (
      <button
        ref={btnIdRef}
        style={{
          width: "100px",
          height: "40px",
          background: "royalblue",
          borderRadius: "5px",
          color: "white",
          fontSize: "11px",
          margin: "3px"
        }}
        onClick={onClickHandler('CaptureList')}
      >
        저장된 화면캡처 화면
      </button>
  );
}

export default CaptureListButton;
