module.exports = function(app){
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

/* GET home page. */
router.get('/mynotelogin', function(req, res, next) {
  //res.render('mynoteLogin', { title: 'mynote' });
  if(req.session.authId){
    res.redirect('/mynote/mynotemypage');
  }
  else{
    res.render('mynoteLogin',{title:'mynote'});
  }
});

router.post('/mynotelogin',function(req,res,next){
  var user_email = req.body.email;
  var user_password = req.body.password;

  var sql = 'SELECT * FROM mynoteuser WHERE email=?';
  conn.query(sql,[user_email],function(error,results,fields){
    if(error){
      console.log(error);
    }
    else{
      var user = results[0];
      if(user_password == user.password){
        console.log('same password');
        req.session.authId = user_email;
        req.session.nick = user.nickname;
        req.session.save(function(){
          console.log('login success');
          console.log(user.nickname);
        });
      }
      else{
        console.log('login fail');
      }
    }
  });
  res.end('{"success" : "Updated Successfully","status" : 200}');
});
//module.exports = router;
return router;
}
