<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file ="/WEB-INF/views/header.jsp" %>
<script src="/js/calendarJS.js?d" defer></script>

<div class="sectionContainer">
	<!------------- LEFT --------------->
	<div class="leftSection">
		<div class="calendarHeaderContainer">
			<h1 class="currentCalendarHeader"> </h1>
			<div id="prevBtn"  class="calendarHeaderBtn" > < </div>
			<div id="todayBtn"  class="calendarHeaderBtn" > today </div>
			<div id="nextBtn" class="calendarHeaderBtn"> > </div>
		</div>
		<div class="contentContainer">
			<h2>카테고리 선택</h2> 
			<form class="contentForm">
				<select name="checkedMain" id="checkedMainCategory" class="checkedContentSelect">
					<option value="none">= 매인 카테고리 =&nbsp&nbsp</option>
					<c:forEach var="i" begin="0" end="${fn:length(mainContentList)-1}">
						<option value="${mainContentList[i]}">${mainContentList[i]}</option>
					</c:forEach>
				</select> 
				<select name="checkedSub" id="checkedSubCategory" class="checkedContentSelect">
					<option value="none">= 매인을 먼저 선택해주세요 =&nbsp&nbsp</option>
				</select>
			</form>
			<input type="button" value="선택 카테고리 보기" id="checkedContentBtn" class="contentBtn" />
			<input type="button" value="모든 카테고리 보기" id="allContentBtn" class="contentBtn" />
		</div>
		<div class="btnContainer">
			<input type="button" value="weekly" id="mwBtn" class="contentBtn" />
			<input type="button" value="My Reservation" id="rsvBtn" class="contentBtn" />
		</div>
		<div class="testArea">
		
		</div>
	</div>
	<!--------------- RIGHT  --------------->
	<div class="rightSection">
	<!-- month form -->
		<div class="monthlyCalendar">
			<div class="dayHeaderContainer">
				<c:forEach var="item" items="${days}" varStatus="idx">
					<div class="dayHeader">${item}</div>
				</c:forEach>
			</div>
			<c:forEach var="i" begin="0" end="5">
				<div class='calendarWeekContainer week${i+1}'>
					<!-- week 1 ~ 6 -->
					<c:forEach var="j" begin="0" end="6">
						<div class='calendar_day'>
							<span></span><span id="monthData"></span>
						</div>
					</c:forEach>
				</div>
			</c:forEach>
		</div>
		
		<!-- week form -->
		<div class="weeklyCalendar">
			<div class="timeLineContainer">
				<div class="timeLineTitle">TIME</div>
				<!-- 9시~18시 -->
				<c:forEach var="i" begin="9" end="18">
					<div class="timeLineItem">${i}:00</div>
					<div class="timeLineItem">--</div>
				</c:forEach>
					<div class="timeLineItem">19:00</div>
			</div>
			<div class="timeTableContainer">				
				<div class="weekDayHeaderContainer">
					<c:forEach var="item" items="${days}" varStatus="idx">
						<div class="weekDayHeader">
							<span>${item}&nbsp&nbsp</span> 
							<span class="dayoftheweek${idx.index}">NoneData</span>
						</div>
					</c:forEach>
				</div>

				<div class="weekItemContainer">
					<c:forEach var="i" begin="1" end="140">
					 	<div class="weekItem"></div>
					 </c:forEach>
				</div>				
			</div>
		</div>

		<!-- schedule form -->
		<div class="userScheduleContainer">
			<h1>내 스케쥴 현황</h1>
			<div id="scheduleList">
				<table border="1">
					<thead>
						<tr>
							<th>스튜디오</th>
							<th>예약 날짜</th>
							<th>시간</th>
						</tr>
					</thead>
					<tbody id="scheduleTableBody">

					</tbody>
				</table>
			</div>
		</div>
		
	</div><!-- rightSection END -->
</div><!-- sectionContainer END -->

<!-------------------------- RSV dialog ------------------------->
	<div id="rsv-dialog-form" class="dialog" title="예약현황">
		<div id="dialogHeader">
			<h1 id ="rsv-dialog-date"></h1>
			<h2>스케쥴 현황</h2>
		</div>
		<hr>
		<h2>❤❤예약중</h2>
		<h4 id="dialog-rsvList">list</h4><br>
		
		<h2>❤❤예약하기</h2>
		<h4 id="dialog-rsv">list</h4>
		<form>
			<select name="checkedMainDialog" id="checkedMainDialog" class="checkedContent">
				<option value="none">== 매인 카테고리 선택 ==</option>
				<c:forEach var="i" begin="0" end="${fn:length(mainContentList)-1}">
					<option value="${mainContentList[i]}">${mainContentList[i]}</option>
				</c:forEach>
			</select> 
			<select name="checkedSubDialog" id="checkedSubDialog" class="checkedContent">
				<option value="none">== 매인 카테고리를 먼저 선택해주세요 ==</option>
			</select>
			<p><input type="time" value="09:00" min="09:00:00" max="19:00:00"></p>
		</form>
	</div><!-- rsv-dialog-form END-->

<%@include file="/WEB-INF/views/footer.jsp"%>