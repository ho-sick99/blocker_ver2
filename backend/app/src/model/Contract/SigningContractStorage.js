"use strict";

const db = require("../../config/db"); // db 객체 로드

// 체결 계약서 DB 접근 클래스
class SigningContractStorage {

    // 진행중 계약서들 정보 로드
    static load_signing_contracts_info(clientId) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM blocker_db.signing_contract WHERE id = ?;",
                [clientId],
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

    // 진행중 계약서 생성
    static insert_contract(contractData) {
        return new Promise((resolve, reject) => {
          db.query(
            "INSERT INTO blocker_db.contract(title, content, id) VALUES(?, ?, ?);", // 입력된 정보를 바탕으로 db에 계약서 추가
            [
              contractData.title,
              contractData.content,
              contractData.id,
            ],
            (err) => {
              if (err) reject(`${err}`); // 에러 반환
              else resolve({ success: true }); // 결과 반환
            }
          );
        });
      }
}

module.exports = SigningContractStorage;