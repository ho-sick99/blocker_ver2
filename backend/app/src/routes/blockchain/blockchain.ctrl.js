"use strict";

const BlockChain = require("../../model/Blockchain/BlockChain");

const process = {
    contract: async (req, res) => { // 계약 성립
        const bodyData = new BlockChain(req.body); // 계약서 pdf 파일 해시값, 계약자, 계약 날짜
        const contract_res = await bodyData.enrollContract(); 
        return res.send(contract_res);
    },
    canclecontract: async (req, res) => { // 계약 파기
        const bodyData = new BlockChain(req.body); // 파기하고자 하는 계약서의 pdf 파일 해시값, 파기 계약서 pdf 파일 해시값, 계약자, 계약 날짜
        const contract_res = await bodyData.destroyContract(); 
        return res.send(contract_res);
    },
    query: async (req, res) => { // 계약 검증 
        const bodyData = new BlockChain(req.body); // 계약서 pdf 파일이 인코딩된 값
        const contract_res = await bodyData.verificateContract();
        return res.send(contract_res);
    }
}

module.exports = { process };