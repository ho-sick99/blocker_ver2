"use strict";

const mysql = require("mysql");

const db = mysql.createConnection({ // db 설정
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect();

module.exports = db;