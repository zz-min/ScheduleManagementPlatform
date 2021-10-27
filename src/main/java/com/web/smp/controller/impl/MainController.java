package com.web.smp.controller.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;

import com.web.smp.controller.SmpService;

public class MainController implements ControllerInterface {

	@Override
	public String handleRequest(HttpServletRequest request, HttpServletResponse response, SmpService smpService) {
		HttpSession session = request.getSession(true);
		String path = request.getRequestURI();
		String btnNo=request.getParameter("btn");
		String id=request.getParameter("id");
		System.out.println("MainController path >>"+path);
		
		// /main?btn=1?id=2202
		//로그인 정보 세션에 담기
		//대분류 정보 세션에 담기
		session.setAttribute("id", id);
		
		String str="content_type='btn"+query.substring(4)+"'";
		
		List<String> mainContentList = smpService.mainContentList(str);

		request.setAttribute("mainContentList", mainContentList);

		
		return "calendar.jsp";
	}

}
