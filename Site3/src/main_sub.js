

function restart_btn_click(e){
    location.href=`index.html`;
}


function event_handle(){
    const restart_btn = document.querySelector(".restart_btn");   
    const btn1 = document.querySelector('.btn1');
    const btn2 = document.querySelector('.btn2');
    const btn3 = document.querySelector('.btn3');
    const btn4 = document.querySelector('.btn4');
    const btn5 = document.querySelector('.btn5');
  
    restart_btn.addEventListener("click",(e)=>{ restart_btn_click(e); });
    btn1.addEventListener('click', (e)=>{ location.href = "../Home/Home.html"});
    btn2.addEventListener('click', (e)=>{ alert("개발중입니다. 조금만 기달려주세요")});
    btn3.addEventListener('click', (e)=>{ alert("개발중입니다. 조금만 기달려주세요")});
    btn4.addEventListener('click', (e)=>{ alert("개발중입니다. 조금만 기달려주세요")});
    btn5.addEventListener('click', (e)=>{ alert("개발중입니다. 조금만 기달려주세요")});
}

event_handle();