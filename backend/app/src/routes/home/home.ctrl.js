"use strict";

const User = require("../../model/User");
const UserStorage = require("../../model/UserStorage");

const output = {
  home: async (req, res) => {
    const testData = await UserStorage.test(); // 테스트 데이터 로드
    return res.send(testData);
  },
};

const process = {
  login: async (req, res) => {
    const bodyData = new User(req.body); // body에 유저 데이터(id, password)를 object 형태로 담아 post 요청
    const loginRes = await bodyData.login();

    return res.send(loginRes);
  },
  register: async (req, res) => {
    const bodyData = new User(req.body); // body에 유저 데이터(id, password, name)를 object 형태로 담아 post 요청
    const registerRes = await bodyData.register();

    return res.send(registerRes);
  },
  //   register: app.post("/register", (req, res) => {
  //     const query =
  //       "INSERT INTO blocker_db.member(id, pw, name) VALUES(?, ?, ?);";
  //     db.query(query, [req.body.id, req.body.pw, req.body.name], (err) => {
  //       if (err) {
  //         res.send({ success: "fail: id does't exit" });
  //       } else {
  //         res.send({ success: "success" });
  //       }
  //     });
  //   }),
};

module.exports = {
  output, // === output: output
  process,
};
