import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import Peer from "simple-peer";
import { SourcePlayback } from "../core/helpers/sourceHelper";
import { BackgroundConfig, backgroundImageUrls } from "../core/helpers/backgroundHelper";
import { SegmentationConfig } from "../core/helpers/segmentationHelper";
import { PostProcessingConfig } from "../core/helpers/postProcessingHelper";
import useBodyPix from "../core/hooks/useBodyPix";
import useTFLite from "../core/hooks/useTFLite";
import VirtualPhoto from "../components/VirtualPhoto";
const SOCKET_URL = "3.36.135.151:5002/";

interface ClientPropsType {
  meetingNumber: string;
  isHost: string;
  userName: string;
}

function Client({ meetingNumber, isHost, userName }: ClientPropsType) {

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

  const [myId, setMyId] = useState("");
  const [stream, setStream] = useState<MediaStream>();
  const [socketData, setSocketData] = useState<Socket>();

  const [caller, setCaller] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState<Peer.SignalData | string>(
    ""
  );
  const [isLoading, setLoading] = useState(false);
  const myVideo = useRef() as React.LegacyRef<HTMLVideoElement> &
    React.MutableRefObject<HTMLVideoElement>;
  const connection = useRef<Peer.Instance>();

  let websocket: Socket | undefined = undefined;

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        console.log(stream);
        myVideo.current.srcObject = stream;
      });
    if (websocket === undefined) {
      websocket = io(SOCKET_URL, {
        path: "/socket.io", // 서버 path와 일치시켜준다
        transports: ["websocket"],
      });

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

      websocket.on("caller", (data) => {
        setReceivingCall(true);
        setCaller(data.from);
        setCallerSignal(data.signal);
        console.log(data);
      });
      setSocketData(websocket);
    }
  }, []);

  useEffect(() => {
    if (receivingCall && caller && callerSignal && socketData) {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream,
      });
      peer.on("signal", (data) => {
        socketData.emit("answerCall", { signal: data, to: caller });
      });
      peer.signal(callerSignal);
      connection.current = peer;
    }
  }, [caller, callerSignal, receivingCall, socketData, stream]);

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


  return (
    <div>
      <div style={{ width: "100%", height: "100%"}}>
        {isLoading && <progress></progress>}
        <video
          ref={myVideo}
          style={{ width: "100%", height: "100%", visibility: "hidden", position: "absolute"}}
          playsInline
          autoPlay
          muted
          onLoadedData={handleVideoLoad}
        />
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
  );
}

export default Client;
