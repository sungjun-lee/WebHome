var firebaseEmailAuth; //파이어베이스 email 인증 모듈 전역변수
var firebaseDatabase; //파이어베이스 db 모듈 전역변수
var userInfo; //가입한 유저의 정보. object 타입

//파이어 베이스 초기화 코드
var config = {
  apiKey: "AIzaSyB_xq6xyYtpf1_N-XVNu0ToWvilb8veVBs",
  authDomain: "lsj-test-17217.firebaseapp.com",
  databaseURL: "https://lsj-test-17217.firebaseio.com",
  projectId: "lsj-test-17217",
  storageBucket: "lsj-test-17217.appspot.com",
  messagingSenderId: "168271600318"
};
firebase.initializeApp(config);

firebaseEmailAuth = firebase.auth();
firebaseDatabase = firebase.database();

//제이쿼리 
$(document).ready(function () {

  //가입버튼 눌렀을 때 작동하는 함수
  $(document).on('click', '.join', function () {

    //jquery를 이용해서 입력된 값을 가져온다.  
    var email = $('#email').val();
    var password = $('#pwd').val();
    name = $('#name').val();

    //이메일로 가입 버튼 눌렀을 때 작동되는 함수 - firebase 인증 모듈
    firebaseEmailAuth.createUserWithEmailAndPassword(email, password).then(function (user) {

      userInfo = user; //가입 후 callBack 함수로 생성된 유저의 정보가 user에 담겨서 넘어온다. 전역변수에 할당.

      //뭐가 찍히는지 직접 체크해보세요.
      console.log("userInfo/" + userInfo); //오브젝트 타입
      console.log("userInfo.currentUser/" + userInfo.currentUser); //안됨
      console.log("userInfo.uid/" + userInfo.uid); //vPArtCHqPpOeIOpidEfug0Kgq3v1

      //성공했을 때 작동되는 함수
      logUser();

    }, function (error) {
      //에러가 발생했을 때 
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });

    //가입 성공했을 때 호출 되는 함수 - 위의 firebase의 인증 모듈과 다른 database 모듈임을 확인하자.
    function logUser() {
      var ref = firebaseDatabase.ref("users/" + userInfo.uid); //저장될 곳을 users라는 부모 키를 레퍼런스로 지정.
      //저장 형식
      var obj = {
        name: name,
      };
      ref.set(obj); // 고유한 자식 키가 하나 생셩이 되면서 json 삽입
      alert("가입성공");
      //메인 페이지로 이동시키고 세션 저장시키기
      window.location.href = "../index.html"
    }
  });
});


//세션 체크 함수
userSessionCheck();

//유저가 로그인 했는지 안했는지 확인해주는 함수
function userSessionCheck() {

  //로그인이 되어있으면 - 유저가 있으면, user를 인자값으로 넘겨준다.
  firebaseEmailAuth.onAuthStateChanged(function (user) {

    if (user) {
      //조회 - 데이터 베이스에 저장된 닉네임을 현재 접속되어 있는 user의 pk key 값을 이용해서 가져오기
      firebaseDatabase.ref("users/" + user.uid).once('value').then(function (snapshot) {
        //자바스크립트 dom 선택자를 통해서 네비게이션 메뉴의 엘리먼트 변경해주기
        document.getElementById("login").textContent = "로그아웃";
        document.getElementById("visit").textContent = "회원가입";
        document.getElementById("find").textContent = "ID/PW찾기";
        
        document.getElementById("joinuser").textContent = "반가워요! " + snapshot.val().name + "님";
        //document.getElementById("joinmenu").href = "#";
        name = snapshot.val().name;   //유저 닉네임은 계속 쓸거기 때문에 전역변수로 할당
        loginUserKey = snapshot.key;  //로그인한 유저의 key도 계속 쓸 것이기 때문에 전역변수로 할당
        userInfo = snapshot.val(); //snapshot.val()에 user 테이블에 있는 해당 개체 정보가 넘어온다. userInfo에 대입!

        return true
      });
    }else{
      document.getElementById("login").textContent = "로그인";
      document.getElementById("visit").textContent = "회원가입";
      document.getElementById("find").textContent = "ID/PW찾기";
    }
  });
}




event_handle();
//

function event_handle() {
  const login = document.querySelector('.login');
  const visit = document.querySelector('.visit');
  const find = document.querySelector('.find');


  login.addEventListener("click", e => { login_check(e) })
  visit.addEventListener('click', (e)=>{ location.href = "../Join/join.html"});
  find.addEventListener('click', (e)=>{ location.href = "../Find/find.html"});

}

function login_check(e) {
  const login = document.querySelector(".login");
  if (login.textContent == "로그인") {
    location.href = "/Log_in/log_in.html";
  } else {
    alert("로그아웃 했습니다.");
    firebaseEmailAuth.signOut().then(function () {
      //alert("로그아웃 되었습니다")
      //메인 페이지로 이동시키고 세션 저장시키기
      window.location.href = "../index.html"
    }).catch(function (error) {
      if (error) {
        alert("로그인 실패");
      }
    });
  }
}