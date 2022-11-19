"use strict";

const fs = require("fs");
const { Gateway, Wallets } = require("fabric-network");

class Blockchain {
    static async connection() {
        // read a common connection profile in json format
        const data = fs.readFileSync(process.cwd() + "/../connectionProfile.json");
        const connectionProfile = JSON.parse(data);
        const wallet = await Wallets.newFileSystemWallet('../identity/user/blockerca/wallet');

        // use the loaded connection profile
        const gateway = new Gateway();
        await gateway.connect(connectionProfile, {
            identity: 'blockerca',
            wallet
        });
        const network = await gateway.getNetwork('mychannel');
    }

    static async createWallet() {
        const wallet = await Wallets.newFileSystemWallet('../identity/user/blockerca/wallet');

        const certificate = process.env.WALLET_CERTIFICATE;
        const privateKey = process.env.WALLET_PRIVATEKEY;
        const mspId = process.env.BLOCKCHAIN_MSPID;
        
        const identityLabel = 'blockerca';
        const identity = {
            credentials: {
                certificate,
                privateKey,
            },
            mspId,
            type: 'X.509',
        };
        await wallet.put(identityLabel, identity);
    }
}

module.exports = Blockchain;