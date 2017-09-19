module.exports = function(app){
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

/* GET users listing. */
router.get('/mynotesharepage', function(req, res, next) {
  var sql = 'select distinct foldername from share;';
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
  // var sql = 'select foldername,notename from share where foldername=?';
  // var foldername = req.body.folder;
  // conn.query(sql,[foldername],function(error,results,fields){
  //   if(error){
  //     console.log(error);
  //     console.log('get note information fail in share table');
  //   }
  //   else{
  //     console.log('get note information success in share table');
  //     res.send({result:'success',note:results});
  //   }
  // });
  var sql = 'select notename from share where foldername=?';
  var foldername = req.body.folderfromjs;
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
  // var sql = 'select * from share where foldername=? and notename=?';
  // var foldername = req.body.foldertitle;
  // var notename = req.body.notetitle;
  // conn.query(sql,[foldername,notename],function(error,results,fields){
  //   if(error){
  //     console.log(error);
  //     console.log('failed to call content in share table');
  //   }
  //   else{
  //     console.log('call content in share table success');
  //     res.send({result:'success',contents:results[0].content});
  //   }
  // });
  var sql = 'select content from share where foldername=? and notename=?';
  var foldername = req.body.foldertitle;
  var notename = req.body.notetitle;
  conn.query(sql,[foldername,notename],function(error,results,fields){
    if(error){
      console.log(error);
      console.log('failed to call content in share table');
    }
    else{
      console.log('call content in share table success');
      // res.send({result:'success',contents:results[0].content});
      res.send({result:'success',contents:results});
    }
  });
});

router.post('/sharesearch',function(req,res,next){
  var searchtext = req.body.searchText;
  var likeQuery = '%'+searchtext+'%';
  var sql='select distinct foldername from share where foldername like ?;';
  conn.query(sql,[likeQuery],function(error,results,fields){
    if(error){
      console.log(error);
      console.log('share search fail');
    }
    else{
      var folder = results[0];
      console.log('folder search success and it exists');
      console.log(searchtext);
      if(folder){
        for(var i=0;i<results.length;i++){
          console.log(results[i].foldername);
        }//for
        res.send({result:'success',folder:results});
      }//if
      else{
        console.log('folder search success but it does not exist');
        res.send({result:'fail',folder:results});
      }//else
    }//else
  });//query
});

router.post('/setsharefolderimage',function(req,res,next){
  var foldername = req.session.foldername;
  var nickname = req.session.nick;
  var sql = 'select distinct foldername from share where nickname=? and foldername=?;';
  conn.query(sql,[foldername,nickname],function(error,results,fields){
    if(error){
      console.log(error);
    }
    else{
      res.send({
        result : 'success',
        share : results
      });
    }
  });
});
//module.exports = router;
return router;
}
