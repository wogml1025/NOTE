// window.onload=function()
// {
//
// }

$(document).ready(function(){

  ///////prevent backspace////////
<<<<<<< HEAD
  history.pushState(null,null,'http://34.209.115.97:3000/mynote/mynotelogin');
=======
  history.pushState(null,null,'http://35.167.132.166:3000/mynote/mynotelogin');
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b
  window.onpopstate = function(event){
    history.go(1);
  };
  ////////////////////////////////

  $('#loginBtn').click(function(){
    var user_email = $('#login_id').val();
    var user_pwd = $('#login_pwd').val();
    var data={
      'email':user_email,
      'password':user_pwd
    }
    $.ajax({
      type:'POST',
      url:'/mynote/mynotelogin',
      contentType:'application/x-www-form-urlencoded; charset=UTF-8',
      cache:false,
      dataType:'json',
      data:data,
      success:function(result){
        console.log(result);
        if(result['result']=='success'){
          //self.isEditMode(!self.isEditMode());
          console.log('login start');
        }
        else{
          alert('login fail !');
        }
      },
      error:function(error){
        alert('login failed!');
      }
    }).complete(function(){
      $(window).attr('location','/mynote/mynotemypage');
    });
  });
});
function goEntryPage()
{
<<<<<<< HEAD
  $(location).attr('href', 'http://34.209.115.97:3000/mynote/mynoteentry');
}
function goFacebook(){
  $(location).attr('href', 'http://34.209.115.97:3000/auth/facebook');
}
function gotoShare(){
  $(location).attr('href','http://34.209.115.97:3000/mynote/mynotesharepage');
=======
  $(location).attr('href', 'http://35.167.132.166:3000/mynote/mynoteentry');
}
function goFacebook(){
  $(location).attr('href', 'http://35.167.132.166:3000/auth/facebook');
}
function gotoShare(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynotesharepage');
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b
}
