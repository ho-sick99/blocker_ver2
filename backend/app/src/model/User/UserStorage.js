"use strict";

const db = require("../../config/db");
const dataImagePrefix = `data:image/png;base64,`;

class UserStorage {

  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM blocker_db.member WHERE id = ?;", // DB에서 id와 일치하는 유저정보 탐색
        [id],
        (err, result) => {
          if (err) {
            reject(`${err}`);
          } else {
            resolve(result[0]); // 반환값 배열 형태이므로 첫번째 인덱스에 접근 후 데이터 반환
          }
        }
      );
    });
  }

  static save(clientData) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO blocker_db.member(id, name, pw) VALUES(?, ?, ?);",
        [clientData.id, clientData.name, clientData.pw],
        (err) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }

  static chk_id(try_id){
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id FROM blocker_db.member WHERE id = ?;", // DB에서 id와 일치하는 유저정보 탐색
        [try_id.id],
        (err, result) => {
          if (err) {
            reject(`${err}`);
          } else {
            resolve(result[0]); // 반환값 배열 형태이므로 첫번째 인덱스에 접근 후 데이터 반환
          }
        }
      );
    });
  }

  static bookmark_info(input_id){
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT bookmark FROM blocker_db.member WHERE id = ?;", 
        [input_id],
        (err, result) => {
          if (err) {
            reject(`${err}`);
          } else {
            resolve(result[0]); // 반환값 배열 형태이므로 첫번째 인덱스에 접근 후 데이터 반환
          }
        }
      );
    });
  }

  static edit_bookmark_info(clientData){
    return new Promise((resolve, reject) => {
      console.log(clientData);
      db.query(
        "update blocker_db.member set bookmark = json_object( 'data', ?,'length', ?) where id = ?;", 
        [clientData.bookmark.data, clientData.bookmark.length, clientData.id],
        (err, result) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }

  static my_contract_info(input_id){
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT mycontract FROM blocker_db.member WHERE id = ?;", 
        [input_id],
        (err, result) => {
          if (err) {
            reject(`${err}`);
          } else {
            resolve(result[0]); // 반환값 배열 형태이므로 첫번째 인덱스에 접근 후 데이터 반환
          }
        }
      );
    });  
  }

  static my_post_info(input_id){
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT mypost FROM blocker_db.member WHERE id = ?;", 
        [input_id],
        (err, result) => {
          if (err) {
            reject(`${err}`);
          } else {
            resolve(result[0]); // 반환값 배열 형태이므로 첫번째 인덱스에 접근 후 데이터 반환
          }
        }
      );
    });  
  }
  
  static edit_my_post_info(clientData){
    return new Promise((resolve, reject) => {
      console.log(clientData);
      db.query(
        "update blocker_db.member set mypost = json_object('data', ?,'length', ?) where id = ?;", 
        [clientData.mypost.data, clientData.mypost.length, clientData.id],
        (err, result) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });  
  }

  static get_user_sign(input_id){
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT sign FROM blocker_db.member WHERE id = ?;", 
        [input_id],
        (err, result) => {
          if (err) {
            reject(`${err}`);
          } else {
            resolve(result[0]); // 반환값 배열 형태이므로 첫번째 인덱스에 접근 후 데이터 반환
          }
        }
      );
    });  
  }
  static set_user_sign(clientData){
    return new Promise((resolve, reject) => {
      db.query(
        "update blocker_db.member set sign = ? where id = ?;",
        [clientData.sign, clientData.id],
        (err, result) => {
          if (err) {
            reject(`${err}`);
          } else {
            resolve({success: true}); // 반환값 배열 형태이므로 첫번째 인덱스에 접근 후 데이터 반환
          }
        }
      );
    });  
  }

}

module.exports = UserStorage;
