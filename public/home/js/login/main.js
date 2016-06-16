define ( function ( require ) {
	var $ = require('jquery');
	require('../common/cookie');
	var Login = require('./login');
	var sl = new Login();
	sl.render();
});




