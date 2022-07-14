import React, { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import Peer from "simple-peer";
const SOCKET_URL = "http://localhost:5002";

interface ClientPropsType {
  meetingNumber: string;
  isHost: string;
  userName: string;
}

function Client({ meetingNumber, isHost, userName }: ClientPropsType) {
  const [myId, setMyId] = useState("");
  const [stream, setStream] = useState<MediaStream>();
  const [socketData, setSocketData] = useState<Socket>();

  const [caller, setCaller] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callerSignal, setCallerSignal] = useState<Peer.SignalData | string>(
    ""
  );

  const myVideo = useRef() as React.LegacyRef<HTMLVideoElement> &
    React.MutableRefObject<HTMLVideoElement>;
  const userVideo = useRef() as React.LegacyRef<HTMLVideoElement> &
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
      setCallAccepted(true);
      console.log(stream);
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream,
      });
      peer.on("signal", (data) => {
        socketData.emit("answerCall", { signal: data, to: caller });
      });
      peer.on("stream", (stream) => {
        console.log(stream);
        userVideo.current.srcObject = stream;
      });
      peer.signal(callerSignal);
      connection.current = peer;
    }
  }, [caller, callerSignal, receivingCall, socketData, stream]);

  return (
    <div>
      <div style={{ width: "300px", height: "300px" }}>
        <video
          ref={myVideo}
          style={{ width: "100%", height: "100%", visibility: "hidden" }}
          playsInline
          autoPlay
          muted
        />
      </div>
      {callAccepted && (
        <div style={{ width: "300px", height: "300px" }}>
          <video
            style={{ width: "100%", height: "100%" }}
            playsInline
            ref={userVideo}
            autoPlay
            muted
          />
        </div>
      )}
    </div>
  );
}

export default Client;
