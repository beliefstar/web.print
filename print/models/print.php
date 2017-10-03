<?php 

	require_once('connect.php');

	$id = $_POST["id"];
	$page = $_POST["page"];

	$o_time = (int)time()*1000;
	$reldata = array();

	$sql = "INSERT INTO `print`(`id`, `page`, `p_date`, `p_people`) VALUES ('$id','$page','$o_time','荣昌区')";

	$myconn->query($sql);
	$num = $myconn->affected_rows;
	if($num>0){
		$reldata["state"] = "ok";
	}else{
		$reldata["state"] = "none";
	}

	echo json_encode($reldata);
 ?>