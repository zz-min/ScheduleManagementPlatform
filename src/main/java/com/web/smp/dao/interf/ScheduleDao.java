package com.web.smp.dao.interf;

import java.util.List;

import com.web.smp.di.entity.Schedule;

public interface ScheduleDao {
	Schedule getSchedule(int schedule_seq);
	
	List<Schedule> getScheduleList(String query);
	
}
