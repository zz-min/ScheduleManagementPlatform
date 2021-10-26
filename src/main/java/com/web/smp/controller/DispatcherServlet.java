package com.web.smp.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.web.smp.controller.impl.ControllerInterface;

/**
 * Servlet implementation class DispatcherServlet
 */
@WebServlet("/")
public class DispatcherServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private SmpService smpService = null;
	private HandlerMapping mapper = null;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DispatcherServlet() {
		
    }
    
	@Override
	public void init() throws ServletException {
		ServletContext context = getServletContext();
		String driver = context.getInitParameter("jdbc_driver");
		String url = context.getInitParameter("db_url");
		String userName = context.getInitParameter("db_userid");
		String password = context.getInitParameter("db_passwd");

		//LoginDao loginJdbc=new LoginJdbcDao(driver, url, userName, password);
		//ContentDao contentDao=new ContentJdbcDao(driver, url, userName, password);
		
		smpService = new SmpServiceImpl();

		mapper = new HandlerMapping();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// step #1. get request parameters
		request.setCharacterEncoding("UTF-8");

		String path = request.getRequestURI();
		System.out.println("path >>" + path);
		
		String viewName = null;

		// step #2. data processing ==> dispatch request to controller
		ControllerInterface handler = mapper.getHandler(path);

		if (path.contains("api")) {// REST API 기술
			System.out.println("IN REST API");
			String data = handler.handleRequest(request, response, smpService);

			// step #3. output processing results
			response.setContentType("text/html;charset=UTF-8");
			response.getWriter().write(data);

		} else {//페이지 이동
			System.out.println("IN PAGE MOVE");
			if (handler != null) {
				viewName = handler.handleRequest(request, response, smpService);
			}
			// step #3. output processing results
			if (viewName == null) {
				viewName = "error.jsp";
			} else {
				viewName = viewName.trim();// 공백제거함
				viewName = "/WEB-INF/views/" + viewName;

				RequestDispatcher view = request.getRequestDispatcher(viewName);
				view.forward(request, response);
			}
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
