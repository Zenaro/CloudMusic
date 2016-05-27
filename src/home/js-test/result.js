define(function ( require ) {

	require('./cookie');

	var $ = require('jquery');

	var Dialog = require('./dialog');
	var d = new Dialog();
	d.render();

	var Result = require('./subResult');
	var r = new Result();
	r.render();

	var Music = require('./music');
	var m = new Music();
	m.render();

	var MList = require('./mlist');
	var l = new MList();
	l.render();
});