<?php
	require './config.php';

	if (isset($_GET['uid']) && isset($_GET['mid'])) {
		
		$uid = $_GET['uid'];
		$mid = $_GET['mid'];
		$result = mysql_query("DELETE FROM app_umusic WHERE uid = '{$uid}' AND mid = '{$mid}'");

		if ( !!$result ) {
			echo "删除成功";
		}
	}


	
?>