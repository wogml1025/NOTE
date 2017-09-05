
window.onload=function(){
  var shareFolder = document.getElementsByClassName('shareFolder');
  $('#shareSearchInput').bind('input propertychange',function(){
    var folderSearch = $('#shareSearchInput').val();
    var data={
      'searchText' : folderSearch
    }
    $.ajax({
      type:'POST',
      url:'/mynote/sharesearch',
      contentType:'application/x-www-form-urlencoded; charset=UTF-8',
      cache:false,
      dataType:'json',
      data:data,
      success:function(result){
        var flag=[];
        for(var i=0;i<shareFolder.length;i++){
          flag[i]=0;
        }

        for(var i=0;i<shareFolder.length;i++){
          shareFolder[i].style.display='inline-block';
        }

        if(result['result']=='success'){
          var folders = result['folder'];
          for(var i=0;i<folders.length;i++){
            var folderResult = folders[i].foldername;
            for(var j=0;j<shareFolder.length;j++){
              if(folderResult == shareFolder[j].innerText){
                flag[j] = 1;
              }
            }//inner for
          }//for

          if(folderSearch!=''){
            for(var i=0;i<shareFolder.length;i++){
              if(flag[i]!=1){
                shareFolder[i].style.display='none';
              }//if
            }//for
          }//if
          else{//folderSearch value is null
            for(var i=0;i<shareFolder.length;i++){
              shareFolder[i].style.display='inline-block';
            }
          }
        }//success if
      },
      error:function(error){
        console.log(error);
      }
    });//ajax
  });//bind
}
function goEntrypage(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynoteentry');
}
function goMypage(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynotemypage');
}
function goLoginpage(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynotelogin');
}

function openFolder(obj) {
  document.getElementById('modal_showbox').style.display = 'block';
  //note 보여주기
  var contents = document.getElementById('contentDiv');
  var notes = document.getElementById('contentDiv');
  var folder = document.getElementsByClassName('shareFolder');
  for (var i = 0; i < folder.length; i++) {
    if (obj.innerText == folder[i].innerText) {
      var folderTitle = {
        'folderfromjs': folder[i].innerText
      }
    }
  }
  $.ajax({
    type: 'POST',
    url: '/mynote/shownote',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    cache: false,
    dataType: 'json',
    data: folderTitle,
    success: function(result) {
      console.log(result);
              var notes = result['note'];
      if (result['result'] == 'success') {
        for (i = 0; i < notes.length; i++) {
          var div = document.createElement('div');
          div.id = i;
          div.style.display = 'inline-block';
          div.style.cursor = 'pointer';
          div.style.width = '100px';
          div.style.height = '100px';
          div.style.marginLeft = '10px';
          div.style.marginRight = '10px';
          div.style.marginBottom = '10px';
          div.style.marginTop = '10px';
          div.style.backgroundColor = '#d9d9d9';
          div.style.textAlign = 'center';
          div.style.lineHeight = '95px';
          div.style.color = 'white';
          div.style.wordWrap = 'break-word';
          div.style.borderRadius='2px';
          div.textContent = notes[i].notename;
          contents.appendChild(div);

          div.addEventListener("click",function(event){
            var clickedNote = event.target.innerText;
            var clickedFolder = obj.innerText;
            var data={
              'foldertitle': clickedFolder,
              'notetitle': clickedNote
            }
            $.ajax({
              type:'POST',
              url:'/mynote/callcontent',
              contentType:'application/x-www-form-urlencoded; charset=UTF-8',
              cache:false,
              dataType:'json',
              data:data,
              success:function(result){
                if(result['result']=='success'){
                        console.log(result['contents']);
                        document.getElementById('showContent').innerHTML = result['contents'][0].content;
                        document.getElementById('backBtn').style.backgroundColor = '#008CBA';
                        document.getElementById('backBtn').disabled = false;
                        document.getElementById('contentDiv').style.display='none';
                        document.getElementById('contentView').style.display='block';
                      }
                    },
                    error:function(error){
                      console.log('content call failed!');
              }
            })//ajax
          });
        } //for
      }//if
    }//success
  })//ajax
} //openFolder()

