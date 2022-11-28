"use strict";
const pdfParse = require("pdf-parse");
const crypto = require('crypto');
const hash = crypto.getHashes(); // 이것무엇?

// 컨트롤러 파일만 생성, 데이터 모델은 필요 없을듯 해쉬화만 시키면 되니껀 
const file_process = {
    hash_pdf: async (req, res) => { // 인코딩된 pdf 파일 해시화
        console.log("Pdf receive");
        const data = (await pdfParse(req.file.buffer)).text; // pdf 파일이 인코딩된 값에서 텍스트 데이터만 추출
        console.log("***Print contract metaData***");
        console.log(data);
        console.log("***END***");
        const hash = crypto.createHash('sha1').update(data).digest('hex'); // 데이터에서 텍스트만 뽑아서 해쉬화

        res.send({
            pdfText: data, // 대조용
            hash // 해시값 반환
        });
    },
};

module.exports = {
    file_process,
};
