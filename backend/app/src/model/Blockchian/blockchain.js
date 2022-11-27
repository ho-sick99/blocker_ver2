"use strict";

const { Gateway, Wallets } = require("fabric-network");
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

class Blockchain {

    constructor(body) {
        this.body = body;
    }

    async contract() {
        const contractData = this.body;
        try {
            // 블록체인 네트워크 연결 설정 
            // -------------------------------------
            const ccpPath = path.resolve(__dirname, '../../../connection/connection_property_blocker-orgmsp.json');
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            const mspId = ccp.client.organization;

            const userPath = path.resolve(__dirname, '../../../connection/blocker-orgca.json');
            const user = JSON.parse(fs.readFileSync(userPath, 'utf8'));

            const walletPath = path.join(process.cwd(), 'wallet');
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
            // -------------------------------------

            // 트랜잭션 등록을 위한 가장 최근 트랜잭션 호출을 위한 key value 탐색 
            const gateway1 = new Gateway();
            await gateway1.connect(ccp, { wallet: wallet, identity: user.name, discovery: { enabled: true, asLocalhost: false } });
            // 채널 지정 
            const network1 = await gateway1.getNetwork('test');
            // 호출 체인코드 지정 
            const contract1 = network1.getContract('blocker-cc'); 
            // 체인코드 호출: key value 확인 
            const lastvalue = await contract1.evaluateTransaction('Getlastkey');
            await gateway1.disconnect();
            const target_value = JSON.parse(lastvalue.toString()); 
            console.log("마지막 트랜잭션 key value: " + target_value.hash); 

            // key value를 통해서 최근 트랜잭션 호출 
            const gateway2 = new Gateway();
            await gateway2.connect(ccp, { wallet: wallet, identity: user.name, discovery: { enabled: true, asLocalhost: false } });
            // 채널 지정 
            const network2 = await gateway2.getNetwork('test');
            // 호출 체인 코드 지정 
            const contract2 = network2.getContract('blocker-cc');  // cc-blocker로 수정해야함 
            // 체인코드 호출: 최근 트랜잭션 호출 
            const target_transaction = await contract2.evaluateTransaction('Getcontract', target_value.hash);
            // 블록체인 네트워크 연결 해제 
            await gateway2.disconnect();
            
            console.log("마지막 트랜잭션 호출: " + target_transaction.toString()); 
            const key_hash = crypto.createHash('sha1').update(target_transaction.toString()).digest('hex');  
            console.log("마지막 트랜잭션 기반 해쉬값 생성: " + key_hash); 

            // 계약 채널에 계약서 등록 
            const gateway3 = new Gateway();
            await gateway3.connect(ccp, { wallet: wallet, identity: user.name, discovery: { enabled: true, asLocalhost: false } });
            // 채널 지정 
            const network3 = await gateway3.getNetwork('test');
            // 호출 체인 코드 지정 
            const contract3 = network3.getContract('blocker-cc');  // cc-blocker로 수정해야함 
            // 체인코드 호출: 계약 체결 
            const conclude_res = await contract3.submitTransaction('Conclude', key_hash, contractData.hash, contractData.contractors, contractData.date);
            console.log(conclude_res.toString())
            // 블로체인 네트워크 연결 해제 
            await gateway3.disconnect();


            return { success: true, msg: "트랜잭션 생성 완료" };

        } catch (error) { 
            console.error(`Failed to evaluate transaction: ${error}`);
            return { success: false, msg: "contract can't service now" };
        }

    }

