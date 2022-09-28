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
    console.log("login")
    const bodyData = new User(req.body); // body에 유저 데이터(id, password)를 object 형태로 담아 post 요청
    const loginRes = await bodyData.login();

    return res.send(loginRes);
  },
  register: async (req, res) => {
    const bodyData = new User(req.body); // body에 유저 데이터(id, password, name)를 object 형태로 담아 post 요청
    const registerRes = await bodyData.register();

    return res.send(registerRes);
  },
  chk_id : async (req, res) => {
    const bodyData = new User(req.body); // body에 유저 데이터(id)를 object 형태로 담아 post 요청
    const registerRes = await bodyData.chk_id();

    return res.send(registerRes);

  }
};

module.exports = {
  output, // === output: output
  process,
};
