"use strict";

const N_SignedContractStorage = require("./N_SignedContractStorage"); // 미체결 계약서 DB 접근 클래스 로드
const SigningContractStorage = require("./SigningContractStorage"); // 진행중 계약서 DB 접근 클래스 로드
const SignedContractStorage = require("./SignedContractStorage"); // 진행중 계약서 DB 접근 클래스 로드

// 계약서 클래스
class Contract {
  constructor(body) {
    this.body = body;
  }

  // 이것을 하위 클래스들에서 분할하여야하나? 의문
  async load_contract() {
    // 현재 계정의 계약서들 데이터 로드
    const contractData = this.body;
    try {
      let response = null;
      switch (contractData.contract_type) {
        case "n_signed": // 미체결
          response = await N_SignedContractStorage.load_contracts_info(
            contractData.id
          ); // 유저 id를 인수로 현재 계정의 미체결 계약서의 정보를 요청
          break;
        case "signing": // 진행중
          response = await SigningContractStorage.load_signing_contracts_info(
            contractData.id
          ); // 유저 id를 인수로 현재 계정의 진행중 계약서의 정보를 요청
          break;
        case "signed": // 체결
          response = await SignedContractStorage.load_signed_contracts_info(
            contractData.id
          ); // 유저 id를 인수로 현재 계정의 체결 계약서의 정보를 요청
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

  // async view_contract() {
  //   // 계약서 데이터 반환
  //   const contractData = this.body;
  //   try {
  //     const response = await ContractStorage.get_contract_info(
  //       contractData.contract_id
  //     ); // 계약서 id를 인수로 계약서의 정보를 요청
  //     return response;
  //   } catch (err) {
  //     // 에러 발생 시 처리 (수정해야함)
  //     return { success: false, err };
  //   }
  // }

  // async add_contract() {
  //   // 계약서 생성
  //   const contractData = this.body;
  //   console.log(contractData);
  //   try {
  //     const response = await ContractStorage.insert_contract(contractData); // 입력된 데이터를 인수로 DB에 새로운 계약서 생성 요청
  //     return response;
  //   } catch (err) {
  //     return { success: false, err };
  //   }
  // }

  // async update_contract() {
  //   // 계약서 수정
  //   const contractData = this.body;
  //   try {
  //     let response = null;
  //     switch (contractData.contract_type) {
  //       case "n_signed": // 미체결
  //         response = await N_SignedContractStorage.update_contract(contractData); // 계약서 정보 수정 시도
  //         break;
  //       case "signing": // 진행중
  //         response = await SigningContractStorage.update_contract(contractData); // 계약서 정보 수정 시도
  //         break;
  //       case "signed": // 체결
  //         response = await SignedContractStorage.update_contract(contractData); // 계약서 정보 수정 시도
  //         break;
  //       default: // 계약서 타입 오류
  //         const err = new Error("계약서 타입 오류");
  //         response = { success: false, err }; // 에러 생성후 반환
  //     }
  //     return response;
  //   } catch (err) {
  //     return { success: false, err };
  //   }
  // }

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
