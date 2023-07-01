"use strict";

const db = require("../../config/db"); // db 객체 로드

// 체결 계약서 DB 접근 클래스
class SignedContractStorage {
  // 체결 계약서들 정보 로드
  static load_contracts() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM blocker_db.signed_contract ORDER BY contract_id DESC;;",
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

  static getlast() {
    return new Promise((resolve, reject) => {
      console.log("최근 값 반환");
      db.query(
        "SELECT * FROM blocker_db.signed_contract where contract_id = (select max(contract_id) from blocker_db.signed_contract);",
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

  // 특정 체결 계약서 정보 로드 메서드
  static view_contract(contractId) {
    // 계약서 id를 매개변수로 받음
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM blocker_db.signed_contract WHERE contract_id = ?;", // DB에서 id와 일치하는 계약서 정보 탐색
        [contractId],
        (err, result) => {
          if (err) {
            // 에러 발생 시
            reject(`${err}`); // 에러 반환
          } else {
            resolve(result[0]); // 반환값 배열 형태이므로 첫번째 인덱스에 접근 후 데이터 반환
          }
        }
      );
    });
  }

  // 체결 계약서 생성 메서드
  static insert_contract(contractData) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO blocker_db.signed_contract(title, content, id, contractors, avoidance) VALUES(?, ?, ?, ?, ?);", // 입력된 정보를 바탕으로 db에 계약서 추가
        [
          contractData.title,
          contractData.content,
          contractData.id,
          contractData.contractors,
          contractData.avoidance
        ],
        (err) => {
          if (err) reject(`${err}`); // 에러 반환
          else resolve({ success: true }); // 결과 반환
        }
      );
    });
  }

  // 체결 계약서 삭제 메서드
  static delete_contract(contractId) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM blocker_db.signed_contract WHERE contract_id = ?;",
        [contractId],
        (err) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }

  // 계약자 정보 로드 메서드
  static get_contractors(contractId) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT contractors from blocker_db.signed_contract WHERE contract_id = ?;", // DB에서 contractId와 일치하는 계약서의 contractors 열을 추출
        [contractId],
        (err, result) => {
          if (err) {
            // 에러 발생 시
            reject(`${err}`); // 에러 반환
          } else {
            resolve(result[0]); // 반환값 배열 형태이므로 첫번째 인덱스에 접근 후 데이터 반환
          }
        }
      )
    })
  }

  // 서명 기입 정보 로드 메서드
  static get_check_sign(contractId) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT signed from blocker_db.signed_contract WHERE contract_id = ?;", // DB에서 contractId와 일치하는 계약서의 signed 열을 추출
        [contractId],
        (err, result) => {
          if (err) {
            // 에러 발생 시
            reject(`${err}`); // 에러 반환
          } else {
            resolve(result[0]); // 반환값 배열 형태이므로 첫번째 인덱스에 접근 후 데이터 반환
          }
        }
      )
    })
  }
  
  static get_singed_avoidance(contractId) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT avoidance from blocker_db.signed_contract WHERE contract_id = ?;", // DB에서 contractId와 일치하는 계약서의 signed 열을 추출
        [contractId],
        (err, result) => {
          if (err) {
            // 에러 발생 시
            reject(`${err}`); // 에러 반환
          } else {
            resolve(result[0]); // 반환값 배열 형태이므로 첫번째 인덱스에 접근 후 데이터 반환
          }
        }
      )
    })
  }
  static set_singed_avoidance(contractData) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE blocker_db.signed_contract SET avoidance = ? where contract_id = ?;",
        [contractData.avoidance, contractData.contract_id],
        (err, result) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      )
    })
  }

}

module.exports = SignedContractStorage;
