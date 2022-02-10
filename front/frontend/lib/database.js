const mysql = require('mysql'); 

module.exports = function () {
    return {
      init: function () {
        return mysql.createConnection({
          host: 'mysqltest.cc5ngcwi0r6y.us-east-1.rds.amazonaws.com',
          port: '3306',
          user: 'jmj',
          password: 'aws991011',
          database: 'test'
        })
      },
      
      db_open: function (con) {
        con.connect(function (err) {
          if (err) {
            console.error('mysql connection error :' + err);
          } else {
            console.info('mysql is connected successfully.');
          }
        })
      }
    }
  };