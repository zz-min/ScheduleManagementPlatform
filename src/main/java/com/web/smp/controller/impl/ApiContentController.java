package com.web.smp.controller.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sound.midi.ControllerEventListener;
import javax.sound.midi.ShortMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.smp.controller.SmpService;

public class ApiContentController implements ControllerInterface {
	
	@Override
	public String handleRequest(HttpServletRequest request, HttpServletResponse response, SmpService smpService) {
		HttpSession session = request.getSession(true);
		String returnMassage=null;
		ObjectMapper mapper = new ObjectMapper();
		
		String method = request.getMethod().toUpperCase();//요청메소드를 모두 대문자로반환 post -> POST
		String path = request.getRequestURI();
		String year=request.getParameter("year");

		String[] temp=path.split("/");
		
		System.out.println("ApiContentController path >>"+path);
		//System.out.println(request.getQueryString());
		
		// GET
		// /api/contents/[카테고리번호]
		
		if (method.equals("GET")) {// contents 카테고리번호것만 가져오기

		} else if (method.equals("POST")) {// 카테고리번호의 새로운 contents정보 생성하기

		}
		return returnMassage;
	}


}
