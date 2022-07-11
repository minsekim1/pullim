import React, { useCallback, useEffect, useState } from "react";
import {Socket, io} from 'socket.io-client';
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
const SOCKET_URL = "http://localhost:5002";

interface CheckToolPropsType {
  checkedPhotoList: PhotoType[];
  setCheckedPhotoList: Function;
  isHost: string;
  userName: string;
  meetingNumber: string;
}

function CheckTool({
  checkedPhotoList,
  setCheckedPhotoList,
  isHost,
  userName,
  meetingNumber
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
  const [second, setSecond] = useState<string>('');

  const changeSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecond(e.target.value);
  }
  
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

  let websocket: Socket | undefined = undefined;
  const [socketData, setSocketData] = useState<Socket>();
  useEffect(() => {
    if (websocket === undefined) {
      websocket = io(SOCKET_URL, {
        path: "/socket.io", // 서버 path와 일치시켜준다
        transports: ["websocket"],
      });

      websocket.on("connect", () => {
        console.info("connect!");
        if (websocket !== undefined) websocket.emit("join", JSON.stringify({room_id: meetingNumber, isHost,  userName}));
      });
      websocket.on("disconnect", () => console.info("disconnect!"));
      setSocketData(websocket);
    }
  },[]);

  useEffect(() => {
    if(isClick && socketData){
      console.log(socketData);
      console.log('된다');
      socketData.emit('checkstart', JSON.stringify({room_id: meetingNumber, isHost,  userName, time: second}));
    }
  },[isHost, meetingNumber, second, userName, websocket, isClick, socketData])


  useEffect(() =>{
    if(isClick){
      setTimeout(() =>{
        createImage();
        console.log('useEffect1');
      },Number(second) * 1000);
    }
  },[isClick, second]);

  useEffect(() => {
    if(isClick && sourcePlayback){
      setTimeout(() =>{
        const image = bringImage();
        setImage(image);
        console.log('useEffect2');
        setIsClick(false);
      },Number(second) * 1000 + 1000);
    }
  },[sourcePlayback, isClick, setImage, second]);
    

  const clickCheck = () => {
    if(second === ''){
      return alert('숫자를 입력해주세요!');
    }
    if(Number(second)<1){
      return alert('숫자는 1이상으로 입력해주세요!');
    }
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
        <input type="number" placeholder="예) 5" onChange={changeSecond} value={second}/>
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
