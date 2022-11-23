"use strict";

const { Gateway, Wallets } = require("fabric-network");
const path = require('path');
const fs = require('fs');

class Blockchain {

    constructor(body) {
        this.body = body;
    }

    // 계약 성립
    async contract() {
        const contractData = this.body;
        try {
            const ccpPath = path.resolve(__dirname, process.env.BLOCKER_CCP_PATH);
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            const mspId = ccp.client.organization;

            const userPath = path.resolve(__dirname, process.env.BLOCKER_USER_PATH);
            const user = JSON.parse(fs.readFileSync(userPath, 'utf8'));

            const walletPath = path.join(process.cwd(), process.env.BLOCKER_WALLET_PATH);
            const wallet = await Wallets.newFileSystemWallet(walletPath);

            var identity = await wallet.get(user.name);
            if (!identity) {
                const x509Identity = {
                    credentials: {
                        certificate: Buffer.from(user.cert, 'base64').toString('utf8'),
                        privateKey: Buffer.from(user.key, 'base64').toString('utf8'),
                    },
                    mspId: mspId,
                    type: 'X.509',
                };
                await wallet.put(user.name, x509Identity);
                identity = await wallet.get(user.name);
            }
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet: wallet, identity: user.name, discovery: { enabled: true, asLocalhost: false } });
            const network = await gateway.getNetwork('test');
            const contract = network.getContract('atcc'); // 채널명 

            // 체인코드 호출: 계약 체결 
            const result = await contract.evaluateTransaction('GetAllAssets');

            // 블로체인 네트워크 연결 해제 
            await gateway.disconnect();
            return { result: JSON.parse(result.toString())};
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            return { result: "contract faild" };
        }

    }

    // 계약 파기
    async canclecontract() {
        const contractData = this.body;
        try {
            const ccpPath = path.resolve(__dirname, process.env.BLOCKER_CCP_PATH);
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            const mspId = ccp.client.organization;

            const userPath = path.resolve(__dirname, process.env.BLOCKER_USER_PATH);
            const user = JSON.parse(fs.readFileSync(userPath, 'utf8'));

            const walletPath = path.join(process.cwd(), process.env.BLOCKER_WALLET_PATH);
            const wallet = await Wallets.newFileSystemWallet(walletPath);

            var identity = await wallet.get(user.name);
            if (!identity) {
                const x509Identity = {
                    credentials: {
                        certificate: Buffer.from(user.cert, 'base64').toString('utf8'),
                        privateKey: Buffer.from(user.key, 'base64').toString('utf8'),
                    },
                    mspId: mspId,
                    type: 'X.509',
                };
                await wallet.put(user.name, x509Identity);
                identity = await wallet.get(user.name);
            }

            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet: wallet, identity: user.name, discovery: { enabled: true, asLocalhost: false } });
            const network = await gateway.getNetwork('blocker-canclecontract');
            const contract = network.getContract('atcc'); // 채널명 

            // 체인코드 호출: 파기 계약 체결 
            const result = await contract.evaluateTransaction('GetAllAssets');
            
            await gateway.disconnect();

            return { result: "contract success!" };
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            return { result: "contract faild" };
        }

    }

    // 계약 검증
    async query() {
        const contractData = this.body;
        const bool_hash = true;
        try {
            const ccpPath = path.resolve(__dirname,process.env.BLOCKER_CCP_PATH);
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            const mspId = ccp.client.organization;

            const userPath = path.resolve(__dirname, process.env.BLOCKER_USER_PATH);
            const user = JSON.parse(fs.readFileSync(userPath, 'utf8'));

            const walletPath = path.join(process.cwd(), process.env.BLOCKER_WALLET_PATH);
            const wallet = await Wallets.newFileSystemWallet(walletPath);

            var identity = await wallet.get(user.name);
            if (!identity) {
                const x509Identity = {
                    credentials: {
                        certificate: Buffer.from(user.cert, 'base64').toString('utf8'),
                        privateKey: Buffer.from(user.key, 'base64').toString('utf8'),
                    },
                    mspId: mspId,
                    type: 'X.509',
                };
                await wallet.put(user.name, x509Identity);
                identity = await wallet.get(user.name);
            }
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet: wallet, identity: user.name, discovery: { enabled: true, asLocalhost: false } });
            const network = await gateway.getNetwork('blocker-contract');
            // 체인코드 호출: 계약 체결 
            await gateway.disconnect();

            // 결과 반환 
            if (bool_hash) {
                const res = {
                    success: true,
                    hash: "123",
                    contrators: "Tempid2",
                    Date: "2022-11-21"
                }
                return res;
            }
            else {
                const res = {
                    success: false
                }
                return res;
            }

        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            return { result: "contract faild" };
        }

    }

}

module.exports = Blockchain;