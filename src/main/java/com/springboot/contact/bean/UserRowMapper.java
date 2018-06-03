package com.springboot.contact.bean;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class UserRowMapper implements RowMapper<Contact> {

    @Override
	public Contact mapRow(ResultSet rs, int rowNum) throws SQLException  {
    	Contact user = new Contact();
        user.setId(rs.getInt("id"));
        user.setName(rs.getString("name"));
        user.setPhone(rs.getString("phone"));
        user.setChannel(rs.getString("channel"));
        return user;	
        }
}
