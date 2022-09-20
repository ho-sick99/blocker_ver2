"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const clientData = this.body;
    console.log(clientData);
    try {
      const userData = await UserStorage.getUserInfo(clientData.id);

      // 유저 정보 존재
      if (userData) {
        // 유저 정보 일치
        if (
          userData.id === clientData.id &&
          userData.pw === clientData.pw
        ) {
          return { success: true };
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
}

module.exports = User;
