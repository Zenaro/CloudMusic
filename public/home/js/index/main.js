define(function(require) {
	var $ = require('jquery');
	require('jcanvas');
	var Index = require('./index');
	var i = new Index();
	i.render();

	var Bubble = require('./bubble');
	var B = new Bubble();
	B.render();
});




