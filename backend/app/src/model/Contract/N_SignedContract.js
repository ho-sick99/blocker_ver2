"use strict";

const Contract = require("./Contract");
const N_SignedContractStorage = require("./N_SignedContractStorage");
const SigningContractStorage = require("./SigningContractStorage");

// 미체결 계약서 클래스
class N_SignedContract extends Contract { // 계약서 클래스를 상속함 -> 굳이? 나중 회의때 고려
    constructor(body) {
        super(body);
    }

    // 계약 진행 메서드 (미체결 -> 진행중)
    async share_contract() {
        const contractData = this.body;
        const n_signedContractData = await N_SignedContractStorage.get_contract_info(contractData.contract_id);
        const createRes = await SigningContractStorage.insert_contract({ ...n_signedContractData, contractors: contractData.contractors })

    }
}

module.exports = N_SignedContract;