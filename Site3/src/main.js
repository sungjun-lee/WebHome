
let cnt = 0;
let q =[  
          "몰래 숨어서 지켜보는걸 좋아한다."
         ,"조용히 지켜보다가 플레이어에게 투표한다."
         ,"게임이 시작되면 자신의 정체를 밝힌다."
         ,"모든 상황이 재미있고 즐겜한다."
         ,"다른 플레이어의 의견을 무시한다."
         ,"끌리는 플레이어를 집요하게 따라 다닌다."
         ,"회의를 시작하면 한명을 지목한다."
         ,"여기저기 움직이면서 모든상황에 관여한다."
         ,"게임에는 관심없다 오직 나만의 길을 간다."
         ,"조용히 아무말도 없이 플레이어 한다."
        ];

function display_Data(cnt){
    const question = document.querySelector(".question");
    const chart_bar = document.querySelector(".chart-inner");
    const order_question1 = document.querySelector(".order_question1");

    chart_bar.style.width=  (100/10*(cnt+1))+'%';
    question.textContent = 'Q.'+q[cnt];
    order_question1.textContent = cnt+1;
}

function start_btn_click(e){
    const start_display = document.getElementById("start_display");
    const question_display = document.getElementById("question_display");

    display_Data(cnt);

    start_display.style.display = 'none';
    question_display.style.display = 'flex';
}

function answer1_click(e){
    cnt =cnt+1;
    if( cnt <10){
        display_Data(cnt);
    }else{
        location.href=`reustl${Math.floor(Math.random() * 5)+1 }.html`;
    }
    
}

function answer2_click(e){
    cnt =cnt+1;
    if( cnt <10){
        display_Data(cnt);
    }else{
        location.href=`reustl${Math.floor(Math.random() * 5)+1 }.html`;
    }
}

function event_handle(){
    const start_btn = document.querySelector(".start_btn");
    const answer1 = document.querySelector(".answer1");
    const answer2 = document.querySelector(".answer2");
    const btn1 = document.querySelector('.btn1');
    const btn2 = document.querySelector('.btn2');
    const btn3 = document.querySelector('.btn3');
    const btn4 = document.querySelector('.btn4');
    const btn5 = document.querySelector('.btn5');
    //// 
    start_btn.addEventListener("click",(e)=>{ start_btn_click(e); });
    answer1.addEventListener("click", (e)=>{ answer1_click(e)});
    answer2.addEventListener("click", (e)=>{ answer2_click(e)});
    btn1.addEventListener('click', (e)=>{ location.href = "../Home/Home.html"});
    btn2.addEventListener('click', (e)=>{ alert("개발중입니다. 조금만 기달려주세요")});
    btn3.addEventListener('click', (e)=>{ alert("개발중입니다. 조금만 기달려주세요")});
    btn4.addEventListener('click', (e)=>{ alert("개발중입니다. 조금만 기달려주세요")});
    btn5.addEventListener('click', (e)=>{ alert("개발중입니다. 조금만 기달려주세요")});
}

event_handle();