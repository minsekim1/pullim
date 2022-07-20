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
// const SOCKET_URL = "https://pul-lim.com/server";
// const SOCKET_URL = "http://localhost:5001";

interface ClientPropsType {
  socketData: Socket
}

function Client({ socketData }: ClientPropsType) {

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

  const [stream, setStream] = useState<MediaStream>();

  const [caller, setCaller] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState<Peer.SignalData | string>(
    ""
  );
  const myVideo = useRef() as React.LegacyRef<HTMLVideoElement> &
    React.MutableRefObject<HTMLVideoElement>;
  const connection = useRef<Peer.Instance>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        console.log(stream);
        myVideo.current.srcObject = stream;
      });

      socketData.on("caller", (data) => {
        setReceivingCall(true);
        setCaller(data.from);
        setCallerSignal(data.signal);
        console.log(data);
      });
  },[]);

  useEffect(() => {
    if (receivingCall && caller!=='' && callerSignal!=='' && socketData) {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream,
      });
      
      peer.on("signal", (data) => {
        console.log(peer);
        socketData.emit("answerCall", { signal: data, to: caller });
      });
      
      peer.signal(callerSignal);

      // socketData.on('peer_close', () => {
      //   console.log('peer 폭발');
      //   if(connection.current){
      //     connection.current.destroy();
      //     setReceivingCall(true);
      //     setCaller('');
      //     setCallerSignal('');
      //   }
      // })
      
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
    console.log(video);
  }


  return (
    <div style={{
      width: "400px",
      position: "absolute",
      top: 0,
      zIndex: 1,
      right: 0,
    }}>
      <div style={{ width: "100%", height: "100%"}}>
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
