import React, { useEffect, useState } from 'react';
import {Socket, io} from 'socket.io-client';
const SOCKET_URL = "http://localhost:5002";

interface ClientPropsType {
  meetingNumber: string;
  isHost: string;
  userName: string;
}

function Client({meetingNumber, isHost, userName}: ClientPropsType) {
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
      websocket.on('checkstart2', (data) => {
        console.log('데이타요!!');
        console.log(data);
      });

      // setSocketData(websocket);
    }
  },[]);

  // useEffect(() => {
  //   if(socketData){
  //     console.log(socketData);
  //     console.log('된다');
  //     socketData.emit('checkstart', JSON.stringify({room_id: meetingNumber, isHost,  userName, time: second}));
  //   }
  // },[isHost, meetingNumber, second, userName, websocket, isClick, socketData])


  return (
    <div>Client</div>
  )
}

export default Client;