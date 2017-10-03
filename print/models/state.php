<?php 
	
	$action = $_POST["action"];

	$state = array();
	session_start();

	if($action == "check"){
		if(!isset($_SESSION["userInfo"])){
			$state["state"] = "none"; 
		}else{
			$state["state"] = "ok";
		}
	}
	if($action == "exit"){
		unset($_SESSION["userInfo"]);
		session_destroy();
		$state["state"] = "ok";
	}

	
	echo json_encode($state);

 ?>