"use strict";

const N_SignedContract = require("../../model/Contract/N_SignedContract"); // 미체결 계약서 클래스 로드

const process = {
  // 계약서 목록 로드
  contract_load: async (req, res) => {
    const contractData = new N_SignedContract(req.body); // 유저 정보 객체 생성
    const contracts = await contractData.load_contract();
    
    return res.send(contracts); // 계약서 배열 반환
  },
  // 계약서 보기
  contract_view: async (req, res) => {
    const contractData = new N_SignedContract(req.body); // 계약서 객체 생성
    const contract_res = await contractData.view_contract(); // 계약서 데이터 요청

    return res.send(contract_res); // 생성 결과 반환
  },
  // 계약서 작성
  contract_add: async (req, res) => {
    const contractData = new N_SignedContract(req.body); // 계약서 객체 생성
    const contract_res = await contractData.add_contract(); // 계약서 생성 요청

    return res.send(contract_res); // 생성 결과 반환
  },
  // 계약서 수정
  contract_upd: async (req, res) => {
    const contractData = new N_SignedContract(req.body);
    const contract_res = await contractData.update_contract(); // 계약서 수정 요청

    return res.send(contract_res); // 수정 결과 반환
  },
  // 계약 진행 ( 미체결 -> 체결 )
  share_contract: async (req, res) => {
    // 미체결 계약서 id, 계약자들 id 정보 객체를 받음
    const contractData = new N_SignedContract(req.body); // 객체 생성
    const result = await contractData.share_contract(); // 계약 진행

    return res.send(result); // 계약 진행 결과 반환
  },
};

module.exports = {
  process,
};
