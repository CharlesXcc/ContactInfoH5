package com.springboot.contact;

import java.io.Serializable;
import java.net.HttpURLConnection;

public class RestResponse implements Serializable {

    private static final int success = HttpURLConnection.HTTP_OK;
    private static final int failure = HttpURLConnection.HTTP_INTERNAL_ERROR;
    public static final int TOKEN_ERROR = HttpURLConnection.HTTP_FORBIDDEN;
    
    private Integer status;
    private String message;
    private Object data;
    
    public RestResponse() {
        
    }
    
    public RestResponse(Integer status) {
        this.setStatus(status);
    }
    
    public static RestResponse success(Object data) {
        return data(success, data);
    }
    
    public static RestResponse failure(String message) {
        return message(failure, message);
    }
    
    public static RestResponse message(int code, String message) {
        RestResponse response = new RestResponse(code);
        response.setMessage(message);
        return response;
    }
    
    public static RestResponse data(int code, Object data) {
        RestResponse response = new RestResponse(code);
        response.setData(data);
        return response;
    }
    
    public boolean succeed() {
        return status == success;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
    
    private transient static final long serialVersionUID = 1L;



}
