const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const PORT = 3000;

const db = mysql.createConnection({
    host: "login-lecture.cwgkmjyftslp.ap-northeast-2.rds.amazonaws.com", 
    user: "admin",
    password: "46824682",
    database: "blocker_db", 
});

app.use(cors());
app.use(express.json());
db.connect();
 
app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})

app.get('/', (req,res) => {
    db.query("SELECT * FROM blocker_db.member", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });

})

app.post('/login', (req,res) => {
  const query = "SELECT * FROM blocker_db.member WHERE id = ?;";
  db.query(query, [req.body.id], (err, result) => {
    if (err) {
      res.send({success: "fail: id does't exit"});
    } else {
      if(req.body.pw === result[0].pw) 
        res.send({success: "success"});
      else
        res.send({success: "fail: pw was wrong"});
    }
      });
})

app.post('/register', (req,res) => {
  const query = "INSERT INTO blocker_db.member(id, pw, name) VALUES(?, ?, ?);";
    db.query(query, [req.body.id, req.body.pw, req.body.name], (err) => {   
      if (err) {
        res.send({success: "fail: id does't exit"});
      } else {
        res.send({success: "success"});
      }
    });
})