package com.web.smp.dao.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.web.smp.dao.interf.ScheduleDao;
import com.web.smp.di.entity.Schedule;

public class ScheduleJdbcDao implements ScheduleDao {
	private String driver;
	private String url;
	private String userName;
	private String password;

	private Connection conn = null;
	private PreparedStatement stmt = null;
	private ResultSet rs = null;
	
	public ScheduleJdbcDao(String driver, String url, String userName, String password) {
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
	public Schedule getSchedule(int schedule_seq) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Schedule> getScheduleList(String query,String categoryNo) {
		//view에 따라서 출력 - v_schedule_for1
		List<Schedule> scheduleList = null;
		String sql = "select * from v_schedule_for"+categoryNo;
		sql = sql + (query != null && !query.equals("") ? " WHERE " + query : " ORDER BY rsv_date");
		
		System.out.println("getScheduleList함수 sql>>" + sql);
		try {
			connect();

			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery();
			if (rs.isBeforeFirst()) {
				scheduleList = new ArrayList<Schedule>();

				while (rs.next()) {
					Schedule schedule = new Schedule();
					schedule.setSchedule_seq(rs.getInt("schedule_seq"));
					schedule.setContent_no(rs.getInt("content_no"));
					schedule.setUser_id(rs.getString("user_id"));
					schedule.setRsv_date(rs.getString("rsv_date"));
					schedule.setStart_time(rs.getTime("start_time"));
					schedule.setEnd_time(rs.getTime("end_time"));

					scheduleList.add(schedule);
				}
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
		return scheduleList;
	}
}
