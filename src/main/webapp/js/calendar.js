/**
 * 
 */

//padStart함수 : 글자수 지정후 비어있는 앞자리에 특정문구로 채우는 함수(String에만 적용)
//padEnd함수 : 글자수 지정후 비어있는 뒤자리에 특정문구로 채우는 함수(String에만 적용)

$(document).ready(function() {//DOM Tree 생성 완료 후 호출 (즉, 먼저 실행, 순차적실행)
	//alert("2)document.ready");
});

$(window).load(function() {//모든 페이지 구성요소 페인팅 완료 후 호출 ONLY ONE
	let today = new Date();
	let firstDate;//이번 달의 첫 날
	let lastDay;//이번 달의 마지막 날
	let prevLastDay;//지난 달의 마지막 날


	$("#prev").click(function() {
		if ($(".mwBtn").val() == 'weekly') {
			clickMonth(-1);
		} else if ($(".mwBtn").val() == 'monthly') {
			clickWeek(-1);
		} else if ($(".mwBtn").val() == '예약수정') {
			clickRsv(-1);
		}
	});

	$("#next").click(function() {
		if ($(".mwBtn").val() == 'weekly') {
			clickMonth(1);
		} else if ($(".mwBtn").val() == 'monthly') {
			clickWeek(1);
		} else if ($(".mwBtn").val() == '예약수정') {
			clickRsv(1);
		}
	});

	$(".mwBtn").click(function() {
		if ($(".mwBtn").val() == 'weekly') {
			$(".mwBtn").val('monthly');// 버튼 라벨 바꾸고
			buildWeek(0);//화면에 weekly띄우기
		} else {
			$(".mwBtn").val('weekly');// 버튼 라벨 바꾸고
			buildMonth();//화면에 monthly띄우기
		}
	});

	$(".scheduleBtn").click(function(event) {
		if ($(".scheduleBtn").val() == '스케쥴 현황') {
			$(".scheduleBtn").val("돌아가기");
			$(".mwBtn").val("예약수정");
			$(".todayBtn").val("예약취소");
			$(".contentContainer").hide();
			showSchedule();
			buildRsvHeader();
			//fetchPage('../js/userPageForm.txt', null,'rsvList');
			//
			fetchData(`/studio/data?year=${today.getFullYear()}&month=${String(today.getMonth() + 1).padStart(2, '0')}` +
				`&type=${$("#type").text()}&id=${$("#id").text()}`, 'rsvList');
		} else if ($(".scheduleBtn").val() == "돌아가기") {
			$(".scheduleBtn").val('스케쥴 현황');
			$(".mwBtn").val("weekly");
			$(".todayBtn").val("today");
			$(".contentContainer").show();
			showMonth();
			buildMonth();
		}
	});
	$("#checkedMain").change(function() {
		var v = $("#checkedMain").val();
		fetchData(`/studio/data?loc=${v}`, 'loc');
	});
	$("#todayBtn").change(function() {
		$(".weeklyCalendar").show();
		$(".weeklyCalendar").hide();
		$(".weeklyCalendar").toggle();
	});

	//////////ajax		
	async function fetchPage(url, daySet, pageVal) {//페이지 전환
		console.log("async await 함수-페이지 전환");
		try {
			const response = await fetch(url);
			const text = await response.text();
			await $(".rightSection").html(text);
		} catch (err) {
			console.log(err);
		}
		if (pageVal === 'monthly') {
			monthlySetting(daySet);
		} else if (pageVal === 'weekly') {
			weeklySetting(daySet);
		}
	}

	function monthlySetting(daySet) {
		var cnt = 0;
		for (let i = 1; i < 7; i++) {//1~6주차를 위해 6번 반복     
			for (let j = 0; j < 7; j++) {//일요일~토요일을 위해 7번 반복
				$(".week" + i).children(":eq(" + j + ")").children().first().text(daySet[cnt++]);
				$(".week" + i).children(":eq(" + j + ")").children().last().html('<ul id="dayRscList"><li>li태그 테스트</li></ul>');
			}
		}
	}
	function weeklySetting(daySet) {
		var cnt = 0;
		for (let i = 0; i < 7; i++) {//0~6
			$("#dayoftheweek" + i).text(daySet[cnt++]);
		}
	}

	async function fetchData(url, pageVal) {
		const response = await fetch(url);
		const json = await response.json();
		console.log(json);
		if (json != null) {
			if (pageVal === 'monthly') {
				for (var value of json) {
					console.log(value);

					var day = value.rsv_date.substr(8, 2);
					var oneday = new Date(today.getFullYear(), today.getMonth(), day);

					if (oneday.getDay() == 0) {//일요일
						$(".week" + getWeekOfMonth(oneday)).children(":eq(6)").children().last()
							.children().append(`<li>${value.start_time}~${value.end_time}</li>`);
					} else {//1~6 월~토

						$(".week" + getWeekOfMonth(oneday)).children(":eq(" + (oneday.getDay() - 1) + ")").children().last()
							.children().append(`<li>${value.start_time}~${value.end_time}</li>`);
					}
					/*if (oneday.getDay() == 0) {//일요일
						$(".week" + getWeekOfMonth(oneday)).children(":eq(6)").children().last()
							.children().append(`<li>${value.studioloc} ${value.studiono}호)${value.startTime}~${value.endTime}</li>`);
					} else {//1~6 월~토

						$(".week" + getWeekOfMonth(oneday)).children(":eq(" + (oneday.getDay() - 1) + ")").children().last()
							.children().append(`<li>${value.studioloc} ${value.studiono}호)${value.startTime}~${value.endTime}</li>`);
					}*/

				}
			} else if (pageVal === 'weekly') {
				// 전혁 - 주간 데이터 끌고올것
			} else if (pageVal === 'loc') {
				$("#checkedSub").find("option").remove();//기존 옵션 제거하고 새로운  loc에 따른 장소 불러올 것
				for (var value of json) {
					$('#checkedSub').append($("<option></option>").attr("value", 2).text(`${value.studiono}`));
				}
			} else if (pageVal === 'rsvList') {
				$("#rsvTableBody").empty();//테이블 내용 비우기
				console.log(json);
				for (var value of json) {
					var add_data = '';
					add_data += '<tr>';

					add_data += '<td>';
					add_data += `${value.studioloc} ${value.studiono}호`;
					add_data += '</td>';

					add_data += '<td>';
					add_data += `${value.rsvDate}`;
					add_data += '</td>';

					add_data += '<td>';
					add_data += `${value.startTime} ~ ${value.endTime}`;
					add_data += '</td>';

					add_data += '</tr>';
					$("#rsvTableBody").append(add_data);
				}
			}
		}
	}
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
	//////////달력 - monthly	
	buildMonth();
	function buildMonth() {
		showMonth();
		firstDate = new Date(today.getFullYear(), today.getMonth(), 1, today.getDay());//2021.9.1.2(수)
		lastDay = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0).getDate();//9/30 3(목)
		prevLastDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), 0).getDate();//8/31 1(화)
		$(".current-year-month").html(`&nbsp;${firstDate.getFullYear()}년&nbsp;&nbsp;&nbsp;&nbsp;${firstDate.getMonth() + 1}월&nbsp;(월)`);

		//rightSection칸에 month소스 채우기
		var daySet = makeElementMonth(firstDate);
		//fetchPage('../js/monthForm.txt',daySet,'monthly');
		// class -  monthlyCalendar
		//alert(today.getFullYear()+"년"+String(today.getMonth()+1).padStart(2,'0')+"월의 데이터 전송");
		
		//alert(`/api/schedules?year=${firstDate.getFullYear()}&month=${String(firstDate.getMonth()+1).padStart(2,'0')}&week=0`);
		fetchData(`/api/schedules?year=${firstDate.getFullYear()}&month=${String(firstDate.getMonth()+1).padStart(2,'0')}&week=0`,'monthly');
	}

	function makeElementMonth(firstDate) {
		//getMonth() :: 1월 0 ~ 12월 11
		//getDay() :: 월1 ~토 6 일0
		let startDayCount = 1;
		let lastDayCount = 1;

		let firstDayName = null;//첫주 시작 월요일로 잡음

		if (firstDate.getDay() == 0) firstDayName = 6;
		else firstDayName = firstDate.getDay() - 1;

		lastDay = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0).getDate();//9/30 3(목)
		prevLastDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), 0).getDate();//8/31 1(화)
		var daySet = [];
		var cnt = 0;
		for (let i = 0; i < 6; i++) {//1~6주차를 위해 6번 반복        
			for (let j = 0; j < 7; j++) {//일요일~토요일을 위해 7번 반복
				// <<1주차>> j < firstDayName: 이번 달 시작 요일 이전 일 때

				if (i == 0 && j < firstDayName) {
					daySet[cnt++] = `${(prevLastDay - (firstDayName - 1) + j)}`;
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
				else if (i > 0 && startDayCount <= lastDay) {
					daySet[cnt++] = `${startDayCount++}`;
				}
				// startDayCount > lastDay: 이번 달의 마지막 날 이후일 때
				else if (startDayCount > lastDay) {
					daySet[cnt++] = `${lastDayCount++}`;
				}
			}
		}
		return daySet;
	}
	//////////달력 - weekly	
	function buildWeek(week) {
		showWeek();
		today.setDate(today.getDate() + week * 7);
		let title = "&nbsp;" + today.getFullYear() + "년&nbsp;&nbsp;&nbsp;&nbsp;" + (today.getMonth() + 1) + "월&nbsp;(주)";

		for (let i = 0; i < 7; i++) {
			if (today.getDate() == 1)
				title += " ~&nbsp;&nbsp;&nbsp;&nbsp; " + today.getFullYear() + "년&nbsp;&nbsp;&nbsp;&nbsp;"
					+ (today.getMonth() + 1) + "월";
			today.setDate(today.getDate() + 1);
		}
		today.setDate(today.getDate() - 7);
		$(".current-year-month").html(title);

		//rightSection칸에 week소스 채우기
		var daySet = makeElementWeek(0);
		//fetchPage('../js/weekForm.txt', daySet,'weekly');
		// class -  weeklyCalendar
		//console.log(daySet);
	}

	function makeElementWeek(week) {
		var daySet = [];
		var weekDate = new Date(today);
		weekDate.setDate(weekDate.getDate() + week * 7);//나타낼 주 날짜 읽어와서 저장하기 0,-1,+1
		if (weekDate.getDay() == 0) {
			weekDate.setDate(weekDate.getDate() - 6);
		} else {
			weekDate.setDate(weekDate.getDate() - (weekDate.getDay() - 1));
		}//첫주 시작 월요일로 잡기

		for (let cnt = 0; cnt < 7; cnt++) {//0~6
			daySet[cnt] = `${weekDate.getDate()}`;
			weekDate.setDate(weekDate.getDate() + 1);//날짜 증가시키기
		}

		return daySet;
	}

	//////////달력 - 공통함수
	function getWeekOfMonth(date) {//date가 한달중 몇째주인지 (월요일~일요일 이 1주임을 기준으로 계산) //20210805를 구하기위해 20210705데이터 IN
		var selectedDay = date.getDate();//05
		var first = new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/01');//20210805데이터를 집어넣고 내부는 20210705
		var monthFirstDateDay = (first.getDay() == 0) ? 6 : first.getDay() - 1; // 월요일이면 0 일요일이면 6이 반환됨

		return Math.ceil((selectedDay + monthFirstDateDay) / 7);
	}

	function removeCalendarMonth() {//Monthly내부에 달력내용만 지우기
		let divEls1 = document.querySelectorAll('.calendar__day');
		let divEls2 = document.querySelectorAll('.calendarWeekContainer');
		for (var value of divEls1) {
			value.remove();
		}
		for (var value of divEls2) {
			value.remove();
		}
	}

	//////////예약현황
	function buildRsvHeader() {
		firstDate = new Date(today.getFullYear(), today.getMonth(), 1, today.getDay());//2021.9.1.2(수)
		lastDay = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0).getDate();//9/30 3(목)
		prevLastDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), 0).getDate();//8/31 1(화)
		$(".current-year-month").html(`&nbsp;${today.getFullYear()}년&nbsp;&nbsp;&nbsp;&nbsp;${firstDate.getMonth() + 1}월&nbsp;(예약)`);
	}
	//////////HEADER부분 날짜 변경 버튼 함수
	function clickMonth(cnt) {//////
		today = new Date(today.getFullYear(), today.getMonth() + cnt, today.getDate());
		console.log("변경된 today데이터 : " + today);
		console.log("변경된 today데이터 달: " + today.getMonth());
		removeCalendarMonth();
		buildMonth();
	}

	function clickWeek(cnt) {
		buildWeek(cnt);
	}

	function clickRsv(cnt) {
		today = new Date(today.getFullYear(), today.getMonth() + cnt, today.getDate());
		removeCalendarMonth();
	}
});