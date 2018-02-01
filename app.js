var express = require('express');
var app = express();
var dbClient = require('mariasql');
import config from './config.js';

var db = new dbClient();
db.connect
({
    host: config.mariadb_host,
    user: config.mariadb_user,
    password: config.mariadb_password
});

app.get('/', function (req, res) {
//    resSql = db.query('select * from deliveries'); // db = scan_tracker
    res.send('resSql');
});

app.post('/:id', function (req, res) {
//    db.query('insert ...');
    res.send(req.params.id);
});

app.listen(8080, function () {
  console.log('App is running.');
});
