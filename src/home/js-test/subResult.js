define( function ( require, exports, module ) {

	function Result () {
		this.super = '.main';
		this.name = '.main .main-title h3';
		this.master = '.main .main-title span';
		this.lyric = '.main pre';
		this.toggle = '.main a.toggle';

		this.htmlName = '#play-ing .ptitle a.title';		//html 曲名
		this.htmlSinger = '#play-ing .ptitle a.singer';		//html 歌手
	}

	module.exports = Result;

	Result.prototype.render = function(){
		this._init();
		this._bind();
	}

	Result.prototype._init = function() {
		var self = this;

		var url = location.href;

		if ( url.indexOf("?") != -1) {
			var subStr1 = url.indexOf("?"),
				data = url.substring( subStr1,  url.length );

			$.get('../controller/search.php' + data, function ( result ) {	//get歌曲信息
            
            	var json = $.parseJSON(result);

            	$.each(json, function ( index, value ) {
            		$(self.name).html(value.name);
            		$(self.master).html(value.master);

            		$(self.htmlName).html(value.name);
            		$(self.htmlSinger).html(value.master);

            		$( '.fix-bottom audio' )[0].src = value.src;
            		// var Index = require('./index');
            		// var i = new Index();
            		// i._appendMusic(value.id);
            	});
				
			});

			$.get('../controller/getMInfo.php' + data, function ( result ) {	//get歌词
				var html = '<pre class="section txtOF">' + result + '</pre>';

				html += '<a href="javascript:;" class="toggle">展开</a>';
				
				$(self.super).append(html);
				console.log(parseLyric(result));
			});
		}
		
	}

	Result.prototype._bind = function() {
		var self = this;
		$('body').on('click', this.toggle, function() {

			if ($(self.lyric).hasClass('txtOF')) {

				$(this).html('收起');
				$(self.lyric).removeClass('txtOF');

			} else {
				$(self.lyric).addClass('txtOF');
				$(this).html('展开');
			}

		});

		$('audio').on('timeupdate', function() {
			console.log('ew');
		});
	}

	// helpers

	function parseLyric(text) {
	    //将文本分隔成一行一行，存入数组
	    var lines = text.split('\n'),
	        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
	        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
	        //保存最终结果的数组
	        result = [];
	    //去掉不含时间的行
	    while (!pattern.test(lines[0])) {
	        lines = lines.slice(1);
	    };
	    //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
	    lines[lines.length - 1].length === 0 && lines.pop();
	    lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
	        //提取出时间[xx:xx.xx]
	        var time = v.match(pattern),
	            //提取歌词
	            value = v.replace(pattern, '');
	        //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
	        time.forEach(function(v1, i1, a1) {
	            //去掉时间里的中括号得到xx:xx.xx
	            var t = v1.slice(1, -1).split(':');
	            //将结果压入最终数组
	            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
	        });
	    });
	    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
	    result.sort(function(a, b) {
	        return a[0] - b[0];
	    });
	    return result;
	}
});