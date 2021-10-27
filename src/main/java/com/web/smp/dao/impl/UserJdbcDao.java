package com.web.smp.dao.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.web.smp.dao.interf.UserDao;

public class UserJdbcDao implements UserDao {
	private String driver;
	private String url;
	private String userName;
	private String password;

	private Connection conn = null;
	private PreparedStatement stmt = null;
	private ResultSet rs = null;
	
	public UserJdbcDao(String driver, String url, String userName, String password) {
		this.driver = driver;
		this.url = url;
		this.userName = userName;
		this.password = password;
	}

	private void connect() throws ClassNotFoundException, SQLException {
		Class.forName(driver);
		conn = DriverManager.getConnection(url, userName, password);
		
		System.out.println("LoginJdbcDao  DB연결성공");
	}

	private void disconnect() throws SQLException {
		System.out.println("LoginJdbcDao  DB연결해제");
		
		if (rs != null && !rs.isClosed()) {
			rs.close();
			rs = null;
		}
		if (stmt != null && !stmt.isClosed()) {
			stmt.close();
			stmt = null;
		}
		if (conn != null && !conn.isClosed()) {
			conn.close();
			conn = null;
		}
	}
	
	@Override
	public boolean loginAvailability(String id, String pwd) {
		boolean TF=false;
		String sql = "select * from user where user_id = ? AND pwd = ?";
		System.out.println("loginAvailability함수 sql>>"+sql);
		try {
			connect();
			
			stmt =  conn.prepareStatement(sql);
			stmt.setString(1, id);
			stmt.setString(2, pwd);
			
			rs = stmt.executeQuery();

			if (rs.next()) {
				TF=true;
			}
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
				try {
					disconnect();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
		return TF;
	}

}