// function openFolder(obj){
//   document.getElementById('modal_showbox').style.display='block';
//   var contents = document.getElementById('contentDiv');
//   var folder = document.getElementsByClassName('shareFolder');
//   for(var i=0;i<folder.length;i++){
//     if(obj.innerText == folder[i].innerText){
//       var folderTitle = {
//         'folder' : folder[i].innerText
//       }
//       $.ajax({
//         type:'POST',
//         url:'/mynote/shownote',
//         contentType:'application/x-www-form-urlencoded; charset=UTF-8',
//         cache:false,
//         dataType:'json',
//         data:folderTitle,
//         success:function(result){
//           console.log(result);
//           if(result['result']=='success'){
//             console.log('get folder information success');
//             var notes = result['note'];
//             //console.log(notes[0].notename);
//             for(var i=0;i<notes.length;i++){
//               if(notes[i].foldername == obj.innerText){
//                 var div = document.createElement('div');
//                 div.id = 'note'+i;
//                 div.style.display='inline-block';
//                 div.style.cursor='pointer';
//                 div.style.width='100px';
//                 div.style.height='100px';
//                 div.style.marginLeft ='10px';
//                 div.style.marginRight='10px';
//                 div.style.marginBottom='10px';
//                 div.style.marginTop = '10px';
//                 div.style.backgroundColor='#d9d9d9';
//                 div.style.textAlign='center';
//                 div.style.lineHeight='95px';
//                 div.style.color='white';
//                 div.style.wordWrap = 'break-word';
//                 div.textContent=notes[i].notename;
//                 contents.appendChild(div);
//
//                 div.onclick = function(){
//                   var data = {
//                     'foldertitle' : obj.innerText,
//                     'notetitle' : div.textContent
//                   }
//                   ////////ajax content
//                   $.ajax({
//                     type:'POST',
//                     url:'/mynote/callcontent',
//                     contentType:'application/x-www-form-urlencoded; charset=UTF-8',
//                     cache:false,
//                     dataType:'json',
//                     data:data,
//                     success:function(res){
//                       console.log(res);
//                       if(res['result']=='success'){
//                         console.log('content call success');
//                         // var noteContents = res['contents'];
//                         // for(var i=0;i<noteContents.length;i++){
//                         //   if(div.textContent == noteContents[i].notename){
//                         //     document.getElementById('showContent').innerHTML = noteContents[i].content;
//                         //   }
//                         // }
//                         document.getElementById('showContent').innerHTML = res['contents'];
//                         document.getElementById('backBtn').style.backgroundColor = '#008CBA';
//                         document.getElementById('backBtn').disabled = false;
//
//                       }
//                     },
//                     error:function(err){
//                       console.log(err);
//                       console.log('content call failed!');
//                     }
//                   });
//                   ////////////////////
//
//                   document.getElementById('contentDiv').style.display='none';
//                   document.getElementById('contentView').style.display='block';
//
//                 }//div onclick {}
//               }//if {}
//             }//for {}
//
//             ////////////////
//             var canBtn = document.getElementById('canButton');
//             canBtn.onclick=function(){
//               for(var i=0;i<notes.length;i++){
//                 var div = document.getElementById('note'+i);
//                 contents.removeChild(div);
//               }
//               document.getElementById('modal_showbox').style.display='none';
//               document.getElementById('contentView').style.display='none';
//               document.getElementById('contentDiv').style.display='block';
//               document.getElementById('backBtn').style.backgroundColor = '#bfbfbf';
//               document.getElementById('backBtn').disabled = true;
//               document.getElementById('showContent').innerHTML = '';
//             }
//
//             var xBtn = document.getElementsByClassName('close');
//             xBtn.onclick=function(){
//               for(var i=0;i<notes.length;i++){
//                 var div = document.getElementById('note'+i);
//                 contents.removeChild(div);
//               }
//               document.getElementById('modal_showbox').style.display='none';
//               document.getElementById('contentView').style.display='none';
//               document.getElementById('contentDiv').style.display='block';
//               document.getElementById('backBtn').style.backgroundColor = '#bfbfbf';
//               document.getElementById('backBtn').disabled = true;
//               document.getElementById('showContent').innerHTML = '';
//             }
//             //////////////////
//           }
//         },
//         error:function(error){
//           console.log(error);
//           console.log('failed to get folder information');
//         }
//       });
//     }//if {}
//   }//for {}
// }//openFolder {}
function closeFolder(){
  document.getElementById('modal_showbox').style.display='none';
  document.getElementById('contentDiv').style.display='block';
  document.getElementById('contentView').style.display='none';
  document.getElementById('backBtn').style.backgroundColor = '#bfbfbf';
  document.getElementById('backBtn').disabled = true;
  document.getElementById('showContent').innerHTML = '';
  var cDiv = document.getElementById('contentDiv');
  while(cDiv.hasChildNodes()){
    cDiv.removeChild(cDiv.firstChild);
  }
}//closeFolder {}
function closeContent(){
  document.getElementById('contentDiv').style.display='block';
  document.getElementById('contentView').style.display='none';
  document.getElementById('backBtn').style.backgroundColor = '#bfbfbf';
  document.getElementById('backBtn').disabled = true;
  document.getElementById('showContent').innerHTML = '';
}//closeContent{}

function showloginModal(){
  document.getElementById('loginModal').style.display='block';
}
function closeloginModal(){
  document.getElementById('loginModal').style.display='none';
}
function goLogout(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynotemypage/logout');
}
