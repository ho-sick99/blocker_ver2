"use strict";

// 모듈 로드
const app = require("../app");
const PORT = process.env.PORT; // 포트번호

app.listen(PORT, () => { // 서버 가동
  console.log(`Server run : http://localhost:${PORT}/`)
})