package com.web.smp.di.entity;

public class Content {
	private int content_seq; // Content 테이블 시퀀스
	private int manu_no; //btn 번호
	private String main_Category; // 메인 카테고리 
	private String sub_Category; // 서브 카테고리 
	
	public Content() {
	}

	public Content(int content_seq, int manu_no, String main_Category, String sub_Category) {
		this.content_seq = content_seq;
		this.manu_no = manu_no;
		this.main_Category = main_Category;
		this.sub_Category = sub_Category;
	}

	public int getContent_seq() {
		return content_seq;
	}

	public void setContent_seq(int content_seq) {
		this.content_seq = content_seq;
	}

	public int getManu_no() {
		return manu_no;
	}

	public void setManu_no(int manu_no) {
		this.manu_no = manu_no;
	}

	public String getMain_Category() {
		return main_Category;
	}

	public void setMain_Category(String main_Category) {
		this.main_Category = main_Category;
	}

	public String getSub_Category() {
		return sub_Category;
	}

	public void setSub_Category(String sub_Category) {
		this.sub_Category = sub_Category;
	}

	@Override
	public String toString() {
		return "Content [content_seq=" + content_seq + ", manu_no=" + manu_no + ", main_Category=" + main_Category
				+ ", sub_Category=" + sub_Category + "]";
	}
	
	
}
