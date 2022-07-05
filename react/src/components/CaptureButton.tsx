import React, { useEffect, useRef, useState } from "react";
import { useScreenshot } from "use-screenshot-hook";
import { UseScreenshotProps } from "use-screenshot-hook/dist/types";
import { photoType } from "../types/photoType";


function CaptureButton({ setPhotoList, photoList }: any) {
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
  
  //캡처 이미지 저장하는 함수
  const setImage = async(image: string) =>{
    const now = new Date();
    const fileName = `photo_${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.png`;

    await fetch(image)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], fileName,{ type: "image/png" });
        const obj:photoType = {
          image: image,
          name: fileName,
          file: file
        }
        setPhotoList([obj, ...photoList]);
      });
  }

  //클릭했을 때 반응
  useEffect(() => {
    if (isClick) {
      takeScreenshot();
      setIsClick(false);
    }
  }, [isClick]);

  useEffect(() => {
    if (image) {
      setImage(image);
    }
  }, [image]);

  return (
    <>
      <button
        id="screenshot_btn"
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
        화면캡처
      </button>
    </>
  );
}

export default CaptureButton;
