
    let model, labelContainer, maxPredictions, modelURL,metadataURL;

    async function init() {

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
  }
    async function predict() {
        const img_src = document.getElementById("face-image");
        const prediction = await model.predict(img_src,false);
        prediction.sort(function(a, b){ return b.probability-a.probability});
        const text = document.querySelector(".image_text");

        switch(prediction[0].className){
          case "동그란 입술" : text.innerHTML=  `<p class="img_desc1">동그란 입술</p>
                                                <p class="img_desc2">낭만을 추구하는 로맨티스트 명석한 두뇌와 청의적인 사고로 어디서든 인정받을 가능성이 높음.</p>`;
            break;
          case "두툼한 입술" : text.innerHTML= `<p class="img_desc1">두툼한 입술</p>
                                               <p class="img_desc2">자기애가 강하면 자존감이 높음 적극적이고 리더십이 강해 스스로나서 많은 사람들을 이끎</p>`;                         
            break;
          case "산이 뭉툭한 입술" : text.innerHTML= `<p class="img_desc1">동그란 입술</p>
                                                    <p class="img_desc2">남의 시선을 의식하지않고 하고픈 대로 움직인다. 털털하고 성격이 좋아 인기가 많은 편.</p>`;
            break;
          case "얇은 입술" : text.innerHTML= `<p class="img_desc1">얇은 입술</p>
                                             <p class="img_desc2">야심을 품고 꿈을 이루기 위해 최선을 다하는 노력파. 다소 냉담하고 이기적인 면도 있음.</p>`;
            break;
          case "입꼬리가 올라간 입술" : text.innerHTML= `<p class="img_desc1">입꼬리가 올라간 입술</p>
                                                        <p class="img_desc2">긍정적이면서 쾌할한 성격 평소에도 미소를띤 인상으로 대부분 대인관계가 좋은편.</p>`;
             break;
          case "입꼬리가 쳐진 입술" : text.innerHTML= `<p class="img_desc1">입꼬리가 쳐진 입술/p>
                                                      <p class="img_desc2">방어적이고 겁이많은 편 세상에 상처받은 걸두려워하면 적은 사람과 깊은 관계를 유지함.</p>`;
            break;
          default :
             break;
        }

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

event_handel();
