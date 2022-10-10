"use strict";

const express = require("express");
const router = express.Router(); // 라우터 모듈
const multer = require("multer");
var upload = multer();

// 컨트롤러 로드
const userCtrl = require("./user.ctrl"); // user 컨트롤러
const postCtrl = require("./post.ctrl"); // post 컨트롤러
const contractCtrl = require("./contract.ctrl"); // contract 컨트롤러
const pdfCtrl = require("./pdf.crtl")

// process
router.post("/login", userCtrl.process.login);
router.post("/register", userCtrl.process.register);
router.post("/chk_id", userCtrl.process.chk_id);
router.post("/bookmark", userCtrl.process.bookmark_info);
router.post("/my_contract", userCtrl.process.my_contract_info);
router.post("/my_post", userCtrl.process.my_post_info);
router.post("/get_sign_info", userCtrl.process.get_sign_info);
router.post("/set_sign_info", userCtrl.process.set_sign_info);


// post 관련 api 라우팅
router.post("/post_view", postCtrl.post_sys.post_view);
router.post("/post_add", postCtrl.post_sys.post_add);
router.post("/post_upd", postCtrl.post_sys.post_upd);
router.post("/post_del", postCtrl.post_sys.post_del);

// contract 관련 api 라우팅
router.post("/contract_load", contractCtrl.process.contract_load);
router.post("/contract_view", contractCtrl.process.contract_view);
router.post("/contract_add", contractCtrl.process.contract_add);
router.post("/contract_upd", contractCtrl.process.contract_upd);
router.post("/contract_del", contractCtrl.process.contract_del);

// pdf 처리
router.post("/upload_pdf", upload.single("file"), pdfCtrl.file_process.hash_pdf);


module.exports = router;