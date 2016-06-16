define ( function ( require ) {

	require('../common/cookie');

	var $ = require('jquery');

	var My = require('./my');
	var my = new My();
	my.render();

});