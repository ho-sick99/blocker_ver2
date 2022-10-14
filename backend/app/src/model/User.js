"use strict";

const { bookmark_info } = require("./UserStorage");
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
  
  async bookmark_info() {
    const input_id = this.body;
    try {
      const response = await UserStorage.bookmark_info(input_id.id)
      const res_obj = JSON.parse(response.bookmark);
      return {length: res_obj.length, data: JSON.parse(res_obj.data)};
    } catch (err) {
      console.log(err);
      return { err: false };
    }
  }

  async edit_bookmark_info() {
    const clientData = this.body;
    try {
      const response = await UserStorage.edit_bookmark_info(clientData)
      return response;
    } catch (err) {
      console.log(err);
      return { err: false };
    }
  }

  async my_contract_info() {
    const input_id = this.body;
    try {
      const response = await UserStorage.my_contract_info(input_id.id)
      const res_obj = JSON.parse(response.mycontract);
      return {
        contract_length: res_obj.contract_length, 
        contract_lst: JSON.parse(res_obj.contract_lst),
        signing_contract_length: res_obj.signing_contract_length, 
        signing_contract_lst: JSON.parse(res_obj.signing_contract_lst),
        signed_contract_length: res_obj.signed_contract_length, 
        signed_contract_lst: JSON.parse(res_obj.signed_contract_lst),
      };
    } catch (err) {
      console.log(err);
      return { err: false };
    }
  }

  async my_post_info() {
    const input_id = this.body;
    try {
      const response = await UserStorage.my_post_info(input_id.id)
      const res_obj = JSON.parse(response.mypost);
      return {length: res_obj.length, data: JSON.parse(res_obj.data)};
    } catch (err) {
      console.log(err);
      return { err: false };
    }
  }

  async edit_my_post_info() {
    const clientData = this.body;
    try {
      const response = await UserStorage.edit_my_post_info(clientData)
      return response;
    } catch (err) {
      console.log(err);
      return { err: false };
    }
  }

  async get_user_sign() {
    const input_id = this.body;
    try {
      const response = await UserStorage.get_user_sign(input_id.id)
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return { err: false };
    }
  }
  async set_sign_info(){
    const clientData = this.body;
    try {
      const response = await UserStorage.set_user_sign(clientData)
      return response;
    } catch (err) {
      return { err: false };
    }
  }
}

module.exports = User;
