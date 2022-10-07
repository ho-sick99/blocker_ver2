"use strict";

const N_SignedContract = require("../../model/Contract/N_SignedContract"); // 미체결 계약서 클래스 로드

const process = {
    // 계약 진행 ( 미체결 -> 체결 )
    share_contract: async (req, res) => { // 미체결 계약서 id, 계약자들 id 정보 객체를 받음 
        const contractData = new N_SignedContract(req.body); // 객체 생성
        const result = await contractData.share_contract(); // 계약 진행

        return res.send(result); // 계약 진행 결과 반환
    }
}

module.exports = {
    process,
}