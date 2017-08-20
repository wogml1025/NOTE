module.exports = function(app){
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

/* GET home page. */
router.get('/mynoteentry', function(req, res, next) {
  res.render('mynoteEntry', { title: 'mynote' });
});

//////////////////email and nickname duplicate check////////////////
router.post('/emailcheck',function(req,res,next){
  var mail = req.body.email;
  var sql = 'SELECT email FROM mynoteuser WHERE email=?;';
  conn.query(sql,[mail],function(error,results,fields){
    if(error){console.log(error);}
    else{
      var user = results[0];
      if(!user){
        console.log('good email');
        res.send({result:'success'});
      }
      else if(mail == user.email){
        console.log('bad email');
        res.send({result:'fail'});
      }
    }
  });
});

router.post('/nicknamecheck',function(req,res,next){
  var nickname = req.body.nickname;
  var sql = 'SELECT nickname FROM mynoteuser WHERE nickname=?;';
  conn.query(sql,[nickname],function(error,results,fields){
    if(error){console.log(error);}
    else{
      var user = results[0];
      if(!user){
        console.log('good nickname');
        res.send({result:'success'});
      }
      else if(nickname == user.nickname){
        console.log('bad nickname');
        res.send({result:'fail'});
      }
    }
  });
});
//////////////////////////////////////////////////////

router.post('/mynoteentry',function(req,res,next){
  var new_name=req.body.name;
  var new_email=req.body.email;
  var new_pwd=req.body.password;
  var new_nick=req.body.nickname;

  var sql='INSERT INTO `mynoteuser` (`name`,`email`,`password`,`nickname`) VALUES (?,?,?,?);';
  conn.query(sql,[new_name,new_email,new_pwd,new_nick],function(error,results,fields){
    if(error){console.log(error);}
    else{
      console.log('results',results);
      console.log('fields',fields);
      //req.session.authId = new_email;
      //req.session.nick = new_nick;
      req.session.save(function(){
        console.log('entry success');
      });
      res.send({result:'success'});
    }
  });
});
//module.exports = router;
return router;
}
