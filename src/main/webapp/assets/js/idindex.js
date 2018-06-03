(function(doc, win) {
    var docEl = doc.documentElement || doc.body,
        isIOS = navigator.userAgent.match(/iphone|ipod|ipad/gi),
        dRatio = win.devicePixelRatio,
        dpr = isIOS && dRatio != undefined ? Math.min(dRatio, 3) : (dRatio != undefined ? dRatio : 1),  //设备像素比devicePixelRatio
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    docEl.dataset.dpr = dpr;

    var recalc = function() {
        //页面内容可见区域的宽度(兼容各种平台),对于ios设备devicePixelRatio值只可能是1或者2
        //当width=device-width时，可视区的宽度就是document.documentElement.clientWidth
        //安卓平台下可见区的宽度：document.body.clientWidth || document.documentElement.clientWidth
        var width = docEl.clientWidth || win.innerWidth;
        if (width / dpr > 750) {
            width = 750 * dpr;
        }
        docEl.style.fontSize = 100 * (width / 750) + 'px';
    };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);

(function(){
	window.alert = function(name){
		var iframe = document.createElement("IFRAME");
		iframe.style.display="none";
		iframe.setAttribute("src", 'data:text/plain,');
		document.documentElement.appendChild(iframe);
		window.frames[0].window.alert(name);
		iframe.parentNode.removeChild(iframe);
	};
	
	window.confirm = function (message) {
        var iframe = document.createElement("IFRAME");
        iframe.style.display = "none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        var alertFrame = window.frames[0];
        var result = alertFrame.window.confirm(message);
        iframe.parentNode.removeChild(iframe);
        return result;
   };	
})();


function selModal(classOne,classTwo,selValue){
    var aClassOne = document.querySelectorAll('.'+classOne+'');
    var aClassTwo = document.querySelectorAll('.'+classTwo+'');
    var aSelValue = document.querySelectorAll('.'+selValue+'');

    for(var i=0;i<aClassOne.length;i++){
        (function(index){
             aClassOne[i].addEventListener('touchstart',function(){
                for(var j=0;j<aClassTwo.length;j++){
                    aClassTwo[j].style.display = 'none';
                }
                aClassTwo[index].style.display = 'block';
                var aSelValue = aClassTwo[index].querySelectorAll('.'+selValue+'');
                 for(var k=0;k<aSelValue.length;k++){
                 	(function(indexK){
	                    aSelValue[indexK].addEventListener('touchstart',function(){
	                        for(var m=0;m<aSelValue.length;m++){
	                            aSelValue[m].children[0].checked = false;
	                        }
	                        this.children[0].checked = true;
	                        aClassOne[index].children[1].value = this.children[1].innerHTML;
                          aClassOne[index].children[2].value = this.children[0].value;
                      });
                   })(k);
                 }
            },false);
        })(i);        
    }            
};

function selModalOne(selValue,monthVal){
    var aSelValue = document.querySelectorAll('.'+selValue+'');
    var oMonthVal = document.querySelector('#'+monthVal+'');
    for(var i=0;i<aSelValue.length;i++){
        (function(index){
            aSelValue[index].addEventListener('touchstart',function(){
                for(var m=0;m<aSelValue.length;m++){
                    aSelValue[m].children[0].checked = false;
                }
                this.children[0].checked = true;
                oMonthVal.value = this.children[1].innerHTML;
           });
       })(i);	           
    }            
};


function pwdPassword(){
    var $input = $(".fake-box input");  
    $("#pwd-input").on("input", function() {  
        var pwd = $(this).val().trim();  
        for (var i = 0, len = pwd.length; i < len; i++) {  
            $input.eq("" + i + "").val(pwd[i]);  
        }  
        $input.each(function() {  
            var index = $(this).index();  
            if (index >= len) {  
                $(this).val("");  
            }  
        });  
        if (len == 6) {  
            //执行其他操作  
        }  
    });
}

function countDwon(getCode,mobile,url){
    var getCode=document.querySelector('#'+getCode+'');
    var iNum=60;
    var timer=null;
    getCode.addEventListener('touchstart',function(ev){
        function time(){
            getCode.innerHTML=iNum+'秒后重发';
            getCode.style.color="#babbc0";
            iNum--;
            if(iNum==0){
                getCode.innerHTML='获取验证码';
                iNum=60;
                getCode.style.color="#0fbc4e";
                clearInterval(timer)
            }          
        }
        var mobiletime = $('#'+mobile+'').val();
       

        if(!validateMobile(mobiletime)){
            $("#errmsg").text(errormsg);
            $("#msg").show();
            setTimeout(function(){
                $("#msg").hide();
            },2000);
            return;
        }else{
            errormsg="";
            $("#msg").hide();
        }
       
        if(getCode.innerHTML == '获取验证码'){

            // $.ajax(
            //  url: "url",
            //  type: "GET",
            //  dataType: 'json',
            //  data: { mobile: mobile },
            //  success: function(data) {
            //      timer=setInterval(time,1000);
            //  }
            // });


            timer=setInterval(time,1000);
        }else{
            return;
        }
        
        
    },false);
}

function commonevent(id){
    var oIdbtn = document.querySelector('#'+id+'');
    oIdbtn.addEventListener('touchstart',function(ev){
        if(!checkisok()){
            $("#errmsg").text(errormsg);
            $("#msg").show();
            setTimeout(function(){
                $("#msg").hide();
            },2000);
            return;
        }else{
            errormsg="";
            $("#msg").hide();
        }
    }); 
    
}

function commonFocus(id){
	$('#'+id+'').focus(function(){
		$("#msg").hide();
	});
}
//底部信息不会随软键盘现实而错位
function ready(){
    var h=$(window).height();
    $(window).resize(function() {
        if($(window).height()<h){
            $('.borrow-money-footer').hide();
        }
        if($(window).height()>=h){
            $('.borrow-money-footer').show();
        }
    });
};

//手机号码中间星号设置
function iphoneNumberfn(iphoneNumber){
	var tel = $('.'+iphoneNumber+'').html();
	var reg = /^(\d{3})\d{4}(\d{4})$/;
	tel = tel.replace(reg, "$1****$2");
	$('.'+iphoneNumber+'').html(tel);
}

//进入已发送验证码倒计时
function getCodeCommon(id){
	var oBtn=document.getElementById(id);
	var iNum=60;
	var timer=null;
	
	function time(){
		oBtn.innerHTML=iNum+'秒后重发';
		getCode.style.color="#babbc0";
		iNum--;
		if(iNum==0){
			oBtn.innerHTML='获取验证码';
			getCode.style.color="#0fbc4e";
			iNum=60;
			clearInterval(timer)
		}
	}
	timer=setInterval(time,1000)
	time();
	oBtn.onclick=function(){
		if(oBtn.innerHTML=='获取验证码'){
			timer=setInterval(time,1000);
			time();
		}
	};
}
//loading
function addLoading(){
	 var loadingWrapper = document.createElement('div');
	 loadingWrapper.setAttribute('id','loadingWrapper');
	 loadingWrapper.style.width=window.screen.width+'px';
	 loadingWrapper.style.height=window.screen.height+'px';
	 loadingWrapper.style.position='fixed';
	 loadingWrapper.style.left= 0;
	 loadingWrapper.style.top= 0;
	 loadingWrapper.style.backgroundColor='rgba(0,0,0,0.2)';

	var loadingBox = document.createElement('div');
	loadingBox.setAttribute('class','loading-box');
	//loadingBox.innerHTML = '<img src="assets/img/loading.gif" class="loadingGIF">';
	loadingBox.innerHTML = '<img src="assets/img/loading.gif" class="loadingGIF"/>';
    loadingWrapper.appendChild(loadingBox);
    document.body.appendChild(loadingWrapper);
    document.body.style.overflow='hidden';
}

function removeLoading(){
  if ($('#loadingWrapper')) {
    $('#loadingWrapper').remove();
  }
}


//function selModal(classOne,classTwo,selValue){
//  var aClassOne = document.querySelectorAll('.'+classOne+'');
//  var aClassTwo = document.querySelectorAll('.'+classTwo+'');
//  for(var i=0;i<aClassOne.length;i++){
//      (function(index){
//           aClassOne[i].addEventListener('touchstart',function(){
//              for(var j=0;j<aClassTwo.length;j++){
//                  aClassTwo[j].style.display = 'none';
//              }
//              aClassTwo[index].style.display = 'block';
//              var inptVal = aClassOne[index].children[1].value;
//              var _this = this;
//              
//              var aSelValue = aClassTwo[index].querySelectorAll('.'+selValue+'');
//	        		$('.'+selValue+'').off("touchstart").on('touchstart',function($index){
//	        			console.log(1);
//	        			for(var m=0;m<aSelValue.length;m++){
//                      aSelValue[m].children[0].removeAttribute('checked');
//                  }
//	        			$(this).find('input').first().attr('checked',true);
//                  aClassOne[index].children[1].value = $(this).find('span').html();  
//	        		});
//	        		
//          },false);
//      })(i);       
//  }
//};


//iphone下请选择问题

function pleaseSel(pleaseSel){
	var aPleaseSel = document.querySelectorAll('.'+pleaseSel+'');
	for(var i=0;i<aPleaseSel.length;i++){
		aPleaseSel[i].addEventListener('touchstart',function(){
			this.parentNode.click();
		});
	}
}


/* 选择拍摄弹框 */

function clickModalfn(clickModal,showHideBtn){
    var aClickModal = document.querySelectorAll('.'+clickModal+'');
    var aShowHideBtn = document.querySelectorAll('.'+showHideBtn+'');
    for(var i=0;i<aClickModal.length;i++){
        (function(index){
            aClickModal[index].addEventListener('touchstart',function(){
                for(var m=0;m<aShowHideBtn.length;m++){
                    aShowHideBtn[m].style.display="none";
                }
                aShowHideBtn[index].style.display="block";
           });
       })(i);	           
    }            
};	

/* 清空图片 */
 function delImage(delImage){
    $('.'+delImage+'').click(function(){
    		var numLength = $(this).parent('.title-box').next('.ccb-imgCapture-list').children().length-1;		    		
    		$(this).parent('.title-box').next('.ccb-imgCapture-list').children('li:lt('+numLength+')').remove();
    		var numCount = $(this).parent('.title-box').next('.ccb-imgCapture-list').children('li').length-1;
    		$(this).prev('.ccb-imgBox-title').find('.image-num').html(numCount);;
    		
    });		         
};

/* 拍摄图片插入页面 */
function creamUpload(sThis,id){
	fs = sThis.files[0];
    var url = (window.URL || window.webkitURL).createObjectURL(fs);
    var oLi = document.createElement('li');
    oLi.innerHTML = '<img src="'+url+'">'
    $('#'+id+'').before(oLi);
    $('.delMoal').click();
    
    var numCount = $('#'+id+'').siblings().length;
    $('#'+id+'').parent('.ccb-imgCapture-list').prev('.title-box').children('.ccb-imgBox-title').find('.image-num').html(numCount);	        	        
}


// 获取请求的html后面的参数
function getQueryString(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null) {
    return  unescape(r[2]);
  }
  return null;
}

$.ajaxSetup({
  timeout:30000,
  cache:false,
  error: function () {
    alert("网络连接失败");
    removeLoading();
  }
});