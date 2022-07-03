import React, { useRef, useState } from "react";

function CaptureListButton({setCurrentPage}: any) {
  //ref는 고정적으로 값을 가지고 있음
  const btnIdRef = useRef() as any;

  const [isClick, setIsClick] = useState(0 as number);

  const onClickHandler = () => {
    //풀림페이지 생성
    const catchPullimRef = document.getElementById(
      "pullim-page"
    ) as HTMLDivElement;
    if (isClick % 2 === 0) {
      catchPullimRef.style.display = "flex";
    } else {
      catchPullimRef.style.display = "none";
    }
    setIsClick(isClick + 1); //클릭시 +1!
    setCurrentPage("CaptureList");
  };

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
        onClick={onClickHandler}
      >
        저장된 화면캡처 화면
      </button>
  );
}

export default CaptureListButton;
