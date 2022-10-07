"use strict";

const SigningContractStorage = require("./SigningContractStorage");
const SignedContractStorage = require("./SignedContractStorage");
const N_SignedContractStorage = require("./N_SignedContractStorage");

class SigningContract {
  constructor(body) {
    this.body = body;
  }

  // 계약 성립 메서드 (진행중 -> 체결)
  async progress_contract() {
    const contractData = this.body;
    try {
      const signingContractData = await SigningContractStorage.view_contract(
        contractData.contract_id
      ); // 진행중 계약서 데이터

      const createRes = await SignedContractStorage.insert_contract(
        signingContractData
      ); // 진행중 계약서 데이터를 기반으로 체결 계약서 생성

      // 체결 계약서가 생성되었다면
      if (createRes.success) {
        const result = await SigningContractStorage.delete_contract(
          contractData.contract_id
        ); // 진행중 계약서 삭제
        return result;
      }
    } catch (err) {
      return { success: false, err };
    }
  }

  // 계약 수정 메서드 (진행중 -> 미체결)
  async cancle_progress_contract() {
    const contractData = this.body;
    try {
      const signingContractData = await SigningContractStorage.view_contract(
        contractData.contract_id
      ); // 진행중 계약서 데이터

      const createRes = await N_SignedContractStorage.insert_contract(
        signingContractData
      ); // 진행중 계약서 데이터를 기반으로 미체결 계약서 생성

      // 미체결 계약서가 생성되었다면
      if (createRes.success) {
        const result = await SigningContractStorage.delete_contract(
          contractData.contract_id
        ); // 진행중 계약서 삭제
        return result;
      }
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = SigningContract;
