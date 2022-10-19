"use strict";

const db = require("../../config/db");

class PostStorage {
  static load_post() {
    console.log("게시글 로드"); 
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT post_id, post_title FROM blocker_db.post ORDER BY post_id DESC;",
        (err, result) => {
          if (err) {
            reject(`${err}`);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static get_post_info(post_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM blocker_db.post WHERE post_id = ?;", // DB에서 id와 일치하는 유저정보 탐색
        [post_id],
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

  static insert_post(clientData) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO blocker_db.post(post_title, post_content, id, contract_id) VALUES(?, ?, ?, ?);",
        [clientData.post_title, clientData.post_content, clientData.id, clientData.contract_id],
        (err) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }

  static update_post(clientData) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE blocker_db.post SET post_title = ?, post_content = ?, contract_id = ? where post_id = ?;",
        [clientData.post_title, clientData.post_content, clientData.contract_id, clientData.post_id],
        (err) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }

  static delete_post(post_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "delete from post where post_id = ?;",
        [post_id],
        (err) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }


}


module.exports = PostStorage;
