import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { useScreenshot } from "use-screenshot-hook";
import { UseScreenshotProps } from "use-screenshot-hook/dist/types";
import { PhotoType } from "../types/PrescriptionType";

interface ElObjectType {
    eltype: "className" | "id";
    elname: string 
}

function useCapture(setPhotoList: Function, photoList: PhotoType[], elObject: ElObjectType) {
  //ref는 고정적으로 값을 가지고 있음
  const vedioRef = useRef();
  const [isClick, setIsClick] = useState(false as any);
  const { image, takeScreenshot } = useScreenshot({
    ref: vedioRef,
  } as UseScreenshotProps);

  const clickCapture = () => {
    //비디오 켰을 때 캡쳐 가능
    let tempRef;
    if(elObject.eltype==="className"){
        tempRef = document.querySelector(`.${elObject.elname}`);
    }else if(elObject.eltype==="id") {
        tempRef = document.querySelector(`#${elObject.elname}`);
    }
    const canvasRef = tempRef
    vedioRef.current = canvasRef as any;
    console.log(1);
    //클릭 완료!
    setIsClick(true);
  };
  
  //캡처 이미지 저장하는 함수
  const setImage = useCallback(async(image: string) =>{
    const now = new Date();
    const fileName = `photo_${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.png`;

    await fetch(image)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], fileName,{ type: "image/png" });
        const obj:PhotoType = {
          image: image,
          name: fileName,
          file: file
        }
        setPhotoList([obj, ...photoList]);
      });
  },[photoList, setPhotoList])

  //클릭했을 때 반응
  useEffect(() => {
    if (isClick) {
      takeScreenshot();
      console.log(2);
    }
  }, [isClick, takeScreenshot]);

  //클릭 후 이미지 저장 반응  
  useEffect(() => {
    if (isClick && image) {
      setImage(image);
      setIsClick(false);
      console.log(3);
    }
  }, [isClick, image, setImage]);

  return {clickCapture, image};
}

export default useCapture;
