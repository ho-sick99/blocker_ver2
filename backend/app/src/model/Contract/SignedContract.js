"use strict";

const N_SignedContractStorage = require("./N_SignedContractStorage");
const SignedContractStorage = require("./SignedContractStorage");

class SignedContract {
  async cancle_progress_contract() {
    const contractData = this.body;
    try {
      // sign 체크
      const contractors = JSON.parse(
        (await SignedContractStorage.get_contractors(contractData.contract_id))
          .contractors
      ); // 현재 해당 계약서의 계약자들 로드
      const signed = JSON.parse(
        (await SignedContractStorage.get_check_sign(contractData.contract_id))
          .signed
      ); // 현재 해당 계약서의 사인여부 로드

      if (!signed || contractors.length != signed.length) {
        // 계약자들의 서명이 모두 기입되지 않은 경우
        return {
          success: false,
          msg: "모든 계약자들의 동의가 이루어지지 않았습니다.",
        }; // 오류 반환
      }

      const signedContractData = await SignedContractStorage.view_contract(
        contractData.contract_id
      ); // 체결 계약서 데이터

      const createRes = await N_SignedContractStorage.insert_contract(
        signedContractData
      ); // 체결 계약서 데이터를 기반으로 미체결 계약서 생성

      // 미체결 계약서가 생성되었다면
      if (createRes.success) {
        const result = await SignedContractStorage.delete_contract(
          contractData.contract_id
        ); // 체결 계약서 삭제
        return result;
      }
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = SignedContract;
