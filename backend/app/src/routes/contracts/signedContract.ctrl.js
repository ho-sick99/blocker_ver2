"use strict";

const SignedContract = require("../../model/Contract/SignedContract"); // 체결 계약서 클래스 로드

const process = {
  // 계약서 목록 로드
  contract_load: async (req, res) => {
    const contractData = new SignedContract(req.body); // 유저 정보 객체 생성
    const contracts = await contractData.load_contract();
    return res.send(contracts); // 계약서 배열 반환
  },
  // 계약서 보기
  contract_view: async (req, res) => {
    const contractData = new SignedContract(req.body); // 계약서 객체 생성
    const contract_res = await contractData.view_contract(); // 계약서 데이터 요청

    return res.send(contract_res); // 생성 결과 반환
  },
  // 수정 요청에 의한 계약 취소 (체결 -> 미체결)
  cancle_contract: async (req, res) => {
    // 체결 계약서 id를 받음
    const contractData = new SignedContract(req.body);
    const result = await contractData.cancle_contract(); // 계약 취소

    return res.send(result); // 계약 취소 결과 반환
  },
  // 계약 파기
  delete_contract: async (req, res) => {
    // 체결 계약서 id를 받음
    const contractData = new SignedContract(req.body);
    const result = await contractData.delete_contract(); // 계약 파기

    return res.send(result); // 계약 파기 결과 반환
  },
  get_singed_avoidance: async (req, res) => {
    const contractData = new SignedContract(req.body); // 계약서 객체 생성
    const contract_res = await contractData.get_singed_avoidance(); // 계약서 데이터 요청

    return res.send(contract_res); // 생성 결과 반환
  },
  set_singed_avoidance: async (req, res) => {
    const contractData = new SignedContract(); // 계약서 객체 생성
    const contract_res = await contractData.set_singed_avoidance(); // 계약서 데이터 요청
    
    return res.send(contract_res); // 생성 결과 반환
  },
  get_last_contractid: async (req, res) => {
    const contractData = new SignedContract(); // 계약서 객체 생성
    const contract_res = await contractData.getlast(); // 계약서 데이터 요청
    
    return res.send(contract_res); // 생성 결과 반환
  },

}

module.exports = {
  process,
};