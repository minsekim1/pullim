import React, { useState } from 'react'

// setCurrentPage: 페이지를 잡아주는 useState 함수
function usePage(setCurrentPage: Function) {
    const [isClick, setIsClick] = useState(0 as number);

    const onClickHandler = (pageName: string) => () => {
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
      setCurrentPage(pageName);
    };
    return onClickHandler
}

export default usePage;