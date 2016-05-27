<?php
	require './config.php';

	if ( isset($_POST['content']) ) {

		$music = $_POST['content'];

		$sql = mysql_query("SELECT name, id, master FROM app_music where (name like '%" .$music. "%') or (master like '%" .$music. "%') ORDER BY name, master DESC LIMIT 10");

		$json = '';

		while ( !!$row = mysql_fetch_array($sql, MYSQL_ASSOC) ) {
			
			foreach ($row as $key => $value) {
				$row[$key] = urlencode(str_replace("\n", "", $value));
			}
			$json .= urldecode(json_encode($row)).',';

		}

		if ( strlen($json) == 0) {
			echo 'false';

		} else {
			echo '['.substr( $json, 0,  strlen($json)-1 ).']';

		}

		mysql_close();

	} else if (isset($_GET['name'])) {

		$music = $_GET['name'];

		$sql = mysql_query("SELECT name, id, master, src FROM app_music where name like '%" .$music. "%' LIMIT 1");

		$json = '';

		while ( !!$row = mysql_fetch_array($sql, MYSQL_ASSOC) ) {
			
			foreach ($row as $key => $value) {
				$row[$key] = urlencode(str_replace("\n", "", $value));
			}
			$json .= urldecode(json_encode($row)).',';

		}

		if ( strlen($json) == 0) {
			echo 'false';

		} else {
			echo '['.substr( $json, 0,  strlen($json)-1 ).']';

		}
	}

?>