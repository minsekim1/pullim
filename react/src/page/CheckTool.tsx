import React, { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import VirtualPhoto from "../components/VirtualPhoto";
import Peer from "simple-peer";

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
  meetingNumber,
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
  const [socketData, setSocketData] = useState<Socket>();

  const [stream, setStream] = useState<MediaStream>();
  const [myId, setMyId] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);

  const [caller, setCaller] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState<Peer.SignalData | string>(
    ""
  );
  const [isLoading, setLoading] = useState(false);

  const myVideo = useRef() as React.LegacyRef<HTMLVideoElement> &
    React.MutableRefObject<HTMLVideoElement>;
  const userVideo = useRef() as React.LegacyRef<HTMLVideoElement> &
    React.MutableRefObject<HTMLVideoElement>;
  const connection = useRef<Peer.Instance>();

  let websocket: Socket | undefined = undefined;
  useEffect(() => {
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: false })
    //   .then((stream) => {
    //     setStream(stream);
    //     console.log(stream);
    //     myVideo.current.srcObject = stream;
    //   });
    if (websocket === undefined) {
      websocket = io(SOCKET_URL, {
        path: "/socket.io", // 서버 path와 일치시켜준다
        transports: ["websocket"],
      });
      console.log(SOCKET_URL);
      console.log(websocket);

      websocket.on("connect", () => {
        console.info("connect!");
        if (websocket !== undefined)
          websocket.emit(
            "join",
            JSON.stringify({ room_id: meetingNumber, isHost, userName })
          );
      });

      websocket.on("getid", (id) => {
        setMyId(id);
      });

      websocket.on("disconnect", () => console.info("disconnect!"));
      setSocketData(websocket);
    }
  }, []);
  useEffect(() => {
    if (socketData && myId !== "") {
      const peer = new Peer({
        initiator: true,
        trickle: false,
      });

      peer.on("signal", (data) => {
        socketData.emit("caller", {
          room_id: meetingNumber,
          signalData: data,
          from: myId,
        });
      });
      peer.on("stream", (stream) => {
        console.log(stream);
        userVideo.current.srcObject = stream;
      });
      socketData.on("acceptcall", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });
      connection.current = peer;
    }
  }, [meetingNumber, myId, socketData]);

  function handleVideoLoad(event: SyntheticEvent) {
    const video = event.target as HTMLVideoElement
    setSourcePlayback({
      htmlElement: video,
      width: video.videoWidth,
      height: video.videoHeight,
    })
    setLoading(false)
    console.log(video);
  }

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
        <button onClick={clickCheck}>캡처하기</button>
        <button>비디오</button>
        {/* <div style={{ width: "300px", height: "300px", visibility: "hidden" }}>
          <video
            ref={myVideo}
            style={{ width: "100%", height: "100%" }}
            playsInline
            autoPlay
            muted
          />
        </div> */}
        {callAccepted && (
          <div style={{ width: "300px", height: "300px" }}>
            {isLoading && <progress></progress>}
            <video
              style={{ width: "100%", height: "100%", visibility: "hidden", position: "absolute" }}
              playsInline
              ref={userVideo}
              autoPlay
              muted
              onLoadedData={handleVideoLoad}
            />
          </div>
        )}
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
          />
        )}
      </div>
    </>
  );
}

export default CheckTool;
