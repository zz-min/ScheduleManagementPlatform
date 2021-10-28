package com.web.smp.controller.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.midi.ControllerEventListener;
import javax.sound.midi.ShortMessage;

import org.apache.commons.codec.binary.Base64;

import com.web.smp.controller.SmpService;

public class ApiUserController implements ControllerInterface {

	@Override
	public String handleRequest(HttpServletRequest request, HttpServletResponse response, SmpService smpService) {
		String returnMassage=null;
		String method = request.getMethod().toUpperCase();//요청메소드를 모두 대문자로반환 post -> POST
		String path = request.getRequestURI();
		String[] temp=path.split("/");
		System.out.println("apiUserController path >>"+path);
		System.out.println(method);
		System.out.println(temp.length);
		Base64 base64 = new Base64();
		
		// GET
		// /api/users - user전체목록반환
		// /api/users/201796 - user 중 id = 201796 만 반환
		// /api/users/login?id=22&pwd=11 - 로그인 유효성검사확인하기
		
		if (temp.length == 3) {// /api/users
			if (method.equals("GET")) {// users 전체목록 가져오기

			} else if (method.equals("POST")) {// 새로운 user정보 생성하기

			}
		} else if (temp.length > 3) {
			if (path.contains("login")) {
				System.out.println(":D:D");
				// 로그인 유효성 검사해주기
				String id=new String(base64.decode(request.getParameter("id").getBytes()));//디코딩된값
				String pwd=new String(base64.decode( request.getParameter("pwd").getBytes()));
				System.out.println(id+"와"+pwd+"를 유효성검사중");
				boolean loginCheck = smpService.loginAvailability(id,pwd);//로그인 유효성 검사
				returnMassage=loginCheck?"true":"false";
			} else {// 특정 USER
				if (method.equals("GET")) {// 특정 user정보가져오기

				} else if (method.equals("UPDATE")) {// 특정 user정보 수정하기

				} else if (method.equals("DELETE")) {// 특정 user정보 삭제하기

				}
			}
		}
		return returnMassage;
	}

}
