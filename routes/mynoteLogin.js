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

  var sql = 'SELECT * FROM mynoteuser WHERE email=? and password=?;';
  conn.query(sql,[user_email,user_password],function(error,results,fields){
    if(error){
      console.log(error);
    }
    else{
      var user = results[0];
      // if(user_password == user.password){
      //   console.log('same password');
      //   req.session.authId = user_email;
      //   req.session.nick = user.nickname;
      //   req.session.save(function(){
      //     console.log('login success');
      //     console.log(user.nickname);
      //     res.send({result:'success'});
      //   });
      // }
      if(user){
          console.log('same password');
          req.session.authId = user_email;
          req.session.nick = user.nickname;
          //req.session.count = 1;
          req.session.save(function(){
            console.log('login success');
            console.log(user.nickname);
            res.send({result:'success'});
          });
      }
      else{
        console.log('login fail');
        res.send({result:'fail'});
      }
    }
  });
  //res.end('{"success" : "Updated Successfully","status" : 200}');
});

router.post('/fblogin',function(req,res,next){
  var fbMail = req.body.fbid;
  var fbName = req.body.fbname;
  var sql = 'INSERT INTO `mynoteuser` (`name`,`email`,`password`,`nickname`) VALUES (?,?,?,?);';
  var sql2 = 'SELECT * FROM mynoteuser WHERE email=?;';
  conn.query(sql2,[fbMail],function(error,results,fields){
    if(error){
      console.log(error);
    }
    else{
      var fbuser = results[0];
      if(fbuser){
        req.session.authId = fbMail;
        req.session.nick = fbName;
        //req.session.count = 2;
        req.session.save(function(){
          console.log('fb login success');
          res.send({result:'success'});
        });
      }
      else{
        conn.query(sql,[fbName,fbMail,'qkrwjdghks',fbName],function(error,results,fields){
          if(error){
            console.log(error);
          }
          else{
            req.session.authId = fbMail;
            req.session.nick = fbName;
            req.session.count = 2;
            req.session.save(function(){
              console.log('fb login success');
              res.send({result:'success'});
            });
          }
        });
      }//else
    }//else
  });//first query
});
//module.exports = router;
return router;
}
