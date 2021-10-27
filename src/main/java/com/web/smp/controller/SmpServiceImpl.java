package com.web.smp.controller;

import com.web.smp.dao.impl.ContentJdbcDao;
import com.web.smp.dao.impl.ScheduleJdbcDao;
import com.web.smp.dao.impl.UserJdbcDao;
import com.web.smp.dao.interf.ContentDao;
import com.web.smp.dao.interf.ScheduleDao;
import com.web.smp.dao.interf.UserDao;

public class SmpServiceImpl implements SmpService {
	private UserDao userDao = null;
	private ContentDao contentDao = null;
	private ScheduleDao scheduleDao = null;
	public SmpServiceImpl() {}
	
	public SmpServiceImpl(UserDao userDao,ContentDao contentDao,ScheduleDao scheduleDao) {
		this.userDao = userDao;
		this.contentDao = contentDao;
		this.scheduleDao = scheduleDao;
	}
	
	@Override
	public boolean loginAvailability(String id, String pwd) {
		return userDao.loginAvailability(id, pwd);
	}

}
