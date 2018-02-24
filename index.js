const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

var app = express();

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'huyen123',
    database : 'book'
});

connection.connect(function(error){
   if (error) throw error;
   console.log('connecting.....?!!!!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.listen(3000);

app.get('/books', function(req, res) {
    connection.query('select * from book', function(error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.get('/book/:id', function(req,res) {
    connection.query('select * from book where id = ?', [req.params.id], function(error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.post('/book', function(req, res) {
    connection.query('insert into book set ?', req.body, function(error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.put('/book', function(req, res) {
    connection.query('update book set title = ?, author = ?, publister = ?, price = ? where id = ?', [req.body.title, req.body.author, req.body.publister, req.body.price, req.body.id], function(error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.delete('/book', function(req, res) {
    connection.query('delete from book where id = ?', req.body.id, function(error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    })
});