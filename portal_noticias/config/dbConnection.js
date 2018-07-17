var mysql = require('mysql');

var connection = function(){
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
  });
}

module.exports = function(){
  return connection;
}
