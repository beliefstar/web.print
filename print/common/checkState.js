$.ajax({
	url: "models/State.php",
	type: 'POST',
	dataType: 'json',
	data:{
		action:"check"
	}
})
.done(function(data) {
	if(data.state == "none"){
		location.href = "account/";
	}else{
		$(".onload-page").hide();
	}
})