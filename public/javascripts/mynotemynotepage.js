var filecount=0;

$(document).ready(function(){
  var noteInDB = document.getElementsByClassName('noteInDB');
  $('#noteSearch').bind('input propertychange',function(){
    var searchText = document.getElementById('noteSearch').value;
    var data = {
      'searchText' : searchText
    }
    $.ajax({
      type:'POST',
      url:'/mynote/searchnote',
      contentType:'application/x-www-form-urlencoded; charset=UTF-8',
      cache:false,
      dataType:'json',
      data:data,
      success:function(result){
        var flag = [];

        for(var i=0;i<noteInDB.length;i++){
          flag[i] = 0;
        }

        for(var i=0;i<noteInDB.length;i++){
          //noteInDB[i].style.color='white';
          noteInDB[i].style.display='inline-block';
        }

        if(result['result']=='success'){
          var noteResult = result['notes'];
          for(var i=0;i<noteResult.length;i++){
            var noteIndex = noteResult[i].notename;
            for(var j=0; j<noteInDB.length;j++){
              if(noteIndex == noteInDB[j].innerText){
                flag[j] = 1;
              }//if
            }//inner for
          }//for

          if(searchText!=''){
            for(var i=0;i<noteInDB.length;i++){
              if(flag[i]!=1){
                //noteInDB[i].style.color='black';
                noteInDB[i].style.display='none';
              }//if
            }//for
          }//if
          else{//searchText value is null
            for(var i=0;i<noteInDB.length;i++){
              //noteInDB[i].style.color='white';
              noteInDB[i].style.display='inline-block';
            }
          }

        }//if

      },
      error:function(error){
        console.log(error);
      }
    });//ajax {}
<<<<<<< HEAD
  });//bind {}

  var data2={
    'imagedata' : 'setImage'
  }
  $.ajax({
    type:'POST',
    url:'/mynote/setimage',
    contentType:'application/x-www-form-urlencoded; charset=UTF-8',
    cache:false,
    dataType:'json',
    data:data2,
    success:function(result){
      console.log('image set success');
      console.log(result);
      if(result['result']=='success'){
        var note = result['note'];
        for(var i=0; i<note.length; i++){
          var n = note[i].notename;
          var ni = note[i].backimage;
          //console.log(n);
          //console.log(ni);
          for(var j=0; j<noteInDB.length; j++){
            if(n == noteInDB[j].innerText){
              if(ni != null){
                noteInDB[j].style.backgroundImage='url('+ni+')';
              }
            }//if
          }//inner for
        }//for
      }//if
    },
    error:function(error){
      alert('image set failed!');
    }
  });

});//ready {}

function goLogout(){
  $(location).attr('href','http://34.209.115.97:3000/mynote/mynotemypage/logout');
  //alert('logout');
}
function goMypage(){
  $(location).attr('href','http://34.209.115.97:3000/mynote/mynotemypage');
=======

  });//bind {}
});//ready {}

