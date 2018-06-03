package com.springboot.contact.controller;

import java.io.FileInputStream;  
import java.io.FileOutputStream;  
import java.io.IOException;  
import java.io.InputStream;  
import java.io.OutputStream;  
import java.net.HttpURLConnection;  
import java.net.URL;  
  
import sun.misc.BASE64Decoder;  
import sun.misc.BASE64Encoder;  
  
/** 
 *  
 * 版权所有：2016 项目名称：ImgeBase64 
 * 
 * 类描述：将图片转化为Base64字符串  
 * 类名称：cn.sanishan.util.Base64Img  
 * 创建人： 
 * 创建时间：2016年10月27日 
 * 下午3:25:49  
 * 修改人：  
 * 修改时间：2016年10月27日 下午3:25:49  
 * 修改备注： 
 *  
 * @version V1.0 
 */  
public class ImgBase64 {  
    /** 
     * @Title: GetImageStrFromUrl 
     * @Description: TODO(将一张网络图片转化成Base64字符串) 
     * @param imgURL 网络资源位置 
     * @return Base64字符串 
     */  
    public static String GetImageStrFromUrl(String imgURL) {  
        byte[] data = null;  
        try {  
            // 创建URL  
            URL url = new URL(imgURL);  
            // 创建链接  
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();  
            conn.setRequestMethod("GET");  
            conn.setConnectTimeout(5 * 1000);  
            InputStream inStream = conn.getInputStream();  
            data = new byte[inStream.available()];  
            inStream.read(data);  
            inStream.close();  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        // 对字节数组Base64编码  
        BASE64Encoder encoder = new BASE64Encoder();  
        // 返回Base64编码过的字节数组字符串  
        return encoder.encode(data);  
    }  
  
    /** 
     * @Title: GetImageStrFromPath 
     * @Description: TODO(将一张本地图片转化成Base64字符串) 
     * @param imgPath 
     * @return 
     */  
    public static String GetImageStrFromPath(String imgPath) {  
        InputStream in = null;  
        byte[] data = null;  
        // 读取图片字节数组  
        try {  
            in = new FileInputStream(imgPath);  
            data = new byte[in.available()];  
            in.read(data);  
            in.close();  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        // 对字节数组Base64编码  
        BASE64Encoder encoder = new BASE64Encoder();  
        // 返回Base64编码过的字节数组字符串  
        return encoder.encode(data);  
    }  
  
    /** 
     * @Title: GenerateImage 
     * @Description: TODO(base64字符串转化成图片) 
     * @param imgStr 
     * @return 
     */  
    public static boolean GenerateImage(String imgStr) {  
        if (imgStr == null) // 图像数据为空  
            return false;  
        BASE64Decoder decoder = new BASE64Decoder();  
        try {  
            // Base64解码  
            byte[] b = decoder.decodeBuffer(imgStr);  
            for (int i = 0; i < b.length; ++i) {  
                if (b[i] < 0) {// 调整异常数据  
                    b[i] += 256;  
                }  
            }  
            // 生成jpeg图片  
            String imgFilePath = "D://ID2.jpg";  
            OutputStream out = new FileOutputStream(imgFilePath);  
            out.write(b);  
            out.flush();  
            out.close();  
            return true;  
        } catch (Exception e) {  
            return false;  
        }  
    }  
    
    public static void main(String[] args) {
    	
    	ImgBase64 a = new ImgBase64();
    	//String output = a.GetImageStrFromPath("d://ID.jpg");
    	String out = "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";
    	GenerateImage(out);
    	System.out.println(out);
    	
    	
    }
    
    
} 