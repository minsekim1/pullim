import express from 'express';
import photoRouter from './routes/photo';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", function (req, res) {
  res.send("Node server is running ...");
});

app.use('/images', express.static('uploads'));

app.use('/photo', photoRouter);

app.listen("5001", () =>{
    console.log('5001포트 열림');
});