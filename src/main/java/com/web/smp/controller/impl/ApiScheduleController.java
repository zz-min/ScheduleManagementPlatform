package com.web.smp.controller.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.midi.ShortMessage;

import com.web.smp.controller.SmpService;

public class ApiScheduleController implements ControllerInterface {

	@Override
	public String handleRequest(HttpServletRequest request, HttpServletResponse response, SmpService smpService) {
		String returnMassage=null;
		String method = request.getMethod().toUpperCase();//요청메소드를 모두 대문자로반환 post -> POST
		String path = request.getRequestURI();
		String[] temp=path.split("/");
		System.out.println("apiUserController path >>"+path);
		System.out.println(method);
		System.out.println(temp[3]);
		//categoryNo - 세션값이용
		
		// GET
		// /api/schedules?
		// /
		
		return returnMassage;
	}


}
