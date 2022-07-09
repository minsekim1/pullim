import React, { useEffect, useState } from "react";
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
import useCapture from "../hook/useCapture";
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

  const createImage = (iamge: string) => {
    const imageEl = document.createElement("img");
    imageEl.src = iamge;
    setSourcePlayback({
      htmlElement: imageEl,
      width: 400,
      height: 250,
    });
  };

  const {clickCapture, image} = useCapture(setCheckedPhotoList, checkedPhotoList, {eltype: "className", elname: "single-main-container__canvas"});
  
  useEffect(() =>{
    if(image){
      createImage(image);
    }
  },[image])

  const clickCheck = () => {
    clickCapture();
  };
  return (
    <>
      <h4 style={{ color: "black" }}>검사툴</h4>
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
      <label>타이머</label>
      <input type="text" placeholder="5초" />
      <button onClick={clickCheck}>검사하기</button>
      {sourcePlayback && tflite && bodyPix && (
        <VirtualPhoto
          sourcePlayback={sourcePlayback}
          backgroundConfig={backgroundConfig}
          segmentationConfig={segmentationConfig}
          postProcessingConfig={postProcessingConfig}
          bodyPix={bodyPix}
          tflite={tflite}
        />
      )}
    </>
  );
}

export default CheckTool;
