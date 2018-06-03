package com.springboot.contact.bean;

import java.io.Serializable;

public class Contact implements Serializable {

    private int Id;
    
    private String name;
    
    private String phone;
    
    private String channel;
    
    private static final long serialVersionUID = 1L;

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}

}
