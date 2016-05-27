define ( function ( require ) {

	require('./cookie');

	var $ = require('jquery');

	var Dialog = require('./dialog');
	var d = new Dialog();
	d.render();

	var My = require('./submy');
	var my = new My();
	my.render();

	var Music = require('./music');
	var m = new Music();
	m.render();

	var MList = require('./mlist');
	var l = new MList();
	l.render();

});