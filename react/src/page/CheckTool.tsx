import React, { useCallback, useEffect, useState } from "react";
import VirtualPhoto from "../components/VirtualPhoto";
import {
  BackgroundConfig,
  backgroundImageUrls,
} from "../core/helpers/backgroundHelper";
import { PostProcessingConfig } from "../core/helpers/postProcessingHelper";
import { SegmentationConfig } from "../core/helpers/segmentationHelper";
import { SourcePlayback } from "../core/helpers/sourceHelper";
import useBodyPix from "../core/hooks/useBodyPix";
import useTFLite from "../core/hooks/useTFLite";
import { PhotoType } from "../types/PrescriptionType";

interface CheckToolPropsType {
  checkedPhotoList: PhotoType[];
  setCheckedPhotoList: Function;
}

function CheckTool({
  checkedPhotoList,
  setCheckedPhotoList,
}: CheckToolPropsType) {
  const [sourcePlayback, setSourcePlayback] = useState<SourcePlayback>();
  const [backgroundConfig, setBackgroundConfig] = useState<BackgroundConfig>({
    type: "image",
    url: backgroundImageUrls[0],
  });
  const [segmentationConfig, setSegmentationConfig] =
    useState<SegmentationConfig>({
      model: "meet",
      backend: "wasm",
      inputResolution: "160x96",
      pipeline: "webgl2",
    });
  const [postProcessingConfig, setPostProcessingConfig] =
    useState<PostProcessingConfig>({
      smoothSegmentationMask: true,
      jointBilateralFilter: { sigmaSpace: 1, sigmaColor: 0.1 },
      coverage: [0.5, 0.75],
      lightWrapping: 0.3,
      blendMode: "screen",
    });
  const bodyPix = useBodyPix();
  const { tflite, isSIMDSupported } = useTFLite(segmentationConfig);
  const [isClick, setIsClick] = useState<Boolean>(false);
  
  const createImage = () => {
    const zoomCanvas = document.querySelector('.single-main-container__canvas') as HTMLCanvasElement;
    const imageBase64 = zoomCanvas.toDataURL("image/png");
    const imageEl = document.createElement("img");
    imageEl.src = imageBase64;
    setSourcePlayback({
      htmlElement: imageEl,
      width: 400,
      height: 250,
    });
    setIsClick(false);
  };

  const bringImage = () => {
    const canvas = document.querySelector("#grid-bg-photo") as HTMLCanvasElement;
    const img = canvas.toDataURL("image/png");
    return img;
  };

  const setImage = useCallback(async (image: string | undefined) => {
      if (!image) {
        return;
      }

      const now = new Date();
      const fileName = `checked_photo_${now.getFullYear()}${
        now.getMonth() + 1
      }${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.png`;

      await fetch(image)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], fileName, { type: "image/png" });
          const obj: PhotoType = {
            image: image,
            name: fileName,
            file: file,
          };
          setCheckedPhotoList([obj, ...checkedPhotoList]);
        });
    },[checkedPhotoList, setCheckedPhotoList]);

  useEffect(() =>{
    if(isClick){
      createImage();
      console.log('useEffect1');
    }
  },[isClick]);

  useEffect(() => {
    if(isClick && sourcePlayback){
      const image = bringImage();
      setImage(image);
      console.log('useEffect2');
    }
  },[sourcePlayback, isClick, setImage]);
    

  const clickCheck = () => {
    setIsClick(true);
  };
  return (
    <>
      <h4 style={{ color: "black" }}>검사툴</h4>
      <div
        style={{
          width: "90%",
          padding: "10px",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
        }}
      >

        <label>타이머</label>
        <input type="text" placeholder="5초" />
        <button onClick={clickCheck}>검사하기</button>
        <div id="image-container">
        {checkedPhotoList.length !== 0 &&
          checkedPhotoList.map((checkedPhoto, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                height: "250px",
                marginBottom: "10px",
                position: "relative",
              }}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={checkedPhoto.image}
                alt={`그리드배경이 들어간 사진 ${i}`}
              />
            </div>
          ))}
      </div>
        {sourcePlayback && tflite && bodyPix && (
          <VirtualPhoto
            sourcePlayback={sourcePlayback}
            backgroundConfig={backgroundConfig}
            segmentationConfig={segmentationConfig}
            postProcessingConfig={postProcessingConfig}
            bodyPix={bodyPix}
            tflite={tflite}
            setCheckedPhotoList={setCheckedPhotoList}
            checkedPhotoList={checkedPhotoList}
            isClick={isClick}
            setIsClick={setIsClick}
          />
        )}
      </div>
    </>
  );
}

export default CheckTool;