function goLogout(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynotemypage/logout');
  //alert('logout');
}
function goMypage(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynotemypage');
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b
}
function makeNote(){
  var div = document.createElement('div');
  var noteDiv = document.getElementById('notePart');
  var titleInput = document.getElementById('noteTitleInput').value;
  var editorModal = document.getElementById('modal_showbox');
  //div.innerHTML = document.getElementById('id').innerHTML;
  if(titleInput==''){alert('Input Note Title !');}
  else{
    //div.innerHTML = document.getElementById('fileSample');
    div.id = 'myNote'+filecount;
    div.style.width='150px';
    div.style.height='150px';

    //div.style.marginLeft ='10px';
    div.style.marginRight='10px';
    div.style.marginBottom='10px';
    div.style.marginTop = '10px';
    div.style.display = 'inline-block';
    div.style.backgroundColor='#d9d9d9';
    //div.textContent='folder'+(filecount+1);
    div.textContent = titleInput;
    div.style.textAlign='center';
    div.style.cursor='pointer';
    //div.style.verticalAlign='middle';
    div.style.lineHeight='140px';
    div.style.color='white';
    div.style.wordWrap = 'break-word';
    div.style.borderRadius = '2px';
    //ajax db insert part
    var data={
      'notename' : div.textContent
    }
    $.ajax({
      type:'POST',
      url:'/mynote/addnote',
      contentType:'application/x-www-form-urlencoded; charset=UTF-8',
      cache:false,
      dataType:'json',
      data:data,
      success:function(result){
        alert('add note success');
        console.log(result);
        if(result['result']=='success'){
          console.log('note insert success');
          location.reload();
        }
      },
      error:function(error){
        alert('note insert failed!');
      }
    });
    ////////////////
    div.onmousedown=function(e){
      //ajax db delete
      // var data2={
      //   'foldername2' : div.textContent
      // }
      // $.ajax({
      //   type:'POST',
      //   url:'/mynote/deletefolder',
      //   contentType:'application/x-www-form-urlencoded; charset=UTF-8',
      //   cache:false,
      //   dataType:'json',
      //   data:data2,
      //   success:function(result){
      //     alert('delete folder success');
      //     console.log(result);
      //     if(result['result']=='success'){
      //       console.log('folder delete success');
      //     }
<<<<<<< HEAD
      //     //$(location).attr('href','http://34.209.115.97:3000/mynote/mynotelogin');
=======
      //     //$(location).attr('href','http://35.167.132.166:3000/mynote/mynotelogin');
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b
      //   },
      //   error:function(error){
      //     alert('folder delete failed!');
      //   }
      // });
      ////////////////
      switch(e.which){
        case 1:
          //alert('left');
          editorModal.style.display='block';
          break;
        case 2:
          noteDiv.removeChild(this);
      }
      //noteDiv.removeChild(this);

    }
    noteDiv.appendChild(div);
    filecount++;
    titleInput = '';
    document.getElementById('modal_box').style.display='none';

  }


}
function showTitleInput(){
  document.getElementById('modal_box').style.display='block';
}
function hideTitleInput(){
  document.getElementById('modal_box').style.display='none';
}
function hideEditModal(){
  document.getElementById('modal_showbox').style.display='none';
}
function hidesdModal(){
  document.getElementById('shareOrDeleteModal').style.display='none';
}
function showSetting(){
  document.getElementById('settingModal').style.display='block';
}
function hideSetting(){
  document.getElementById('settingModal').style.display='none';
}
<<<<<<< HEAD
function goEditPage(){
  // $(location).attr('href','http://34.209.115.97:3000/mynote/mynoteedit');
  var data = {
    'contents' : document.getElementById('contentDiv').innerHTML
  }
  $.ajax({
    type:'POST',
    url:'/mynote/goeditpage',
    contentType:'application/x-www-form-urlencoded; charset=UTF-8',
    cache:false,
    dataType:'json',
    data:data,
    success:function(result){
      console.log(result);
      if(result['result'] = 'success'){
        console.log('success to open edit page');
        //alert(window.location.href);
        $(location).attr('href','http://34.209.115.97:3000/mynote/mynoteedit');
      }
    },
    error:function(error){
      console.log(error);
      console.log('failed to open edit page');
    }
  });
}
function gotoShare(){
  $(location).attr('href','http://34.209.115.97:3000/mynote/mynotesharepage');
=======
/* 원래 있던 함수 */
// function goEditPage(){
//   // $(location).attr('href','http://35.167.132.166:3000/mynote/mynoteedit');
//   var data = {
//     'contents' : document.getElementById('contentDiv').innerHTML
//   }
//   $.ajax({
//     type:'POST',
//     url:'/mynote/goeditpage',
//     contentType:'application/x-www-form-urlencoded; charset=UTF-8',
//     cache:false,
//     dataType:'json',
//     data:data,
//     success:function(result){
//       console.log(result);
//       if(result['result'] = 'success'){
//         console.log('success to open edit page');
//         //alert(window.location.href);
//         $(location).attr('href','http://35.167.132.166:3000/mynote/mynoteedit');
//       }
//     },
//     error:function(error){
//       console.log(error);
//       console.log('failed to open edit page');
//     }
//   });
// }
// function goEditPage(){
//   // $(location).attr('href','http://35.167.132.166:3000/mynote/mynoteedit');
//   var data = {
//     'contents' : document.getElementById('contentDiv').innerHTML
//   }
//   $.ajax({
//     type:'POST',
//     url:'/mynote/goeditpage',
//     contentType:'application/x-www-form-urlencoded; charset=UTF-8',
//     cache:false,
//     dataType:'json',
//     data:data,
//     success:function(result){
//       console.log(result);
//       if(result['result'] = 'success'){
//         console.log('success to open edit page');
//         //alert(window.location.href);
//         $(location).attr('href','http://35.167.132.166:3000/mynote/mynoteedit');
//       }
//     },
//     error:function(error){
//       console.log(error);
//       console.log('failed to open edit page');
//     }
//   });
// }
function goEditPage(){
  //folder이름 note이름 받아서 http://35.167.132.166:3000/mynote/[nickname]/[foldername]/[notename] 이렇게

}

function gotoShare(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynotesharepage');
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b
}
function delNote(obj,e){
  var noteDiv = document.getElementById('notePart');
  var noteClass = document.getElementsByClassName('noteInDB');
  switch(e.which){
    case 1:
    for(var i=0; i<noteClass.length; i++){
      if(obj.innerText == noteClass[i].innerText){
        var noteData={
          'noteForNotepage' : noteClass[i].innerText
        }
        $.ajax({
          type:'POST',
          url:'/mynote/shiftcontentpage',
          contentType:'application/x-www-form-urlencoded; charset=UTF-8',
          cache:false,
          dataType:'json',
          data:noteData,
          success:function(result){
            console.log(result);
            if(result['result']=='success'){
              console.log('shift to contentpage success with notename');
            }
<<<<<<< HEAD
            // $(location).attr('href','http://34.209.115.97:3000/mynote/mynoteedit');
=======
            // $(location).attr('href','http://35.167.132.166:3000/mynote/mynoteedit');
>>>>>>> 147a31c46d008e654ad781eab62aa725ad9ea51b
            document.getElementById('modal_showbox').style.display='block';
            document.getElementById('contentDiv').innerHTML = result['content'];
          },
          error:function(error){
            console.log('shift to contentpage failed with notename');
          }
        });
         }

      }
      break;
    case 3:

    $('.noteInDB').bind('contextmenu',function(event){
      event.preventDefault();
      //////////////////////////
      document.getElementById('shareOrDeleteModal').style.display='block';
      //var shareBtn = document.getElementById('sBtn');
      var delBtn = document.getElementById('dBtn');
      //var obj = event.target.className;
      // shareBtn.onclick = function(){
      //   //ajax send to share page
      //   alert('share');
      //   /////////////////////////
      // }//shareBtn function {}

      delBtn.onclick = function(){
        for(var i=0; i<noteClass.length; i++){
          if(obj.innerText == noteClass[i].innerText){
            //ajax delete part
              var data3={
                'notename3' : noteClass[i].innerText
              }
              $.ajax({
                type:'POST',
                url:'/mynote/deletenoteInDB',
                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
                cache:false,
                dataType:'json',
                data:data3,
                success:function(result){
                  alert('delete noteDB success');
                  console.log(result);
                  if(result['result']=='success'){
                    console.log('noteInDB delete success');
                  }
                },
                error:function(error){
                  alert('noteDB delete failed!');
                }
              });
              /////////////
              noteClass[i].parentNode.removeChild(obj);
              document.getElementById('shareOrDeleteModal').style.display='none';
            }//if {}

          }//for {}
      }//delBtn function {}
      //////////////////////////
    }); //bind {}

      break;
  }//switch {}
}//delNote function {}
