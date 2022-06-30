import express from 'express';
import multer from 'multer';

const app = express();

app.listen("5001", () =>{
    console.log('5001포트 열림');
})