package com.springboot.contact.controller;


import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.exceptions.ClientException;
import com.springboot.contact.RestResponse;
import com.springboot.contact.bean.Contact;
import com.springboot.contact.bean.UserRowMapper;

import sun.misc.BASE64Decoder;

@RestController
@RequestMapping(value = "/contact")

public class ContactController {
	
	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	@RequestMapping(value = "/AddUser1", method = RequestMethod.POST, 
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, //提交内容类型
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE) //返回内容类型 
    @ResponseBody RestResponse
	 
	    AddUser(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, Object> params){
		String phone  = (String)params.get("Phone");
		String name = (String)params.get("Name");
		String require = (String)params.get("Requirement");
		String purpose = (String)params.get("Purpose");

		RestResponse result = null;

	    String sql="insert into contact (name,phone,requirement,purpose,channel) values (?,?,?,?,?)";
	    int resultcode = jdbcTemplate.update(sql, new Object[]{name,phone,require,purpose,"扫码"});
	    
	    return result.success(resultcode);
	    }
	
	
	@RequestMapping(value = "/SendCode", method = RequestMethod.POST, 
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, //提交内容类型
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE) //返回内容类型 
    @ResponseBody RestResponse
	 
	    SendCode(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, Object> params){
		HttpSession session = request.getSession();

		String mobile  = (String)params.get("Mobile");
        
		Random random = new Random();
		String srand="";
		for (int i = 0; i < 4; i++) {
		String rand = String.valueOf(random.nextInt(10));
		srand += rand;
		}
		RestResponse result = null;   
	    
	    String data="1";
	    try {
			SendSmsResponse sendSmsResponse = SendSMS.sendSms(mobile,srand);
	        if(sendSmsResponse.getCode() != null && sendSmsResponse.getCode().equals("OK")) {
	        	data = "0";
	        }else {
	        	data = "1";
	        }
		} catch (ClientException e1) {
			e1.printStackTrace();
		}
	    
	    session.setAttribute("code", srand); //将验证码保存在session中
		return result.success(data); 
	         	    
	    }
	
	
	
	@RequestMapping(value = "/CardApply", method = RequestMethod.POST, 
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, //提交内容类型
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE) //返回内容类型 
    @ResponseBody RestResponse
	 
        CardApply(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, Object> params){
		
		String inputcode  = (String)params.get("Inputcode");	//获取前台传来的用户输入的验证码
		String phone  = (String)params.get("Mobile");
		String name = (String)params.get("Name");
		String userid = (String)params.get("UserId");
		Object code=request.getSession().getAttribute("code"); //获取session中的验证码
		String data ="0";
		   if(null==code){
		    data="2";
		   }else if(!code.equals(inputcode)){
		    data="1";
		   }
		RestResponse result = null; 
		
	    String sql="insert into contact (name,phone,userid,channel) values (?,?,?,?)";
	    int resultcode = jdbcTemplate.update(sql, new Object[]{name,phone,userid,"办卡"});
	    System.out.println("resultcode" + resultcode);
	    if (resultcode != 1) data ="1";
	    
		return result.success(data); 
  
	    }
		
	
    @RequestMapping(
            value = "/All", 
            method = RequestMethod.POST, 
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, 
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody RestResponse
    All(HttpServletRequest request, HttpServletResponse response) {
        
        RestResponse result = null;
        List<Contact> contactList = null;
        List<Map<String, Object>> datas = null;
        try {
        	contactList = jdbcTemplate.query("select * from contact", new UserRowMapper());
        	System.out.println("total-1"+contactList.size());
        	
        	datas = new ArrayList<Map<String, Object>>(contactList.size());
        	for (int i=0;i<contactList.size();i++) {
                Map<String, Object> data = new LinkedHashMap<String, Object>();
                Contact user = (Contact)contactList.get(i);
                System.out.println("user"+user.toString());
                data.put("id", user.getId());
                data.put("name", user.getName());
                data.put("phone", user.getPhone());
                data.put("channel",user.getChannel());
                datas.add(data);
        	}   
        	System.out.println("total"+contactList.size());
            result = RestResponse.success(datas);
        }
        catch (Exception e) {
            datas = new ArrayList<Map<String, Object>>(0);
            result = RestResponse.failure(e.getMessage());
        	System.out.println("ERROR"+e.toString());

        }
        return result;
    }

    @RequestMapping(value = "/IdCardFront", method = RequestMethod.POST, 
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, //提交内容类型
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE) //返回内容类型 
    @ResponseBody RestResponse
	 
    IdCardFront(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, Object> params) throws Exception{
		
		String base64code  = (String)params.get("img");	//获取前台传来的用户输入的验证码
		base64code=base64code.substring(base64code.indexOf(",")+1);//需要去掉头部信息，这很重要
		System.out.println(base64code);
		// 创建输出流
		//FileOutputStream outputStream = new FileOutputStream(imageFile);
		// 获得一个图片文件流，我这里是从flex中传过来的
		BASE64Decoder base64Decoder = new BASE64Decoder();
		byte[] result = null;
		try {
			result = base64Decoder.decodeBuffer(base64code);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}//解码
		for (int i = 0; i < result.length; ++i) {
		if (result[i] < 0) {// 调整异常数据
		result[i] += 256;
		}
		}
        
		String imgFilePath = "D://ID234.jpg";  
        OutputStream out = new FileOutputStream(imgFilePath);  
        out.write(result);  
        out.flush();  
        out.close(); 
		
		System.out.println("img" + base64code);
        RestResponse result2 = null;

		return result2.success("ok"); 
  
	    }
    
    @RequestMapping(value = "/IdCardBack", method = RequestMethod.POST, 
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, //提交内容类型
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE) //返回内容类型 
    @ResponseBody RestResponse
	 
    IdCardBack(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, Object> params){
		
		String base64code  = (String)params.get("img");	//获取前台传来的用户输入的验证码
		System.out.println("img" + base64code);
        RestResponse result = null;

		return result.success("ok"); 
  
	    }
}
