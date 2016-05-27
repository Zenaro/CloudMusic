define(function(require) {

	var $ = require('jquery');

	require('./cookie');

	var Dialog = require('./dialog');
	var d = new Dialog();
	d.render();

	var Index = require('./index');
	var i = new Index();
	i.render();

	var Music = require('./music');
	var m = new Music();
	m.render();

	var MList = require('./mlist');
	var l = new MList();
	l.render();

});




