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
				<input type="button" value="예약현황" class="rsvBtn" />
				<!-- onclick="location.href='/studio/reservation'" -->
			</div>
			<div class="studioContainer">
				<form>
					<select name="checkedLoc1" id="checkedLoc1" class="checkedLoc">
						<option value="none">== 건물 선택 ==</option>
						<c:forEach var="i" begin="0" end="${fn:length(mainContentList)-1}">
							<option value="${mainContentList[i]}">${mainContentList[i]}</option>
						</c:forEach>
					</select> <select name="checkedLoc2" id="checkedLoc2" class="checkedLoc">
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
					<%-- <c:set var="str1" value=i+":00 ~ "+i+":30"/>
					<c:set var="str1" value=i+":30 ~ "+(i+1)+":00"/> --%>
					<div class="timeLineItem"><c:out value=i+':00 ~ '+i+':30'/></div>
					<div class="timeLineItem"><c:out value=i+":30 ~ "+(i+1)+":00"/></div>
				</c:forEach>
<!-- 				<div class="timeLineItem">09:00 ~ 09:30</div>
				<div class="timeLineItem">09:30 ~ 10:00</div>
				<div class="timeLineItem">10:00 ~ 10:30</div>
				<div class="timeLineItem">10:30 ~ 11:00</div>
				<div class="timeLineItem">11:00 ~ 11:30</div>
				<div class="timeLineItem">11:30 ~ 12:00</div>
				<div class="timeLineItem">12:00 ~ 12:30</div>
				<div class="timeLineItem">12:30 ~ 01:00</div>
				<div class="timeLineItem">01:00 ~ 01:30</div>
				<div class="timeLineItem">01:30 ~ 02:00</div>
				<div class="timeLineItem">02:00 ~ 02:30</div>
				<div class="timeLineItem">02:30 ~ 03:00</div>
				<div class="timeLineItem">03:00 ~ 03:30</div>
				<div class="timeLineItem">03:30 ~ 04:00</div>
				<div class="timeLineItem">04:00 ~ 04:30</div>
				<div class="timeLineItem">04:30 ~ 05:00</div>
				<div class="timeLineItem">05:00 ~ 05:30</div>
				<div class="timeLineItem">05:30 ~ 06:00</div> -->
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
