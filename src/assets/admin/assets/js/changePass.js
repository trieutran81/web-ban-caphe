 $(document).ready(function(){

	$("#oldpass_error").hide();
	$("#password1_error").hide();
	$("#password2_error").hide();
	
	var error_oldpass = false;
	var error_password1 = false;
	var error_password2 = false;

	$("#password1").focusout(function() {

        check_password1();
    });
    $("#password2").focusout(function() {

        check_password2();
    });
    
    function check_oldpass() {
        

        if($("#oldpass2").val()!=$("#oldpass1").val()) {
            $("#oldpass_error").html("Mật khẩu không đúng, kiểm tra lại");
            $("#oldpass_error").show();
            error_oldpass = false;
        } else {
            $("#oldpass_error").hide();
            error_oldpass = true;
        }
    }
	function check_password1() {
        
        var password1_length = $("#password1").val().length;
        if(password1_length < 3) {
            $("#password1_error").html("Mật khẩu phải lớn hơn 3 kí tự");
            $("#password1_error").show();
            error_password1 = false;
        }else {
            $("#password1_error").hide();
            error_password1 = true;
        }
    }
    function check_password2() {
        
        var password2_length = $("#password2").val().length;

        if($("#password2").val()!=$("#password1").val()) {
            $("#password2_error").html("Mật khẩu không khớp");
            $("#password2_error").show();
            error_password2 = false;
        } else {
            $("#password2_error").hide();
            error_password2 = true;
        }
    }
    $("#btnChangePass").click(function() {
    	check_oldpass();
        check_password1();
        check_password2();

        if(error_oldpass == true && error_password1 == true && error_password2 == true) {
            alert("Đổi mật khẩu thành công!");
            return true;
        } else {
        	return false;
        }
    });

});