
    let model, labelContainer, maxPredictions, modelURL,metadataURL;

    async function init() {

       //남자 여자 선택 여부 확인
       const Male = document.getElementById('gender1');
       /* 체크 여부 확인 */
       const MaleResult = Male.checked;
      
      if(MaleResult ==true ){
        modelURL = "My_model1/model.json";
        metadataURL = "My_model1/metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
          const div =document.createElement("div");
          div.setAttribute("class", "title-"+i);
          labelContainer.appendChild(div);
        }
      }else{
        modelURL = "My_model2/model.json";
        metadataURL = "My_model2/metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
          const div =document.createElement("div");
          div.setAttribute("class", "title-"+i);
          labelContainer.appendChild(div);
        }
      }


    }
    async function predict() {
        const img_src = document.getElementById("face-image");
        const chart_data = document.querySelector(".chart");
        const chart_html = [];
        const prediction = await model.predict(img_src,false);
        prediction.sort(function(a, b){ return b.probability-a.probability});
        const text = document.querySelector(".image_text");

       //남자 여자 선택 여부 확인
       const Male = document.getElementById('gender1');
       /* 체크 여부 확인 */
       const MaleResult = Male.checked;

       if( MaleResult == false){
        switch(prediction[0].className){
          case "강아지" : text.innerHTML= `<p class="img_desc1">애교쟁이 강아지상🐶</p>
                                          <p class="img_desc2">귀엽고 오밀조밀한 이목구비의 조화가 돋보이는 강아지상의 스타로는 송혜교, 한지민, 손예진, 박보영이 있다.이들은 대표적인 강아지상으로 눈, 코, 입이 작고 동그란 모양의 특징을 가지며 귀여움과 여성스러운 매력을 발산한다.</p>`;
            break;
          case "고양이" : text.innerHTML= `<p class="img_desc1">시크한 고양이상🐱</p>
                                          <p class="img_desc2">시원시원한 이목구비가 돋보이는 고양이상의 스타로는 한채영, 차예련, 유인영을 꼽을 수 있다.이들은 얇은 입술과 살짝 올라간 눈꼬리가 공통점으로 시크하면서 도회적인 분위기의 스타일을 찰떡같이 소화해낸다.</p>`;
            break;
          case "사슴상" : text.innerHTML= `<p class="img_desc1">똘망똘망한 사슴상🦌</p>
                                           <p class="img_desc2"> 여리여리한 분위기를 풍기는 사슴상의 스타로는 윤아, 이연희, 고아라가 있다.초롱초롱한 맑은 눈망울과 길게 빠진 목선이 아름다운 이들은 사슴상에 걸맞은 매력을 보여준다.특히 보호 본능을 자극하는 청초한 분위기와 맑은 눈매가 매력 포인트라고 할 수 있다.</p>`;
            break;
          case "토끼" : text.innerHTML= `<p class="img_desc1">깜찍한 토끼상🐰</p>
                                         <p class="img_desc2">통통 튀는 발랄한 매력을 가진 토끼상의 대표적인 스타로는 수지, 나연, 안소희를 꼽을 수 있다.토끼를 연상케 하는 귀여운 앞니와 하얀 피부는 소녀스러움을 극대화하며 사랑스러운 이미지를 만들어 준다.</p>`;
            break;
          default :
             break;
        }
       }else{
        switch(prediction[0].className){
          case "강아지" : text.innerHTML= `<p class="img_desc1">귀여운 강아지상🐶</p>
                                          <p class="img_desc2">귀엽고 오밀조밀한 이목구비의 조화가 돋보이는 강아지상의 스타로는 박보검, 송중기, 서인국, 박형석을 꼽을 수 있다. 이들은 대표적인 강아지상으로 눈, 코, 입이 작고 동그란 모양의 특징을 가지며 귀여움과 여성스러운 매력을 발산한다.</p>`;
            break;
          case "고양이" : text.innerHTML= `<p class="img_desc1">시크한 고양이상🐱</p>
                                          <p class="img_desc2">시원시원한 이목구비가 돋보이는 고양이상의 스타로는 강동원, 이준기, 이종석을 꼽을 수 있다.이들은 얇은 입술과 살짝 올라간 눈꼬리가 공통점으로 시크하면서 도회적인 분위기의 스타일을 찰떡같이 소화해낸다.</p>`;
            break;
          case "호랑이" : text.innerHTML= `<p class="img_desc1">용감한 호랑이상🐯</p>
                                           <p class="img_desc2"> 카리스마 넘치는 분위기를 풍기는 호랑이상의 스타로는 여진구, 박서준을 꼽을 수 있다. 눈매가 둥근 듯 크며서 속쌍꺼풀의 형태이다. 눈빛은 무서운듯 육식기운이 넘치나 앙칼지거나 쏘아붙이지는 않고 안정감이 있다.</p>`;
            break;
          case "늑대" : text.innerHTML= `<p class="img_desc1">날카로운 늑대상🐺</p>
                                         <p class="img_desc2">시크하고 날카로운 매력을 가진 늑대상의 대표적인 스타로는 김우빈, 원우를 꼽을 수 있다. 늑대를 연상케 하는 용맹하고 눈이 깊어서 눈빛이 강하고 코도 뾰족하고 입은 날카롭다.</p>`;
            break;
          case "곰" : text.innerHTML= `<p class="img_desc1">듬직한 곰상🐻</p>
                                         <p class="img_desc2">푸근하면 듬직한 매력을 가진 곰상의 대표적인 스타로는 마동석, 조진웅을 꼽을 수 있다. 어딘가 무서워 보이는 외모와 달리 큼직하고 뚜렷한 이목구비와 치명적인 섹시함을 가지고 있다.</p>`;
            break;
          default :
             break;
        }
       }

        for (let i = 0; i < maxPredictions; i++) {
           /* const classPrediction =
                prediction[i].className + " : " + prediction[i].probability.toFixed(2)*100+"%";
            labelContainer.childNodes[i].innerHTML = classPrediction;
            */
            //chart DATA
            chart_html[i] = `<div class="bar-chart chart${i}" data-total="${prediction[i].probability.toFixed(2)*100}" animated>
            <span class="bar-chart--text">${prediction[i].className}</span>
            <span class="bar-chart--inner" style="width:${prediction[i].probability.toFixed(2)*100}%;">${prediction[i].probability.toFixed(2)*100}%</span>
             </div>`;
        }
        chart_data.innerHTML = chart_html.join("");
    }
