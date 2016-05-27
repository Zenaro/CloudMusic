<?php
	
	require './config.php';

	$id = 4;
	if (isset($_POST['id'])) {
		$id = $_POST['id'];

		$query = "SELECT name, master, lyric FROM app_music WHERE id='{$id}'";

		$result = @mysql_query($query) or die("SQL语句有误".mysql_error());

		while (!!$row = mysql_fetch_array($result, MYSQL_ASSOC)) {
			echo $row['lyric'];
		}

	} else if (isset($_GET['id'])) {
		$id = $_GET['id'];

		$query = "SELECT name, master, src, id FROM app_music WHERE id='{$id}'";

		$result = @mysql_query($query) or die("SQL语句有误".mysql_error());

		$json = '';

		while (!!$row = mysql_fetch_array($result, MYSQL_ASSOC)) {
			foreach ( $row as $key => $value ) {
				$row[$key] = urlencode(str_replace("\n","", $value));
			}
			$json .= urldecode(json_encode($row)).',';
		}
		
		echo '['.substr($json, 0, strlen($json) - 1).']';

	}	else if (isset($_GET['src'])) {
        $src = $_GET['src'];

        $query = "SELECT name, master, src, id FROM app_music WHERE src='{$src}'";

        $result = @mysql_query($query) or die("SQL语句有误".mysql_error());

        $json = '';

        while (!!$row = mysql_fetch_array($result, MYSQL_ASSOC)) {
            foreach ( $row as $key => $value ) {
                $row[$key] = urlencode(str_replace("\n","", $value));
            }
            $json .= urldecode(json_encode($row)).',';
        }

        echo '['.substr($json, 0, strlen($json) - 1).']';

    } else if (isset($_GET['name'])) {
		$music = $_GET['name'];

		$query = "SELECT name, master, lyric FROM app_music WHERE name like '%" .$music. "%' LIMIT 1";

		$result = @mysql_query($query) or die("SQL语句有误".mysql_error());

		while (!!$row = mysql_fetch_array($result, MYSQL_ASSOC)) {
			echo $row['lyric'];
		}
	}

	mysql_close();
?>