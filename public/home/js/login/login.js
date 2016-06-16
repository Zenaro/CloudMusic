/*
* 	登录、注册框
*/
define( function ( require, exports, module ) {

	function Login() {
		this.user = '.wrap form input[name=user]';
		this.pwd = '.wrap form input[name=pwd]';
		this.submit = '.wrap form input[type=submit]';

		this.tips = '.wrap form .tips';
	}

	module.exports = Login;	

	Login.prototype.render = function() {
		this._bindUI();
	};

	Login.prototype._bindUI = function() {
		var self = this;
		$('body').on('focus', this.user, function() {

			$(self.tips).html('');

		}).on('focus', this.pwd, function() {

			$(self.tips).html('');

		}).on('submit', 'form[name=login]', function(e) {
			e = e || event;
			e.preventDefault();

			if ( $.trim($(self.user).val()) != '' && $.trim($(self.pwd).val()) != '' ) {
				$.ajax({
					url : '../../phpCtrl/checkLogin.php',
					type : 'POST',
					data : $('form[name=login]').serialize(),
					beforeSend : function () {
						$(self.submit).val('loading...').attr('disabled');
					},
					success : function(response) {
						if (response && parseInt(response) > 0) {
							cookie('unique', response);
							window.location.href = './frame.html';
						} else {
							$(self.tips).html('帐号与密码不匹配，请重新输入');
						}
					}

				});

			} else {
				$(self.tips).html('请输入帐号和密码');
				
			}

			
		})

	}



});