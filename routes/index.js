module.exports = function(app){
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express mynote' });
});

// passport.use(new FacebookStrategy({
//     clientID: '1514688058591802',
//     clientSecret: '63ea54c7f230db509cf876573d4d0981',
//     callbackURL: "/auth/facebook/callback",
//     profileFields:['id','email','displayName','name','verified']
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//     //   return done(err, user);
//     // });
//     console.log(profile);
//     var authId = profile.id;
//     var nickname = profile.displayName;
//     var name = profile.name;
//     var sql='select * from mynoteuser where email=?;';
//     conn.query(sql,[authId],function(error,results,fields){
//       if(error){
//         console.log(error);
//         done('error');
//       }
//       else{
//         var user = results[0];
//         if(user){
//           return done(null,user);
//         }//if
//         else{
//           var new_user = {
//             'email' : authId,
//             'nickname' : nickname
//           }//new user
//           var sql2 = 'insert into `mynoteuser` (`name`,`email`,`password`,`nickname`) values (?,?,?,?)';
//           conn.query(sql2,[name,authId,authId,nickname],function(error,results,fields){
//             if(error){
//               console.log(error);
//               done('error');
//             }//if
//             else{
//               var u = {
//                 'email' : authId,
//                 'nickname' : nickname,
//                 'name' : name
//                }
//               done(null,u);
//             }//else
//           });//insert query
//         }//else
//       }//else
//     });//query
//   }
// ));
//
//
// passport.serializeUser(function(user, done) {
//   console.log('serializeUser');
//   console.log(user);
//   done(null, user.email);
// });
// passport.deserializeUser(function(id, done) {
//   console.log('deserializeUser', id);
//   //done(null,id);
//   var sql='select * from mynoteuser where email=?;';
//   conn.query(sql,[],function(error,results,fields){
//     if(error){
//       console.log(error);
//       done('error');
//     }
//     else{
//       var user = results[0];
//       return done(null,user);
//     }
//   });
// });
//
// router.get('/auth/facebook', passport.authenticate('facebook'));
//
// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: '/mynote/mynotemypage',
//                                       failureRedirect: '/mynote/mynotelogin' }));


//module.exports = router;
return router;
}
