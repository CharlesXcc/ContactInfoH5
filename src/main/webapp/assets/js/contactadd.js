function contactAdd() {
    		
    var Name = $('#username').val();
    var Phone = $('#phone').val();
    var Requirement = $('#requirement').val();    
    var Selected  = $("#purpose option:selected");
    var Purpose = Selected.text();
    
    if(Name == '') {
    swal({
        title:"",
        text:"请输入姓名",
        type:"error",
        confirmButtonText: "确定"
        });
    	return false;
    }
    
    if(Phone == '') {
        swal({
            title:"",
            text:"请输入电话号码",
            type:"error",
            confirmButtonText: "确定"
            });
        	return false;
        }
    
    $.ajax({
            type: 'POST',
            url: '/contact/AddUser1',
            contentType: 'application/json; charset=utf-8',
            dataType:"json",
            data: JSON.stringify({
                'Name': Name,
                'Phone': Phone,
                'Requirement': Requirement,
                'Purpose': Purpose,
            }),
            success: function (res) {
            	swal({
                    title:"",
                    text:"添加成功",
                    type:"success"
                });
            	 $('#username').val('');
            	 $('#phone').val('');
            	 $('#purpose').val(''); 
            	 $('#requirement').val('');
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



function reset() {
    $('#username').val('');
    $('#phone').val('');
	$('#purpose').val(''); 
	$('#requirement').val(''); 

}