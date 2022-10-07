"use strict";

const SigningContract = require("../../model/Contract/SigningContract"); // 미체결 계약서 클래스 로드

const process = {
  // 계약 성립 (진행중 -> 체결)
  progress_contract: async (req, res) => {
    // 진행중 계약서 id를 받음
    const contractData = new SigningContract(req.body);
    const result = await contractData.progress_contract(); // 계약 체결

    return res.send(result); // 계약 체결 결과 반환
  },
  // 수정 요청에 의한 계약 취소 (진행중 -> 미체결)
  cancle_progress_contract: async(req,res) => {
    // 진행중 계약서 id를 받음
    const contractData = new SigningContract(req.body);
    const result = await contractData.cancle_progress_contract(); // 계약 취소

    return res.send(result); // 계약 취소 결과 반환
  }
};

module.exports = {
  process,
};
