Validate.prototype.check = function(){
    return {        //验证体
        required:{
            validator:function(value) {
                if(value!==''){
                    return true;
                }
            },
            message:'必填项不能为空'
        },
        length:{
            validator: function(value, param) {
                if (value.length < param[0] || value.length > param[1]) {
                    this.message = '输入长度必须在' + param[0] + '至' + param[1] + '范围';
                    return false;
                }else{
                    return true;
                }
            },
            message:''
        },
        minLength : { // 判断最小长度
            validator : function(value, param) {
                this.message = '最少输入' + param[0] + '个字符。';
                return value.length >= param[0];
            },
            message : ''
        },
        integer : {// 验证整数
            validator : function(value) {
                return /^[+]?[1-9]+\d*$/i.test(value);
            },
            message : '请输入整数'
        },
        number: {
            validator: function (value, param) {
                return /^\d+$/.test(value);
            },
            message: '请输入数字'
        },
        userName : {//名称
            validator : function(value) {
                if(value == ''){
                    this.message = '姓名不能为空';
                    return false;
                }
                if(value.length < 2){
                    this.message = '请输入两个字以上的中文名字';
                    return false;
                }
                
                return /^[\u0391-\uFFE5]+$/i.test(value);
            },
            message : '请输入中文姓名'
        },
        idNumber : {//身份证号
            validator : function(code) {
            	
            	 var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
                 var tip = "";
                 var pass= true;
                 
//                 if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
                 if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
                     tip = "身份证号格式错误";
                     pass = false;
                 }
                 
                else if(!city[code.substr(0,2)]){
                     tip = "地址编码错误";
                     pass = false;
                 }
                 else{
                     //18位身份证需要验证最后一位校验位
                     if(code.length == 18){
                         code = code.split('');
                         //∑(ai×Wi)(mod 11)
                         //加权因子
                         var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                         //校验位
                         var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                         var sum = 0;
                         var ai = 0;
                         var wi = 0;
                         for (var i = 0; i < 17; i++)
                         {
                             ai = code[i];
                             wi = factor[i];
                             sum += ai * wi;
                         }
                         var last = parity[sum % 11];
                         if(parity[sum % 11] != code[17]){
                             tip = "校验位错误";
                             pass =false;
                         }
                     }
                 }
                 
                 
                 
//                 if(!pass) alert(tip);
                 
                 this.message = tip;
                 
                 
                 return pass;
                 
                 
//                if(value == ''){
//                    this.message = '身份证号不能为空';
//                    return false;
//                }
//               // alert(value.length);
//               /* if(value.length != 18 || value.length != 15){
//                    this.message = '请输入15或18位身份证号';
//                    return false;
//                }*/
//                
//                return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value);
            },
            message : '请输入正确的身份证号'
        },
        mobile : {// 验证手机号码格式与唯一性
            validator : function(value,param) {
                var s = false;
                var _this = this;
                var baseValid = function(){
                    if(/^0?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/i.test(value)){
                        s = true;
                    }else{
                        _this.message = "手机号码格式不正确";
                        s = false;
                    }
                };
                if(!param){
                    baseValid();
                    return s;
                }else{
                    baseValid();
                    if(!s) return s;
                    var as = false;
                    var postdata = {};
                    postdata[param[1]] = value;
                    $.ajax({
                        url: param[0],
                        data: postdata,
                        async: false,
                        type: "post",
                        success:function(data){
                            if (!data.success) {
                                _this.message = "此手机号码已存在！";
                                as = false;
                            }else{
                                as = true;
                            }
                        }
                    });
                    return as;
                }
            },
            message: ''
        },
        chinese : {// 验证中文
            validator : function(value) {
                return /^[\u0391-\uFFE5]+$/i.test(value);
            },
            message : '请输入中文'
        },
        isSelected:{
            validator: function(value, param){
                if(value == param[0]){
                    this.message = param[1];
                    return false;
                }else{
                    return true;
                }
            },
            message:''
        },
        verifyCode: {
            validator: function (value,param) {
                if (!/^[+]?[0-9]+\d*$/i.test(value) || value.length < param) {
                    this.message = '请输入正确位数的验证码';
                    return false;
                }else{
                    return true;
                }
            },
            message: ''
        }
    }
};



function getCode(e){
	checkPhone(); //验证手机号码
	if(isPhone){
		sendCode();
		resetCode(); //倒计时
	}else{
		$('#phone').focus();
	}
}

//验证手机号码
function checkPhone(){
	var phone = $('#mobile').val();
	var pattern = /^1[0-9]{10}$/;
	isPhone = 1;
	if(phone == '') {
		alert('请输入手机号码');
		isPhone = 0;
		return;
	}
	if(!pattern.test(phone)){
		alert('请输入正确的手机号码');
		isPhone = 0;
		return;
	}
}
	
function resetCode(){
	$('#J_getCode').hide();
	$('#J_second').html('60');
	$('#J_resetCode').show();
	var second = 60;
	var timer = null;
	timer = setInterval(function(){
		second -= 1;
		if(second >0 ){
			$('#J_second').html(second);
		}else{
			clearInterval(timer);
			$('#J_getCode').show();
			$('#J_resetCode').hide();
		}
	},1000);
}

function sendCode(){
	 var Mobile = $('#mobile').val();
	 $.ajax({
	    type: 'POST',
	    url: '/contact/SendCode',
	    contentType: 'application/json; charset=utf-8',
	    dataType:"json",
	    data: JSON.stringify({
	        'Mobile': Mobile,
	     }),
	     success: function (res) {
	            	swal({
	                    title:"",
	                    text:"验证码已发送，请查收",
	                    type:"success"
	                });
	            },
	            error: function () {
	                swal({
	                    title:"",
	                    text:"异常，请稍后重试",
	                    type:"error",
	                    confirmButtonText: "确定"
	                });
	            }
	        });
	        
}

function doCompare(){
	var Name = $('#username').val();
    var Mobile = $('#mobile').val();
    var UserID = $('#idNumber').val(); 
    var InputCode = $('#inputcode').val();
	$.ajax({
	    type: 'POST',
	    url: '/contact/CardApply',
	    contentType: 'application/json; charset=utf-8',
	    dataType:"json",
	    data: JSON.stringify({
	        'Mobile': Mobile,
	        'Inputcode': InputCode,
	        'Name': Name,
	        'UserId': UserID,
	     }),
	     success: function (res) {
         	swal({
                 title:"",
                 text:"验证通过",
                 type:"success"
             });
        	window.location.href='https://mbank.bankofshanghai.com/Latte/#/CreditHot?YLLink=400210'
         },
         error: function () {
             swal({
                 title:"",
                 text:"验证不通过，请稍后重试",
                 type:"error",
                 confirmButtonText: "确定"
             });
         }
     });
	       
	}


