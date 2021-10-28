package com.web.smp.di.entity;

import java.sql.Time;

public class AllViewEntity {
	private int schedule_seq; // Schedule 테이블 시퀀스
	private int category; //category 번호
	private String main_content; // 메인 카테고리 
	private String sub_content; // 서브 카테고리 
	private String user_type; // 유저 타입
	private String user_id; // 유저 아이디
	private String user_name; // 유저 이름
	private String rsv_date; // 예약 날짜
	private Time start_time; // 시작 시간
	private Time end_time; // 종료 시간
	
	
}
