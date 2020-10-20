var firebaseEmailAuth; //파이어베이스 email 인증 모듈 전역변수
var firebaseDatabase; //파이어베이스 db 모듈 전역변수
var name; //유저 이름
var loginUserKey; //로그인한 유저의 부모 key
var userInfo; //로그인한 유저의 정보 object type

//파이어 베이스 초기화 코드
var config = {
  apiKey: "AIzaSyB_xq6xyYtpf1_N-XVNu0ToWvilb8veVBs",
  authDomain: "lsj-test-17217.firebaseapp.com",
  databaseURL: "https://lsj-test-17217.firebaseio.com",
  projectId: "lsj-test-17217",
  storageBucket: "lsj-test-17217.appspot.com",
  messagingSenderId: "168271600318"
};
//파이어베이스 초기화
firebase.initializeApp(config);
//인증모듈 객체 가져오기
firebaseEmailAuth = firebase.auth();
//데이터베이스 모듈객체 가져오기
firebaseDatabase = firebase.database();
//세션 체크 함수
userSessionCheck();
//
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

