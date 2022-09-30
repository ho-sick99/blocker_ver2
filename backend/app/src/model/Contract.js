"use strict";

const ContractStorage = require("./ContractStorage"); // 계약서 DB 접근 클래스 로드

// 계약서 클래스
class Contract { 
    constructor(body) {
        this.body = body;
    }

    async view_contract() { // 계약서 데이터 반환
        const contractData = this.body; 
        try {
            const response = await ContractStorage.get_contract_info(contractData.contract_id); // 계약서 id를 인수로 계약서의 정보를 요청
            return response;
        } catch (err) { // 에러 발생 시 처리 (수정해야함)
            return { success: false, err };
        }
    }

    async add_contract() { // 계약서 생성
        const contractData = this.body;
        console.log(contractData);
        try {
            const response = await ContractStorage.insert_contract(contractData); // 입력된 데이터를 인수로 DB에 새로운 계약서 생성 요청
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async update_contract() { // 계약서 수정
        const contractData = this.body;
        try {
            const response = await ContractStorage.update_contract(contractData); // 계약서 정보 수정 시도
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async delete_contract() { // 계약서 삭제
        const contractData = this.body;
        try {
            const response = await ContractStorage.delete_contract(contractData.contract_id); // 계약서 삭제 시도
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

}


module.exports = Contract;
