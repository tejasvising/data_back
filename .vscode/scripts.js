button1=document.getElementById('uos')
button2=document.getElementById('drag')
playerc=document.querySelector('.player1')
playerf=document.querySelector('.player2')
function toggle(){
  console.log(this.classList);
  this.classList.toggle('open')
  console.log(typeof(this.classList.value))

  if(this.classList[0]=='player1'){
    console.log("check")

    if(playerf.classList.value==='player2 open'){
      playerf.classList.toggle('open')
      console.log(playerf.classList)
    }
    playerc.requestFullscreen();
  }
  if(this.classList[0]=='player2'){
    if(playerc.classList.value=="player1 open"){
      playerc.classList.toggle('open')
      console.log(playerc.classList)
      
    }
    playerf.requestFullscreen();
  }
 
  
}

playerc.addEventListener('click',toggle)
playerf.addEventListener('click', toggle)
