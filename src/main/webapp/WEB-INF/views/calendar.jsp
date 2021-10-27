<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page import="java.util.*"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>캘린더</title>

<link rel="stylesheet"
	href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
	integrity="sha384-v8BU367qNbs/aIZIxuivaU55N5GPF89WBerHoGA4QTcbUjYiLQtKdrfXnqAcXyTv"
	crossorigin="anonymous">

<link
	href='http://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700'
	rel='stylesheet' type='text/css'>
<!--font-family: 'Roboto' 기본Font사용 URL -->

<link href="/css/calendarForm.css" rel="stylesheet" type="text/css">
<link href="/css/calendarMonth.css" rel="stylesheet" type="text/css">
<link href="/css/calendarWeek.css" rel="stylesheet" type="text/css">
<link href="/css/common.css" rel="stylesheet" type="text/css">

<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<script src="/js/calendar.js"></script>
</head>
<body>
	<!--------------- HEADER ⊃  calendar_title,calendar_main-------------->
	<div class="headerContainer">
		<div class="calendar_title">
			<i class="far fa-calendar-check" id="icon_calendar"></i> <span
				class="calendar_title_logo">캘린더</span>
		</div>

		<div class="calendar_main">
			<div class="calendar_main_left">
				<button id="prev">&#60;</button>
				<span class="current-year-month"> </span>
				<button id="next">&#62;</button>
			</div>

			<div class="calendar_main_right">
				<input type="button" value="weekly" class="mwBtn headerBtn" />
				<!-- toggle -->
				<input type="button" value="today" class="todayBtn headerBtn" />
			</div>

		</div>
	</div>


	<!--------------- SECTION  ⊃  leftSection.studioContainer --------------->
	<div class="sectionContainer">
		<!------------- LEFT --------------->
		<div class="leftSection">
			<div class="userProfile">
				<div class="prifileTitle">
					<i class="far fa-user-circle fa-3x" id="icon_user"></i>
					<h2 class="profileName">${name}님</h2>
					<div>
						<span id="id">${id}</span>
					</div>
				</div>
				<input type="button" value="스케쥴 현황" class="scheduleBtn" />
				<!-- onclick="location.href='/studio/reservation'" -->
			</div>
			<div class="contentContainer">
				<form>
					<select name="checkedMain" id="checkedMain" class="checkedContent">
						<option value="none">== 건물 선택 ==</option>
						<c:forEach var="i" begin="0" end="${fn:length(mainContentList)-1}">
							<option value="${mainContentList[i]}">${mainContentList[i]}</option>
						</c:forEach>
					</select> <select name="checkedSub" id="checkedSub" class="checkedContent">
						<option value="none">== 건물을 먼저 선택해주세요 ==</option>
					</select>
				</form>
			</div>

		</div>
		<!--------------- RIGHT  --------------->
		<div class="rightSection">
			<!-- month form -->
<%-- 			<div id="calendar">
				<div class="dayHeaderContainer">
					<div class="dayHeader">월</div>
					<div class="dayHeader">화</div>
					<div class="dayHeader">수</div>
					<div class="dayHeader">목</div>
					<div class="dayHeader">금</div>
					<div class="dayHeader">토</div>
					<div class="dayHeader">일</div>
				</div>
				<c:forEach var="i" begin="0" end="5">
					<div class='calendarWeekContainer week${i+1}'>
						<c:forEach var="i" begin="0" end="6">
							<div class='calendar__day'>
								<span></span><span></span>
							</div>
						</c:forEach>
					</div>
				</c:forEach>					
			</div> --%>

			<!-- week form -->
			<div class="timeLineContainer">
				<div class="timeLineTitle">TIME</div>
				<!-- 9시~18시 -->
				<c:forEach var="i" begin="9" end="19">
					<div class="timeLineItem">${i}&nbsp:&nbsp00&nbsp~&nbsp${i}&nbsp:&nbsp30</div>
					<div class="timeLineItem">${i}&nbsp:&nbsp30&nbsp~&nbsp${i+1}&nbsp:&nbsp00</div>
				</c:forEach>
			</div>
			<div class="weekContainer">
				<div id="calendar">
					<div class="dayHeaderContainer">
						<div class="dayHeader">
							<span>월</span><span id="dayoftheweek0">test</span>
						</div>
						<div class="dayHeader">
							<span>화</span><span id="dayoftheweek1">test</span>
						</div>
						<div class="dayHeader">
							<span>수</span><span id="dayoftheweek2">test</span>
						</div>
						<div class="dayHeader">
							<span>목</span><span id="dayoftheweek3">test</span>
						</div>
						<div class="dayHeader">
							<span>금</span><span id="dayoftheweek4">test</span>
						</div>
						<div class="dayHeader">
							<span>토</span><span id="dayoftheweek5">test</span>
						</div>
						<div class="dayHeader">
							<span>일</span><span id="dayoftheweek6">test</span>
						</div>
					</div>

					<div id="calendar_value"></div>
				</div>
			</div>



		</div>
	</div>
</body>
</html>
