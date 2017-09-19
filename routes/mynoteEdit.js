module.exports = function(app){
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

/* GET users listing. */
router.get('/mynoteedit', function(req, res, next) {
  res.render('mynoteedit',{title:'MyNote Edit',content:req.session.content});
});

router.post('/mynoteedit',function(req,res,next){
  var editorContent = req.body.tinymceContent;
  var contentImg = req.body.contentImg;
  var sql = 'update `note` set content=?,backimage=? where nickname=? and foldername=? and notename=?;';

  if(req.session.authId){
    var nickname = req.session.nick;
    var foldername = req.session.foldername;
    var notename = req.session.notename;
    conn.query(sql,[editorContent,contentImg,nickname,foldername,notename],function(error,results,fields){
      if(error){
        console.log(error);
        console.log('fail to save editor contents');
      }
      else{
        console.log('success to save editor contents');
        req.session.backimage = contentImg;
        req.session.save(function(){
          console.log('background image save success');
          res.send({result:'success'});
        });
        //res.send({result:'success'});
      }
    });
  }
  else{
    console.log('edit page open failed');
    res.redirect('/mynote/mynotelogin');
  }

});

router.post('/extensionsave',function(req,res,next){
  var content = req.body.extensionContent;
  var sql = 'insert into `extension` (`innerhtml`) values (?);';
  conn.query(sql,[content],function(error,results,fields){
    if(error){
      console.log(error);
    }
    else{
      console.log('extension save success');
    }
  });
});
//module.exports = router;
return router;
}
