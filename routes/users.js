var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connect_to_db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'newpassword',
    database: 'ZatiqDB'
});

router.post('/', function(req, res, next) {
  res.send({message: 'Testing to get data from backend'});
});

module.exports = router;
