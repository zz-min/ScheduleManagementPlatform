/**
 * 
 */
$(function() {
	var script = document.createElement('script');
	script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
	script.type = 'text/javascript';

	var userLoginDialog, userLoginForm;
	var adminLoginDialog, adminLoginForm;

	var userLoginField = $([]).add("#userId").add("#userPwd");
	var adminLoginField = $([]).add("#adminId").add("#adminPwd");

	function checkLength(o, min, max) {
		if (o.val().length > max || o.val().length < min) {
			return false;
		} else {
			o.removeClass("ui-state-error"); //에러 없애기
			return true;
		}
	}
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
	function userLoginCheckLength() {
		var valid = true;
		userLoginField.removeClass("ui-state-error");

		valid = checkLength(userLoginField, 5, 15);
		//valid = checkLength($("#userID"), 5, 15) && checkLength($("#user"), 4, 20);
		if (valid) {//true - 로그인 요청
			userLoginFun();
		} else {//false
			userLoginField.addClass("ui-state-error");
			alert("아이디와 비밀번호를 다시 확인해 주세요.");
		}
	}

	function userLoginFun() {
		const userId = btoa($("#userId").val());//base64 인코딩
		const userPwd = btoa($("#userPwd").val());
		var url = `/api/users/login?id=${userId}&pwd=${userPwd}`
		loginFetch(url, userId, userPwd);
	}
	
	function loginFetch(url, id, pwd) {//GET메소드
		console.log("loginFetch함수 URL : " + url);

		fetch(url)
			.then(res => res.text())
			.then(res => {
				if (res == 'true') {
					console.log("로그인 성공");
					var index = $("#id_check").text().substr(3);
					window.location.assign("/main?btn=" + index+"&id="+$("#userId").val());
				} else alert("아이디와 비밀번호를 다시 확인해 주세요."); 
			});

	}

	$(".menuBtn").on("click", function() {
		$("#id_check").text($(this).attr("id"));
		userLoginDialog.dialog("open");
	});
	$("#admin-icon").on("click", function() {
		adminLoginDialog.dialog("open");
	});
});