import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import Client from "./Client";
import Trainer from "./Trainer";
const SOCKET_URL = "http://localhost:5001";

interface ZoomViewPropsType {
  isHost: string;
  meetingNumber: string;
  userName: string;
}

function ZoomView({
  isHost,
  meetingNumber,
  userName,
}: ZoomViewPropsType) {
  const [socketData, setSocketData] = useState<Socket>();
  const [myId, setMyId] = useState("");
  const [click, setClick] = useState(false);
  let websocket: Socket | undefined = undefined;

  useEffect(() => {
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
      setSocketData(websocket);
    }
    return () => {
      if(websocket){
        console.log('닫힘!');
        websocket.disconnect();
        websocket = undefined;
      }
    }
  }, []);

  return (
    <>
      { socketData &&
        (isHost === "1" ? (
          <Trainer
            meetingNumber={meetingNumber}
            socketData={socketData}
            myId={myId}
          />
        ) : (
          <>
            {click && <Client socketData={socketData}/>}
            <button style={{position: "absolute", top: 0, zIndex: "99"}} onClick={() => setClick((prev) => !prev)}>버튼</button>
          </>
        ))}
    </>
  );
}

export default ZoomView;
