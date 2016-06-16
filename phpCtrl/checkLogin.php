<?php
	
	require './config.php';

	$_email = $_POST['user'];
	$_pwd = md5($_POST['pwd']);

	$query = mysql_query("SELECT email, pwd, id, root FROM app_User WHERE email='{$_email}' AND pwd='{$_pwd}'")
			
			or die('SQL错误!'.mysql_error());

	if (!!$rows = mysql_fetch_array($query, MYSQL_ASSOC)) {
		echo $rows['id'];
	} else {
	    echo "false";
	}

	mysql_close();
?>