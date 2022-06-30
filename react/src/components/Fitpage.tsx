import React, { useEffect, useRef, useState } from "react";

function Fitpage() {
//ref는 고정적으로 값을 가지고 있음
const divIdRef = useRef();
const btnIdRef = useRef();
const pullimRef = useRef();
const [isClick, setIsClick] = useState(0 as number);
const [nameId, setNameId] = useState("" as any);
const [btnId, setBtnId] = useState("" as any);
const [pullim, setPullim] = useState("" as any);

const onClickHandler = () => {
    //풀림페이지 생성
    const catchDivIdRef = document.querySelector("#wc-container-left");
    const catchBtnIdRef = document.getElementById("fitpage-btn");
    const catchPullimRef = document.getElementById("pullim-page");

    divIdRef.current = catchDivIdRef as any;
    btnIdRef.current = catchBtnIdRef as any;
    pullimRef.current = catchPullimRef as any;
    console.log(catchDivIdRef)
    setNameId(divIdRef as any)
    setBtnId(btnIdRef as any)
    setPullim(pullimRef as any)

    //클릭시 +1!
    setIsClick(isClick + 1);
};
//클릭했을 때 반응
useEffect(() => {
    if (nameId !== ''){
        if (isClick % 2) {
            btnId.current.innerText = "Close" 
            nameId.current.style.width = "75%"
            pullim.current.style.width = "100%"
        } else {
            btnId.current.innerText = "Open" 
            nameId.current.style.width = "100%"
            pullim.current.style.width = "0%"
        }
    }
    
}, [isClick]);

return (
    <>
    <div
        style={{ position: "absolute", bottom: 10, zIndex: 2, right: "3%" }}
    >
        <button
        id = "fitpage-btn"
        style={{
            width: "100px",
            height: "50px",
            background: "royalblue",
            borderRadius: "5px",
            color: "white",
        }}
        onClick={onClickHandler}
        >
        Open
        </button>
    </div>
    </>
);
}

export default Fitpage;
