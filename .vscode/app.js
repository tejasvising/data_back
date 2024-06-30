p1score=document.getElementById('p1score')
p2score=document.getElementById('p2score')
reset=document.getElementById('res');
dropdown=document.getElementById('playto')
p1btn=document.getElementById('p1btn')
p2btn=document.getElementById('p2btn')
function increase(){
    if(parseInt(p1score.innerHTML)+parseInt(p2score.innerHTML)==dropdown.value){
        p1btn.disabled=true;
        p2btn.disabled=true;
    }
    
    console.log(this)
    if(this.innerHTML=='Player1'){
a=parseInt(p1score.innerHTML)+1;
p1score.innerHTML=a;
}
if(this.innerHTML=='Player2'){
    b=parseInt(p2score.innerHTML)+1;
p2score.innerHTML=b
}
if(parseInt(p1score.innerHTML)+parseInt(p2score.innerHTML)==dropdown.value){
    if(parseInt(p1score.innerHTML)>parseInt(p2score.innerHTML)){
        p1score.style.color="green";
        p2score.style.color="red";
    }
    if(parseInt(p2score.innerHTML)>parseInt(p1score.innerHTML)){
        p2score.style.color="green";
        p1score.style.color="red";
    }
    p1btn.disabled=true;
    p2btn.disabled=true;
}

}
function resey(){
    p1score.innerHTML=0;
    p2score.innerHTML=0;
    p1btn.disabled=false;
    p2btn.disabled=false;
    p2score.style.color="black";
    p1score.style.color="black";
}
p1btn.addEventListener('click',increase);
p2btn.addEventListener('click',increase);
reset.addEventListener('click',resey);