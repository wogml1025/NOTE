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
<<<<<<< HEAD
  var contentImg = req.body.contentImg;
  var sql = 'update `note` set content=?,backimage=? where nickname=? and foldername=? and notename=?;';
=======
  var sql = 'update `note` set content=? where nickname=? and foldername=? and notename=?;';
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b

  if(req.session.authId){
    var nickname = req.session.nick;
    var foldername = req.session.foldername;
    var notename = req.session.notename;
<<<<<<< HEAD
    conn.query(sql,[editorContent,contentImg,nickname,foldername,notename],function(error,results,fields){
=======
    conn.query(sql,[editorContent,nickname,foldername,notename],function(error,results,fields){
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b
      if(error){
        console.log(error);
        console.log('fail to save editor contents');
      }
      else{
        console.log('success to save editor contents');
<<<<<<< HEAD
        req.session.backimage = contentImg;
        req.session.save(function(){
          console.log('background image save success');
          res.send({result:'success'});
        });
        //res.send({result:'success'});
=======
        res.send({result:'success'});
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b
      }
    });
  }
  else{
    console.log('edit page open failed');
    res.redirect('/mynote/mynotelogin');
  }

});

<<<<<<< HEAD
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
=======
module.exports = router;
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b
return router;
}
