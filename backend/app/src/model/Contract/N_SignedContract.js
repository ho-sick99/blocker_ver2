"use strict";

const Contract = require("./Contract");
const N_SignedContractStorage = require("./N_SignedContractStorage");
const SigningContractStorage = require("./SigningContractStorage");

// 미체결 계약서 클래스
class N_SignedContract extends Contract { // 계약서 클래스를 상속함 -> 굳이? 나중 회의때 고려
  constructor(body) {
    super(body);
  }

  // 미체결 계약서 생성
  async add_contract() {
    const contractData = this.body;
    console.log(contractData);
    try {
      const response = await N_SignedContractStorage.insert_contract(contractData); // 입력된 데이터를 인수로 DB에 새로운 계약서 생성 요청
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }

  // 미체결 계약서 수정 메서드
  async update_contract() {
    const contractData = this.body;
    try {
      const response = await N_SignedContractStorage.update_contract(contractData); // 계약서 정보 수정 시도
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }

  // 계약 진행 메서드 (미체결 -> 진행중)
  async share_contract() {
    const contractData = this.body;
    try {
      const n_signedContractData = await N_SignedContractStorage.view_contract(
        contractData.contract_id
      ); // 미체결 계약서 데이터

      const createRes = await SigningContractStorage.insert_contract({
        ...n_signedContractData,
        contractors: JSON.stringify(contractData.contractors),
      }); // 미체결 계약서 데이터와 계약자들 데이터 기반으로 진행중 계약서 생성

      // 진행중 계약서가 생성되었다면
      if (createRes.success) {
        const result = await N_SignedContractStorage.delete_contract(
          contractData.contract_id
        ); // 미체결 계약서 삭제
        return result;
      }
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = N_SignedContract;
