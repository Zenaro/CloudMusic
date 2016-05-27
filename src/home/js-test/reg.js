define ( function ( require ) {
	
	require('./cookie');

	var $ = require('jquery');

	var Reg = require('./subreg');
	var R = new Reg();
	R.render();

	var Music = require('./music');
	var M = new Music();
	M.render();

});