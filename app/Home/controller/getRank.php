<?php

	require './config.php';

	if (isset($_POST['data'])) {

		switch ($_POST['data'] ){
			case 0 : $type = 'up';
						break;
			case 1 :  $type = 'new';
						break;
			// case 2 : $type = 'create';
			case 2 : $type = 'up';
						break;
			default : $type = 'up';
		}

		$query = "SELECT name, id FROM app_music WHERE type='{$type}' ORDER BY listeners DESC LIMIT 10";

		$result = @mysql_query($query) or die("SQL语句有误".mysql_error());

		$json = '';

		while (!!$row = mysql_fetch_array($result, MYSQL_ASSOC)) {
			foreach ( $row as $key => $value ) {
				$row[$key] = urlencode(str_replace("\n","", $value));
			}
			$json .= urldecode(json_encode($row)).',';
		}

		echo '['.substr($json, 0, strlen($json) - 1).']';

		mysql_close();
	}

	
?>