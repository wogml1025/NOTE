module.exports = function(app){
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

/* GET home page. */
router.get('/mynotemypage', function(req, res, next) {
  //res.render('mynoteMypage', { title: 'mynote' });
  var sql='select foldername from mynotefolder where nickname=?';
  console.log(req.session);
  if(req.session.authId){
    console.log('my page open');
    conn.query(sql,[req.session.nick],function(error,results,fields){
      if(error){
        console.log(error);
      }
      else{
        console.log('mypage open success with folder data');
        console.log('results',results);
        res.render('mynoteMypage',{
          user:req.session.nick,
          title:'mynotepage',
          folders:results
        });
      }
    });
    //res.render('mynoteMypage',{user:req.session.nick,title:'mynote'});
  }
  else{
    console.log('my page open failed');
    res.redirect('/mynote/mynotelogin');
  }
});

router.get('/mynotemypage/logout',function(req,res,next){
  delete req.session.authId;
  delete req.session.nick;
  delete req.session.foldername;
  delete req.session.notename;
  delete req.session.content;
  req.session.save(function(){
    res.redirect('/mynote/mynotelogin');
  });
});

router.post('/addfolder',function(req,res,next){
  var foldername = req.body.foldername;
  var nickname = req.session.nick;
  var sql='INSERT INTO `mynotefolder` (`nickname`,`foldername`) VALUES (?,?);';
  conn.query(sql,[nickname,foldername],function(error,results,fields){
    if(error){
      console.log(error);
      console.log('add folder fail in server');
    }
    else{
      console.log(results);
      console.log(fields);
      console.log('add folder success in server');
      res.send({result:'success'});
    }
  });
});

router.post('/deletefolder',function(req,res,next){
  var foldername = req.body.foldername2;
  var nickname = req.session.nick;
  var sql = 'DELETE FROM `mynotefolder` WHERE nickname=? AND foldername=?;';
  conn.query(sql,[nickname,foldername],function(error,results,fields){
    if(error){
      console.log(error);
      console.log('delete folder fail in server');
    }
    else{
      console.log(results);
      console.log(fields);
      console.log('delete folder success in server');
      res.send({result:'success'});
    }
  });
});

router.post('/deletefolderInDB',function(req,res,next){
  var foldername = req.body.foldername3;
  var nickname = req.session.nick;
  var sql = 'DELETE FROM `mynotefolder` WHERE nickname=? AND foldername=?;';
  conn.query(sql,[nickname,foldername],function(error,results,fields){
    if(error){
      console.log(error);
      console.log('delete folderInDB fail in server');
    }
    else{
      console.log(results);
      console.log(fields);
      console.log('delete folderInDB success in server');
      var sql2 = 'delete from `note` where nickname=? and foldername=?;';
      conn.query(sql2,[nickname,foldername],function(error,results,fields){
        if(error){
          console.log(error);
          console.log('but delete note in note table failed');
        }
        else{
          console.log('delete note in note table success');
          res.send({result:'success'});
        }
      });
      //res.send({result:'success'});
    }
  });
});

router.post('/shiftnotepage',function(req,res,next){
  var foldername = req.body.folderForNotepage;
  var nickname = req.session.nick;
  req.session.foldername = foldername;
  req.session.save(function(){
    res.send({result:'success'});
  });
});

router.post('/sharefolder',function(req,res,next){
  var nickname = req.session.nick;
  var foldername = req.body.foldername;
  var sql = 'select * from note where nickname=? and foldername=?;';
  var sql2 = 'insert into `share` (`nickname`,`foldername`,`notename`,`content`) values (?,?,?,?);';
  conn.query(sql,[nickname,foldername],function(error,results,fields){
    if(error){
      console.log(error);
      console.log('share failed');
    }
    else{
      console.log('share success');
      for(var i=0;i<results.length;i++){
        conn.query(sql2,[results[i].nickname,results[i].foldername,results[i].notename,results[i].content],function(error,results,fields){
          if(error){
            console.log(error);
            console.log('share DB store failed');
          }
          else{
            console.log('share DB store success');
            res.send({result:'success'});
          }
        });
      }
    }
  });
});

//module.exports = router;
return router;
}
