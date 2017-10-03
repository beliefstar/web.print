<?php 

	require_once('connect.php');

	$newpwd = $_POST["newpwd"];
	$oldpwd = $_POST["oldpwd"];

	$flagsql = "SELECT `pwd` FROM `admin` WHERE `id`=1";

	$rel = array();
	$result=$myconn->query($flagsql);

	if($row = $result->fetch_assoc()){
		$oldpwdt = $row['pwd'];
		if(trim($oldpwdt)==trim($oldpwd)){
			$sql = "UPDATE `admin` SET `pwd`='$newpwd' WHERE `id`=1";

			$myconn->query($sql);
			$num = $myconn->affected_rows;
			if($num>0){
				$rel["state"] = "ok";
			}else{
				$rel["state"] = "no";
			}
		}else{
			$rel["state"] = "none";
		}
	}

	echo json_encode($rel);

	$myconn->close();

 ?>