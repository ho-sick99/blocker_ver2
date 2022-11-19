"use strict";

const Blockchain = require("../../model/Blockchian/Blockchain");

const output = {
    test: async (req, res) => {
        await Blockchain.connection();
        res.send({ success: true });
    },
    wallet: async (req, res) => {
        await Blockchain.createWallet();
        res.send({ success: true });
    }
}

module.exports = { output };