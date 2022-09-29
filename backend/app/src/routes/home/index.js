"use strict";

const express = require("express");
const router = express.Router(); // 라우터 모듈

// 컨트롤러 로드
const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);

// process
router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/chk_id", ctrl.process.chk_id);

// post_sys
router.post("/post_view", ctrl.post_sys.post_view);
router.post("/post_add", ctrl.post_sys.post_add);
router.post("/post_upd", ctrl.post_sys.post_upd);
router.post("/post_del", ctrl.post_sys.post_del);

// contract_sys


module.exports = router;