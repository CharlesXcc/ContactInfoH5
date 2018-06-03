$(function () {
    toastr.options = {  
        closeButton: false,  
        debug: false,  
        progressBar: true,  
        positionClass: "toast-top-center",  
        onclick: null,  
        showDuration: "300",  
        hideDuration: "1000",  
        timeOut: "2000",  
        extendedTimeOut: "1000",  
        showEasing: "swing",  
        hideEasing: "linear",  
        showMethod: "fadeIn",  
        hideMethod: "fadeOut"  
    };
})


jQuery(document).ready(function() {

    /*
        Background slideshow
    */
    //$.backstretch([
    //  "assets/img/backgrounds/1.jpg"
    //, "assets/img/backgrounds/2.jpg"
    //, "assets/img/backgrounds/3.jpg"
    //], {duration: 3000, fade: 750});

    /*
        Tooltips
    */
    //$('.links a.home').tooltip();
    //$('.links a.blog').tooltip();

    /*
        Form validation
    */
    
    $('.register form').submit(function(){
    	
    	toastr.success("添加成功");
    	$('#username').val('');
    	$('#phone').val('');
    	$('#require').val('');
    	$('#purpose').val('');
    	return false;
        alert("111233");
        var form = $(this); 
      /*
      $.ajax({
            type: 'POST',
            url: '/contact/AddUser1',
            contentType: 'application/json; charset=utf-8',
            dataType:"json",
            data: JSON.stringify({
                'Name': Name,
                'Phone': Phone,
            }),
            success: function (res) {
                //alert("ok");
                toastr.success("1111");
                console.log(toastr);
                console.log("11211");
                //alert("test");
                //reset()
            },
            error: function () {
                 //alert("fail11");
                toastr.error("22222");
                console.log(toastr);
                console.log("31314");
                //alert("test2");
            }
        });
               
    	*/
    	/*
        $(this).find("label[for='firstname']").html('First Name');
        $(this).find("label[for='lastname']").html('Last Name');
        $(this).find("label[for='username']").html('Username');
        $(this).find("label[for='email']").html('Email');
        $(this).find("label[for='password']").html('Password');
        ////
        var firstname = $(this).find('input#firstname').val();
        var lastname = $(this).find('input#lastname').val();
        var username = $(this).find('input#username').val();
        var email = $(this).find('input#email').val();
        var password = $(this).find('input#password').val();
        if(firstname == '') {
            $(this).find("label[for='firstname']").append("<span style='display:none' class='red'> - Please enter your first name.</span>");
            $(this).find("label[for='firstname'] span").fadeIn('medium');
            return false;
        }
        if(lastname == '') {
            $(this).find("label[for='lastname']").append("<span style='display:none' class='red'> - Please enter your last name.</span>");
            $(this).find("label[for='lastname'] span").fadeIn('medium');
            return false;
        }
        if(username == '') {
            $(this).find("label[for='username']").append("<span style='display:none' class='red'> - Please enter a valid username.</span>");
            $(this).find("label[for='username'] span").fadeIn('medium');
            return false;
        }
        if(email == '') {
            $(this).find("label[for='email']").append("<span style='display:none' class='red'> - Please enter a valid email.</span>");
            $(this).find("label[for='email'] span").fadeIn('medium');
            return false;
        }
        if(password == '') {
            $(this).find("label[for='password']").append("<span style='display:none' class='red'> - Please enter a valid password.</span>");
            $(this).find("label[for='password'] span").fadeIn('medium');
            return false;
        }
        
        */
    });
    
    
});


