package com.springboot.contact.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.mysql.jdbc.CallableStatement;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;
import com.mysql.jdbc.Statement;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class ImageDB {

	private static String url="jdbc:mysql://192.168.44.130:3306/yishu";
	private static String user="root";
	private static String password="root";
	private static Connection con; 
	
	public static void main(String[] args) throws Exception {
		Class.forName("com.mysql.jdbc.Driver");
	    con=(Connection) DriverManager.getConnection(url,user,password);
	    //storeImg();
	    getImg();
	}

	private static void getImg() throws Exception {
		String sql="select * from t_img where id= '1'";
        //CallableStatement cstmt = (CallableStatement) con.prepareCall(sql); 
        //cstmt.setString(0, "1"); 
		Statement statement = (Statement) con.createStatement();
		ResultSet rs=statement.executeQuery(sql);
		String front = "";
		while(rs.next()) {
			front = rs.getString("Front").toString();
			System.out.println("img"+front);
		}
        base64ToImage(front,"D:\\output.jpg");	
	}
	
	public static boolean base64ToImage(String base64, String path) {// 对字节数组字符串进行Base64解码并生成图片  
        if (base64 == null){ // 图像数据为空  
            return false;  
        }  
        BASE64Decoder decoder = new BASE64Decoder();  
        try {  
            // Base64解码  
            byte[] bytes = decoder.decodeBuffer(base64);  
            for (int i = 0; i < bytes.length; ++i) {  
                if (bytes[i] < 0) {// 调整异常数据  
                    bytes[i] += 256;  
                }  
            }  
            // 生成jpeg图片  
            OutputStream out = new FileOutputStream(path);  
            out.write(bytes);  
            out.flush();  
            out.close();  
            return true;  
        } catch (Exception e) {  
            return false;  
        }  
    }  

	private static void storeImg() throws IOException, Exception {
		String base64Img = toBase64("d://1.jpg");
	    String sql="insert into t_img (id,Front) values (?,?)";
        CallableStatement cstmt = (CallableStatement) con.prepareCall(sql); 
        cstmt.setString(1, "1"); 
        cstmt.setString(2, base64Img); 
        cstmt.executeUpdate(); 
	}
	
	static String toBase64(String filePath) throws IOException {
        return encoder(readAll(filePath)).replace("\n", "");
    }

    static String encoder(byte[] source) {
        BASE64Encoder encoder = new BASE64Encoder();
        return encoder.encode(source);
    }
    
    static byte[] readAll(String filePath) throws IOException {
        File file = new File(filePath);
        if (!file.exists()) {
            throw new IllegalArgumentException("file at path " + filePath + " not exist.");
        }
        return Files.readAllBytes(file.toPath());
    }

}
