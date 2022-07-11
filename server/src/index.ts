import express from "express";
import photoRouter from "./routes/photo";
const fs = require("fs");

const app = express();

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
