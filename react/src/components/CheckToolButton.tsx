import React, { useState } from 'react'

function CheckToolButton({setCurrentPage}: any) {
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
    setCurrentPage("CheckTool");
  };

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
    onClick={onClickHandler}>
      검사툴
    </button>
  )
}

export default CheckToolButton