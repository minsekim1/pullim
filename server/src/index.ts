import express from "express";
import fs from "fs";
import http from "http";
import { Server as ServerIO, Socket } from "socket.io";
import cors from 'cors';
import photoRouter from "./routes/photo";
import { l } from "./module/console";

l("SERVER", "red", "is startig ...");
// const PORT = 5002;

function findUser(socket: Socket, room_id: string) {
  const clients = io.sockets.adapter.rooms.get(`/${room_id}`);
  let otherUser;
  for(const user of clients){
    if(user === socket.id)continue;
    otherUser = user;
  }
  return otherUser;
}

const app = express();
app.use(cors());

const httpServer = http.createServer(app);
const io = new ServerIO(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", function (socket) {
  // 에러 표시
  socket.on("error", (error) => l("ERR", "red", error));
  
  // 연결수행
  l("Connect", "green", socket.id);

  // "소켓 아이디 주기"
  socket.emit("getid", socket.id);
  
  socket.on("join", (data) => {
    const room_id = JSON.parse(data).room_id;
    l("Join", "green", room_id + "," + socket.id);
    socket.join(`/${room_id}`);
  });
  // 호스트에게 WebRTC를 하게끔 도와주는 참여자의 요청
  socket.on("hello", (data) => {
    const {room_id} =data;
    const otherUser = findUser(socket, room_id);
    l("hello", "green", room_id + "," + socket.id);

    if(otherUser){
      io.to(otherUser).emit("hello",{
        from: data.from,
      });
    }
  })
  // 호스트가 WebRtc 시작하고자 하는 호스트의 요청
  socket.on("caller", (data) => {
    const {room_id} =data;
    const otherUser = findUser(socket, room_id);
    
    l("caller", "green", room_id + "," + socket.id);
    if(otherUser){
      io.to(otherUser).emit("caller",{
        signal: data.signalData,
        from: data.from,
      });
    }
  });
  socket.on("answerCall", (data) => {
    io.to(data.to).emit("acceptcall", data.signal);
  });

  //검사 시작에 대한 요청 통신
  socket.on("startcheck", (data) => {
    const {room_id} =data;
    const otherUser = findUser(socket, room_id);

    l("startcheck", "green", room_id + "," + socket.id);

    if(otherUser){
      io.to(otherUser).emit("startcheck",{
        from: data.from,
      });
    }
  });
  // 검사 시작에 대한 응답 통신
  socket.on("startok", (data) => {
    const {room_id} =data;
    const otherUser = findUser(socket, room_id);

    l("startok", "green", room_id + "," + socket.id);

    if(otherUser){
      io.to(otherUser).emit("startok",{
        from: data.from,
      });
    }
  });

  socket.on("endcheck", (data) => {
    const {room_id} =data;
    const otherUser = findUser(socket, room_id);

    l("endcheck", "green", room_id + "," + socket.id);

    if(otherUser){
      io.to(otherUser).emit("endcheck",{
        from: data.from,
      });
    }
  })

  // 연결해제
  socket.on("disconnect", () => {
    l("Disconnect", "blue", socket.id);
  });
});

const httpServer = http.createServer();
const io = new ServerIO(httpServer);

io.on("connection", function (socket) {
  // 에러 표시
  socket.on("error", (error) => l("ERR", "red", error));
  
  // 연결수행
  l("Connect", "green", socket.id);

  // "소켓 아이디 주기"
  socket.emit("getid", socket.id);
  
  socket.on("join", (data) => {
    const room_id = JSON.parse(data).room_id;
    l("Join", "green", room_id + "," + socket.id);
    socket.join(`/${room_id}`);
    
  });

  socket.on("caller", (data) => {
    console.log("됐다");
    const {room_id} =data;
    const clients = io.sockets.adapter.rooms.get(`/${room_id}`);
    let otherUser;
    for(const user of clients){
      if(user === socket.id)continue;
      otherUser = user;
    }
    l("caller", "green", room_id + "," + socket.id);

    io.to(otherUser).emit("caller",{
      signal: data.signalData,
      from: data.from
    })
  });

  // 연결해제
  socket.on("disconnect", () => {
    l("Disconnect", "blue", socket.id);
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("acceptcall", data.signal);
  });

});

io.listen(PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("Node server is running ...");
});
app.get("/images/:id", (req, res) => {
  fs.readdir(`uploads/${req.params.id}`, (err: any, files: any) => {
    if (err) res.status(500).send("Internal Server Error");
    res.status(200).json({ sucess: true, list: files });
  });
});

app.use("/images", express.static("uploads"));

app.use("/photo", photoRouter);

httpServer.listen("5001", () => {
  console.log("5001포트 열림");
});