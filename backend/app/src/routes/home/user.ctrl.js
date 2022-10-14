"use strict";

const User = require("../../model/User");

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
  chk_id : async (req, res) => {
    const bodyData = new User(req.body); // body에 유저 데이터(id)를 object 형태로 담아 post 요청
    const registerRes = await bodyData.chk_id();

    return res.send(registerRes);
  },
  bookmark_info : async (req, res) => {
    const bodyData = new User(req.body); // body에 유저 데이터(id)를 object 형태로 담아 post 요청
    const registerRes = await bodyData.bookmark_info();

    return res.send(registerRes);
  },
  edit_bookmark_info : async (req, res) => {
    const bodyData = new User(req.body); // body에 유저 데이터(id)를 object 형태로 담아 post 요청
    const edit_bmark_Res = await bodyData.edit_bookmark_info();

    return res.send(edit_bmark_Res);
  },
  my_contract_info : async (req, res) => {
    const bodyData = new User(req.body); 
    const registerRes = await bodyData.my_contract_info();

    return res.send(registerRes);
  },
  my_post_info : async (req, res) => {
    const bodyData = new User(req.body); 
    const registerRes = await bodyData.my_post_info();

    return res.send(registerRes);
  }, 
  edit_my_post_info : async (req, res) => {
    const bodyData = new User(req.body); 
    const edit_mpost_Res = await bodyData.edit_my_post_info();

    return res.send(edit_mpost_Res);
  }, 
  get_sign_info : async (req, res) => {
    const bodyData = new User(req.body); 
    const singRes = await bodyData.get_user_sign();

    return res.send(singRes.sign);
  }, 
  set_sign_info : async (req, res) => {
    const bodyData = new User(req.body); 
    const singRes = await bodyData.set_sign_info();

    return res.send(singRes.sign);
  }, 
};

module.exports = {
  process,
};
