$(document).ready(function() {//DOM Tree 생성 완료 후 호출 (즉, 먼저 실행, 순차적실행)
});

$(window).load(function() {//모든 페이지 구성요소 페인팅 완료 후 호출 ONLY ONE
	function showMonth() {
		$(".monthlyCalendar").show();
		$(".weeklyCalendar").hide();
		$(".userScheduleContainer").hide();
	}
	function showWeek() {
		$(".monthlyCalendar").hide();
		$(".weeklyCalendar").show();
		$(".userScheduleContainer").hide();
	}
	function showSchedule() {
		$(".monthlyCalendar").hide();
		$(".weeklyCalendar").hide();
		$(".userScheduleContainer").show();
	}
	
	var path = window.location.href;
	var path_ = path.split('/').reverse()[0];
	var categoryName=['studio','rental','consulting'];
	var categoryNo=categoryName.indexOf(path_)+1; // 사용시 ${categoryNo}이렇게 사용할 것
	
	var rsvDialog, rsvForm;
	
	const today = new Date(); // 현재 오늘 날짜 (변함 x , 고정값)
	
	let currentDate=today;//페이지에서의 날짜 - CD (2021-11-6)
	
	let firstDate_CD;//CD 달의 첫 날 (2021-11-1)
	let lastDate_CD;//CD 달의 마지막 날 (2021-11-30)
	let prev_lastDate_CD;//CD 달의 지난 달의 마지막 날 (2021-10-31)
	let weekDate;//weekly 날짜 저장
	/* 알아보는 날짜 : 2021년 11월 1일 월요일
	
				Mon Nov 01 2021 01:24:19 GMT+0900 (한국 표준시)
				getFullYear : 2021
	(0~11)		getMonth : 10
				getDate : 1
	(0일~6토)		getDay : 1
	
	*/
	showMonth();
	buildMonth();
	//////////달력 - Monthly	
	function buildMonth() {
		firstDate_CD =new Date(currentDate);
        firstDate_CD.setDate(1);
		
		$(".currentCalendarHeader").html(`${currentDate.getFullYear()}년&nbsp;&nbsp;&nbsp;&nbsp;${currentDate.getMonth() + 1}월&nbsp;(월)`);
		
		var daySet = makeElementMonth(firstDate_CD);
		monthlySetting(daySet);
		var v1 = $("#checkedMainCategory").val();
		var v2 = $("#checkedSubCategory").val();
		if (v1 != 'none' && v2 != 'none') {
			fetchData(`/api/schedules/${categoryNo}
				?year=${currentDate.getFullYear()}&month=${String(currentDate.getMonth()+1).padStart(2,'0')}
				&week=0&category=${v2}`,'monthly');
		}else{
			fetchData(`/api/schedules/${categoryNo}
				?year=${currentDate.getFullYear()}&month=${String(currentDate.getMonth()+1).padStart(2,'0')}
				&week=0&category=all`,'monthly');
		}
	
		
	}
	
	function makeElementMonth(firstDate_CD) { // 11/6
		let startDayCount = 1;
		let lastDayCount = 1;
		let firstDayName = null;//첫주 시작 월요일로 잡음
		if (firstDate_CD.getDay() == 0) firstDayName = 6; //첫날이 일요일이면 firstDayName = 6
		else firstDayName = firstDate_CD.getDay() - 1; //첫날이 월요일이면 0 ~ 토요일이면 5
		
		lastDate_CD =new Date(currentDate);
        lastDate_CD.setMonth(lastDate_CD.getMonth()+1);
        lastDate_CD.setDate(0); // 11/30
        
		prev_lastDate_CD =new Date(firstDate_CD);
		prev_lastDate_CD.setDate(0); // 10/31

		var daySet = [];
		var cnt = 0;
		for (let i = 0; i < 6; i++) {//1~6주차를 위해 6번 반복        
			for (let j = 0; j < 7; j++) {//일요일~토요일을 위해 7번 반복
				// <<1주차>> j < firstDayName: 이번 달 시작 요일 이전 일 때
				if (i == 0 && j < firstDayName) {
					daySet[cnt++] = `${(prev_lastDate_CD - (firstDayName - 1) + j)}`;
				}
				// <<1주차>> j == firstDayName: 이번 달 시작 요일일 때
				else if (i == 0 && j == firstDayName) {
					daySet[cnt++] = `${startDayCount++}`;
				}
				//<<1주차>> j > firstDayName: 이번 달 시작 요일 이후 일 때
				else if (i == 0 && j > firstDayName) {
					daySet[cnt++] = `${startDayCount++}`;
				}
				// startDayCount <= lastDay: 이번 달의 마지막 날이거나 이전일 때
				else if (i > 0 && startDayCount <= lastDate_CD.getDate()) {
					daySet[cnt++] = `${startDayCount++}`;
				}
				// startDayCount > lastDay: 이번 달의 마지막 날 이후일 때
				else if (startDayCount > lastDate_CD.getDate()) {
					daySet[cnt++] = `${lastDayCount++}`;
				}
			}
		}
		return daySet;
	}
	//////////달력 - weekly	
	function buildWeek(week) {
		weekDate=new Date(currentDate); 
		weekDate.setDate(weekDate.getDate() + week * 7);  // 0 현재, -1 저번주, +1 다음주		 
		
		let title = "&nbsp;" + today.getFullYear() + "년&nbsp;&nbsp;&nbsp;&nbsp;" + (today.getMonth() + 1) + "월&nbsp;(주)";
		for (let i = 0; i < 7; i++) {
			if (weekDate.getDate() == 1)
				title += " ~&nbsp;&nbsp;&nbsp;&nbsp; " + weekDate.getFullYear() + "년&nbsp;&nbsp;&nbsp;&nbsp;"
					+ (today.getMonth() + 1) + "월";
			weekDate.setDate(weekDate.getDate() + 1);
		}
		weekDate.setDate(weekDate.getDate() - 7);//원상복구
		//monthly header 변경
		$(".currentCalendarHeader").html(title);        

		//rightSection칸에 weekly 소스 채우기
		var daySet = makeElementWeek();
		weeklySetting(daySet);		
		
		// 해당 주 첫번째 날, 마지막 날 저장
		let firstWeekDay = daySet[0];
		let lastWeekDay = daySet[6];
		
		//몇주차데이터 받을지 넘기기 -> getWeekOfMonth(oneday)
		//2021년 11월 데이터 검기기 -> 2021, 11
		alert("카테고리를 선택해주세요.");
	}
	function makeElementWeek() {
		var daySet = [];
		
        if (weekDate.getDay() == 0) {
			weekDate.setDate(weekDate.getDate() - 6);
		} else {
			weekDate.setDate(weekDate.getDate() - (weekDate.getDay() - 1));
		}//첫주 시작 월요일로 잡기

		for (let cnt = 0; cnt < 7; cnt++) {//0~6
			daySet[cnt] = `${weekDate.getDate()}`;
			weekDate.setDate(weekDate.getDate() + 1);//날짜 증가시키기
        }
		weekDate.setDate(weekDate.getDate()-7);//원래대로 원상복구
		return daySet;
    }
	function monthlySetting(daySet) {
		var cnt = 0;
		for (let i = 1; i < 7; i++) {//1~6주차를 위해 6번 반복     
			for (let j = 0; j < 7; j++) {//일요일~토요일을 위해 7번 반복
				$(".week" + i).children(":eq(" + j + ")").children().first().text(daySet[cnt++]);
				$(".week" + i).children(":eq(" + j + ")").children().last().html('<ul class="dayRsvList"></ul>');
			}
		}
	}
	function weeklySetting(daySet) {
		var cnt = 0;
		for (let i = 7; i < 14; i++) {//0~6
			$(".dayHeaderContainer").children(":eq(" + i + ")").children().last().html(`${daySet[cnt++]}`);
		}
	}
	
	function getWeekOfMonth(date) {//date가 한달중 몇째주인지 (월요일~일요일 이 1주임을 기준으로 계산) //20210805를 구하기위해 20210705데이터 IN
		var selectedDay = date.getDate();//05
		var first = new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/01');//20210805데이터를 집어넣고 내부는 20210705
		var monthFirstDateDay = (first.getDay() == 0) ? 6 : first.getDay() - 1; // 월요일이면 0 일요일이면 6이 반환됨

		return Math.ceil((selectedDay + monthFirstDateDay) / 7);
	}
	
	async function fetchData(url, pageVal){
		const response = await fetch(url);
		const json = await response.json();
		console.log(pageVal);
		if (json != null) {
			if (pageVal === 'monthly') {
				for (var value of json) {
					var day = value.rsv_date.substr(8, 2);
					var oneday = new Date(currentDate);
					oneday.setDate(day);
					$(".testArea").text('monthly');
					if (oneday.getDay() == 0) {//일요일
						$(".week" + getWeekOfMonth(oneday)).children(":eq(6)").
						children().last().children().append(`<li>&nbsp&nbsp[ ${value.main_content} - ${value.sub_content} ] ${value.start_time}~${value.end_time}</li>`);
					} else {//1~6 월~토
						$(".week" + getWeekOfMonth(oneday)).children(":eq(" + (oneday.getDay() - 1) + ")").
						children().last().children().append(`<li>&nbsp&nbsp[ ${value.main_content} - ${value.sub_content} ] ${value.start_time}~${value.end_time}</li>`);
					}
				}
			} else if (pageVal === 'weekly'){
				var temp = "";

				$(".timeLineItemValue").css("background-color", "white"); // select 값이나 주가 변경되면 타임테이블 배경색을 흰색으로 초기화
				$(".timeLineItemValueFirst").css("background-color", "white"); // select 값이나 주가 변경되면 타임테이블 배경색을 흰색으로 초기화

				for (var value of json) {
						console.log("weekly json 처리 실행");
						let inputDayNumber = value.rsv_date.substr(8, 2);// rsv_date : 2021-11-05 -> 05
						
						for (let cnt = 0; cnt < 7; cnt++) {
							let dayNumber =String($('.dayoftheweek' + cnt).text()).padStart(2,'0'); //header의 숫자 2자리로만들기
							
							if (inputDayNumber === dayNumber) {
								alert(inputDayNumber);
								// start time 추출
								let s_hour = `${value.start_time}`;
								s_hour = s_hour.substr(0, 2);
								let s_minute = `${value.start_time}`;
								s_minute = s_minute.substr(3, 2);

								// end time 추출
								let e_hour = `${value.end_time}`;
								e_hour = e_hour.substr(0, 2);
								let e_minute = `${value.end_time}`;
								e_minute = e_minute.substr(3, 2);
								console.log("e_hour : " + e_hour + " e_minute : " + e_minute);

								// 색깔 칠하기
								let colorCode = "#" + Math.round(Math.random() * 0xffffff).toString(16); // 랜덤 색상 생성
								
								for (let i = parseInt(s_hour); i <= parseInt(e_hour); i++) {
									let temp_i = String(i); // i 값을 문자로 변환
									if (temp_i.length == 1) temp_i = "0" + temp_i; // i가 한자리면 앞에 0추가

									if (i == parseInt(s_hour) && s_minute == "30") { // i가 시작시간의 시간과 같으면서 시작시간의 분이 30이면,
										$('#' + cnt + temp_i + '30').css("background-color", colorCode);
									} else {
										if (i == parseInt(e_hour) && e_minute == "30") { // i가 종료시간의 시간과 같으면서 종료시간의 분이 30이면,
											$('#' + cnt + temp_i + '00').css("background-color", colorCode);
										} else if (i == parseInt(e_hour) && e_minute == "00") { // i가 종료시간의 시간과 같으면서 종료시간의 분이 00이면,
											let temp_ehour = parseInt(e_hour);
											temp_ehour--;
											e_hour = String(temp_ehour);
											if (e_hour.length == 1) {
												e_hour = "0" + e_hour;
											}

											$('#' + cnt + temp_ehour + '30').css("background-color", colorCode);
										} else {
											$('#' + cnt + temp_i + '00').css("background-color", colorCode);
											$('#' + cnt + temp_i + '30').css("background-color", colorCode);
										}

									}
								}
							}
						}
					}
			}else if (pageVal === 'category') {
				$("#checkedSubCategory").find("option").remove();//기존 옵션 제거하고 선택된 메인카테고리에 따른 서브카테고리불러올 것
				for (var value of json) {
					$('#checkedSubCategory').append($("<option></option>").attr("value", `${value}`).text(`${value}`));
				}
			}  else if (pageVal === 'categoryDialog') {
				$("#checkedSubDialog").find("option").remove();//기존 옵션 제거하고 선택된 메인카테고리에 따른 서브카테고리불러올 것
				for (var value of json) {
					$('#checkedSubDialog').append($("<option></option>").attr("value", 2).text(`${value}`));
				}
			} else if (pageVal === 'scheduleList'){
				
			} 
		}
	}
	//////////HEADER부분 날짜 변경 버튼 함수
	function clickMonth(cnt) {//////
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + cnt, currentDate.getDate());
		console.log("변경된 today데이터 : " + currentDate);
		console.log("변경된 today데이터 달: " + currentDate.getMonth());
		buildMonth();
	}

	function clickWeek(cnt) {
		buildWeek(cnt);
	}
	function removeDataMonth() {//Monthly내부에 달력내용만 지우기
		var ps = document.querySelectorAll("#monthData");
		for (i = 0; i < ps.length; i++) {
			ps[i].innerHTML="<ul class='dayRsvList'></ul>"; 
		}
		//$(".calendar_day").children().append('<span id="m"></span>');
	}
	/************************LEFT*************************/
	
	$("#prevBtn").click(function() {
		if ($("#mwBtn").val() == 'weekly') {
			clickMonth(-1);
		} else if ($("#mwBtn").val() == 'monthly') {
			clickWeek(-1);
		} 
	});
	$("#nextBtn").click(function() {
		if ($("#mwBtn").val() == 'weekly') {
			clickMonth(1);
		} else if ($("#mwBtn").val() == 'monthly') {
			clickWeek(1);
		}
	});
	$("#todayBtn").click(function() {
	});
	
	$("#checkedMainCategory").change(function() {//메인 카테고리에 따른 서브카테고리목록 반환
		var v1 = $("#checkedMainCategory").val();
		console.log("checkedMainCategory값 변동 함수 작동 >>" +`/api/contents/${categoryNo}?mainCategory=${encodeURI(encodeURIComponent(v1))}`);
		//한글깨짐 인코딩처리 - encodeURI(encodeURIComponent(v))
		fetchData(`/api/contents/${categoryNo}?mainCategory=${encodeURI(encodeURIComponent(v1))}`, 'category');
	});
	
	$("#checkedContentBtn").click(function() {//카테고리 선택 후 선택된 카테고리 내용만 보기
		var v1 = $("#checkedMainCategory").val();
		var v2 = $("#checkedSubCategory").val();
		if(v1!='none' && v2!='none'){
			if ($("#mwBtn").val() == 'weekly'){//한달 캘린더
				removeDataMonth();
				fetchData(`/api/schedules/${categoryNo}
					?year=${currentDate.getFullYear()}&month=${String(currentDate.getMonth()+1).padStart(2,'0')}
					&week=0&category=${v2}`,'monthly');
			}else if ($("#mwBtn").val() == 'monthly'){//주간 캘린더
					fetchData(`/api/schedules/${categoryNo}
					?year=${weekDate.getFullYear()}&month=${String(currentDate.getMonth()+1).padStart(2,'0')}
					&week=${getWeekOfMonth(weekDate)}&category=${v2}`,'weekly');
			}
		}else{
			alert("카테고리를 먼저 선택해주세요");
		}		
	});
	$("#allContentBtn").click(function() {
		if ($("#mwBtn").val() == 'weekly'){//전체보기 기능은 한달보기에서만 존재
			fetchData(`/api/schedules/${categoryNo}
				?year=${currentDate.getFullYear()}&month=${String(currentDate.getMonth()+1).padStart(2,'0')}
				&week=0&category=all`,'monthly');
		}
	});
	
	$("#mwBtn").click(function() {
		if ($("#mwBtn").val() == 'weekly') {
			$("#mwBtn").val('monthly');// 버튼 라벨 바꾸고
			showWeek();
			buildWeek(0);//화면에 weekly띄우기
			$("#allContentBtn").hide();
		} else {
			$("#mwBtn").val('weekly');// 버튼 라벨 바꾸고
			showMonth();
			buildMonth();//화면에 monthly띄우기
			$("#allContentBtn").show();
		}
	});
	$("#rsvBtn").click(function() {
		removeDataMonth();
	});
	
	
	/*************************RIGHT*************************/
	$(".calendar_day").on("click",function(){
		rsvDialog.dialog("open");
		$("#rsv-dialog-date").text(`${currentDate.getFullYear()}년 ${String(currentDate.getMonth()+1).padStart(2,'0')}월 ${$(this).children().first().text()}일`);
		$("#dialog-rsvList").html($(this).children().last().html());
		
		//today.getFullYear()+(String(today.getMonth()+1).padStart(2,'0'))+$(this).children().first().text()
	});
	
	/*************************RSV dialog *************************/
	$("#checkedMainDialog").change(function() {
		var v = $("#checkedMainDialog").val();
		//한글깨짐 인코딩처리 - encodeURI(encodeURIComponent(v))
		fetchData(`/api/contents/${categoryNo}?mainCategory=${encodeURI(encodeURIComponent(v))}`, 'categoryDialog');
	});	
	
	rsvDialog = $("#rsv-dialog-form").dialog({
		autoOpen : false,
		height : 800,
		width : 800,
		modal : true,
		buttons : {
			"확인" : function() {
				//rsvForm.trigger("submit");
			},
			"취소" : function() {
				rsvDialog.dialog("close");
			}
		},
		close : function() {
			
		}
	});
	
	rsvForm = rsvDialog.find("form").on("submit", function(event) {
		var valid = true;

		if (valid) {
			rsvDialog.dialog("close");
		}
		return valid;
	});

});