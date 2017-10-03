<?php

	

	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PWD', '');
	define('DB_DATABASE', 'index');


	$myconn = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_DATABASE);

	if(!$myconn){
		echo '数据库连接失败' .mysqli_connect_error();
		exit();
	}
	$myconn->set_charset("utf8");
?>