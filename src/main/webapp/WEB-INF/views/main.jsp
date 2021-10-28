<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Main Page</title>
<link
	href='http://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700'
	rel='stylesheet' type='text/css'><!--font-family: 'Roboto' 기본Font사용 URL -->
<link href="/css/common.css" rel="stylesheet" type="text/css">
<link href="/css/main.css" rel="stylesheet" type="text/css">
<link href="/css/dialog.css" rel="stylesheet" type="text/css">

<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script><!-- Icon사용 URL -->

<script src="/js/main.js"></script>
</head>
<body>
	<div class="iconContainer">
		<i class="fas fa-user-cog fa-3x" id="admin-icon"></i><!-- admin페이지로 이동 -->
	</div>
	
	<div class="titleContainer">
		<h1 id="title">Schedule Management Platform</h1>
		<p id="checkedCategory"></p><!--category1값이 text로 저장 - hidden  -->
	</div>

	<div class="btnContainer">
		<input type="button" name="studioBtn" value="studio" class="menuBtn" id="category1"/>
		<input type="button" name="studioBtn" value="rental" class="menuBtn" id="category2"/>
		<input type="button" name="studioBtn" value="aaa" class="menuBtn" id="category3"/>
		<input type="button" name="studioBtn" value="bbb" class="menuBtn" id="category4"/>
		<input type="button" name="studioBtn" value="ccc" class="menuBtn" id="category5"/>
		<input type="button" name="studioBtn" value="ddd" class="menuBtn" id="category6"/>
		<input type="button" name="studioBtn" value="eee" class="menuBtn" id="category7"/>
	</div>	
	
 	<!------------------------- studio button - login dialog ------------------------->
	<div id="user-login-dialog-form" class="dialog" title="로그인">
		<div class="login_property">
			<div id="loginPropertyLeft" style="display: inline-block">
				<div class="inputText">
					<label for="userId" class="idLabel">&nbsp아이디 :&nbsp </label> <input
						type="text" name="userId" id="userId"
						placeholder="ID를 입력하세요."
						class="text ui-widget-content ui-corner-all id" required />
				</div>

				<div class="inputText">
					<label for="userPwd" class="passwordLabel">비밀번호 : &nbsp</label> <input
						type="password" name="userPwd" id="userPwd"
						placeholder="비밀번호를 입력하세요."
						class="text ui-widget-content ui-corner-all password" required />
				</div>
			</div>
		</div>
	</div>

</body>
</html>