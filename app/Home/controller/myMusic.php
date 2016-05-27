<?php

	require './config.php';

	if (isset($_POST['uid'])) {
		
		$query = mysql_query("SELECT 

			(SELECT name FROM app_music WHERE id = a.mid) AS name,
			(SELECT master FROM app_music WHERE id = a.mid) AS master,
			a.mid, 
			a.uid, 
			a.colDate 

		FROM app_umusic a WHERE uid = '{$_POST['uid']}' ORDER BY a.colDate DESC") or die('MySQL错误'.mysql_error());

		$json = '';

		while( !!$row = mysql_fetch_array($query, MYSQL_ASSOC)) {

			foreach ($row as $key => $value) {
				$row[$key] = urlencode(str_replace("\n", "", $value));
			}
			$json .= urldecode(json_encode($row)).',';
		}

		echo '['.substr($json, 0, strlen($json)-1).']';

		mysql_close();

	}

	

?>