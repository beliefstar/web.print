<?php 

	require_once('../../models/connect.php');

	$q = "select * from admin where name=?";

	$stmt = $myconn->prepare($q);

	$stmt->bind_param("s", $name);

	$name = $_POST["name"];
	$pwd = $_POST["pwd"];

	$stmt->execute();

	$data = array();

	$result = $stmt->get_result();

	if($row = $result->fetch_assoc()){
		if($pwd == $row["pwd"]){
			$data["state"] = "ok";
			session_start();
			$_SESSION["userInfo"] = md5($_SERVER['HTTP_USER_AGENT']) .$row["name"];
		}else{
			$data["state"] = "none";
		}
	}else{
		$data["state"] = "none";
	}
	echo json_encode($data);

	$stmt->close();
	$myconn->close();

 ?>