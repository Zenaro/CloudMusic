/*		播放列表
*	
*/	
define( function ( require, exports, module ) {

	module.exports = {
		btnScl: '.table .scrol .icon-scl',		// 下拉条
		objList: '.tab-content ul.mtab',	// ul对象
		listHeight: 30,								// li的默认高度

		/* 渲染方法 */
		render: function () {
			this._bindUI();
			this._scroll();
		},

		/* 当添加或删除li时, 更新下拉条的长度, 位置, 以及调整ul的top参数, 对外公开*/
		update: function (temp) {	// temp = {remove: 300} || {add: 200},200为预计增加的ul高度
			var self = this,
				objLI = $('.table ul.mtab li'),
				txtEmpty = $('.table-content .empty'),
				client = parseInt($(this.objList).css('top')),
				hg = this.listHeight * objLI.length,
				subHg = $( self.objList ).parent('div').height();
			if ( !!temp && !!temp.remove ) {
				client = client < - this.listHeight ? client + this.listHeight : 0;

			} else if ( !!temp && !!temp.add ) {				// 待定
				hg += temp.add;
			}

			if (hg >= subHg) {
				var p = parseInt( subHg / hg * 1000) / 10;
				$(self.btnScl).css('height', p + '%');
				$(self.btnScl).parent('.scrol').show();

			} else {
				$(self.btnScl).parent('.scrol').hide();
			}

			var per = parseInt( - client / $(this.objList).height() * 1000) / 10;
			$(this.objList).css('top', client + 'px');
			$(this.btnScl).css('top', per + '%');
			$('.play-ctrl .music-list a').html(objLI.length);
			if ($(objLI).length > 0) {
				$(txtEmpty).hide();

			}else {
				$(txtEmpty).show();
			}
		},

		/*鼠标事件*/
		_bindUI: function () {
			var self = this,
				allowMove = false,
				off = 0;
			$('.audio-player').on('mousedown', '.table', function () {
				return false;

			}).on('click', '.table .tab-title .icon-empty', function() {
				if ($('.table ul.mtab li').length > 0) {
					$(self.objList).empty();
					self.update();
				}

			}).on( 'click', '.table .tab-title .icon-close', function() {
				$('.table').hide();

			}).on({
				mouseover : function() {
					$(this).find('.col').first().addClass('txtOF');
					$(this).find('.col-2 a').show();
				},
				mouseleave : function() {
					$(this).find('.col').first().removeClass('txtOF');
					$(this).find('.col-2 a').hide();
				},
				dblclick : function() {
					$.get('../../phpCtrl/getMInfo.php?id=' + $(this).attr('data-id'), function(res) {
						var json = $.parseJSON(res)[0],
							M = require('./player');
						M.init(json.music_id);
					});
				}

			}, '.table ul.mtab li' ).on('click', 'ul.mtab li a.icn-del', function() {
				$(this).parents('li').remove();
				self.update({remove: 30});

			}).on({
				mousemove: function() {
					var _p,
						_dis,
						_parent = $( self.btnScl ).parent( 'div' ),
						MAX_TOP = $( _parent ).innerHeight() - $( self.btnScl ).innerHeight();

					if ( allowMove ) {
						_dis = event.pageY - $( _parent ).offset().top - off;

						if ( _dis < 0 ) {
							_dis = 0;

						}else if ( _dis > MAX_TOP ) {
							_dis = MAX_TOP;
						}
						$( self.btnScl ).css( 'top', _dis + 'px' );			//滚动按钮移动
						_p = parseInt( _dis / $( _parent ).innerHeight() * $(self.objList).height() ) ;
						$( self.objList ).css( 'top', -_p+'px' );			//页面滚动
					}
				},
				mouseup: function() {
					if ( allowMove ) {
						allowMove = false;
					}
				},
				mouseover: function() {
					self.tout && clearTimeout( self.tout );
				},
				mouseleave: function() {
					self.tout && clearTimeout( self.tout );
					self.tout = setTimeout( function() {
						allowMove = false;
					},200 );
				}

			}, '.table').on('mousedown', this.btnScl, function() {
				allowMove = true;
				event.preventDefault();
				off = event.pageY - $( this ).offset().top;
			});
		},

		/* 滚轮 */
		_scroll: function () {
			var delta = 0,			//偏移量
				isWheel,			//计算溢出
				_per = 0,			//下拉条 位移
				_ceil = 30;			//位移单位
			if ( document.addEventListener ) {	/*注册事件*/
				document.addEventListener( "DOMMouseScroll", fnWheel, false );//W3C
			}
			document.getElementById('tab-content').onmousewheel = fnWheel;

			/*执行函数*/
			function fnWheel(e) {
				/* 火狐的this指代不明 问题 */
				var _objList = '.table ul.mtab';
				var _btnScl = '.table .scrol .icon-scl';
				delta = -parseInt($(_objList).css('top')) || 0;
				isWheel = $(_objList).innerHeight() - $(_objList).parent('div').innerHeight();
				if ( wheel(e) === 1 && delta >= 0) {			//向上 && 允许
					delta = delta - _ceil;
					if ( delta < 0 ) {
						delta = 0;
					}
					$(_objList).css('top', -delta + 'px');
					_per = parseInt( delta / $(_objList).height() * 1000) / 10;
					$(_btnScl).css('top', _per + '%');

				} else if ( wheel(e) === -1 && isWheel > 0) {	//向下 && 允许
					delta = delta + _ceil;
					if ( delta >= isWheel ) {
						delta = isWheel;
					}
					$(_objList).css('top', -delta + 'px');
					_per = parseInt( delta / $(_objList).height() * 1000) / 10;
					$(_btnScl).css('top', _per + '%');
				}
			}
		}
	};

	//helpers

	//滚轮事件
	function wheel( e ) {
		var delta = 0;
		EVT = e || window.event;

		if ( EVT.wheelDelta ) {		/*IE Opera*/
			delta = EVT.wheelDelta / 120;

		} else if ( EVT.detail ) {	/*FireFox*/
			delta = -EVT.detail / 3;
		}

		/* 禁用滚轮 */
		if ( EVT.preventDefault ) {
			EVT.preventDefault();
		}
		EVT.returnValue = false;

		if ( delta > 0 ) {
			return 1;		// do something

		} else if ( delta < 0) {
			return -1;		// do another thing
		}
	}
});