    async canclecontract() {
        const contractData = this.body;
        try {
            // 블록체인 네트워크 연결 설정 
            // -------------------------------------
            const ccpPath = path.resolve(__dirname, '../../../connection/connection_property_blocker-orgmsp.json');
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            const mspId = ccp.client.organization;

            const userPath = path.resolve(__dirname, '../../../connection/blocker-orgca.json');
            const user = JSON.parse(fs.readFileSync(userPath, 'utf8'));

            const walletPath = path.join(process.cwd(), 'wallet');
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
            // -------------------------------------
            // 트랜잭션 등록을 위한 가장 최근 트랜잭션 호출을 위한 key value 탐색 
            const gateway1 = new Gateway();
            await gateway1.connect(ccp, { wallet: wallet, identity: user.name, discovery: { enabled: true, asLocalhost: false } });
            // 채널 지정 
            const network1 = await gateway1.getNetwork('test');
            // 호출 체인코드 지정 
            const contract1 = network1.getContract('blockercancle-cc'); 
            // 체인코드 호출: key value 확인 
            const lastvalue = await contract1.evaluateTransaction('Getlastkey');
            await gateway1.disconnect();
            const target_value = JSON.parse(lastvalue.toString()); 
            console.log("마지막 트랜잭션(파기채널) key value: " + target_value.hash); 

            
            // key value를 통해서 최근 트랜잭션 호출 
            const gateway2 = new Gateway();
            await gateway2.connect(ccp, { wallet: wallet, identity: user.name, discovery: { enabled: true, asLocalhost: false } });
            // 채널 지정 
            const network2 = await gateway2.getNetwork('test');
            // 호출 체인 코드 지정 
            const contract2 = network2.getContract('blockercancle-cc');  // cc-blocker로 수정해야함 
            // 체인코드 호출: 최근 트랜잭션 호출 
            const target_transaction = await contract2.evaluateTransaction('Getcontract', target_value.hash);
            // 블록체인 네트워크 연결 해제 
            await gateway2.disconnect();
            
            console.log("마지막 트랜잭션(파기채널) 호출: " + target_transaction.toString()); 
            const key_hash = crypto.createHash('sha1').update(target_transaction.toString()).digest('hex');  
            console.log("마지막 트랜잭션(파기채널) 기반 해쉬값 생성: " + key_hash); 

            // key value를 통해서 최근 트랜잭션 호출 
            const gateway3 = new Gateway();
            await gateway3.connect(ccp, { wallet: wallet, identity: user.name, discovery: { enabled: true, asLocalhost: false } });
            // 채널 지정 
            const network3 = await gateway3.getNetwork('test');
            // 호출 체인 코드 지정 
            const contract3 = network3.getContract('blockercancle-cc');  // cc-blocker로 수정해야함 
            // 체인코드 호출: 최근 트랜잭션 호출 
            const break_res = await contract3.submitTransaction('Break', key_hash, contractData.hash, contractData.canclehash, contractData.contractors, contractData.date);
            // 블록체인 네트워크 연결 해제 
            await gateway3.disconnect();
                
            return {  success: true, msg: "contract break success!" };
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            return { success: false, msg: "break contract can't service now" };
        }

    }

    async query() {
        const contractData = this.body;
        try {
            // 블록체인 네트워크 연결 설정 
            // -------------------------------------
            const ccpPath = path.resolve(__dirname, '../../../connection/connection_property_blocker-orgmsp.json');
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            const mspId = ccp.client.organization;

            const userPath = path.resolve(__dirname, '../../../connection/blocker-orgca.json');
            const user = JSON.parse(fs.readFileSync(userPath, 'utf8'));

            const walletPath = path.join(process.cwd(), 'wallet');
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
            // -------------------------------------

            // 파기 채널 탐색 
            const gateway1 = new Gateway();
            await gateway1.connect(ccp, { wallet: wallet, identity: user.name, discovery: { enabled: true, asLocalhost: false } });
            // 채널 지정 
            const network1 = await gateway1.getNetwork('test');
            // 호출 체인코드 지정: 파기 계약 채널 
            const contract1 = network1.getContract('blockercancle-cc'); 
            // 체인코드 호출: 파기 계약 원장 검색 
            const ver_res_1 = await contract1.evaluateTransaction('Verification');
            const cancleledger = JSON.parse(ver_res_1.toString())
            await gateway1.disconnect();
            for(var i=0; i<cancleledger.length; i++){
                if(cancleledger[i].canclehash === contractData.v_hash){
                    return { success: false, msg: "파기된 계약" };
                }
            }

            // 계약 채널 탐색 
            const gateway2 = new Gateway();
            await gateway2.connect(ccp, { wallet: wallet, identity: user.name, discovery: { enabled: true, asLocalhost: false } });
            // 채널 지정 
            const network2 = await gateway2.getNetwork('test');
            // 호출 체인코드 지정 
            const contract2 = network2.getContract('blocker-cc'); 
            // 체인코드 호출: 파기 계약 체결 
            const ver_res_2 = await contract2.evaluateTransaction('Verification');
            const contractledger = JSON.parse(ver_res_2.toString())
            await gateway2.disconnect();
            for(var i=0; i<contractledger.length; i++){
                if(contractledger[i].hash === contractData.v_hash){
                    return { success: true, msg: "계약서 검증 성공" };
                }
            }
            
            return { success: false, msg: "지원하지 않는 계약" };

        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            return { success: false, msg: "contract verification can't service now" };
        }
    }

}

module.exports = Blockchain;