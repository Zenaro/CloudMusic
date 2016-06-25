/**
 * Created by zenaro on 16-6-25.
 */
define(function (require, exports, module) {
    function Bubble() {
        this.canvas = $('canvas');
        this.x = Math.floor(Math.random() * (245));
        this.y = 335;
        this.radius = Math.floor(Math.random() * (20)) + 10;
        this.timer = null;
    }
    module.exports = Bubble;

    Bubble.prototype.render = function () {
        this.createEle();
        this.move();
    };

    Bubble.prototype.createEle = function () {      /* 创建泡泡 */
        var r = Math.floor(Math.random() * (254)),
            g = Math.floor(Math.random() * (254)),
            b = Math.floor(Math.random() * (254)),
            color = "rgba("+r+", "+g+", "+b+", 0.5)";

        var self = this;
        this.canvas.drawArc({
            layer: true,
            name: 'bubble',
            fillStyle: color,
            x: self.x, y: self.y,
            radius: self.radius
        });
    };

    Bubble.prototype.move = function () {   /*  泡泡移动  */
        var self = this;
        // 速度
        var s = 50,
            dirX,
            dirY;
        step();
        function step() {
            if (self.x < -30 || self.x > 280 || self.y < -30) {
                return;
            }
            dirY = Math.floor(Math.random() * (s - 5)) + 5;
            dirX = Math.floor(Math.sqrt(s * s - dirY * dirY));
            if (Math.random() > 0.5) {dirX = -dirX;}
            self.x = self.x - dirX;
            self.y = self.y - dirY;
            self.canvas.animateLayer('bubble', {
                radius: self.radius++,
                x: self.x, y: self.y
            }, 800, step);
        }
    };

});