/////////////////////////////////////////////////////////
////////----------FILE UPLOAD-------------------/////////
/////////////////////////////////////////////////////////
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(".image-upload-wrap").hide();
      $(".file-upload-image").attr("src", e.target.result);
      $(".file-upload-content").show();
      $(".image-title").html(input.files[0].name);
    };
    const text = document.querySelector(".image_text");
    text.innerHTML = "<p>잠시만 기달려주세요!!</P>"
    init().then(()=>{
      predict();
    });
    reader.readAsDataURL(input.files[0]);

  } else {
    removeUpload();
  }
}
function removeUpload() {
  $(".file-upload-input").replaceWith($(".file-upload-input").clone());
  $(".file-upload-content").hide();
  $(".image-upload-wrap").show();
}
$(".image-upload-wrap").bind("dragover", function () {
  $(".image-upload-wrap").addClass("image-dropping");
});
$(".image-upload-wrap").bind("dragleave", function () {
  $(".image-upload-wrap").removeClass("image-dropping");
});
//////////////////////////////////////////////////////////
/////////--------------CHART---------------------/////////
//////////////////////////////////////////////////////////
var app = {
	init: function () {
		this.cacheDOM();
		this.handleCharts();
	},
	cacheDOM: function () {
		this.$chart = $(".bar-chart");
	},
	cssSelectors: {
		chartBar: "bar-chart--inner"
	},
	handleCharts: function () {
		$.each(this.$chart, function () {
			var $this = $(this),
				total = $this.data("total"),
				$targetBar = $this.find("." + app.cssSelectors.chartBar);
			$targetBar.css("width", "0%"); // zero out for animation
			setTimeout(function () {
				$targetBar.css("width", total + "%");
			}, 400);
		});
	}
};
//////////////////////////////////////////////////////////
/////////----------------btn---------------------/////////
//////////////////////////////////////////////////////////
function event_handel(){
  const btn1 = document.querySelector('.btn1');
  const btn2 = document.querySelector('.btn2');
  const btn3 = document.querySelector('.btn3');
  const btn4 = document.querySelector('.btn4');
  const btn5 = document.querySelector('.btn5');

  btn1.addEventListener('click', (e)=>{ location.href = "../Home/Home.html"});
  btn2.addEventListener('click', (e)=>{ alert("개발중입니다. 조금만 기달려주세요")});
  btn3.addEventListener('click', (e)=>{ alert("개발중입니다. 조금만 기달려주세요")});
  btn4.addEventListener('click', (e)=>{ alert("개발중입니다. 조금만 기달려주세요")});
  btn5.addEventListener('click', (e)=>{ alert("개발중입니다. 조금만 기달려주세요")});
  

}

app.init();
event_handel();
