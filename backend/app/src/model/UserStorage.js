"use strict";

const db = require("../config/db");

class UserStorage {
  static test() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM blocker_db.member;", (err, result) => {
        if (err) {
          reject(`${err}`);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

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
}

module.exports = UserStorage;
