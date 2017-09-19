module.exports = function(app){
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

/* GET users listing. */
router.get('/uu', function(req, res, next) {
  res.send('respond with a resource mynote page');
});

//module.exports = router;
return router;
}
