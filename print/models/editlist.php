<?php 

	require_once('connect.php');

	$page = (int)$_POST["page"];
	$page = ($page-1)*10;

	$time = $_POST["time"];
	$txt = $_POST["txt"];

	$sql = "select b.info1,b.info2,b.info3,a.begin_time,a.update_time,a.add_people,a.editpage,a.id from no2 b,edit a where a.id=b.id and a.begin_time>$time and (b.info1 like '%$txt%' or b.info2 like '%$txt%' or b.info3 like '%$txt%') order by a.update_time DESC limit $page,10";
	$result = $myconn->query($sql);
	if($result === false){//执行失败
	    echo $myconn->error;
	    echo $myconn->errno;
	}

	$data = $result->fetch_all(MYSQLI_ASSOC);

	$totalsql = "SELECT COUNT(*) total FROM no2 b,edit a where a.id=b.id and a.begin_time>$time and (b.info1 like '%$txt%' or b.info2 like '%$txt%' or b.info3 like '%$txt%')";

	$totalrel = $myconn->query($totalsql);

	if($row = $totalrel->fetch_assoc()){
		$total = $row["total"];
	}else{
		$total = "0";
	}

	$rel = array('list' => $data, 'total' => $total);
	echo json_encode($rel);
	$myconn->close();

 ?>