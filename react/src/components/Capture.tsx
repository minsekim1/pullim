import React, { useEffect, useRef, useState } from "react";
import { useScreenshot } from "use-screenshot-hook";
import { UseScreenshotProps } from "use-screenshot-hook/dist/types";

function Capture({ setPhotoList, photoList }: any) {
  //ref는 고정적으로 값을 가지고 있음
  const vedioRef = useRef();
  const [isClick, setIsClick] = useState(false as any);
  const { image, takeScreenshot } = useScreenshot({
    ref: vedioRef,
  } as UseScreenshotProps);

  const onClickHandler = () => {
    //비디오 켰을 때 캡쳐 가능
    const canvasRef = document.querySelector(".single-main-container__canvas");
    vedioRef.current = canvasRef as any;

    //클릭 완료!
    setIsClick(true);
  };
  //클릭했을 때 반응
  useEffect(() => {
    if (isClick) {
      takeScreenshot();
      setIsClick(false);
    }
  }, [isClick]);

  useEffect(() => {
    console.log(image);
    if (image) {
      setPhotoList([image, ...photoList]);
    }
  }, [image]);

  return (
    <>
      <div
        style={{ position: "absolute", bottom: 10, zIndex: 1, right: "15%" }}
      >
        <button
          id = "screenshot_btn"
          style={{
            width: "100px",
            height: "50px",
            background: "royalblue",
            borderRadius: "5px",
            color: "white",
          }}
          onClick={onClickHandler}
        >
          Screenshot
        </button>
      </div>
      {/* {
        image && 
        <div style={{position: "absolute", top: "50%", left: "50%", width: "200px", height: "200px", border: "1px solid white", zIndex: 1}}>
          <img style={{width: "100%", height: "100%"}} src={image} alt="asa"/>
        </div>
      } */}
    </>
  );
}

export default Capture;
