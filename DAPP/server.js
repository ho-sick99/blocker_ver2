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