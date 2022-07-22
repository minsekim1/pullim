import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { Socket } from "socket.io-client";
import ButtonGroup from "../components/ButtonGroup";
import { SourcePlayback } from "../core/helpers/sourceHelper";
import { PhotoType } from "../types/PrescriptionType";
import CaptureList from "./CaptureList";
import CheckTool from "./CheckTool";
import DiagnosticHistory from "./DiagnosticHistory";
import RecordAndPrescription from "./RecordAndPrescription";

import {
  BackgroundConfig,
  backgroundImageUrls,
} from "../core/helpers/backgroundHelper";
import { PostProcessingConfig } from "../core/helpers/postProcessingHelper";
import { SegmentationConfig } from "../core/helpers/segmentationHelper";
import useBodyPix from "../core/hooks/useBodyPix";
import useTFLite from "../core/hooks/useTFLite";

interface TrainerPropsType {
  socketData: Socket;
  myId: string;
  meetingNumber: string;
}

function Trainer({ socketData, myId, meetingNumber }: TrainerPropsType) {
  const [memo, setMemo] = useState<string>("");
  const [photoList, setPhotoList] = useState<PhotoType[]>([]);
  const [uploadedPhotoList, setUploadedPhotoList] = useState<PhotoType[]>([]);
  const [videoList, setVideoList] = useState<PhotoType[]>([]);
  const [isCheckTool, setCheckTool] = useState(false);
  const [end, setEnd] = useState(false);

  const [isModal, setIsModal] = useState(false);
  const [src, setSrc] = useState("");
  const [currentPage, setCurrentPage] = useState("");

  const [sourcePlayback, setSourcePlayback] = useState<SourcePlayback|null>();
  const [callAccepted, setCallAccepted] = useState(false);

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


  const userVideo = useRef() as React.LegacyRef<HTMLVideoElement> &
    React.MutableRefObject<HTMLVideoElement>;
  
  useEffect(() => {
    socketData.on('hello', () =>{
      if (socketData && myId !== "") {
        const peer = new Peer({
          initiator: true,
          trickle: false,
        });
        peer.on("signal", (data) => {
          console.log(data);
          socketData.emit("caller", {
            room_id: meetingNumber,
            signalData: data,
            from: myId,
          });
        });
        socketData.on("acceptcall", (signal) => {
          console.log('신호를 보내');
          peer.signal(signal);
          // connection.current = peer;
          setCallAccepted(true);
        });
  
        peer.on("stream", (stream) => {
          console.log(stream);
          userVideo.current.srcObject = stream;
        });
      }
    })
    
  }, [meetingNumber, myId, socketData]);

  useEffect(() => {
    console.log(isCheckTool);
    if(isCheckTool){
      socketData.emit('startcheck', {
        room_id: meetingNumber,
        from: myId,
      });
      socketData.on('startok', () => {
        const video = userVideo.current;
        setSourcePlayback({
          htmlElement: video,
          width: video.videoWidth,
          height: video.videoHeight,
        });
      });
    }
    if(end){
      socketData.emit('endcheck', {
        room_id: meetingNumber,
        from: myId,
      });
      setSourcePlayback(null);
      setEnd(false);
    }
  },[isCheckTool, meetingNumber, myId, socketData, end]);

  const endCheck = () => {
    setCheckTool(false);
    setEnd(true);
  }

  return (
    <>
      {callAccepted && (
        <video
          style={{ width: "400px", height: "400px" }}
          playsInline
          ref={userVideo}
          autoPlay
          muted
        />
        )}
      <div
        id="pullim-page"
        style={{
          width: "400px",
          position: "absolute",
          top: 0,
          zIndex: 100,
          right: 0,
          display: "none",
          height: "100vh",
          backgroundColor: "rgba(255,255,255)",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "1% 0 0 1%",
          overflow: "hidden",
        }}
      >
        {currentPage === "CaptureList" && (
          <CaptureList
            photoList={photoList}
            setPhotoList={setPhotoList}
            setIsModal={setIsModal}
            setSrc={setSrc}
          />
        )}
        {currentPage === "RecordAndPrescription" && (
          <RecordAndPrescription
            photoList={photoList}
            uploadedPhotoList={uploadedPhotoList}
            setUploadedPhotoList={setUploadedPhotoList}
            videoList={videoList}
            setVideoList={setVideoList}
            memo={memo}
            setMemo={setMemo}
          />
        )}
        {currentPage === "DiagnosticHistory" && <DiagnosticHistory />}
      </div>
      {isCheckTool && sourcePlayback && bodyPix && tflite && (
        <CheckTool
        sourcePlayback={sourcePlayback}
        backgroundConfig={backgroundConfig}
        segmentationConfig={segmentationConfig}
        postProcessingConfig={postProcessingConfig}
        bodyPix={bodyPix}
        tflite={tflite}
        endCheck={endCheck}
        />
      )}
      <ButtonGroup
        setPhotoList={setPhotoList}
        photoList={photoList}
        setCurrentPage={setCurrentPage}
        setCheckTool={setCheckTool}
        callAccepted={callAccepted}
      />
      {isModal && (
        <div
          style={{
            zIndex: 1,
            position: "absolute",
            width: "1100px",
            top: "10%",
            left: "10%",
            border: "2.5px solid orange",
          }}
        >
          <img
            style={{ width: "100%" }}
            onClick={() => {
              setIsModal(false);
            }}
            src={src}
            alt="큰 이미지"
          />
        </div>
      )}
    </>
  );
}

export default Trainer;
