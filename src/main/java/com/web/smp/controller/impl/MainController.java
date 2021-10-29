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
		String query=request.getQueryString();
		System.out.println("MainController path >>"+path+"?"+query);
		
		String category=request.getParameter("category");
		String id=request.getParameter("id");
		
		
		// /main?category=1?id=2202
		session.setAttribute("categorySession", category);//매번 Main들어올때마다 리셋
		
		//로그인 정보-id와 name 세션에 담기
		session.setAttribute("id", id);
		session.setAttribute("name", smpService.getUserName(id));
		
		//대분류 정보 request에 담기
		List<String> mainContentList = smpService.getMainCategory(Integer.parseInt(category));
		request.setAttribute("mainContentList", mainContentList);

		
		return "calendar.jsp";
	}

}
