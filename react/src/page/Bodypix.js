import React, { useState } from "react";
import { BodyPixReactView } from "body-pix-react-render";
//import 'body-pix-react-render/dist/index.css';

const default_option = {
  algorithm: "person",
  estimate: "segmentation",
  camera: null,
  flipHorizontal: true,
  maskType: "room",
  input: {
    architecture: "MobileNetV1",
    outputStride: 16,
    internalResolution: "medium",
    multiplier: 0.5,
    quantBytes: 2,
  },
  multiPersonDecoding: {
    maxDetections: 5,
    scoreThreshold: 0.3,
    nmsRadius: 20,
    numKeypointForMatching: 17,
    refineSteps: 10,
  },
  segmentation: {
    segmentationThreshold: 0.7,
    effect: "mask",
    maskBackground: true,
    opacity: 0.98,
    backgroundBlurAmount: 3,
    maskBlurAmount: 0,
    edgeBlurAmount: 3,
  },
  showFps: false,
  customStream: null,
};

export const BodyPixView = () => {
  const [visible, setVisible] = useState(false);
  const [start, setStart] = useState(false);

  const options = {
    //your custom options
    showFps: false,
    mediaOptions: {
      audio: false,
    },
  };

  const onEvent = (event) => {
    if (event.event === "READY") {
      let video = document.getElementById("remoteDisplay");
      if (video !== null) {
        video.srcObject = event.stream;
        video.play();
      }
    }
  };
  console.log("asd");

  //#region WebRTC
  //     //#region WebRTC useEffect
  //   const socketRef = useRef<SocketIOClient.Socket>(null);
  //   const pcRef = useRef<RTCPeerConnection>(null);
  //   const localVideoRef = useRef<HTMLVideoElement>(null);
  //   const remoteVideoRef = useRef<HTMLVideoElement>(null);

  //   const setVideoTracks = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //         audio: true,
  //       });
  //       if (localVideoRef.current) localVideoRef.current.srcObject = stream;
  //       if (!(pcRef.current && socketRef.current)) return;
  //       stream.getTracks().forEach((track) => {
  //         if (!pcRef.current) return;
  //         pcRef.current.addTrack(track, stream);
  //       });
  //       pcRef.current.onicecandidate = (e) => {
  //         if (e.candidate) {
  //           if (!socketRef.current) return;
  //           console.log("onicecandidate");
  //           socketRef.current.emit("candidate", e.candidate);
  //         }
  //       };
  //       pcRef.current.oniceconnectionstatechange = (e) => {
  //         console.log(e);
  //       };
  //       pcRef.current.ontrack = (ev) => {
  //         console.log("add remotetrack success");
  //         if (remoteVideoRef.current) {
  //           remoteVideoRef.current.srcObject = ev.streams[0];
  //         }
  //       };
  //       socketRef.current.emit("join_room", {
  //         room: "1234",
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   const createOffer = async () => {
  //     console.log("create offer");
  //     if (!(pcRef.current && socketRef.current)) return;
  //     try {
  //       const sdp = await pcRef.current.createOffer({
  //         offerToReceiveAudio: true,
  //         offerToReceiveVideo: true,
  //       });
  //       await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
  //       socketRef.current.emit("offer", sdp);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   const createAnswer = async (sdp) => {
  //     if (!(pcRef.current && socketRef.current)) return;
  //     try {
  //       await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
  //       console.log("answer set remote description success");
  //       const mySdp = await pcRef.current.createAnswer({
  //         offerToReceiveVideo: true,
  //         offerToReceiveAudio: true,
  //       });
  //       console.log("create answer");
  //       await pcRef.current.setLocalDescription(new RTCSessionDescription(mySdp));
  //       socketRef.current.emit("answer", mySdp);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

//   useEffect(() => {
    // socketRef.current = io.connect(SOCKET_SERVER_URL);
    // pcRef.current = new RTCPeerConnection(pc_config);
    //   socketRef.current.on("all_users", (allUsers) => {
    //     //Array<{ id: string }>
    //     if (allUsers.length > 0) {
    //       createOffer();
    //     }
    //   });
    // socketRef.current.on("getOffer", (sdp) => {
    //   //console.log(sdp);
    //   console.log("get offer");
    //   createAnswer(sdp);
    // });
    // socketRef.current.on("getAnswer", (sdp) => {
    //   console.log("get answer");
    //   if (!pcRef.current) return;
    //   pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
    //   //console.log(sdp);
    // });
    // socketRef.current.on("getCandidate", async (candidate) => {
    //   if (!pcRef.current) return;
    //   await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    //   console.log("candidate add success");
    // });
    // setVideoTracks();
    // return () => {
    //   if (socketRef.current) {
    //     socketRef.current.disconnect();
    //   }
    //   if (pcRef.current) {
    //     pcRef.current.close();
    //   }
    // };
//   }, []);
  //#endregion

  //#endregion
  return (
    <div>
      <button
        style={{ marginLeft: "100px" }}
        onClick={() => {
          setStart(!start);
        }}
        disabled={start ? true : false}
      >
        Start
      </button>
      <button
        style={{ marginLeft: "100px", marginBottom: "100px" }}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "Hide View" : "Show View"}
      </button>
      <br /> <br />
      <BodyPixReactView options={options} visible={visible} start={start} onEvent={onEvent} />
      <br />
      <div style={{ zIndex: 99999 }}>
        asd
        {/* <video id="remoteDisplay" width="480px" height="360px" style={{ border: "1px solid #000" }} /> */}
        {/* <video
          style={{
            width: 240,
            height: 240,
            margin: 5,
            backgroundColor: "black",
          }}
          muted
          ref={localVideoRef}
          autoPlay
        />
        <video
          id="remotevideo"
          style={{
            width: 240,
            height: 240,
            margin: 5,
            backgroundColor: "black",
          }}
          ref={remoteVideoRef}
          autoPlay
        /> */}
      </div>
    </div>
  );
};
