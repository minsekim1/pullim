import express from "express";

const app = express();
const PORT = "5002";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`현재 ${PORT}로 Time Server가 돌고 있습니다.`);
});