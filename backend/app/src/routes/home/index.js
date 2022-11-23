"use strict";

const express = require("express");
const router = express.Router(); // 라우터 모듈
const multer = require("multer");
var upload = multer();

// 컨트롤러 로드
const userCtrl = require("../user/user.ctrl"); // user 컨트롤러
const postCtrl = require("../posts/post.ctrl"); // post 컨트롤러
const pdfCtrl = require("../contracts/pdf.crtl"); // pdf 컨트롤러
const contractCtrl = require("../contracts/contract.ctrl"); // contract 컨트롤러
const n_signedContractCtrl = require("../contracts/n_signedContract.ctrl"); // 미체결 계약서 컨트롤러
const signingContractCtrl = require("../contracts/signingContract.ctrl"); // 진행중 계약서 컨트롤러
const signedContractCtrl = require("../contracts/signedContract.ctrl"); // 체결 계약서 컨트롤러
const blockchainCtrl = require("../blockchain/blockchain.ctrl"); // 체결 계약서 컨트롤러

// process
router.post("/login", userCtrl.process.login);
router.post("/register", userCtrl.process.register);
router.post("/chk_id", userCtrl.process.chk_id);
router.post("/bookmark", userCtrl.process.bookmark_info);
router.post("/edit_bookmark", userCtrl.process.edit_bookmark_info);
router.post("/my_post", userCtrl.process.my_post_info);
router.post("/edit_my_post", userCtrl.process.edit_my_post_info);
router.post("/my_contract", userCtrl.process.my_contract_info);
router.post("/get_sign_info", userCtrl.process.get_sign_info);
router.post("/set_sign_info", userCtrl.process.set_sign_info);
router.post("/get_user_name", userCtrl.process.get_user_name);

// post 관련 api 라우팅 //
router.get("/post_load", postCtrl.post_sys.post_load)
router.post("/mypost_load", postCtrl.post_sys.mypost_load)
router.post("/post_view", postCtrl.post_sys.post_view);
router.post("/post_add", postCtrl.post_sys.post_add);
router.post("/post_upd", postCtrl.post_sys.post_upd);
router.post("/post_del", postCtrl.post_sys.post_del);

// contract 관련 api 라우팅 //
// 계약서별 load 라우팅 분리, 계약서 view 만들기
router.post("/contract_del", contractCtrl.process.contract_del);

// pdf 처리
router.post("/upload_pdf", upload.single("file"), pdfCtrl.file_process.hash_pdf);

// 미체결
router.post("/contract_load", n_signedContractCtrl.process.contract_load);
router.post("/contract_view", n_signedContractCtrl.process.contract_view);
router.post("/contract_add", n_signedContractCtrl.process.contract_add);
router.post("/contract_upd", n_signedContractCtrl.process.contract_upd);
router.post("/share_contract", n_signedContractCtrl.process.share_contract);

// 진행중
router.post("/signing_contract_load", signingContractCtrl.process.contract_load); 
router.post("/signing_contract_view", signingContractCtrl.process.contract_view);
router.post("/progress_contract", signingContractCtrl.process.progress_contract);
router.post("/cancle_progress_contract", signingContractCtrl.process.cancle_progress_contract);
router.post("/check_sign", signingContractCtrl.process.check_sign);
router.post("/signing_contract_add", signingContractCtrl.process.add_signing_contract);
router.post("/get_singing_avoidance", signingContractCtrl.process.get_singing_avoidance);

// 체결
router.post("/signed_contract_load", signedContractCtrl.process.contract_load); 
router.post("/signed_contract_view", signedContractCtrl.process.contract_view);
router.post("/cancle_contract", signedContractCtrl.process.cancle_contract);
router.post("/delete_contract", signedContractCtrl.process.delete_contract);
router.post("/get_singed_avoidance", signedContractCtrl.process.get_singed_avoidance);
router.post("/set_singed_avoidance", signedContractCtrl.process.set_singed_avoidance);

// blockchain 관련 api 라우팅 //
router.post("/contract", blockchainCtrl.process.contract) // 계약 성립
router.post("/canclecontract", blockchainCtrl.process.canclecontract) // 계약 파기
router.post("/query", blockchainCtrl.process.query) // 계약 검증

module.exports = router;
