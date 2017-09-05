var filecount=0;

$(document).ready(function(){
  var folderInDB = document.getElementsByClassName('folderInDB');
  $('#folderSearch').bind('input propertychange',function(){
    var folderSearch = $('#folderSearch').val();
    var data = {
      'searchFolder' : folderSearch
    }
    $.ajax({
      type:'POST',
      url:'/mynote/searchfolder',
      contentType:'application/x-www-form-urlencoded; charset=UTF-8',
      cache:false,
      dataType:'json',
      data:data,
      success:function(result){
        var flag=[];
        for(var i=0;i<folderInDB.length;i++){
          flag[i] = 0;
        }

        for(var i=0;i<folderInDB.length;i++){
          //folderInDB[i].style.color='white';
          folderInDB[i].style.display='inline-block';
        }

        if(result['result']=='success'){
          var folders = result['folder'];
          for(var i=0;i<folders.length;i++){
            var folderResult = folders[i].foldername;
            for(var j=0;j<folderInDB.length;j++){
              if(folderResult == folderInDB[j].innerText){
                flag[j] = 1;
              }
            }//inner for
          }//for

          if(folderSearch!=''){
            for(var i=0;i<folderInDB.length;i++){
              if(flag[i]!=1){
                //folderInDB[i].style.color='black';
                folderInDB[i].style.display='none';
              }//if
            }//for
          }//if
          else{//folderSearch value is null
            for(var i=0;i<folderInDB.length;i++){
              //folderInDB[i].style.color='white';
              folderInDB[i].style.display='inline-block';
            }
          }

        }//if

      },
      error:function(error){
        console.log(error);
      }
    });
  });
});//ready {}

