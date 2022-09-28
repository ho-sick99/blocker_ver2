"use strict";

const express = require("express");
const router = express.Router(); // 라우터 모듈

// 컨트롤러 로드
const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/chk_id", ctrl.process.chk_id);

module.exports = router;