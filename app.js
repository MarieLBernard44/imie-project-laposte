var express = require('express');
var app = express();
var dbClient = require('mariasql');

var db = new dbClient();
db.connect
({
    host: '127.0.0.1',
    user: 'homestead',
    password: 'secret'
});

app.get('/', function (req, res) {
//    resSql = db.query('select * from deliveries');
    res.send('resSql');
});

app.post('/:id', function (req, res) {
//    db.query('insert ...');
    res.send(req.params.id);
});

app.listen(8080, function () {
  console.log('App is running.');
});
