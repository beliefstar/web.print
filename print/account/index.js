$("#loginForm").submit(function(){

	var oname = $("#name").val(),
		opwd = $("#pwd").val();

	if(oname==""||opwd==""){
		alert('用户名或密码不可为空！');
	}else{
		$(".loginformload").show();
		var formdata = {
			name:oname,
			pwd:opwd
		}

		$.ajax({
			url: 'ajax/login.php',
			type: 'POST',
			dataType: 'json',
			data: formdata
		})
		.done(function(data) {
			if(data.state=='ok'){
				location.href = "../";
			}else{
				alert('用户名或密码错误！');
				$(".loginformload").hide();
			}
		})
		
	}

	return false;
})