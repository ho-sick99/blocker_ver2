# Blocker
<div align="center">
<img height="300" alt="main_image" src="https://github.com/ho-sick99/blocker_ver2/assets/88191538/ae17d939-34da-4feb-ae17-f88dcf8cc1c9" >
</div>

# Introduction
동업시 발생할 수 있는 여러 문제 상황을 예방할 수 있고 법적 효력을 보장하기 위한 전자 계약서를 보다 쉽게 작성할 수 있는 전자 계약 서비스 플랫폼 Blocker, Blocker는 하이퍼 레저 패브릭을 통해 무결성이 보장되는 블록체인 기반의 전자 계약 서비스를 동업자들에게 제공하여 보다 쉽고 안전하게 계약을 체결하여 동업을 진행할 수 있습니다. 
> 2022 캡스톤 디자인 - 부경대학교 컴퓨터공학과 <br>
> 2022/09/11 ~ 2022/11/27

# Team

|오예준|문준호|조윤찬|우동균|
|:---:|:---:|:---:|:---:|
|<img width="160px" src="https://avatars.githubusercontent.com/u/88191538?v=4" /> |<img width="160px" src="https://avatars.githubusercontent.com/u/83945722?v=4" /> |<img width="160px" src="https://avatars.githubusercontent.com/u/87313979?v=4"/>|<img width="160px" src="https://avatars.githubusercontent.com/u/96711842?v=4"/>|
|[@nu-jey](https://github.com/nu-jey) |[@ho-sick99](https://github.com/ho-sick99)|[@YOON-CC](https://github.com/YOON-CC)|[@thisis-joe](https://github.com/thisis-joe)|
|부경대학교 컴퓨터공학과 3학년| 부경대학교 컴퓨터공학과 3학년 | 부경대학교 컴퓨터공학과 3학년 | 부경대학교 컴퓨터공학과 3학년 

# Stacks
* BlockChain <br>
![HyperlegderFabric](https://img.shields.io/badge/hyperledger&nbsp;fabric-2F3134?style=for-the-badge&logo=hyperledger&logoColor=white)

* Development Environment  <br>
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![AWS](https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)
![Naver](https://img.shields.io/badge/naver&nbsp;cloud-03C75A?style=for-the-badge&logo=naver&logoColor=white)     

* Development <br>
![ReactNative](https://img.shields.io/badge/react&nbsp;native-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![nodedotjs](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)
![go](https://img.shields.io/badge/go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![mysql](https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
# Views
|동업자 구인 게시판|계시글 작성|계약서|계약서 목록|검증|
|:---:|:---:|:---:|:---:|:---:|
|<img width="160px" src="https://github.com/ho-sick99/blocker_ver2/assets/88191538/2da1f4a7-2385-4e63-b9f3-852f4a46fa32" />|<img width="160px" src="https://github.com/ho-sick99/blocker_ver2/assets/88191538/b479951e-ac37-46b4-99c8-d1ef973132aa"/>|<img width="160px" src="https://github.com/ho-sick99/blocker_ver2/assets/88191538/d8bc9e34-e438-4402-aa51-55df27fe4e34"/>|<img width="160px" src="https://github.com/ho-sick99/blocker_ver2/assets/88191538/c434aab5-1d5b-4151-be0d-ee6eb1defe90"/>|<img width="160px" src="https://github.com/ho-sick99/blocker_ver2/assets/88191538/c423c471-3522-4c31-b2d9-c0562a6ff273"/>|

# Features
### 블록체인을 통한 전자 계약 관리 <br>
  * 전자 계약서에 모든 계약 참여자의 전자 서명이 기입되면 블록체인 네트워크를 통해서 계약이 체결됩니다. <br>
### 이중 채널을 사용한 원장 분리 <br>
  * "파기 계약"의 적용과 기존 원장을 계약 워장과 파기 원장으로 분리함으로써 자유로운 계약, 수정 그리고 파기가 가능합니다. <br>
### 효율적인 검증방식을 통한 전자 계약 무결성 보장 <br>
  * 이중 채널의 원장이 제공하는 효율적인 검증 시퀀스를 통해 계약서 파일로부터 추출한 해시 값을 기반으로 무결성 검증을 수행합니다. <br>
# Architecture
```bash
.
├── LICENSE
├── README.md
├── backend
│   └── app
│       ├── app.js
│       ├── bin
│       │   └── server.js
│       ├── connection > 블록체인 네트워크 연결을 위한 인증서 
│       │   ├── blocker-orderer.json
│       │   ├── blocker-ordererca.json
│       │   ├── blocker-orgca.json
│       │   ├── blocker-peer.json
│       │   ├── connection_property_blocker-oderermsp.json
│       │   └── connection_property_blocker-orgmsp.json
│       ├── package-lock.json
│       ├── package.json
│       ├── src
│       │   ├── config > 데이터 베이스 연결을 위한 파일 
│       │   │   └── db.js
│       │   ├── model > 서버 처리 데이터 모델 
│       │   │   ├── Blockchian > 블록체인 네트워크와 상호작용 하는 모델 
│       │   │   │   └── blockchain.js
│       │   │   ├── Contract > 계약서와 상태에 따라 상속
│       │   │   │   ├── Contract.js
│       │   │   │   ├── N_SignedContract.js
│       │   │   │   ├── N_SignedContractStorage.js
│       │   │   │   ├── SignedContract.js
│       │   │   │   ├── SignedContractStorage.js
│       │   │   │   ├── SigningContract.js
│       │   │   │   └── SigningContractStorage.js
│       │   │   ├── Post > 게시글
│       │   │   │   ├── Post.js
│       │   │   │   └── PostStorage.js
│       │   │   └── User > 회원정보
│       │   │       ├── User.js
│       │   │       └── UserStorage.js
│       │   └── routes > 호출 api에 따른 라우팅 
│       │       ├── contracts
│       │       │   ├── contract.ctrl.js
│       │       │   ├── n_signedContract.ctrl.js
│       │       │   ├── pdf.crtl.js
│       │       │   ├── signedContract.ctrl.js
│       │       │   └── signingContract.ctrl.js
│       │       ├── home
│       │       │   ├── blockchain.ctrl.js
│       │       │   └── index.js
│       │       ├── posts
│       │       │   └── post.ctrl.js
│       │       └── user
│       │           └── user.ctrl.js
│       └── wallet > 신원 인증을 위한 집갑 
│           └── blocker-orgca.id
├── frontend
│   ├── DAPP
│   │   ├── App.js
│   │   ├── app.json
│   │   ├── assets
│   │   │   ├── adaptive-icon.png
│   │   │   ├── favicon.png
│   │   │   ├── icon.png
│   │   │   └── splash.png
│   │   ├── babel.config.js
│   │   ├── context > 로그인 관리를 위한 컨텍스트 
│   │   │   ├── LoginContext.js
│   │   │   └── LoginProvider.js
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   └── screens > 구성화면 
│   │       ├── Contract_Create.js
│   │       ├── Contract_Edit.js
│   │       ├── Contract_View.js
│   │       ├── Login.js
│   │       ├── MyPage.js
│   │       ├── N_Signed.js
│   │       ├── Notice_board.js
│   │       ├── PostEdit.js
│   │       ├── PostView.js
│   │       ├── PostWrite.js
│   │       ├── Proceeding.js
│   │       ├── Signed.js
│   │       ├── Three_Contracts.js
│   │       ├── Verification.js
│   │       └── image
│   └── package-lock.json
└── tunnel
```
# More Info
* <a href="https://www.youtube.com/watch?v=2heD-sxyetw">소개 영상</a>
* <a href="https://www.youtube.com/watch?v=BNjCRVq9Jmo">시연 영상</a>
