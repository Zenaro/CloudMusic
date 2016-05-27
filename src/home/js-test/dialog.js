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

		if ( document.cookie ) {

			$.post('../controller/getUInfo.php', {id : cookie('unique')}, function( data, status ) {
				$(self.memb).show();
				$(self.user).html(data);
				// cookie('name', data);
			});

			$(this.login).hide();

		} else {
			$(this.memb).hide();
			$(this.login).show();

		}

	};

	Dialog.prototype._bindUI = function() {

		var	url = './result.html?name=';
		var self = this;

		$('body').on({

			keyup : function () {
					keycode = event.which;

				if ( keycode == 13 ) {
					url += $.trim(this.value);
					window.location.href = url;

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
					$.post('../controller/search.php', { content:$.trim(this.value) }, function ( result ) {
						var html = '';
						if ( result == 'false' ) {
							html = '搜索结果 -- 0条匹配';
							$(self.result).empty();
							$(self.result).append(html);

						} else {
							var json = $.parseJSON(result);
							$.each(json, function (index, value) {
								html += '<li><a href="javascript:;"><div class="col result-master">'+value.master+'</div><div class="col col-str">--</div><div class="col result-name">'+value.name+'</div></a></li>'
							});
							$(self.result).empty();
							$(self.result).append(html);
						}
					});
				}

				$(self.result).show();
			},
			blur : function () {
				$(self.result).hide();
			}

		}, this.input ).on('mousedown', this.resultLI, function () {
			url += $(this).find('.result-name').html();
			window.location.href = url;

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