"use strict";

const db = require("../../config/db"); // db 객체 로드

// 체결 계약서 DB 접근 클래스
class SignedContractStorage {
    // 체결 계약서들 정보 로드
    static load_signed_contracts_info(clientId) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM blocker_db.signed_contract WHERE id = ?;",
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
}

module.exports = SignedContractStorage;