define ( function ( require ) {

	var $ = require('jquery');

	require('./cookie');

	var Login = require('./sublogin');
	var sl = new Login();
	sl.render();

	var Music = require('./music');
	var m = new Music();
	m.render();

	var MList = require('./mlist');
	var l = new MList();
	l.render();

});




