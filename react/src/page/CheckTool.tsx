import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
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

interface CheckToolPropsType {
  meetingNumber: string;
  socketData: Socket;
  myId: string;
}

function CheckTool({
  meetingNumber,
  socketData,
  myId
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

  // const [socketData, setSocketData] = useState<Socket>();

  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef() as React.LegacyRef<HTMLVideoElement> &
    React.MutableRefObject<HTMLVideoElement>;
  const connection = useRef<Peer.Instance>();

  useEffect(() => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
    });
    if (socketData && myId !== "") {
      console.log('peer 몇번?');

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
        setCallAccepted(true);
        peer.signal(signal);
      });

      peer.on("stream", (stream) => {
        console.log(stream);
        userVideo.current.srcObject = stream;
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
    console.log(video);
  }

  return (
      <div
        style={{
          zIndex: "99",
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          background: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {callAccepted && (
          <video
            style={{ width: "0%", height: "0%" }}
            playsInline
            ref={userVideo}
            autoPlay
            muted
            onLoadedData={handleVideoLoad}
          />
        )}
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

export default CheckTool;
