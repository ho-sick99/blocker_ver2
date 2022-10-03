"use strict";

// 모듈 로드
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv"); // 환경변수 모듈

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

// 미들웨어 등록
app.use("/", home); // use -> 미들 웨어를 등록해주는 메서드.

app.use(express.json({
    limit : "50mb"
}));
app.use(express.urlencoded({
    limit:"50mb",
    extended: false
}));


module.exports = app;

