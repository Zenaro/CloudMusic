/**
 * Created by zenaro on 16-4-2.
 */
define(function (require, exports, module) {

    function Player(json) {
        this.global = $('.fix-bottom');;     // 祖先元素
        this.audio = null;              // audio对象
        this.loopType = 2;          // 1->单曲循环， 2->列表循环  3->随机播放    循环类型
        this.json = json;

        this.curTrack = null;           // 当前歌曲的json数据
        this.prvTrack = null;           // 上一条曲目的json
        this.nxtTrack = null;           // 下一条曲目的json

    }

    module.exports = Player;

    /* -------  public -------- */
    // 构建 Player 插件
    Player.prototype.render = function() {
        var $ = require('jquery');      // 引入jquery依赖
        // this.global = $('.fix-bottom'); // 初始化global播放器全局对象
        this._bind();                   // 启动事件监听器
    };

    // ------- private -------

    Player.prototype.init = function (data_id) {   // data.src, data.name, data.master
        $('.play-ing .pbar .cur .cur-inner').width(0);
        $('.play-ing .ptitle a.title').html(this.json[data_id].name);
        $('.play-ing .ptitle a.singer').html(this.json[data_id].master);
        $(this.audio).attr('data-id', data_id);
        this.audio.src = this.json[data_id].src;
        this.audio.play();
    };


    /*  ---------- private -------- */

    // 事件绑定
    Player.prototype._bind = function() {

        var self = this,
            isLock = false,
            timeout = null;

        // ----- DOM 委托
        $( 'body' ).on('click', function() {
            $('.play-ctrl .cbar').hide();

        }).on({
            mouseover: function() {
                if (!isLock) {
                    timeout && clearTimeout(timeout);
                    timeout = setTimeout(function() {
                        $('.fix-play').show(200);
                    },100);
                    
                }
            },
            mouseleave: function() {
                if (!isLock) {
                    timeout && clearTimeout(timeout);
                    timeout = setTimeout(function() {
                        $('.fix-play').hide(500);
                        $('.play-form').css('display', 'none');
                    }, 800);
                }
            }
        }, '.fix-bottom');

        $(this.global).on('click', '.fix-lock a', function() {

            if ( !isLock ) {
                $(this).attr('class', 'lock');
                isLock = true;

            } else {
                $(this).attr('class', 'unlock');
                isLock = false;
            }

        }).on('click', '.play-btns a.play', function() {

            if(self.audio.src === '') {
                self.prvTrack = self.curTrack = 0;
                self.init(self.curTrack);

            } else {
                self.audio.paused ? self.audio.play() : self.audio.pause();
            }

        }).on('click', '.play-btns a.prv', function() {

            self.prvTrack !== null && self.init(self.prvTrack);

        }).on('click', '.play-btns a.nxt', function() {

            if (self.nxtTrack !== null) {   // 若有下一曲的记录 (如之前点击过上一曲)
                self.init(self.nxtTrack);
                console.log('next');
            } else {
                var i = ~~($(self.audio).attr('data-id')) + 1;
                (i >= self.json.length) ? i = 0 : null;

                self.loopType === 3 && (i = ~~ (Math.random() * self.json.length)); // 若需要随机播放

                self.prvTrack = self.curTrack;
                self.curTrack = i;
                self.init(self.curTrack);
            }
            self.nxtTrack = null;

        }).on('click', '.play-ing .pbar .barbg', function(event) {

            var percent = event.offsetX / $(this).width();
            self.audio.currentTime = percent * self.audio.duration;

        }).on('click', '.play-ctrl a.icon-vol', function(event) {

            event.stopPropagation();
            $('.play-ctrl .cbar').toggle();
            $('.play-ctrl .cbar .cur').height(self.audio.volume * 100 + '%');

        }).on('click', '.play-ctrl .cbar', function(event) {
            var adjust = 1 - (event.pageY - $(this).offset().top) / $(this).height();
            if (adjust > 1) adjust = 1;
            else if(adjust < 0) adjust = 0;
            self.audio.volume =adjust;
            event.stopPropagation();

        }).on({
            click: function() {
                var originType = self.loopType;

                if (originType === 3) {
                    $(this).attr('class', 'icon-one');
                    $(this).siblings('.lop-hint').html('单曲循环').show();
                    self.loopType = 1;
                    self.audio.loop = true;

                } else if(originType === 2) {
                    $(this).attr('class', 'icon-shuffle');
                    $(this).siblings('.lop-hint').html('随机播放').show();
                    self.loopType = 3;
                    self.audio.loop = false;

                } else {
                    $(this).attr('class', 'icon-loop');
                    $(this).siblings('.lop-hint').html('列表循环').show();
                    self.loopType = 2;
                    self.audio.loop = false;
                }

            },

            mouseleave: function() {
                $(this).siblings('.lop-hint').hide();
            }

        }, '.play-ctrl a#icn-lop');


        // ----- audio多媒体事件委托
        $(this.audio).on('canplay', function() {

            $('.play-ing .pbar .cur span.btn-cur i').hide();

        }).on('play', function() {

            $('.play-btns .play').removeClass('play-ply').addClass('play-pas');

        }).on('timeupdate', function() {
            var percent = ~~(self.audio.currentTime / self.audio.duration * 1000) / 10;
            $('.play-ing .pbar .cur .cur-inner').width(percent + '%');
            $('.play-ing .pbar .clock i').html(parseTime(self.audio.currentTime));

        }).on('pause', function() {

            $('.play-btns .play').removeClass('play-pas').addClass('play-ply');

        }).on('durationchange', function() {

            $('.play-ing .clock em').html(parseTime(self.audio.duration));  //更新时间

        }).on('loadstart', function() {     // 正在加载 loading

            $('.play-ing .pbar .cur span.btn-cur i').show();

        }).on('progress', function() {      // 正在缓冲--灰色缓冲条

            var percent = 0,
                index = self.audio.buffered.length;

            if(index > 0) {         // index大于0即可调用 buffered.end
                percent = ~~(self.audio.buffered.end(index-1) / self.audio.duration * 1000) / 10;
                $('.play-ing .pbar .rdy').width(percent + '%');
            }

        }).on('volumechange', function() {

            $('.play-ctrl .cbar .cur').height(~~(self.audio.volume * 1000) / 10 + '%');

        }).on('ended', function() {

            if (self.audio.loop === false) {
                var i = ~~ (Math.random() * self.json.length);
                self.prvTrack = self.curTrack;
                self.curTrack = i;
                self.nxtTrack = null;
                self.init(self.curTrack);
            }

        }).on('seeking', function() {
            console.log('seeking');
        });
    };


    // helpers

    //数字 转 时间
    function parseTime(time) {
        var min = ~~(time / 60);
        var sec = ~~(time % 60);
        if (min < 10) {
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        return min + ':' + sec;
    }

});