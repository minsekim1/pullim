import React, { useEffect, useRef, useState } from "react";

function Fitpage() {
//ref는 고정적으로 값을 가지고 있음
const vedioRef = useRef();
const [isClick, setIsClick] = useState(0 as number);
const [nameId, setNameId] = useState("" as any);

const onClickHandler = () => {
    //비디오 켰을 때 캡쳐 가능
    const catchIdRef = document.querySelector("#wc-container-left");
    vedioRef.current = catchIdRef as any;
    console.log(catchIdRef)
    setNameId(vedioRef as any)
    // nameId.style.id = "100%"

    //클릭 완료!
    setIsClick(isClick + 1);
};
//클릭했을 때 반응
useEffect(() => {
    if (nameId !== ''){
        if (isClick % 2) {
            nameId.current.style.width = "75%"
        } else {
            nameId.current.style.width = "100%"
        }
    }
    
}, [isClick]);

return (
    <>
    <div
        style={{ position: "absolute", bottom: 10, zIndex: 1, right: "3%" }}
    >
        <button
        style={{
            width: "100px",
            height: "50px",
            background: "royalblue",
            borderRadius: "5px",
            color: "white",
        }}
        onClick={onClickHandler}
        >
        Plus Page
        </button>
    </div>
    </>
);
}

export default Fitpage;
