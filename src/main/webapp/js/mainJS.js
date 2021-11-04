const toggleBtn=document.querySelector('.navbar_toogleBtn');
const menu=document.querySelector('.navbar_menu');
const menuChild=menu.childNodes;
const icons=document.querySelector('.navbar_icons');
const faqTest=document.querySelector('#faqTest');
const mainContatiner=document.querySelector('#mainContatiner');

toggleBtn.addEventListener('click',()=>{
    menu.classList.toggle('active');
    icons.classList.toggle('active');
});
faqTest.addEventListener('click', () => {
		deleteMain();
});
menuChild[1].addEventListener('click', () => {
		alert("menu1");
});
menuChild[4].addEventListener('click', () => {
		alert("menu4");
});

function deleteMain(){
	console.log(mainContatiner.childElementCount);
	for(var i=1;i<=mainContatiner.childElementCount;i++){
		var temp=mainContatiner.childNodes;
		temp[i].style.display = "none";
	}
}

$(function() {
	var userLoginDialog;
	var userLoginField = $([]).add("#userId").add("#userPwd");
	
	userLoginDialog = $("#user-login-dialog-form").dialog({
		autoOpen: false,//페이지 로드시 다이얼로그가 자동으로 열리는 것 방지
		height: 250,
		width: 450,
		modal: true,//최상위에 다이알로그 표시
		resizable: false,//창크기 조절할 수 없도록 설정
		buttons: {
			"확인": function() {
				userLoginCheckLength();
			},
			"취소": function() {
				userLoginDialog.dialog("close");
			}
		},
		close: function() {
			userLoginField.removeClass("ui-state-error");//에러 없애기
		}
	});
	
	function userLoginCheckLength() {//로그인 요청시 들어오는 함수
		userLoginField.removeClass("ui-state-error"); //에러 없애기
		if (userLoginField.val().length > 15 || userLoginField.val().length < 5) {
			//false
			userLoginField.addClass("ui-state-error");
			alert("아이디와 비밀번호를 다시 확인해 주세요.");
		} else {//true - 로그인 요청
			userLoginFun();
		}
	}
	function userLoginFun() {
		const userId = btoa($("#userId").val());//base64 인코딩
		const userPwd = btoa($("#userPwd").val());
		var url = `/api/users/login?id=${userId}&pwd=${userPwd}`;// 로그인 요청보내기
		loginFetch(url, userId, userPwd);
	}
	
	function loginFetch(url, id, pwd) {//GET메소드
		console.log("loginFetch함수 URL : " + url);

		fetch(url)
			.then(res => res.text())
			.then(res => {
				if (res == 'true') {
					console.log("로그인 성공");
					console.log(document.cookie);
					console.log(getCookie("userName"));
					$(".loginBtn").children().last().text(getCookie("userName"));
					$(".loginBtn").children().last().append('<br><span id="logoutBtn" class="loginBtn_content">logout</span><span id="mypageBtn" class="loginBtn_content">mypage</span>');
					
					userLoginDialog.dialog("close");
					
					//var index = $("#checkedCategory").text().substr(8);
					//window.location.assign("/main?category=" + index+"&id="+$("#userId").val());
				} else alert("아이디와 비밀번호를 다시 확인해 주세요."); 
			});
	}
	function getCookie(cookie_name) {
		//document.cookie => userId=600548; userName=홍길동; login=true
		var x, y; 
		var val = document.cookie.split(';');
		for (var i = 0; i < val.length; i++) {
			x = val[i].substr(0, val[i].indexOf('='));
			y = val[i].substr(val[i].indexOf('=') + 1);
			x = x.replace(/^\s+|\s+$/g, '');// 앞과 뒤의 공백 제거하기 
			if (x == cookie_name) {return unescape(y); }
			// unescape로 디코딩 후 값 리턴 
		}
	} 
	$(".navbar_icons").children().on("click", function() {
		userLoginDialog.dialog("open");
	});
	
});