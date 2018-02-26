const express = require('express');
const bodyParser = require('body-parser');
const index = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/', index);

app.listen(3000, function(error) {
    if (error) throw error;
    console.log('listen port 3000.........');
});

