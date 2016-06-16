define ( function ( require, exports, module ) {

	function Reg () {
		this.name = 'form[name=reg] input[name=name]';
		this.email = 'form[name=reg] input[name=email]';
		this.pwd = 'form[name=reg] input[name=pwd]';
		this.repwd = 'form[name=reg] input[name=repwd]';
		this.submit = 'form[name=reg] input[type=submit]';
		this.tips = 'form[name=reg] .tips';
	}

	module.exports = Reg;

	Reg.prototype.render = function () {
		this._init();
		this._bind();
	}

	Reg.prototype._init = function () {

	}

	Reg.prototype._bind = function () {

		var self = this;

		$('.wrap-in').on('focus', this.name, function () {

			$(self.tips).html('');

		}).on('focus', this.email, function () {

			$(self.tips).html('');

		}).on('focus', this.pwd, function () {

			$(self.tips).html('');

		}).on('focus', this.repwd, function () {

			$(self.tips).html('');

		}).on('submit', 'form[name=reg]', function ( e ) {
			e = e || event;
			e.preventDefault();

			if ( !!$.trim($(self.name).val()) &&
				!!$.trim($(self.name).val()) &&
				!!$.trim($(self.pwd).val()) &&
				!!$.trim($(self.repwd).val()) ) {

				$.ajax({
					url : '../../phpCtrl/checkReg.php',
					type : 'POST',
					data : $('form').serialize(),
					beforeSend : function () {
						$(self.submit).val('loading...').attr('disabled');
					},
					success : function(response) {
						if (parseInt(response) > 0) {
							cookie('unique', response);
							window.location.href = './frame.html';
						} else {
							$(self.tips).html('提交失败，请稍候重试');
						}
					}

				});

			} else {
				$(self.tips).html('表单未完成，请继续填写');

			}

		});
	}
});