"use strict";

const User = require("../../model/User");
const UserStorage = require("../../model/UserStorage");
const Post = require("../../model/Post");

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

// 게시글 관련 API 
const post_sys = {
    post_view : async (req, res) => {
      const bodyData = new Post(req.body); 
      const post_res = await bodyData.post_view();
      
      return res.send(post_res);
    },
    post_add : async (req, res) => {
      const bodyData = new Post(req.body); 
      const add_res = await bodyData.add_post();

      return res.send(add_res);
    },
    post_upd : async (req, res) => {
      const bodyData = new Post(req.body); 
      const upd_res = await bodyData.update_post();

      return res.send(upd_res);
    },
    post_del : async (req, res) => {
      const bodyData = new Post(req.body); 
      const del_res = await bodyData.delete_post();
      
      return res.send(del_res);
    },

}


// 계약서 관련 API
const contract_sys = {

}


module.exports = {
  output, // === output: output
  process,
  post_sys,
  contract_sys,
};
