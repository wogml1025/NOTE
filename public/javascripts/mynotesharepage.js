window.onload=function(){

}
function goEntrypage(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynoteentry');
}
function goMypage(){
  $(location).attr('href','http://35.167.132.166:3000/mynote/mynotemypage');
}
function openFolder(obj){
  document.getElementById('modal_showbox').style.display='block';
  var contents = document.getElementById('contentDiv');
  var folder = document.getElementsByClassName('shareFolder');
  for(var i=0;i<folder.length;i++){
    if(obj.innerText == folder[i].innerText){
      var folderTitle = {
        'folder' : folder[i].innerText
      }
      $.ajax({
        type:'POST',
        url:'/mynote/shownote',
        contentType:'application/x-www-form-urlencoded; charset=UTF-8',
        cache:false,
        dataType:'json',
        data:folderTitle,
        success:function(result){
          console.log(result);
          if(result['result']=='success'){
            console.log('get folder information success');
            var notes = result['note'];
            //console.log(notes[0].notename);
            for(var i=0;i<notes.length;i++){
              if(notes[i].foldername == obj.innerText){
                var div = document.createElement('div');
                div.id = 'note'+i;
                div.style.display='inline-block';
                div.style.cursor='pointer';
                div.style.width='100px';
                div.style.height='100px';
                div.style.marginLeft ='10px';
                div.style.marginRight='10px';
                div.style.marginBottom='10px';
                div.style.marginTop = '10px';
                div.style.backgroundColor='#d9d9d9';
                div.style.textAlign='center';
                div.style.lineHeight='95px';
                div.style.color='white';
                div.style.wordWrap = 'break-word';
                div.textContent=notes[i].notename;
                contents.appendChild(div);

                div.onclick = function(){
                  var data = {
                    'foldertitle' : obj.innerText,
                    'notetitle' : div.textContent
                  }
                  ////////ajax content
                  $.ajax({
                    type:'POST',
                    url:'/mynote/callcontent',
                    contentType:'application/x-www-form-urlencoded; charset=UTF-8',
                    cache:false,
                    dataType:'json',
                    data:data,
                    success:function(result){
                      console.log(result);
                      if(result['result']=='success'){
                        console.log('content call success');
                        document.getElementById('showContent').innerHTML = result['contents'];
                        document.getElementById('backBtn').style.backgroundColor = '#008CBA';
                        document.getElementById('backBtn').disabled = false;

                      }
                    },
                    error:function(error){
                      console.log('content call failed!');
                    }
                  });
                  ////////////////////
                  document.getElementById('contentDiv').style.display='none';
                  document.getElementById('contentView').style.display='block';

                }//div onclick {}
              }//if {}
            }//for {}

            ////////////////
            var canBtn = document.getElementById('canButton');
            canBtn.onclick=function(){
              for(var i=0;i<notes.length;i++){
                var div = document.getElementById('note'+i);
                contents.removeChild(div);
              }
              document.getElementById('modal_showbox').style.display='none';
              document.getElementById('contentView').style.display='none';
              document.getElementById('contentDiv').style.display='block';
              document.getElementById('backBtn').style.backgroundColor = '#bfbfbf';
              document.getElementById('backBtn').disabled = true;
            }

            var xBtn = document.getElementsByClassName('close');
            xBtn.onclick=function(){
              for(var i=0;i<notes.length;i++){
                var div = document.getElementById('note'+i);
                contents.removeChild(div);
              }
              document.getElementById('modal_showbox').style.display='none';
              document.getElementById('contentView').style.display='none';
              document.getElementById('contentDiv').style.display='block';
              document.getElementById('backBtn').style.backgroundColor = '#bfbfbf';
              document.getElementById('backBtn').disabled = true;
            }
            //////////////////
          }
        },
        error:function(error){
          console.log('failed to get folder information');
        }
      });
    }//if {}
  }//for {}
}//openFolder {}
function closeFolder(){
  document.getElementById('modal_showbox').style.display='none';
  document.getElementById('contentDiv').style.display='block';
  document.getElementById('contentView').style.display='none';
  document.getElementById('backBtn').style.backgroundColor = '#bfbfbf';
  document.getElementById('backBtn').disabled = true;
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
}//closeContent{}
