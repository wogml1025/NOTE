// window.onload=function()
// {
//
// }


$(document).ready(function(){
  var mail_ptn = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,5}$/;
  var name_ptn = /[A-Za-z]{2,}$/;
  var nick_ptn = /[A-Za-z0-9]{3,}$/;
  var pwd_ptn = /[A-Za-z0-9]{7,}$/;
  var mailcheck = 1;
  var nickcheck = 1;

  $('#entry_email').bind('input propertychange',function(){
    //email check
    var new_email = $('#entry_email').val();
    var data = {
      'email' : new_email
    }

    $.ajax({
      type:'POST',
      url:'/mynote/emailcheck',
      contentType:'application/x-www-form-urlencoded; charset=UTF-8',
      cache:false,
      dataType:'json',
      data:data,
      success:function(result){
        console.log(result);
        if(result['result']=='success'){
          console.log('email check success');
          mailcheck = 1;
        }
        else{
          alert('email duplicated!');
          mailcheck = 0;
        }
<<<<<<< HEAD
        //$(location).attr('href','http://34.209.115.97:3000/mynote/mynotelogin');
=======
        //$(location).attr('href','http://35.167.132.166:3000/mynote/mynotelogin');
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b
      },
      error:function(error){
        alert('email error');
        mailcheck=0;
      }
    });
  });

  $('#entry_nickname').bind('input propertychange',function(){
    //nickname check
    var new_nickname = $('#entry_nickname').val();
    var data = {
      'nickname':new_nickname
    }

    $.ajax({
      type:'POST',
      url:'/mynote/nicknamecheck',
      contentType:'application/x-www-form-urlencoded; charset=UTF-8',
      cache:false,
      dataType:'json',
      data:data,
      success:function(result){
        console.log(result);
        if(result['result']=='success'){
          console.log('nickname check success');
          nickcheck = 1;
        }
        else{
          alert('nickname duplicated!');
          nickcheck = 0;
        }
<<<<<<< HEAD
        //$(location).attr('href','http://34.209.115.97:3000/mynote/mynotelogin');
=======
        //$(location).attr('href','http://35.167.132.166:3000/mynote/mynotelogin');
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b
      },
      error:function(error){
        alert('nickname error!');
        nickcheck = 0;
      }
    });
  });

  $('#entryBtn').click(function(){
    var flag=1;
    var new_name = $('#entry_name').val();
    var new_email = $('#entry_email').val();
    var new_pwd = $('#entry_pwd').val();
    var new_nickname = $('#entry_nickname').val();

    var name_res = name_ptn.test(new_name);
    var mail_res = mail_ptn.test(new_email);
    var pwd_res = pwd_ptn.test(new_pwd);
    var nick_res = nick_ptn.test(new_nickname);

    if(new_name=='' || !name_res){flag=0;alert('name');}
    if(new_email=='' || !mail_res){flag=0;alert('mail');}
    if(new_pwd=='' || !pwd_res){flag=0;alert('pwd');}
    if(new_nickname=='' || !nick_res){flag=0;alert('nick');}


    if(!flag){
      alert('올바른 정보를 입력해주세요!');
    }
    else if(flag==1 && mailcheck==1 && nickcheck==1){
      var data={
        'name':new_name,
        'email':new_email,
        'password':new_pwd,
        'nickname':new_nickname
      }


        $.ajax({
          type:'POST',
          url:'/mynote/mynoteentry',
          contentType:'application/x-www-form-urlencoded; charset=UTF-8',
          cache:false,
          dataType:'json',
          data:data,
          success:function(result){
            alert('가입 완료');
            console.log(result);
            if(result['result']=='success'){
              console.log('ajax success');
            }
<<<<<<< HEAD
            $(location).attr('href','http://34.209.115.97:3000/mynote/mynotelogin');
=======
            $(location).attr('href','http://35.167.132.166:3000/mynote/mynotelogin');
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b
          },
          error:function(error){
            alert('entry failed!');
          }
        });




    }
  });//click function
});//document ready function

//     var data={
//       'name':new_name,
//       'email':new_email,
//       'password':new_pwd,
//       'nickname':new_nickname
//     }
//     $.ajax({
//       type:'POST',
//       url:'/mynote/mynoteentry',
//       contentType:'application/x-www-form-urlencoded; charset=UTF-8',
//       cache:false,
//       dataType:'json',
//       data:data,
//       success:function(result){
//         console.log(result);
//         if(result.status == 200){
//           //self.isEditMode(!self.isEditMode());
//           console.log('entry start');
//         }
//       },
//       error:function(error){
//         alert('entry failed!');
//       }
//     }).complete(function(){
//       $(window).attr('location','/mynote/mynotelogin');
//     });//~complete
//   });//click function
// });//document ready function
