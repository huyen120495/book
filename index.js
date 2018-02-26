const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const middleware = require('./middleware');

const app = express();

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'huyen123',
    database : 'book'
});

connection.connect(function(error) {
   if (error) throw error;
   console.log('connecting.....?!!!!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.listen(3000);

app.get('/books', function(req, res) {
    connection.query('select * from book where isdeleted = 0', function(error, results) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.get('/book/:id', function(req,res) {
    connection.query('select * from book where id = ? and isdeleted = 0 limit 1', [req.params.id], function(error, results) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

let check = [middleware.checkTitleNull, middleware.checkTitleLength,middleware.checkAuthorNull,middleware.checkAuthorLength];

app.post('/book', check, function(req, res) {
    connection.query('insert into book set ?', req.body, function(error, results) {
        if (error) throw error;
        res.status(201).send({message : 'created'});
    });
});

app.put('/book', check, function(req, res) {
    let sql = 'update book set title = ?, author = ?, publister = ?, price = ? where id = ? and isdeleted = 0';
    connection.query(sql, [req.body.title, req.body.author, req.body.publister, req.body.price, req.body.id],
        function(error, results) {
        if (error) throw error;
        res.send({message : 'modify'});
    });
});

app.delete('/book', function(req, res) {
    connection.query('update book set isdeleted = 1 where id = ?', req.body.id, function(error, results) {
        if (error) throw error;
        res.send({message : 'deleted'});
    })
});
