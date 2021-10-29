package com.web.smp.controller.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.smp.controller.SmpService;
import com.web.smp.di.entity.AllViewEntity;

public class ApiScheduleController implements ControllerInterface {

	@Override
	public String handleRequest(HttpServletRequest request, HttpServletResponse response, SmpService smpService) {
		HttpSession session = request.getSession(true);
		String returnMassage=null;
		ObjectMapper mapper = new ObjectMapper();
		
		String method = request.getMethod().toUpperCase();//요청메소드를 모두 대문자로반환 post -> POST
		String path = request.getRequestURI();
		String year=request.getParameter("year");
		String month=request.getParameter("month");
		String week=request.getParameter("week");
		String[] temp=path.split("/");
		String categoryNo=(String) session.getAttribute("category");
		System.out.println("ApiScheduleController path >>"+path);
		//System.out.println(request.getQueryString());
		
		// GET
		// /api/schedules/[카테고리번호] ? year=x & month=x & week=0
		// /
		
		if (request.getQueryString() == null) {// /api/schedules
			if (method.equals("GET")) {// schedules 카테고리번호것만 가져오기

			} else if (method.equals("POST")) {// 카테고리번호의 새로운 schedules정보 생성하기

			}
		} else if (request.getQueryString()!=null) {// /api/schedules?year=2021&month=10&week=0
			// 해당가져오기
			if (week.equals("0")) {
				String sql = "year(rsv_date) = " + year + " AND month(rsv_date) = " + month;
				List<AllViewEntity> scheduleList = smpService.getScheduleList(sql, categoryNo);// 해당카테고리에 전체 스케쥴정보
				try {
					returnMassage = mapper.writeValueAsString(scheduleList);
					System.out.println("DataController 한달내용전체조회>>" + returnMassage);
				} catch (JsonProcessingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			} else {

			}
		}
		
		
		
		return returnMassage;
	}


}
