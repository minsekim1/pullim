import React, { useEffect, useRef, useState } from "react";

function Fitpage() {
//ref는 고정적으로 값을 가지고 있음
const divIdRef = useRef();
const btnIdRef = useRef();
const pullimRef = useRef();

const [isClick, setIsClick] = useState(0 as number);
const [isClickChat, setIsClickChat] = useState(false as boolean);
const [nameId, setNameId] = useState("" as any);
const [btnId, setBtnId] = useState("" as any);
const [pullim, setPullim] = useState("" as any);
const [mainVideoFrameHeight, setMainVideoFrameHeight] = useState([] as object);


//wc-footer
//zmmtg-root
//wc-container-right
// wcFooterRef.current[5]

const onClickChatHandler = () => {
    const catchCtnRightRef = document.getElementById("wc-container-right");
    if(catchCtnRightRef === null){
        setIsClickChat(true)
        console.log("오른창 존재")
        if(!(isClick % 2)){
            setIsClick(isClick + 1);
            console.log("풀림창 닫음")
        }
    }
    else{
        setIsClickChat(false)
        console.log("오른창 없음")
        console.log(isClick)
        if(!(isClick % 2)){
            setIsClick(isClick + 1);
            console.log("풀림창 닫음")
        }
    }
    console.log(catchCtnRightRef)
    console.log(isClickChat)
}

const onClickHandler = () => {
    //풀림페이지 생성
    const catchDivIdRef = document.querySelector("#wc-container-left");
    const catchBtnIdRef = document.getElementById("fitpage-btn");
    const catchPullimRef = document.getElementById("pullim-page");

    divIdRef.current = catchDivIdRef as any;
    btnIdRef.current = catchBtnIdRef as any;
    pullimRef.current = catchPullimRef as any;
    // mainVideoFrame1.style.width = "100%"

    setNameId(divIdRef as any)
    setBtnId(btnIdRef as any)
    setPullim(pullimRef as any)

    setIsClick(isClick + 1);//클릭시 +1!
};

//로딩시
useEffect(()=> {
    const catchWcFooterRef = document.querySelectorAll(".footer-button__button");
    const catchMainVideoFrameHeightRef = document.querySelectorAll(".meeting-app");
    console.log(catchMainVideoFrameHeightRef[0])

    const catchMainVideoFrameHeight = catchMainVideoFrameHeightRef[0] as any;
    setMainVideoFrameHeight(catchMainVideoFrameHeight.style.height)
    console.log(mainVideoFrameHeight)
    //meeting-app
    catchWcFooterRef[2].addEventListener('click', onClickChatHandler)
}, [])

//클릭했을 때 반응
useEffect(() => {
    const catchCtnRightRef = document.getElementById("wc-container-right");
    const catchMainVideoFrameRef = document.querySelectorAll(".single-main-container__video-frame");

    const catchMainVideoFrame = catchMainVideoFrameRef[0] as any;
    console.log(catchMainVideoFrame)
    console.log(mainVideoFrameHeight)

    if (catchCtnRightRef !== null){
        setIsClickChat(true) //오른창 존재
    } else {
        setIsClickChat(false) //오른창 없음
    }
    if (nameId !== ''){
        if (!(isClick % 2) && isClickChat) { //오른창 존재
            btnId.current.innerText = "Close" 
            pullim.current.style.width = "400px"
            console.log(1 + "오른창")
        } 
        else if (isClick % 2 && !isClickChat){ //풀림창 존재
            btnId.current.innerText = "Open"
            nameId.current.style.width = "100%"
            catchMainVideoFrame.style.height = "100%"
            pullim.current.style.width = "0%"
            console.log(2 + "풀림창")
        }
        else if (isClick % 2 && isClickChat){ //오른창, 풀림창 존재
            btnId.current.innerText = "Open" 
            nameId.current.style.width = "calc( 100% - 400px )"
            console.log(nameId.current.style.width)
            const str = "calc( " + mainVideoFrameHeight + " - 225px )"
            catchMainVideoFrame.style.height = str
            pullim.current.style.width = "0%"
            console.log(3 + "오른창, 풀림창")
        }
        else if (!isClickChat && !(isClick % 2)){ //존재하지 않음
            btnId.current.innerText = "Close" 
            nameId.current.style.width = "calc( 100% - 400px )"
            const str = "calc( " + mainVideoFrameHeight + " - 225px )"
            catchMainVideoFrame.style.height = str
            pullim.current.style.width = "400px"
            console.log(4 + "존재하지 않음")
        }
        else {
            console.log(5 + "예외사항")
        }
        console.log(typeof(catchMainVideoFrame.style.height))
    }
}, [isClick]);

return (
    <>
    <div
        style={{ position: "absolute", bottom: 10, zIndex: 3, right: "3%" }}
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
