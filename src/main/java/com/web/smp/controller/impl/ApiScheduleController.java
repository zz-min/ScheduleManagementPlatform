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
		String returnMassage=null;
		ObjectMapper mapper = new ObjectMapper();
		
		String method = request.getMethod().toUpperCase();//요청메소드를 모두 대문자로반환 post -> POST
		String path = request.getRequestURI();
		String[] temp=path.split("/");
		String query=request.getQueryString();
		System.out.println("ApiScheduleController path >>"+path+"?"+query);
		
		String year=request.getParameter("year");
		String month=request.getParameter("month");
		String week=request.getParameter("week");
		String id=request.getParameter("id");
		
		String categoryNo=temp[3];
		
		// GET
		// /api/schedules - schedules 전체목록반환
		// /api/schedules/[카테고리번호] - 특정 category 에서만 사용되는 schedules 정보가져오기
		// /api/schedules/[카테고리번호] ? id=2018  &  year=x & month=x
		// /api/schedules/[카테고리번호] ? year=x & month=x & week=0  
		
		// POST
		// /api/schedules - 새로운 schedules 정보 생성하기

		// UPDATE
		// /api/schedules/[카테고리번호] ? - 특정 schedules 정보 수정하기

		// DELETE
		// /api/schedules/[카테고리번호] ?  - 특정 schedules 정보 삭제하기
		
		if (temp.length == 3) {// /api/schedules
			if (method.equals("GET")) {// schedules 전체목록 가져오기
				//필요하지 않음
				System.out.println("모든 schedules정보 조회 - ApiScheduleController - GET");
			} else if (method.equals("POST")) {// 새로운 schedules 정보 생성하기
				// POST : /api/schedules
				// OR
				// POST : /api/schedules/[카테고리번호]
				
				System.out.println("새로운 schedules정보 생성 - ApiScheduleController - POST");
				
			}
		} else if (temp.length > 3) {// /api/schedules/temp[4] ? query
			if (query == null) {// /api/schedules/[카테고리번호]
				if (method.equals("GET")) {// schedules 카테고리번호것만 가져오기

				} else if (method.equals("POST")) {// 카테고리번호의 새로운 schedules정보 생성하기
					System.out.println("새로운 schedules정보 생성 - ApiScheduleController - POST");
				}
			} else if (query != null) {// /api/schedules?year=2021&month=10&week=0
				// 해당가져오기
				if(id!=null) { // id정보로 해당 schedules 내용 조회
					if (method.equals("GET")) {//특정 id의 schedules 정보가져오기
						System.out.println("특정 id의  schedules정보 조회 - ApiScheduleController - GET");
						String sql = "year(rsv_date) = " + year + " AND month(rsv_date) = " + month+" AND user_id ="+id; 
						
						List<AllViewEntity> scheduleList = smpService.getScheduleList(sql, categoryNo);// 해당카테고리중 특정 id만
						try {
							returnMassage = mapper.writeValueAsString(scheduleList);
						} catch (JsonProcessingException e) {
							e.printStackTrace();
						}
					} else if (method.equals("UPDATE")) {// 특정 id의 schedule 정보 수정하기

					} else if (method.equals("DELETE")) {// 특정 id의 schedule 정보 삭제하기

					}
				}else { // 날짜 정보로 해당 schedules 내용 조회
					if (method.equals("GET")) {
						if (week.equals("0")) { // monthly DATA 구하기
							String sql = "year(rsv_date) = " + year + " AND month(rsv_date) = " + month;
							List<AllViewEntity> scheduleList = smpService.getScheduleList(sql, categoryNo);// 해당카테고리에 전체
							try {
								returnMassage = mapper.writeValueAsString(scheduleList);
							} catch (JsonProcessingException e) {
								e.printStackTrace();
							}
						} else {// weekly DATA 구하기

						}
					}
				}
			}
			
		}
		System.out.println("returnMassage >>"+returnMassage);
		return returnMassage;
	}


}
