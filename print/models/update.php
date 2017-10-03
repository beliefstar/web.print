<?php 

	require_once('connect.php');

	$action = $_POST["action"];
	$id = (int)$_POST["id"];

	$reldata = array();

	if($action=="no3"){
		$name1=$_POST["name1"];
		$name2=$_POST["name2"];
		$identity=$_POST["identity"];
		$landAddress=$_POST["landAddress"];
		$landArea=$_POST["landArea"];
		$landTotal=$_POST["landTotal"];
		$circulationMode=$_POST["circulationMode"];
		$payment=$_POST["payment"];
		$term=$_POST["term"];
		$purpose=$_POST["purpose"];

		$sql = "UPDATE `no3` SET `name1` = '$name1', `name2` = '$name2', `identity` = '$identity', `landAddress` = '$landAddress', `landArea` = '$landArea', `landTotal` = '$landTotal', `circulationMode` = '$circulationMode', `payment` = '$payment', `term` = '$term', `purpose` = '$purpose' WHERE `no3`.`id` = $id;";

		$myconn->query($sql);
		$num = $myconn->affected_rows;
		if($num>0){
			$reldata["state"] = "ok";
			$editsql = "SELECT `editpage` FROM `edit` WHERE `id`=$id";
			$result = $myconn->query($editsql);
			if($row = $result->fetch_assoc()){
			    $oldedit = $row['editpage'];
			    if(strstr($oldedit,"NO.3")==""){
			    	$newedit = $oldedit ." NO.3";
			    	$o_time = (int)time()*1000;
			    	$updateedit = "UPDATE `edit` SET `editpage`='$newedit',`update_time`='$o_time' WHERE `id`=$id";
			    	$myconn->query($updateedit);
			    }
			}
		}else{
			$reldata["state"] = "none";
		}

		echo json_encode($reldata);
	}
	
	if($action=="no4"){

		$a = $_POST["dataf"];

		$page = trim($_POST["page"]);

		$sql = "DELETE FROM `no4` WHERE `id`=$id and `page`=$page";

		$myconn->query($sql);

		$b = str_replace("\n","",$a);

		$data = json_decode($b);

		$sql = "INSERT INTO `no4`(`id`, `address`, `landNumber`, `page`) VALUES ";

		for ($i=0; $i < count($data); $i++) { 
			$add = $data[$i]->address;
			$lan = $data[$i]->landNumber;
			$sql .= "('$id','$add','$lan','$page'),";
		}

		$s = substr($sql,0,strlen($sql)-1);

		$myconn->query($s);
		
		$num = $myconn->affected_rows;
		if($num>0){
			$reldata["state"] = "ok";
			$currpage = "NO." .$page;
			$editsql = "SELECT `editpage` FROM `edit` WHERE `id`=$id";
			$result = $myconn->query($editsql);
			if($row = $result->fetch_assoc()){
			    $oldedit = $row['editpage'];
			    if(strstr($oldedit,$currpage)==""){
			    	$newedit = $oldedit ." " .$currpage;
			    	$o_time = (int)time()*1000;
			    	$updateedit = "UPDATE `edit` SET `editpage`='$newedit',`update_time`='$o_time'  WHERE `id`=$id";
			    	$myconn->query($updateedit);
			    }
			}
		}else{
			$reldata["state"] = "none";
		}
		echo json_encode($reldata);
	}
	
	if($action=="no4-no7"){

		$a = $_POST["dataf"];

		$page = trim($_POST["page"]);

		$sql = "DELETE FROM `no4` WHERE `id`=$id and `page`=$page";

		$myconn->query($sql);

		$b = str_replace("\n","",$a);

		$data = json_decode($b);

		$sql = "INSERT INTO `no4`(`id`, `address`, `landNumber`, `page`) VALUES ";

		for ($i=0; $i < count($data); $i++) { 
			$add = $data[$i]->address;
			$lan = $data[$i]->landNumber;
			$sql .= "('$id','$add','$lan','$page'),";
		}

		$s = substr($sql,0,strlen($sql)-1);

		$myconn->query($s);
		
		$num = $myconn->affected_rows;
		if($num>0){
			//$reldata["state"] = "ok";


				$date = $_POST["date"];
				$sql = "UPDATE `no7` SET `date`='$date' WHERE `id`=$id";
				$myconn->query($sql);
				$num = $myconn->affected_rows;
				if($num>0){
					$reldata["state"] = "ok";
					$editsql = "SELECT `editpage` FROM `edit` WHERE `id`=$id";
					$result = $myconn->query($editsql);
					if($row = $result->fetch_assoc()){
					    $oldedit = $row['editpage'];
					    if(strstr($oldedit,"NO.7")==""){
					    	$newedit = $oldedit ." NO.7";
					    	$o_time = (int)time()*1000;
					    	$updateedit = "UPDATE `edit` SET `editpage`='$newedit',`update_time`='$o_time' WHERE `id`=$id";
					    	$myconn->query($updateedit);
					    }
					}
				}

			// $currpage = "NO." .$page;
			// $editsql = "SELECT `editpage` FROM `edit` WHERE `id`=$id";
			// $result = $myconn->query($editsql);
			// if($row = $result->fetch_assoc()){
			//     $oldedit = $row['editpage'];
			//     if(strstr($oldedit,$currpage)==""){
			//     	$newedit = $oldedit ." " .$currpage;
			//     	$o_time = (int)time()*1000;
			//     	$updateedit = "UPDATE `edit` SET `editpage`='$newedit',`update_time`='$o_time'  WHERE `id`=$id";
			//     	$myconn->query($updateedit);
			//     }
			// }
		}else{
			$reldata["state"] = "none";
		}
		echo json_encode($reldata);
	}
	

	
	if($action=="clear_no8"){
		
		$myconn->query($sql);
	}
	if($action=="no8"){

		$a = $_POST["dataf"];

		$sqls = "DELETE FROM `no8` WHERE `id`=$id";

		$myconn->query($sqls);

		$b = str_replace("\n","",$a);

		$data = json_decode($b);

		$sql = "INSERT INTO `no8`(`id`, `changeMode`, `area`, `hetongID`, `landID`, `info`) VALUES ";

		for ($i=0; $i < count($data); $i++) { 
			$changeMode = $data[$i]->changeMode;
			$area 		= $data[$i]->area;
			$hetongID 	= $data[$i]->hetongID;
			$landID 	= $data[$i]->landID;
			$info 		= $data[$i]->info;

			$sql .= "('$id','$changeMode','$area','$hetongID','$landID','$info'),";
		}


		$s = substr($sql,0,strlen($sql)-1);

		$myconn->query($s);
		
		$num = $myconn->affected_rows;
		if($num>0){
			$reldata["state"] = "ok";

			$editsql = "SELECT `editpage` FROM `edit` WHERE `id`=$id";
			$result = $myconn->query($editsql);
			if($row = $result->fetch_assoc()){
			    $oldedit = $row['editpage'];
			    if(strstr($oldedit,"NO.8")==""){
			    	$newedit = $oldedit ." NO.8";
			    	$o_time = (int)time()*1000;
			    	$updateedit = "UPDATE `edit` SET `editpage`='$newedit',`update_time`='$o_time' WHERE `id`=$id";
			    	$myconn->query($updateedit);
			    }
			}

		}else{
			$reldata["state"] = "none";
		}
		echo json_encode($reldata);
	}
	
	$myconn->close();
 ?>