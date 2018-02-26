const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'huyen123',
    database : 'book'
});

module.exports = connection;