function goLogout(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynotemypage/logout');
}
function makeFolder(){
  var div = document.createElement('div');
  var fileDiv = document.getElementById('filePart');
  var titleInput = document.getElementById('folderTitleInput').value;
  //div.innerHTML = document.getElementById('id').innerHTML;
  if(titleInput==''){alert('Input Folder Title !');}
  else{
    //div.innerHTML = document.getElementById('fileSample');
    div.id = 'myFile'+filecount;
    div.style.width='250px';
    div.style.height='130px';
    div.style.marginLeft ='10px';
    div.style.marginRight='10px';
    div.style.marginBottom='10px';
    div.style.marginTop = '10px';
    div.style.display = 'inline-block';
    div.style.backgroundColor='#d9d9d9';
    //div.textContent='folder'+(filecount+1);
    div.textContent = titleInput;
    div.style.textAlign='center';
    div.style.cursor='pointer';
    div.style.lineHeight='125px';
    div.style.color='white';
    div.style.wordWrap = 'break-word';
    div.style.borderRadius = '2px';
    //ajax db insert part
    var data={
      'foldername' : div.textContent
    }
    $.ajax({
      type:'POST',
      url:'/mynote/addfolder',
      contentType:'application/x-www-form-urlencoded; charset=UTF-8',
      cache:false,
      dataType:'json',
      data:data,
      success:function(result){
        alert('add folder success');
        console.log(result);
        if(result['result']=='success'){
          console.log('folder insert success');
          location.reload();
        }
        //$(location).attr('href','http://35.167.132.166:3000/mynote/mynotelogin');
      },
      error:function(error){
        alert('folder insert failed!');
      }

    });
    ////////////////
    div.onmousedown=function(e){
      switch(e.which){
        case 1:
          //alert('folder left click');
          var folderData={
            'folderForNotepage' : div.textContent
          }
          $.ajax({
            type:'POST',
            url:'/mynote/shiftnotepage',
            contentType:'application/x-www-form-urlencoded; charset=UTF-8',
            cache:false,
            dataType:'json',
            data:folderData,
            success:function(result){
              console.log(result);
              if(result['result']=='success'){
                console.log('shift to Notepage success with foldername');
              }
              $(location).attr('href','http://35.167.132.166:3000/mynote/mynotemynotepage');
            },
            error:function(error){
              console.log('shift to Notepage failed with foldername');
            }
          });
          break;
        case 3:
        document.getElementById('shareOrDeleteModal').style.display='block';
        var shareBtn = document.getElementById('sBtn');
        var delBtn = document.getElementById('dBtn');

        shareBtn.onclick = function(){
          alert('share');
        }

        delBtn.onclick = function(){
          //ajax db delete
          var data2={
            'foldername2' : div.textContent
          }
          $.ajax({
            type:'POST',
            url:'/mynote/deletefolder',
            contentType:'application/x-www-form-urlencoded; charset=UTF-8',
            cache:false,
            dataType:'json',
            data:data2,
            success:function(result){
              alert('delete folder success');
              console.log(result);
              if(result['result']=='success'){
                console.log('folder delete success');
              }

            },
            error:function(error){
              alert('folder delete failed!');
            }
          });
          ////////////////
          fileDiv.removeChild(this);
          document.getElementById('shareOrDeleteModal').style.display='none';
        }


        break;
      }


    }//onmousedown {}
    fileDiv.appendChild(div);
    filecount++;
    titleInput = '';
    document.getElementById('modal_box').style.display='none';

  }//else {}


}
function showTitleInput(){
  document.getElementById('modal_box').style.display='block';
}
function hideTitleInput(){
  document.getElementById('modal_box').style.display='none';
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
function gotoShare(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynotesharepage');
}
function delFolder(obj,e){
  var fileDiv = document.getElementById('filePart');
  var folderClass = document.getElementsByClassName('folderInDB');


  switch(e.which){
    case 1:
    //alert('folderDB left click');
    for(var i=0; i<folderClass.length; i++){
      if(obj.innerText == folderClass[i].innerText){
        var folderData={
          'folderForNotepage' : folderClass[i].innerText
        }
        $.ajax({
          type:'POST',
          url:'/mynote/shiftnotepage',
          contentType:'application/x-www-form-urlencoded; charset=UTF-8',
          cache:false,
          dataType:'json',
          data:folderData,
          success:function(result){
            console.log(result);
            if(result['result']=='success'){
              console.log('shift to Notepage success with foldername');
            }
            $(location).attr('href','http://35.167.132.166:3000/mynote/mynotemynotepage');
          },
          error:function(error){
            console.log('shift to Notepage failed with foldername');
          }
        });//ajax
      }//if {}

      }//for {}
      break;

      case 3:
      $('.folderInDB').bind('contextmenu',function(event){
        event.preventDefault();
        //////////////////////////
        var folderClass = document.getElementsByClassName('folderInDB');
        document.getElementById('shareOrDeleteModal').style.display='block';
        var shareBtn = document.getElementById('sBtn');
        var delBtn = document.getElementById('dBtn');
        //var obj = event.target.className;
        shareBtn.onclick = function(){
          //ajax send to share page
          for(var i=0; i<folderClass.length; i++){
            if(obj.innerText == folderClass[i].innerText){
              //ajax delete part
                var data={
                  'foldername' : folderClass[i].innerText
                }
                $.ajax({
                  type:'POST',
                  url:'/mynote/sharefolder',
                  contentType:'application/x-www-form-urlencoded; charset=UTF-8',
                  cache:false,
                  dataType:'json',
                  data:data,
                  success:function(result){
                    alert('share folder success');
                    console.log(result);
                    if(result['result']=='success'){
                      console.log('folderInDB share success');
                    }
                  },
                  error:function(error){
                    alert('folderDB share failed!');
                  }
                });
                /////////////
                document.getElementById('shareOrDeleteModal').style.display='none';
              }//if {}

            }//for {}
          /////////////////////////
        }//shareBtn function {}

        delBtn.onclick = function(){
          for(var i=0; i<folderClass.length; i++){
            if(obj.innerText == folderClass[i].innerText){
              //ajax delete part
                var data3={
                  'foldername3' : folderClass[i].innerText
                }
                $.ajax({
                  type:'POST',
                  url:'/mynote/deletefolderInDB',
                  contentType:'application/x-www-form-urlencoded; charset=UTF-8',
                  cache:false,
                  dataType:'json',
                  data:data3,
                  success:function(result){
                    alert('delete folderDB success');
                    console.log(result);
                    if(result['result']=='success'){
                      console.log('folderInDB delete success');
                    }
                  },
                  error:function(error){
                    alert('folderDB delete failed!');
                  }
                });
                /////////////
                folderClass[i].parentNode.removeChild(obj);
                document.getElementById('shareOrDeleteModal').style.display='none';
              }//if {}

            }//for {}
        }//delBtn function {}
        //////////////////////////
      }); //bind {}
        break;
  }//switch {}



}//function {}
