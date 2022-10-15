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
      // sign 체크
      const contractors = JSON.parse(
        (await SigningContractStorage.get_contractors(contractData.contract_id))
          .contractors
      ); // 현재 해당 계약서의 계약자들 로드
      const signed = JSON.parse(
        (await SigningContractStorage.get_check_sign(contractData.contract_id))
          .signed
      ); // 현재 해당 계약서의 사인여부 로드

      if (!signed || contractors.length != signed.length) { // 계약자들의 서명이 모두 기입되지 않은 경우
        return {
          success: false,
          msg: "계약서에 모든 서명이 기입되지 않았습니다.",
        }; // 오류 반환
      }

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
  async cancle_progress_contract() { // 수정에 동의하는 검증프로세스 사용자 입장에서 귀찮을듯
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

  // 계약 수락(서명 기입) 메서드
  async check_sign() {
    // 현재 서명 정보를 get한다.
    // 이미 해당 id에 대한 서명이 완료되었다면, (sign includes id) 이미 체크되었다는 오류 반환
    // 해당 id에 대한 서명이 완료되지 않았다면, sign에 해당 id를 추가한다.
    try {
      const contractData = this.body; // contract_id, id 포함
      const contractors = JSON.parse(
        (await SigningContractStorage.get_contractors(contractData.contract_id))
          .contractors
      ); // 현재 해당 계약서의 계약자들 로드
      const signed = JSON.parse(
        (await SigningContractStorage.get_check_sign(contractData.contract_id))
          .signed
      ); // 현재 해당 계약서의 사인여부 로드

      if (contractors.id.includes(contractData.id)) {
        // 현재 client의 id가 contractors에 존재한다면
        let newSignedId = signed; // 새롭게 반환할 사인 배열
        if (!newSignedId) {
          // 초기상태 -> 사인여부 null
          newSignedId = [contractData.id]; // 현재 계약자 id 추가
        } else {
          // 누군가의 사인여부가 존재
          if (!newSignedId.includes(contractData.id)) {
            // 현재 사인여부에 해당 계약자의 id가 없다면
            newSignedId.push(contractData.id); // 계약자 id 추가
          } else {
            // 현재 사인여부에 해당 계약자의 id가 존재한다면
            return { success: false, msg: "이미 서명하셨습니다." };
          }
        }
        const result = await SigningContractStorage.set_check_sign(
          contractData.contract_id,
          JSON.stringify(newSignedId)
        ); // 해당 계약서의 사인여부 수정
        return result;
      } else {
        // 현재 client의 id가 contractors에 존재하지 않는다면
        return { success: false, msg: "해당 계약의 계약자가 아닙니다." };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = SigningContract;
