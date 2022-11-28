"use strict"

const Chaincode = require("./Chaincode");

class BlockChain {
    constructor(body) {
        this.body = body; // Object 형태
    }

    // 계약 성립
    async enrollContract() {
        const contractData = this.body; // 계약서 pdf 파일 해시값, 계약자, 계약 날짜
        const result = Chaincode.contract(contractData); // 계약서 데이터를 기반으로 계약 성립 체인코드 호출

        return result; // 결과값 반환
    }

    // 계약 파기
    async destroyContract() {
        const contractData = this.body; // 파기하고자 하는 계약서의 pdf 파일 해시값, 파기 계약서 pdf 파일 해시값, 계약자, 계약 날짜
        const result = Chaincode.canclecontract(contractData); // 계약서 데이터를 기반으로 계약 파기 체인코드 호출

        return result; // 결과값 반환
    }

    // 계약 검증 
    async verificateContract() {
        const contractData = this.body; // 계약서 pdf 파일이 인코딩된 값
        const result = Chaincode.query(contractData); // 계약서 데이터를 기반으로 계약 검증 체인코드 호출

        return result; // 결과값 반환 (true or false)

    }
}

module.exports = BlockChain;