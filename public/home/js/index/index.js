/*
*
*/
define( function( require, exports, module ) {

	function Index() {
		this.btnDwn = '.btns .btn-down';		//宣传栏左侧的下载按钮
		this.btnSm = '.btns .sm';				//宣传栏左侧的其他按钮
		this.slides = '.section';				//滚动框
		this.sliUL = '.section ul.slides';		//滚动框 图片
		this.sliDots = '.section ul.sub-dots li';//滚动图小按钮
		this.SIZE;							//滚动图片宽度
		this.LENGTH;						//滚动图片数量
		this._timer;						//滚动定时器
		this.btnNews = '.aside ul.aside-tab li';	//宣传栏右侧的导航

		this.rank = '.rank dl';
		this.rankALLPlay = '.rank dl dt .dt-txt a.icon-play';	//飙升榜

		this.rankLI = '.rank dl dd';							//排行榜li
		this.rankLIPlay = '.rank dl dd .dd-oper a.icon-play';	//排行榜li的播放按钮
		this.rankLIAdd = '.rank dl dd .dd-oper a.icon-add';		//排行榜li的添加按钮
	}

	module.exports = Index;

	Index.prototype.render = function() {
		this._init();
		this._load();
		this._bind();
	};

	Index.prototype._init = function() {

		this.SIZE = $(this.sliUL).find('img').width();
		this.LENGTH = $(this.sliUL).find('img').length;

		$(this.sliUL).css('width', this.SIZE*this.LENGTH + 'px');

		this._fnTimer(0);

	};

	Index.prototype.canvas = function () {
		// this.index++;
		// var r = Math.floor(Math.random() * (254)),
		// 	g = Math.floor(Math.random() * (254)),
		// 	b = Math.floor(Math.random() * (254)),
		// 	x = Math.floor(Math.random() * (200)),
		// 	y = Math.floor(Math.random() * (300)),
		// 	color = "rgba("+r+", "+g+", "+b+", 0.5)",
		// 	radius = 20,
		// 	name = 'bubble' + this.index;
		// $('canvas').drawArc({
		// 	layer: true,
		// 	name: name,
		// 	fillStyle: color,
		// 	x: x, y: y,
		// 	radius: radius
		// }).animateLayer(name, {
		// 	radius: 100, opacity: 0
		// }, 1500);
	};

	Index.prototype._fnTimer = function(i) {

		var index = i || 0;
		var self = this;	
		var SIZE = this.SIZE;
		var LENGTH = this.LENGTH;
		
		this._timer && clearInterval(this._timer);

		ahead();
		
		this._timer = setInterval(ahead, 7000);

		function ahead() {
			var gcolor = $(self.sliUL).children('li').eq(index).attr('data-bg');
			$(self.sliUL).children('li').hide().eq(index).fadeIn(1000);
			$('.wrap .main-top').css('background', gcolor);
			$( self.sliDots ).removeClass('active').eq( index ).addClass('active');
			index = (++index >= LENGTH ? 0 : index);
		}
	};
	
	Index.prototype._load = function() {
		var self = this;
		// 初始化三个排行榜
		rank(0);rank(1);rank(2);
		function rank(i) {
			var json = require('../data/list');
			var html = '';
			$.each(json, function (index, value) {
				html += '<dd data-id="' + value.id + '">' +
					'<span>' + (index+1) + '</span>' +
					'<a href="javascript:;">'+value.name+'</a>' +
					'<div class="dd-oper">' +
					'<a href="javascript:;" class="icon-play"></a>' +
					'<a href="javascript:;" class="icon-add"></a>' +
					'<a href="javascript:;" class="icon-store"></a>' +
					'</div>' +
					'</dd>';
			});
			html += '<div class="dd"><a href="javascript:;" class="dd-more">查看更多&gt;</a></div>';
			$(self.rank).eq(i).append(html);
			$(self.rank).eq(i).children('dd:even').css('background','#e8e8e8');
		}
	};

	Index.prototype._bind = function() {
		var self = this,
			Player = require('../common/player'),
			MList = require('../common/mlist');

		$('.wrap .main-top').on('click', this.sliDots, function() {
			self._fnTimer($(this).index());

		}).on('click', this.btnNews, function() {
			$(self.btnNews).children('a').attr('class', '');
			$(self.btnNews).eq($(this).index()).children('a').addClass('active');
		});

		$('.wrap .main-rank').on('click', this.rankALLPlay, function (event) {
			var arr = [],	// 造一个歌曲的id数组
				id = 0,
				e = event || window.event,
				objList = $(this).parents('dl').children('dd');
			e.stopPropagation();
			for (var i = 0; i < objList.length; i++) {
				id = $(objList).eq(i).attr('data-id');
				arr.push(id);
			}
			Player.appendEle(arr);	// append一个数组
			Player.init(arr[0]);
			MList.update({add: 300});

		}).on({
			mouseover : function() {
				$(this).children('a').first().attr('class', 'title');
				$(this).children('div.dd-oper').show();
			},
			mouseleave : function() {
				$(this).children('a').first().removeClass('title');
				$(this).children('div.dd-oper').hide();
			}

		}, this.rankLI ).on('click', this.rankLIPlay, function() {
			var addID = $(this).parents('dd').attr('data-id');
			Player.appendEle(addID);
			Player.init(addID);
			MList.update();

		}).on('click', this.rankLIAdd, function() {
			var addID = $(this).parents('dd').attr('data-id');
			Player.appendEle(addID);
			MList.update();
		});
	};
});