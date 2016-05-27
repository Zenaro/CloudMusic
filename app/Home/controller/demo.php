<?php
	sleep(3);
	require 'config.php';

	$query = mysql_query("SELECT (SELECT COUNT(*) FROM comment WHERE titleid=a.id) AS count, a.id, a.title, a.content, a.user, a.date FROM question a ORDER BY a.date DESC LIMIT 0, 10") or die("连接数据库失败".mysql_error());

	$json = '';

	while (!!$row = mysql_fetch_array($query, MYSQL_ASSOC)) {
		foreach ($row as $key => $value) {
			$row[$key] = urlencode(str_replace("\n", "", $value));
		}
		$json .= urldecode(json_encode($row)).',';
	}

	echo '['.substr($json, 0, strlen($json)-1).']';

	mysql_close();
?>