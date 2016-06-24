/**
 * Created by zenaro on 16-6-16.
 */
define(function(require) {
    var $ = require('jquery');

    var Dialog = require('./dialog');
    var d = new Dialog();
    d.render();

    var Player = require('./player');
    Player.render();

    var MList = require('./mlist');
    MList.render();

});