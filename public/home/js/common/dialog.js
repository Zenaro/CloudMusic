/*
* 	登录、注册框
*/
define( function ( require, exports, module ) {

	function Dialog() {
		this.input = '.header .top-tool .top-search input';			//搜索框
		this.result = '.header .top-tool .top-search ul.result';	//搜索结果
		this.resultLI = '.header .top-tool .top-search ul.result li';	//搜索结果
		this.login = '.header .top-tool .user-login';
		this.memb = '.header .top-tool .user-memb';
		this.user = '.header .top-tool .user-memb h4';
		this.slideDwn = '.header .top-tool .top-user ul.slide-down';
		this.logout = '.header .top-tool .top-user  ul.slide-down a.logout';
	}

	module.exports = Dialog;	

	Dialog.prototype.render = function() {
		this._init();
		this._bindUI();

	};

	Dialog.prototype._init = function() {
		var self = this;
		this.index = -1;
		if ( !!cookie('unique') && cookie('unique') != '' ) {
			$.post('../../phpCtrl/getUInfo.php', {id : cookie('unique')}, function(res) {
				$(self.memb).show();
				$(self.user).html(res);
			});
			$(this.login).hide();
			var a = $('.header ul.nav li a');
			a.eq(1).attr('href', '#/my');
			a.eq(2).attr('href', '#/my');

		} else {
			$(this.memb).hide();
			$(this.login).show();
		}

	};

	Dialog.prototype._bindUI = function() {
		var self = this,
			M = require('./music'),
			R = require('../result/result');

		$('body').on({

			keyup : function () {
					keycode = event.which;

				if ( keycode == 13 ) {
					window.location.href = './frame.html#/result?id=' +
						$(self.resultLI).eq(self.index).attr('data-id');
					R.init();
					M.it

				} else if ( keycode == 38 && $(self.resultLI).length > 0 ) {
					self.index < 1 ? ( self.index = $(self.resultLI).length - 1 ) : ( self.index-- );

					$(self.resultLI).children('a').removeClass('active');
					$(self.resultLI).eq(self.index).children('a').addClass('active');
					this.value = $(self.resultLI).eq(self.index).find('.result-name').html();

				} else if ( keycode ==40 && $(self.resultLI).length > 0 ) {
					self.index >  $(self.resultLI).length - 2 ? ( self.index = 0 ) : ( self.index++ );

					$(self.resultLI).children('a').removeClass('active');
					$(self.resultLI).eq(self.index).children('a').addClass('active');
					this.value = $(self.resultLI).eq(self.index).find('.result-name').html();

				} else if ( !!$.trim(this.value )) {
					$.post('../../phpCtrl/search.php', { content:$.trim(this.value) }, function (res) {
						var html = '';
						if ( res == 'false' ) {
							html = '搜索结果 -- 0条匹配';

						} else {
							var json = $.parseJSON(res);
							$.each(json, function (index, value) {
								html += '<li data-id="'+value.music_id+'"><a href="javascript:;"><div class="col result-master">'+value.singer_name+'</div><div class="col col-str">--</div><div class="col result-name">'+value.name+'</div></a></li>'
							});
						}
						$(self.result).empty();
						$(self.result).append(html);
					});
				}

				$(self.result).show();
			},
			blur : function () {
				$(self.result).hide();
			}

		}, this.input ).on('mousedown', this.resultLI, function () {
			window.location.href = './frame.html#/result?id=' +
				$(this).attr('data-id');
			R.init();

		}).on({

			mouseover : function () {
				$(self.slideDwn).show();
			},
			mouseleave : function () {
				$(self.slideDwn).hide();
			}
			
		}, this.memb ).on('click', this.logout, function () {
			removeCookie('unique');
			removeCookie('name');
			history.go(0);

		});

	};


});