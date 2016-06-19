/**
 * Created by zenaro on 16-4-2.
 */
define(function (require, exports, module) {

    module.exports = {
        global: null,       // 祖先元素
        audio: null,        // audio对象
        loopType: 2,        // 1->单曲循环， 2->列表循环  3->随机播放    循环类型
        json: null,

        /* -------  public -------- */
        // 构建插件
        render: function () {
            var self = this;
            this.global = $('.fix-bottom'); // 初始化global播放器全局对象
            this.audio = $('audio')[0];
            this.audio.volume = $('.play-ctrl .cbar .cur').height() / 100 ;
            this._bind();                   // 启动事件监听器
            $.get('../../phpCtrl/getMusic.php', function(res) {
                self.json = $.parseJSON(res);
            });
        },

        // init方法，同时对外提供
        init: function (dataID) {
            var self = this,
                json = null;

            // 置0
            $('.play-ing .pbar .cur .cur-inner').width(0);
            $('.play-ing .pbar .clock i').text('00:00');
            $('.play-head a').attr('href', '#/result?id=' + dataID);
            $('.play-ing .ptitle a').attr('href', '#/result?id=' + dataID);
            $(self.audio).attr('data-id', dataID);

            $.get('../../phpCtrl/getMInfo.php?id=' + dataID, function (res) {
                json = $.parseJSON(res)[0];
                $('.play-ing .ptitle a.title').html(json.name);
                $('.play-ing .ptitle a.singer').html(json.singer_name);
                self.audio.src = json.src;
                self.audio.play();
                $('.fix-bottom').trigger("mouseover");
            });
        },

        // append添加歌曲进歌单方法，同时对外公开
        appendEle: function (add) {
            var info = null,
                num = 0,
                objUl = $('.play-form ul.mtab'),
                html = '';
            if (add instanceof Array) {           // Array类型
                $.get('../../phpCtrl/getMInfo.php?arr=' + add, function (res) {
                    info = $.parseJSON(res);
                    $.each(info, function (index, value) {
                        html += ceilPlus(value);        // 见下方ceilPlus方法
                    });
                    objUl.append(html).siblings('.empty').hide();
                    num = $(objUl).children('li').length;
                    $('.play-ctrl a.icon-list').text(num);
                });

            } else if (Number(add) == add) {    // number类型
                $.get('../../phpCtrl/getMInfo.php?id=' + add, function (res) {
                    info = $.parseJSON(res)[0];
                    html += ceilPlus(info);
                    objUl.append(html).siblings('.empty').hide();
                    num = $(objUl).children('li').length;
                    $('.play-ctrl a.icon-list').text(num);
                });
            } else {
                console.log('参数不匹配');
            }

            // ceilPlus 方法
            function ceilPlus(value) {
                var existID = 0,
                    dom = '',
                    objLI = $('.play-form ul.mtab').children('li');

                for (var i = $(objLI).length - 1; i >= -1; i--) {
                    existID = $(objLI).eq(i).attr('data-id');
                    if (value.music_id == existID) {	// 判断是否重复添加
                        break;

                    } else if (i <= 0) {
                        dom = '<li data-id="' + value.music_id + '">' +
                            '<div class="abs-stus"><span class="icn-stus"></span></div>' +
                            '<div class="col col-1">' + value.name + '</div>' +
                            '<div class="col col-2">' +
                            '<a href="javascript:;" class="icn-col" title="收藏"></a>' +
                            '<a href="'+value.src+'" download="'+value.name+'-'+value.singer_name+'.mp3" class="icn-dwn" title="下载"></a>' +
                            '<a href="javascript:;" class="icn-del" title="删除"></a>' +
                            '</div>' +
                            '<div class="col col-3">' + value.singer_name + '</div>' +
                            '<div class="col col-4">' + parseTime(value.duration) + '</div>' +
                            '</li>';
                        break;
                    }
                }
                return dom;
            }
        },
        /*  ---------- private -------- */
        _bind: function () {
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

            }).on('click', '.play-btns a#data-ps', function() { //暂停/播放
                if(self.audio.src === '') {
                    self.prvTrack = self.curTrack = 0;
                    self.audio.src = self.json[0].src;
                    self.audio.play();

                } else {
                    self.audio.paused ? self.audio.play() : self.audio.pause();
                }

            }).on('click', '.play-btns a.prv', function() {
                var i = 0,
                    objList = $('.form-tab ul li'),
                    length = objList.length;

                for (; i < length; i++) {
                    if ($('.form-tab ul li .abs-stus').eq(i).css('display') === 'block') {
                        break;
                    }
                }
                if (i === 0) {
                    i = length - 1;
                } else {
                    i--;
                }
                self.loopType === 3 && (i = ~~ (Math.random() * length)); // 若需要随机播放
                self.init(objList.eq(i).attr('data-id'));

            }).on('click', '.play-btns a.nxt', function() {
                var i = 0,
                    objList = $('.form-tab ul li'),
                    length = objList.length;
                for (; i < length; i++) {
                    if ($('.form-tab ul li .abs-stus').eq(i).css('display') === 'block') {
                        i++;
                        break;
                    }
                }
                self.loopType === 3 && (i = ~~ (Math.random() * length)); // 若需要随机播放
                if (i >= length) i = 0;
                self.init(objList.eq(i).attr('data-id'));

            }).on('click', '.play-oper a.icon-colle', function () {

                if ( !cookie('unique') || cookie('unique') == '' ) {
                    alert('您尚未登录');

                } else {
                    var mid = $('audio').attr('data-id');
                    if (!!mid) {
                        $.get('../../phpCtrl/colMusic.php',
                            {uid : cookie('unique'), mid : mid},
                            function (res) {
                                alert(res);
                        });
                    }
                }

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
                        $(this).siblings('.lp-tip').html('单曲循环').show();
                        self.loopType = 1;
                        self.audio.loop = true;

                    } else if(originType === 2) {
                        $(this).attr('class', 'icon-shuffle');
                        $(this).siblings('.lp-tip').html('随机播放').show();
                        self.loopType = 3;
                        self.audio.loop = false;

                    } else {
                        $(this).attr('class', 'icon-loop');
                        $(this).siblings('.lp-tip').html('列表循环').show();
                        self.loopType = 2;
                        self.audio.loop = false;
                    }
                },
                mouseleave: function() {
                    $(this).siblings('.lp-tip').hide();
                }

            }, '.play-ctrl a#data-lop').on('click', '.play-ctrl span.music-list', function() {
                $('.play-form').toggle();
            });

            // ----- audio多媒体事件委托
            $(this.audio).on('loadstart', function() {     // 正在加载 loading
                $('.play-ing .pbar .cur span.btn-cur i').css('visibility', 'visible');

                /* .abs-stus的重定向 */
                var dataID = $(self.audio).attr('data-id'),
                    List = $('.form-tab ul.mtab li');
                for (var i = 0, length = $(List).length; i < length; i++) {
                    if ($(List).eq(i).attr('data-id') == dataID) {
                        $(List).children('.abs-stus').hide();
                        $(List).eq(i).children('.abs-stus').show();
                        break;
                    }
                }

            }).on('canplay', function() {
                $('.play-ing .pbar .cur span.btn-cur i').css('visibility', 'hidden');

            }).on('pause', function() {
                $('.play-btns #data-ps').removeClass('pas').addClass('ply');

            }).on('play', function() {
                $('.play-btns #data-ps').removeClass('ply').addClass('pas');

            }).on('timeupdate', function() {
                var percent = ~~(self.audio.currentTime / self.audio.duration * 1000) / 10;
                $('.play-ing .pbar .cur .cur-inner').width(percent + '%');
                $('.play-ing .pbar .clock i').html(parseTime(self.audio.currentTime));

            }).on('durationchange', function() {
                $('.play-ing .clock em').html(parseTime(self.audio.duration));  //更新时间

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
                    var i = 0,
                        objList = $('.form-tab ul li'),
                        length = objList.length;
                    for (; i < length; i++) {
                        if ($('.form-tab ul li .abs-stus').eq(i).css('display') === 'block') {
                            i++;
                            break;
                        }
                    }
                    self.loopType === 3 && (i = ~~ (Math.random() * length)); // 若需要随机播放
                    if (i >= length) i = 0;
                    self.init(objList.eq(i).attr('data-id'));
                }

            }).on('seeking', function() {
                console.log('seeking');

            }).on('stalled', function() {
                //alert('网络中断');
            });
        }
    };

    // helpers
    function parseTime(time) { //数字 转 时间
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