package com.web.smp.controller;

import java.util.List;

import com.web.smp.di.entity.Content;
import com.web.smp.di.entity.Schedule;
import com.web.smp.di.entity.User;

public interface SmpService {
	/* User Dao */
	boolean loginAvailability(String id,String pwd);

	User getUser(String id);

	String getUserName(String id);

	List<User> getUserList(String query);

	/* Content Dao */
	Content getContent(int content_seq);

	List<Content> getContentList(String query);

	List<String> getMainCategory(int menu_no);

	List<String> getMSubCategory(int menu_no);

	/* Schdule Dao */
	Schedule getSchedule(int schedule_seq);

	List<Schedule> getScheduleList(String query);
}
