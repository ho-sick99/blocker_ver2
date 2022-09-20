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


module.exports = app;

// 컨트롤러
// app.get("/", (req, res) => {
//   return res.send("hi");
//   // return new Promise((resolve, reject) => {
//   //     db.query("SELECT * FROM blocker_db.member", (err, result) => {
//   //         if (err) {
//   //             console.log(err);
//   //         } else {
//   //             res.send(result);
//   //         }
//   //     });
//   // })
// });

// app.post("/login", (req, res) => {
//   const query = "SELECT * FROM blocker_db.member WHERE id = ?;";
//   db.query(query, [req.body.id], (err, result) => {
//     if (err) {
//       res.send({ success: "fail: id does't exit" });
//     } else {
//       if (req.body.pw === result[0].pw) res.send({ success: "success" });
//       else res.send({ success: "fail: pw was wrong" });
//     }
//   });
// });

// app.post("/register", (req, res) => {
//   const query = "INSERT INTO blocker_db.member(id, pw, name) VALUES(?, ?, ?);";
//   db.query(query, [req.body.id, req.body.pw, req.body.name], (err) => {
//     if (err) {
//       res.send({ success: "fail: id does't exit" });
//     } else {
//       res.send({ success: "success" });
//     }
//   });
// });
