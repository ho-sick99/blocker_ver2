"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const clientData = this.body;
    console.log("로그인 시도");
    try {
      const userData = await UserStorage.getUserInfo(clientData.id);

      // 유저 정보 존재
      if (userData) {
        // 유저 정보 일치
        if (
          userData.id === clientData.id &&
          userData.pw === clientData.pw
        ) {
          return { success: true, name: userData.name};
        }
        // 유저 정보 불일치
        return { success: false, msg: "비밀번호 불일치" };
      }
      // 유저 정보 존재 X
      return { success: false, msg: "아이디와 일치하는 유저 정보 없음" };
    } catch (err) {
      return { success: false, err }; // DB 접근 중 문제 발생
    }
  }

  async register() {
    const clientData = this.body;
    console.log(clientData);
    try {
      const response = await UserStorage.save(clientData); // 유저 정보 저장 시도
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }

  async chk_id() {
    const try_id = this.body;
    try {
      const response = await UserStorage.chk_id(try_id);
      if(response.id === try_id.id){
        return {is_signin: false};
      }
      else{
        return { is_signin: true };
      }
    } catch (err) {
      return { is_signin: true };
    }
  }
}

module.exports = User;
