/**
 * Created by zenaro on 16-6-16.
 */
define(function(require) {
    var $ = require('jquery');
    require('./cookie');

    var Dialog = require('./dialog');
    var d = new Dialog();
    d.render();

    var Music = require('./music');
    Music.render();

    var MList = require('./mlist');
    MList.render();

});