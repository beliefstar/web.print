<?php 

	require_once('connect.php');

	$info1 = $_POST["info1"];
	$info2 = $_POST["info2"];
	$info3 = $_POST["info3"];
	$company = $_POST["company"];
	$date = $_POST["date"];

	$q = "INSERT INTO `no2`(`info1`, `info2`, `info3`, `company`, `date`) VALUES ('$info1','$info2','$info3','$company','$date')";

	$myconn->query($q);

	$data = array();
	$num = $myconn->affected_rows;

	if($num>0){
		$data["state"] = "ok";
		$id = mysqli_insert_id($myconn);
		//echo $id ."--ok";
		$b_time = (int)time()*1000;
		$o_time = (int)time()*1000;

		$data["id"] = $id;
		//插入edit
		$query = "insert into edit(id,begin_time,update_time,add_people,editpage) values($id,$b_time,$o_time,'荣昌区','NO.2')";
		$myconn->query($query);
		//创建详细信息表
		//$tablename = array("no3","no4","no7","no8");
		$tablename = array("no3","no7","no8");
		for ($i=0; $i < count($tablename); $i++) { 
			$queryarr = "insert into $tablename[$i](id) values($id)";
			$myconn->query($queryarr);
		}
	}else{
		$data["state"] = "none";
	
	}

	echo json_encode($data);

	$myconn->close();

 ?>