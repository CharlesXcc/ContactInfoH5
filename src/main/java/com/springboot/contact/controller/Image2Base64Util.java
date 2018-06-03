package com.springboot.contact.controller;

import okhttp3.*;
import sun.misc.BASE64Encoder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

public class Image2Base64Util {

    static byte[] readAll(String filePath) throws IOException {
        File file = new File(filePath);
        if (!file.exists()) {
            throw new IllegalArgumentException("file at path " + filePath + " not exist.");
        }
        return Files.readAllBytes(file.toPath());
    }

    static String toBase64(String filePath) throws IOException {
        return encoder(readAll(filePath)).replace("\n", "");
    }

    static String encoder(byte[] source) {
        BASE64Encoder encoder = new BASE64Encoder();
        return encoder.encode(source);
    }


    public static void main(String[] args) {
        String result = "";
        try {
            OkHttpClient client = new OkHttpClient();
            FormBody.Builder requestBodyBuilder = new FormBody.Builder();
            //requestBodyBuilder.add("face1_base64", toBase64("d://1.jpg"));
            //requestBodyBuilder.add("face2_base64", toBase64("d://3.jpg"));
            requestBodyBuilder.add("img_base64", toBase64("d://1.jpg"));
            
            /*
            Request request = new Request.Builder()
                    .url("http://aiopen.datapeak.com.cn/proxy/api/face_compare")
                    .post(requestBodyBuilder.build())
                    .addHeader("content-type", "application/x-www-form-urlencoded")
                    .addHeader("appkey", "053dace8e03b297a3e1fa6059b6e49861522057249921")
                    .build();
            */
            Request request = new Request.Builder()
                    .url("http://aiopen.datapeak.com.cn/proxy/api/id_card")
                    .post(requestBodyBuilder.build())
                    .addHeader("content-type", "application/x-www-form-urlencoded")
                    .addHeader("appkey", "053dace8e03b297a3e1fa6059b6e49861522057249921")
                    .build();
            Response response = client.newCall(request).execute();
            result = response.body().string();
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println(result);
    }


}
