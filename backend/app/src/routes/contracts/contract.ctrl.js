"use strict";

const Contract = require("../../model/Contract/Contract"); // 계약서 클래스 로드

// GET 요청
const output = {};

// POST 요청
const process = {
  contract_del: async (req, res) => {
    // 계약서 삭제
    const contractData = new Contract(req.body);
    const contract_res = await contractData.delete_contract(); // 계약서 삭제 요청

    return res.send(contract_res); // 삭제 결과 반환
  },
};

module.exports = {
  output,
  process,
};
