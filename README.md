# blocker
2022캡스톤디자인

front
1. DAPP으로 이동하여 ".env" 파일 생성 
2. env 파일 내부에 다음과 같이 작성
    HOSTNAME = '자기로컬IP주소'
3. nodemodule 설치 -> cmd: "npm i"로 
4. expo 실행 -> cmd: "expo start" ||  "expo start --tunnel"


back
1. app으로 이동하여 ".env" 파일 생성
2. env 파일 내부에 다음과 같이 작성
    PORT = 3002
    DB_HOST = 'login-lecture.cwgkmjyftslp.ap-northeast-2.rds.amazonaws.com'
    DB_USER =  '계정'
    DB_PASSWORD = '비밀번호'
    DB_DATABASE = 'blocker_db'
3. nodemodule 설치 -> cmd: "npm i"로 
4. 서버 실행 -> cmd: "npm start" 


new start