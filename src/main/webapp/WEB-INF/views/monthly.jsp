<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file ="/WEB-INF/views/header.jsp" %>



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
						<span id="categoryNo">${categorySession}</span>
				</div>
				<input type="button" value="스케쥴 현황" class="scheduleBtn" />
			</div>
			<div class="contentContainer">
				<form>
					<select name="checkedMain" id="checkedMain" class="checkedContent">
						<option value="none">== 매인 카테고리 선택 ==</option>
						<c:forEach var="i" begin="0" end="${fn:length(mainContentList)-1}">
							<option value="${mainContentList[i]}">${mainContentList[i]}</option>
						</c:forEach>
					</select> <select name="checkedSub" id="checkedSub" class="checkedContent">
						<option value="none">== 매인 카테고리를 먼저 선택해주세요 ==</option>
					</select>
				</form>
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
					<div class='calendarWeekContainer week${i+1}'><!-- week 1 ~ 6 -->
						<c:forEach var="j" begin="0" end="6">
							<div class='calendar_day'>
								<span></span><span></span>
							</div>
						</c:forEach>
					</div>
				</c:forEach>
			</div>
		</div>
	</div>
	

	
<%@include file ="/WEB-INF/views/footer.jsp" %>