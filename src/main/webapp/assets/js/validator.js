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


