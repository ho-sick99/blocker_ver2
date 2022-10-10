"use strict";
const pdfParse = require("pdf-parse");
const crypto = require('crypto');
const hash = crypto.getHashes();

// 컨트롤러 파일만 생성, 데이터 모델은 필요 없을듯 해쉬화만 시키면 되니껀 
const file_process = {
    hash_pdf: (req, res) => {
        console.log("pdf receive")
        let buff = req.file.buffer;
        pdfParse(buff).then((data) => {
        const hashPwd = crypto.createHash('sha1').update(data.text).digest('hex');  // 해쉬화하는 방법은 추후에 결정 
        console.log(data.text);
        res.send({ 
            pdfText: data.text,
            hash: hashPwd
            });
        });
    },
};

module.exports = {
    file_process,
};
  