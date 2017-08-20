var filecount=0;

$(document).ready(function(){


});

function goLogout(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynotemypage/logout');
  //alert('logout');
}
function goMypage(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynotemypage');
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
    div.style.width='100px';
    div.style.height='100px';

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
    div.style.lineHeight='90px';
    div.style.color='white';
    div.style.wordWrap = 'break-word';
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
      //     //$(location).attr('href','http://35.167.132.166:3000/mynote/mynotelogin');
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
function goEditPage(){
  // $(location).attr('href','http://35.167.132.166:3000/mynote/mynoteedit');
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
        $(location).attr('href','http://35.167.132.166:3000/mynote/mynoteedit');
      }
    },
    error:function(error){
      console.log(error);
      console.log('failed to open edit page');
    }
  });
}
function gotoShare(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynotesharepage');
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
            // $(location).attr('href','http://35.167.132.166:3000/mynote/mynoteedit');
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
      var shareBtn = document.getElementById('sBtn');
      var delBtn = document.getElementById('dBtn');
      //var obj = event.target.className;
      shareBtn.onclick = function(){
        //ajax send to share page
        alert('share');
        /////////////////////////
      }//shareBtn function {}

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
