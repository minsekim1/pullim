import React, { useEffect, useRef, useState } from "react";
import { useScreenshot } from "use-screenshot-hook";
import { UseScreenshotProps } from "use-screenshot-hook/dist/types";
import axios from "axios";

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

  const savePhoto = async() => {
    let formData = new FormData();
    photoList.forEach((photo: string, i: number) => {
      const data = new Blob([photo], {type: 'image/png'});
      formData.append("photos", data, "photo" + i);
    })
    const response = await axios.post('/photo', formData).then((res) =>res.data);
    if(response.success){
      alert('저장 완료!');
    }
  }

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
        <button style={{
          width: "100px",
          height: "50px",
          background: "red",
          borderRadius: "5px",
          color: "white",
        }} onClick={savePhoto}>
          사진저장
        </button>
      </div>
    </>
  );
}

export default Capture;
