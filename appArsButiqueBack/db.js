var mysql = require('mysql');
var pool = null;

exports.connect = function (done) {
    pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'phpmyadmin',
        password: 'root',
        database: '_ars_boutique_bd',
        port: 3306
    });

    done();
}

exports.get = function () {
    return pool;

}