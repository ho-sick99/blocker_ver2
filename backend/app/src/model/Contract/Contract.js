"use strict";

const N_SignedContractStorage = require("./N_SignedContractStorage"); // 미체결 계약서 DB 접근 클래스 로드
const SigningContractStorage = require("./SigningContractStorage"); // 진행중 계약서 DB 접근 클래스 로드
const SignedContractStorage = require("./SignedContractStorage"); // 진행중 계약서 DB 접근 클래스 로드

// 계약서 클래스
class Contract {
  constructor(body) {
    this.body = body;
  }
  
  // 계약서 삭제
  async delete_contract() {
    const contractData = this.body;
    try {
      let response = null;
      switch (contractData.contract_type) {
        case "n_signed": // 미체결
          response = await N_SignedContractStorage.delete_contract(
            contractData.contract_id
          ); // 계약서 삭제 시도
          break;
        case "signing": // 진행중
          response = await SigningContractStorage.delete_contract(
            contractData.contract_id
          ); // 계약서 삭제 시도
          break;
        case "signed": // 체결
          response = await SignedContractStorage.delete_contract(
            contractData.contract_id
          ); // 계약서 삭제 시도
          break;
        default: // 계약서 타입 오류
          const err = new Error("계약서 타입 오류");
          response = { success: false, err }; // 에러 생성후 반환
      }
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = Contract;
