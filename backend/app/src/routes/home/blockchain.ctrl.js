"use strict";

const Blockchain = require("../../model/Blockchian/blockchain");

const process = {
    contract: async (req, res) => {
        console.log("계약 채널 접근")
        const bodyData = new Blockchain(req.body)
        const contract_res = await bodyData.contract();
        return res.send(contract_res);
    },
    canclecontract: async (req, res) => {
        console.log("파기 채널 접근")
        const bodyData = new Blockchain(req.body)
        const contract_res = await bodyData.canclecontract();
        return res.send(contract_res);
    },
    query: async (req, res) => {
        console.log("계약 & 파기 채널 접근")
        const bodyData = new Blockchain(req.body)
        const contract_res = await bodyData.query();
        return res.send(contract_res);
    }
}

module.exports = { process };