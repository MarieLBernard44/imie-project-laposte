var mysql = require('mysql');
var setting = require('./setting');
var host = require('./setting');

var con = mysql.createConnection({
    host: setting.host,
    user: setting.user,
    password: setting.pws,
    database: "Mailing"
});

var requete = (requete, cb) => {
    con.query(requete, function (err, result, fields) {
        if (err) throw err
        cb(result)
    })
}

// Pour récupérer un utilisateur
var findUser = (user, succes) => {
    var sql = mysql.format("SELECT * from users where email = ? and mdp = ?;", [user.email, user.mdp])
    requete(sql, succes)
}

// Pour récupérer un token
var findToken = (token, succes) => {
    var sql = mysql.format("SELECT * from token where id = ?;", [token])
    requete(sql, succes)
}

// Pour placer un token
var setToken = (token, succes) => {
    var sql = mysql.format("INSERT INTO token (id) VALUES (?);", [token])
    requete(sql, succes)
}

// Pour delete un token
var deleteToken = (token, succes) => {
    var sql = mysql.format("DELETE from token where id = ?;", [token])
    console.log('model.js -> 39 : sql', sql )
    requete(sql, succes)
}

//
// Requete de selection d'informations d'une table
//

var selectAllById = (tableName, id, succes) => {
    var sql = mysql.format("SELECT * from ?? where id = ?;", [tableName, id])
    requete(sql, succes)
}

var selectAll = (tableName, succes) => {
    var sql = mysql.format("SELECT * from ??;", [tableName])
    requete(sql, succes)
}

var getLastId = (tableName, succes) => {
    var sql = mysql.format("select * from ?? order by id desc limit 1;", [tableName])
    requete(sql, succes)
}

//
// Requete d'update par id de chaque tables
//

var updateMailById = (id, mailing, cb) => {
    var sql = mysql.format("UPDATE email SET sujet = ?, date = ?, contenu = ? WHERE id = ?;", [mailing.sujet, mailing.date, mailing.contenu, id])
    requete(sql, cb)
}

//
// Requete d'insert par id pour chaque tables
//

var insertMailling = (mailing, succes) => {
    var sql = mysql.format("INSERT INTO email (sujet, date, contenu) VALUES ('??', ?, '??');", [mailing.sujet, mailing.date, mailing.contenu])
    requete(sql, succes)
}

//
// Requete de suppression par id de toutes les informations d'une table
//

var deletedAllById = (tableName, id, succes) => {
    var sql = mysql.format("DELETE from ?? where id = ?;", [tableName, id])
    requete(sql, succes)
}

exports.allById = selectAllById
exports.all = selectAll
exports.insertMailling = insertMailling
exports.getLastId = getLastId
exports.updateMailById = updateMailById
exports.deletedAllById = deletedAllById
exports.findUser = findUser
exports.findToken = findToken
exports.setToken = setToken
exports.deleteToken = deleteToken