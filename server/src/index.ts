import express from "express";
import fs from "fs";
import http from "http";
import { Server as ServerIO } from "socket.io";
import photoRouter from "./routes/photo";
import { l } from "./console";

l("SERVER", "red", "is startig ...");
const PORT = 5002;

const app = express();

const httpServer = http.createServer();
const io = new ServerIO(httpServer);

io.on("connection", function (socket) {
  // 에러 표시
  socket.on("error", (error) => l("ERR", "red", error));

  // 연결수행
  l("Connect", "green", socket.id);

  socket.on("join", (data) => {
    const room_id = JSON.parse(data).room_id;
    l("Join", "green", room_id + "," + socket.id);
    socket.join(`/${room_id}`);
  });

  // 연결해제
  socket.on("disconnect", () => {
    l("Disconnect", "blue", socket.id);
  });

  socket.on("checkstart", (data) => {
    const { room_id, isHost, userName, time } = JSON.parse(data);
    console.log(room_id, isHost, userName, time);
    console.log(socket.rooms);
    socket.to(room_id).emit('checkstart2', {
      time
    });
    l("checkstart", "green", socket.id);
  });

  // socket.on('join', function(user_info) {
  //   var {name, id, group} = user_info;
  //   console.log("socket_id", socket.id);
  //   console.log("그룹이름"+group);

  //   io.to(group).emit('roomData', {
  //     room: group,
  //   });
  //   socket.join(group);
  // });

  // socket.on("send message", (user) => {
  //   console.log(user.name + " : " + user.message);
  //   io.to(user.group).emit("receive message", { name: user.name, message: user.message, id: user.id, date: user.date });
  //   //클라이언트에 이벤트를 보냄
  //   var chatdata={chat_name:user.name, msg:user.message, chat_id:user.id, chat_date:user.date, group_name:user.group}
  //   const sqlchat="insert into chat set ?";
  // });
  // console.log(socket.rooms);
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

app.listen("5001", () => {
  console.log("5001포트 열림");
});
