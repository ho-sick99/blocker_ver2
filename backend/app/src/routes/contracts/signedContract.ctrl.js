"use strict";

const SignedContract = require("../../model/Contract/SignedContract"); // 체결 계약서 클래스 로드

const process = {
  // 수정 요청에 의한 계약 취소 (체결 -> 미체결)
  // cancle_progress_contract: async (req, res) => {
  //   // 진행중 계약서 id를 받음
  //   const contractData = new SignedContract(req.body);
  //   const result = await contractData.cancle_progress_contract(); // 계약 취소

  //   return res.send(result); // 계약 취소 결과 반환
  // }
}

module.exports = {
  process,
};