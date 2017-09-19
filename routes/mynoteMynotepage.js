module.exports = function(app){
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

/* GET users listing. */
router.get('/mynotemynotepage', function(req, res, next) {
  //res.send('respond with a resource mynote page');
  var sql = 'select foldername from mynotefolder where nickname=?;';
  var sql2 ='select notename from note where nickname=? and foldername=?;';
  //console.log(req.session);
  if(req.session.authId){
    console.log('Note page open');
    conn.query(sql2,[req.session.nick,req.session.foldername],function(error,results,fields){
      if(error){
        console.log(error);
        console.log('Note page open failed');
      }
      else{
        console.log('Note page open success');
        //console.log('results',results);
        res.render('mynoteMynotepage', {
          title: 'mynoteMynotepage',
          foldername : req.session.foldername,
          note : results
        });

      }
    });
  }
  else{
    console.log('Note page open failed');
    res.redirect('/mynote/mynotelogin');
  }
});

router.post('/addnote',function(req,res,next){
  var sql = 'insert into `note` (`nickname`,`foldername`,`notename`) values (?,?,?);';
  var note = req.body.notename;
  var foldername = req.session.foldername;
  var nickname = req.session.nick;
  conn.query(sql,[nickname,foldername,note],function(error,results,fields){
    if(error){
      console.log(error);
      console.log('add note fail in server');
    }
    else{
      //console.log(results);
      console.log(fields);
      console.log('add note success in server');
      res.send({result:'success'});
    }
  });
});

router.post('/deletenoteInDB',function(req,res,next){
  var notename = req.body.notename3;
  var nickname = req.session.nick;
  var foldername = req.session.foldername;
  var sql = 'DELETE FROM `note` WHERE nickname=? AND foldername=? AND notename=?;';
  conn.query(sql,[nickname,foldername,notename],function(error,results,fields){
    if(error){
      console.log(error);
      console.log('delete noteInDB fail in server');
    }
    else{
      //console.log(results);
      console.log(fields);
      console.log('delete noteInDB success in server');
      res.send({result:'success'});
    }
  });
});

router.post('/shiftcontentpage',function(req,res,next){
  var notetitle = req.body.noteForNotepage;
  var nickname = req.session.nick;
  var foldername = req.session.foldername;
  var sql = 'select content from `note` where nickname=? and foldername=? and notename=?;';

  if(req.session.authId){
    req.session.notename = notetitle;
    conn.query(sql,[nickname,foldername,notetitle],function(error,results,fields){
      if(error){
        console.log(error);
        console.log('show note content failed');
      }
      else{
        req.session.save(function(){
          res.send({result:'success',content:results[0].content});
        });
      }
    });
  }
  else{
    console.log('edit page open failed');
    res.redirect('/mynote/mynotelogin');
  }
});

router.post('/goeditpage',function(req,res,next){
  var sql = 'select content from `note` where nickname=? and foldername=? and notename=?;';
  var foldername = req.session.foldername;
  var notename = req.session.notename;
  var nickname = req.session.nick;
  conn.query(sql,[nickname,foldername,notename],function(error,results,fields){
    if(error){
      console.log(error);
      console.log('go edit page error');
    }
    else{
<<<<<<< HEAD
=======
      console.log(results);
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b
      req.session.content = results[0].content;
      req.session.save(function(){
        console.log('go edit page success');
        res.send({result:'success'});
      });//session save {}
    }//else
  });//query
});

router.post('/searchnote',function(req,res,next){
  var searchtext = req.body.searchText;
  var nickname = req.session.nick;
  var foldername = req.session.foldername;
  var likeQuery = '%'+searchtext+'%';
  var sql = 'select notename from note where nickname=? and foldername=? and notename like ?;';
  conn.query(sql,[nickname,foldername,likeQuery],function(error,results,fields){
    if(error){
      console.log(error);
      console.log('note search error');
    }
    else{
      var searchResult = results[0];
      if(searchResult){
        console.log('note search success and it exists');
        console.log(searchtext);
        for(var i=0;i<results.length;i++){
          console.log(results[i].notename);
        }
        res.send({result:'success',notes:results});
      }
      else{
        console.log('note search success but it does not exist');
        res.send({result:'fail',notes:results});
      }
    }
  });
});//router post
<<<<<<< HEAD

router.post('/setimage',function(req,res,next){
  var backimg = req.session.backimage;
  var notename = req.session.notename;
  var foldername = req.session.foldername;
  var nickname = req.session.nick;
  var sql='select * from note where foldername=? and nickname=?;';
  var sql2 = 'update `mynotefolder` set backimage=? where nickname=? and foldername=?;';
  conn.query(sql,[foldername,nickname],function(error,results,fields){
    if(error){
      console.log(error);
    }
    else{
      for(var i=0;i<results.length;i++){
        if(results[i].backimage != undefined){
          conn.query(sql2,[results[i].backimage,nickname,foldername],function(error,results,fields){
            if(error){
              console.log(error);
            }
            else{
              console.log('backimage saved mynotefolder table');
            }
          });//query
          break;
        }//if
      }//for
      res.send({
        result : 'success',
        note : results
      });
    }
  });
});

=======
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b
//module.exports = router;
return router;
}
