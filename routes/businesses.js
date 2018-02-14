var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// var connect_to_db = mysql.createConnection({
//     host: process.env.RDS_HOSTNAME,
//     user: process.env.RDS_USERNAME,
//     password: process.env.RDS_PASSWORD,
//     port: process.env.RDS_PORT,
//     database: process.env.RDS_DB_NAME
// });

var connect_to_db = mysql.createConnection({
    host: 'zatiqdb.c7jcnoczfdsk.us-west-2.rds.amazonaws.com',
    user: 'ZatiqDev',
    password: 'zatiqdevs3',
    port: 3279,
    database: 'Zatiq_Database'
});

router.post('/', function(req, res, next) {
  var businessEmail = req.body.businessEmail;
  var businessPassword = req.body.businessPassword;

  connect_to_db.query("SELECT * FROM ZatiqBusinesses WHERE businessEmail = ? AND businessPassword = ?", [businessEmail, businessPassword], function(err, row, field) {
      if (err) {
          console.log(err);
          res.send({
              'success': false,
              'message': 'Could not connect to DB'
          });
      }

      if (row.length > 0) {
          res.send({
              'success': true,
              'business': row[0].businessName,
              'hasSetInformation': row[0].hasSetInformation
          });
      } else {
          res.send({
              'success': false,
              'message': 'User not found'
          });
      }
  })
});

router.post('/register', function(req, res, next) {
    var businessEmail = req.body.businessEmail;
    console.log(businessEmail);
    var businessName = req.body.businessName;
    var businessPassword = req.body.businessPassword;

    connect_to_db.query("SELECT * FROM ZatiqBusinesses WHERE businessEmail = ?", [businessEmail], function(err, row, field) {
        if (err) {
            console.log(err);
            res.send({
                'success': false,
                'message': 'Could not connect to server'
            });
        }

        if (row.length > 0) {
            res.send({
                'success': false,
                'message': row[0].businessEmail + ' already exists!'
            });
        } else {
            var businessInfo = {businessName: req.body.businessName, businessEmail: req.body.businessEmail, businessPassword: req.body.businessPassword};
            console.log(businessInfo);
            connect_to_db.query("INSERT INTO ZatiqBusinesses SET ?", businessInfo, function(err, row, field) {
                if (err) {
                    console.log(err);
                    res.send({
                        'success': false,
                        'message': 'Could not connect to server'
                    });
                } else {
                    res.send({
                        'success': true,
                        'message': businessName + ' registered successfully!',
                    })
                }
            })
        }
    })
})

module.exports = router;
