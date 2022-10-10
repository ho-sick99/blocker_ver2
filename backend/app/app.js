"use strict";

// 모듈 로드
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv"); // 환경변수 모듈


// const pdfFile_1 = fs.readFileSync("test.pdf");
// const pdfFile_2 = fs.readFileSync("test2.pdf");

// const text1 = pdfParse(pdfFile_1).then(function (data) {
//   console.log("text1 hash");
//   const hashPwd = crypto.createHash('sha1').update(data.text).digest('hex');
//   console.log(hashPwd);
//   return data.text;
// });

// const text2 = pdfParse(pdfFile_2).then(function (data) {
//     console.log("text2 hash");
//     const hashPwd = crypto.createHash('sha1').update(data.text).digest('hex');
//     console.log(hashPwd);
//     return data.text;
//   })


dotenv.config();

// 라우팅
const home = require("./src/routes/home");

// 중요 //
// 미들웨어 설정 -> 미들웨어 등록 순으로 처리해야함

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// 이거 두개 없이도 되는지 확인 안되면 주석해제
// app.use(cors()); 
// app.use(express.json());
// app.use(express.json({
    //     limit : "50mb"
    // }));
    // app.use(express.urlencoded({
    //     limit:"50mb",
    //     extended: false
    // }));
// 미들웨어 등록

app.use("/", home); // use -> 미들 웨어를 등록해주는 메서드.



module.exports = app;

