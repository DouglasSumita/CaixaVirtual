const mysql = require('mysql');

let pool = mysql.createPool({
    "user": 'root',
    "password": 'senha1',
    "database": 'caixavirtual',
    "host": 'localhost',
    "port": 3306
});

exports.pool = pool;
