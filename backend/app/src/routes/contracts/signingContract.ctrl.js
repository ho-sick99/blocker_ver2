"use strict";

const SigningContract = require("../../model/Contract/SigningContract"); // 진행중 계약서 클래스 로드

const process = {
  // 계약서 목록 로드
  contract_load: async (req, res) => {
    const contractData = new SigningContract(req.body); // 유저 정보 객체 생성
    const contracts = await contractData.load_contract();
    
    return res.send(contracts); // 계약서 배열 반환
  },
  // 계약서 보기
  contract_view: async (req, res) => {
    const contractData = new SigningContract(req.body); // 계약서 객체 생성
    const contract_res = await contractData.view_contract(); // 계약서 데이터 요청

    return res.send(contract_res); // 생성 결과 반환
  },
  // 계약 성립 (진행중 -> 체결)
  progress_contract: async (req, res) => {
    // 진행중 계약서 id를 받음
    const contractData = new SigningContract(req.body);
    const result = await contractData.progress_contract(); // 계약 체결

    return res.send(result); // 계약 체결 결과 반환
  },
  // 수정 요청에 의한 계약 취소 (진행중 -> 미체결)
  cancle_progress_contract: async (req, res) => {
    // 진행중 계약서 id를 받음
    const contractData = new SigningContract(req.body);
    const result = await contractData.cancle_progress_contract(); // 계약 취소

    return res.send(result); // 계약 취소 결과 반환
  },
  // 서명 기입
  check_sign: async (req, res) =>{
    // 진행중 계약서 id와, 현재 사용자의 id를 받음
    const contractData = new SigningContract(req.body);
    const result = await contractData.check_sign(); // 서명 기입
    
    return res.send(result); // 서명 기입 결과 반환
  },
  add_signing_contract: async(req, res) => {
    // 미체결 계약서를 기반으로 진행 중 계약서 생성 
    const contractData = new SigningContract(req.body);
    const result = await contractData.add_signing_contract(); 
    
    return res.send(result); 
  },
  get_singing_avoidance: async(req, res) => {
    // 진행중 계약서의 파기 정보 로드 
    const contractData = new SigningContract(req.body);
    const result = await contractData.get_singing_avoidance(); 
    
    return res.send(result); 
  },
};

module.exports = {
  process,
};
