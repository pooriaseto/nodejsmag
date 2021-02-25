
const dbConfig = require('../config/db');
const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

module.exports = pool;