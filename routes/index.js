const express = require('express');
const middleware = require('../middleware/');
const connection = require('../config/');

connection.connect(function(error) {
    if (error) throw error;
    console.log('mysql connecting.........');
});

let router = express.Router();

router.get('/books', function(req, res) {
    connection.query('select * from book where isdeleted = 0', function(error, results) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

router.get('/book/:id', function(req,res) {
    connection.query('select * from book where id = ? and isdeleted = 0 limit 1', [req.params.id], function(error, results) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

let check = [middleware.checkTitleNull, middleware.checkTitleLength, middleware.checkAuthorNull, middleware.checkAuthorLength];

router.post('/book', check, function(req, res) {
    connection.query('insert into book set ?', req.body, function(error, results) {
        if (error) throw error;
        res.status(201).send({message : 'created'});
    });
});

router.put('/book', check, function(req, res) {
    let sql = 'update book set title = ?, author = ?, publister = ?, price = ? where id = ? and isdeleted = 0';
    connection.query(sql, [req.body.title, req.body.author, req.body.publister, req.body.price, req.body.id],
        function(error) {
        if (error) throw error;
        res.send({message : 'modify'});
    });
});

router.delete('/book', function(req, res) {
    connection.query('update book set isdeleted = 1 where id = ?', req.body.id, function(error, results) {
        if (error) throw error;
        res.send({message : 'deleted'});
    })
});

module.exports = router;
