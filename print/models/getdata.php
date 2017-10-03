<?php 

	require_once('connect.php');

	$action = $_POST["action"];
	$id = (int)$_POST["id"];

	if($action=="no2"){
		$sqlno2 = "select * from no2 where id=$id";
		// 
		// 
		// $sqlno7 = "select * from no7 where id=$id";
		// $sqlno8 = "select * from no8 where id=$id";
		$result = $myconn->query($sqlno2);
		$nodata = $result->fetch_all(MYSQLI_ASSOC);
		echo json_encode($nodata);
	}
	if($action=="no3"){
		$sqlno3 = "select * from no3 where id=$id";
		$result = $myconn->query($sqlno3);
		$nodata = $result->fetch_all(MYSQLI_ASSOC);
		echo json_encode($nodata);
	}
	if($action=="no4"){
		$sqlno4 = "select * from no4 where id=$id and page=4";
		$result = $myconn->query($sqlno4);
		$nodata = $result->fetch_all(MYSQLI_ASSOC);
		echo json_encode($nodata);
	}
	if($action=="no5"){
		$sqlno4 = "select * from no4 where id=$id and page=5";
		$result = $myconn->query($sqlno4);
		$nodata = $result->fetch_all(MYSQLI_ASSOC);
		echo json_encode($nodata);
	}
	if($action=="no6"){
		$sqlno4 = "select * from no4 where id=$id and page=6";
		$result = $myconn->query($sqlno4);
		$nodata = $result->fetch_all(MYSQLI_ASSOC);
		echo json_encode($nodata);
	}
	if($action=="no7"){
		$sqlno4 = "select * from no4 where id=$id and page=7";
		$result = $myconn->query($sqlno4);
		$nodata = $result->fetch_all(MYSQLI_ASSOC);

		$no7sql = "SELECT * FROM `no7` WHERE `id`=$id";
		$result2 = $myconn->query($no7sql);
		$nodata2 = $result2->fetch_all(MYSQLI_ASSOC);

		$rel = array('no4' => $nodata, 'no7' => $nodata2);
		echo json_encode($rel);
	}
	if($action=="no8"){
		$sqlno8 = "select * from no8 where id=$id";
		$result = $myconn->query($sqlno8);
		$nodata = $result->fetch_all(MYSQLI_ASSOC);
		echo json_encode($nodata);
	}
	
	$myconn->close();

 ?>