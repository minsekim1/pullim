import express from "express";
import multer from "multer";
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.use((req, res, next) => {
  console.log("Time", Date.now());
  next();
});

//위치와 파일 이름 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      const now = new Date();
      const savePath = `uploads/${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`;
      const isExists = fs.existsSync(savePath);
      if(isExists){
        cb(
          null,
          savePath
        );
      }else{
        fs.mkdirSync(savePath, {recursive: true});
        cb(
          null,
          savePath
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(
      null,
      file.originalname
    );
  },
});
//multer 옵션 설정
const upload = multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
  storage,
});

router.post("/", upload.array("photos"), (req:any, res) => {
  res.status(200).json({ sucess: false, photo: req.files[0] });
});

export default router;
