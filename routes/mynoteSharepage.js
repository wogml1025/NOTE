module.exports = function(app){
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

/* GET users listing. */
router.get('/mynotesharepage', function(req, res, next) {
  var sql = 'select * from share;';
  conn.query(sql,function(error,results,fields){
    if(error){
      console.log(error);
      console.log('failed to get from share table');
    }
    else{
      console.log('get from share table success');
      res.render('mynoteSharepage',{title:'Share page',content:results});
    }
  });
});

router.post('/shownote',function(req,res,next){
  var sql = 'select foldername,notename from share where foldername=?';
  var foldername = req.body.folder;
  conn.query(sql,[foldername],function(error,results,fields){
    if(error){
      console.log(error);
      console.log('get note information fail in share table');
    }
    else{
      console.log('get note information success in share table');
      res.send({result:'success',note:results});
    }
  });
});

router.post('/callcontent',function(req,res,next){
  var sql = 'select * from share where foldername=? and notename=?';
  var foldername = req.body.foldertitle;
  var notename = req.body.notetitle;
  conn.query(sql,[foldername,notename],function(error,results,fields){
    if(error){
      console.log(error);
      console.log('failed to call content in share table');
    }
    else{
      console.log('call content in share table success');
      res.send({result:'success',contents:results[0].content});
    }
  });
});

//module.exports = router;
return router;
}
