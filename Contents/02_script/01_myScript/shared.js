var vnua_color_green = 'rgb(0, 153, 102)';
var vnua_color_yellow = 'rgb(237, 181, 58)';
var vnua_color_brown = 'rgb(102, 51, 0)';
var process_bar_interval = null;
var process_bar_timer = getProcessBarInterval();
var current_user_data = {'id':1,'avatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png','fullName':'Ngô Công Thắng'}

$(document).ajaxStart(function () { process_bar_process(process_bar_timer); }).ajaxStop(function () { process_bar_process('stop'); });

$(document).ready(function () {
	document.title = document.title + " - Phần mềm Quản lý thực tập tại cơ sở ngoài Học Viện";
	// Binding current user data
	$('[data-bind="c_user_avatar"]').attr('src', current_user_data.avatar);
	$('[data-bind="c_user_fullName"]').text(current_user_data.fullName);
	
	// alertBox('Test message', 'warning', 7000);	==> Test alert message
	// process_bar_process(process_bar_timer);
	// process_bar_marquee();

	// 2016.11.26	Trung.DV    Tính lại giá trị left của row-info
	if ($('.row-info').length > 0) {
		if ($('div.nav-top').isOnScreen()) {
			topNavShow();
		}
		else {
			topNavHidden();
		}
	}

	$(window).scroll(function () {
		if ($('div.nav-top').isOnScreen()) {
			topNavShow();
		}
		else {
			topNavHidden();
		}
	});

	if($(window).width() < 768){
    	$('body').onSwipe('right', function(){
    		if($('body').hasClass('menu-open')){
    			$('.menu-background').click();
    		}
    	})
    }

	$(window).resize(function () {
		if (!$('div.nav-top').isOnScreen()) {
			$('.row-info').css('left', $('.row-info').next().offset().left);
		}
	})

	// 2016.10.28	Trung.DV 	Toggle button
	$('[role="toggle"][value="true"]').css('background-color', '#ccc');

	$(document).on('click', '[role="toggle"]', function () {
		var state = $(this).val();

		$(this).val(state == 'true' ? 'false' : 'true');
		$(this).css('background-color', state != 'true' ? '#ccc' : '#fff')
	})

	// 2016.09.09	Trung.DV	Sự kiện click vào nút Tìm kiếm nâng cao
	$('#btn-search-advance').click(function () {
		$('.advance-search').toggle(1000);
	})

	// 2016.09.09	Trung.DV	Sự kiện khi click vào các row lẻ trong table làm hiện các row chẵn
	$('.main-grid>tbody>tr:nth-child(odd)').on('click', function () {
		var index = $(this).index() + 2;
		$('.main-grid>tbody>tr:nth-child(' + index + ')').toggle();
	})

	// 2016.09.09	Trung.DV	Chuyển đổi dropdown thành dạng combobox
	$('div.dropdown-select .dropdown-menu li a').click(function () {
		var t = $(this);
		var li = t.parent();
		var ul = li.parent();
		var itemid = t.attr('itemid');
		var value = t.text();
		var displayVal = ul.parent().find('#dropdown-select-display-value');

		$.each(ul.find('li'), function (index, item) {
			$(item).removeClass('active');
		});

		if (displayVal.attr('itemid') == itemid) {
			displayVal.attr('itemid', '0');
			displayVal.text('-- Lựa chọn một giá trị --');

			li.removeClass('active');
		}
		else {
			displayVal.attr('itemid', itemid);
			displayVal.text(value);

			li.addClass('active');
		}
	})

	$(document).on('click', 'a.picture-video-album', function () {
		//$('#album-modal .modal-body').html('');
		$.each(lstMedia, function (index, item) {
			if (item.Type == "Image") {
				//$('#album-modal .modal-body').append(GetImageTag('img-thumbnail', item.Url, 300, 169));
			}
			else {
				//$('#album-modal .modal-body').append(GetVideoTag(item.Url, 300, 169));
			}
		})
		//$('#album-modal .modal-body').height($('#detail-modal .modal-content').length > 0 ? 
		//	$('#detail-modal .modal-content').height() : $('#create-new-modal .modal-content').height());
	})

	$(document).on('click', '[role="view-detail"]', function () {
		var t = $(this);
		var type = t.attr('itemid');
		var frame = $('div[role="' + type + '-frame"]');
		var header = frame.find('.modal-header').html();
		var lstCol = frame.find('div.col-lg-6.create-new-col-info');
		var col1 = $(lstCol[0]).html();
		var col2 = $(lstCol[1]).html();
		var header_label = type == 'create' ? 'Vị trí' : 'Lịch sử di chuyển';

		if (type == 'detail') {
			t.parent().parent().click();
		}

		$('#create-new-modal .modal-header').html(header);
		$('#create-new-modal .modal-body div.create-new-col-info:first-child').html(col1);
		$('#create-new-modal .modal-body div[role="col-map-header"]').html(col2);
		$('#create-new-modal .modal-body p[role="col-map-header-txt"]').text(header_label);

		$.each(lstCol, function (index, item) {
			$(item).find('div.create-new-col-info-frame').height(type == 'detail' ? '443px' : '405px');
		})

		mapType(type);

		$('#create-new-modal').modal('toggle');
	})

	$(document).on('click', '[role="create-or-update"]', function () {
		var t = $(this);
		t.parent().parent().click();
		var type = t.attr('itemid');
		var index = t.attr('index');
		var form = t.attr('type');

		var data_type = t.attr('data-type');
		var data_map_icon = t.attr('data-map-icon');

		if (!form) {
			form = '';
		}
		var maxfield = $('#' + form + 'create-or-update-modal').attr('maxfield');

		//========= Đổi text thêm mới thành chỉnh sửa =========
		if ($('span[role="lbl-create-or-update"]').length > 0) {
			$.each($('span[role="lbl-create-or-update"]'), function (index, item) {
				var momentText = $(item).text();
				if (type == 'create') {
					if (momentText != 'Thêm mới' && momentText != 'Thêm')
						$(item).text(momentText == 'Chỉnh sửa' ? 'Thêm mới' : 'Thêm');
				}
				else {
					if (momentText != 'Chỉnh sửa' && momentText != 'Lưu')
						$(item).text(momentText == 'Thêm mới' ? 'Chỉnh sửa' : 'Lưu');
				}
				//$(item).text(momentText == 'Thêm mới' ? 'Chỉnh sửa' : (momentText == 'Thêm' ? 'Lưu' : 
				//	(momentText == 'Chỉnh sửa' ? 'Thêm mới' : 'Thêm')));
			});
		}

		//========= Thay dữ liệu ============
		for (var i = 0; i < maxfield; i++) {
			var elem = $('[' + form + 'fieldindex="' + (i + 1) + '"]');
			var content = type == 'create' ? '' : $('#' + form + 'field' + index + (i + 1)).html().trim();

			switch (elem.prop('tagName')) {
				case 'INPUT':
					if (elem.attr("type") == "checkbox") {
						if (content) {
							elem.prop('checked', true);
						}
						else {
							elem.prop('checked', false);
						}
					}
					else {
						elem.val(content);
					}
					break;
				case 'SPAN':
					var itemid = $('#' + form + 'field' + index + (i + 1)).attr('itemid');
					if (!content || content == '') {
						itemid = '0';
						content = '-- Lựa chọn một giá trị --'
						$.each(elem.parent().next().find('li'), function (index, item) {
							$(item).removeClass('active');
						})
					}
					else {
						$.each(elem.parent().next().find('li'), function (index, item) {
							if ($(item).find('a').attr('itemid') == itemid) {
								$(item).addClass('active');
							}
							else {
								$(item).removeClass('active');
							}
						})
					}
					elem.text(content);
					elem.attr('itemid', itemid);
					break;
				default:
					break;
			}
		}

		if (data_type && data_type == 'map') {
			if (data_map_icon) {
				if (data_map_icon == 'single') {
					// Dạng map con trong đó chứa 1 địa điểm
					var lat = parseFloat($('input[data-type="map-position-lat"][itemid="' + index + '"]').val());
					var lng = parseFloat($('input[data-type="map-position-lng"][itemid="' + index + '"]').val());
					locations = [{ lat: lat, lng: lng }];
					console.log(locations);
				}
				else {
					// Dạng map con trong đó chứa nhiều địa điểm
				}

				if (type == 'create') {
					mapType('create');
				}
				else {
					mapType('detail');
				}
			}
		}

		$('#' + form + 'create-or-update-modal').modal('toggle');
	})

	$('input[type="checkbox"][role="checkall"]').change(function () {
		var t = $(this);
		$.each(t.parent().parent().parent().next().find('tr'), function (index, item) {
			var cb;
			var tChecked = t.prop('checked');
			if ($(item).parent().prop('tagName').toLowerCase() == 'tbody') {
				cb = $(item).find('input[type="checkbox"][role="select"]');
			}
			else {
				cb = $(item).find('input[type="checkbox"][role="checkall"]');
			}

			if (cb) {
				cb.prop('checked', tChecked);
				if ($(item).parent().parent().parent().prop('tagName').toLowerCase() == 'td'
					&& t.parent().parent().parent().parent().parent().prop('tagName').toLowerCase() != 'td') {
					cb.prop('disabled', tChecked);
				}
			}
		})
		if (t.prop('checked') == true)
			$('button[itemid="deleteSelect"]').slideDown(500);
		else
			$('button[itemid="deleteSelect"]').slideUp(500);
	})

	$('input[type="checkbox"][role="select"]').change(function () {
		var t = $(this);
		var tbody = t.parent().parent().parent();
		var cbAll = tbody.prev().find('input[type="checkbox"][role="checkall"]');
		var cbAllchecked = [];
		var bDisplayBtn = [];
		$.each(tbody.find('>tr'), function (index, item) {
			if (t.attr('itemid') == 'hasChild') {
				var child = t.parent().parent().next().find('tr');
				var tChecked = t.prop('checked');
				$.each(child, function (index, item) {
					var childCb;
					if ($(item).parent().prop('tagName').toLowerCase() == 'tbody')
						childCb = $(item).find('input[type="checkbox"][role="select"]');
					else
						childCb = $(item).find('input[type="checkbox"][role="checkall"]');

					if (childCb) {
						childCb.prop('checked', tChecked);
						childCb.prop('disabled', tChecked);
					}
				})
			}

			var cb = $(item).find('input[type="checkbox"][role="select"]').prop('checked');
			cbAllchecked.push(cb);
			bDisplayBtn.push(cb);
		})

		if ($.inArray(true, bDisplayBtn) != -1)
			$('button[itemid="deleteSelect"]').slideDown(500);
		else
			$('button[itemid="deleteSelect"]').slideUp(500);

		if (cbAll) {
			cbAll.prop('checked', true);
			if ($.inArray(false, cbAllchecked) != -1)
				cbAll.prop('checked', false);
		}
	})

	$('button[itemid="deleteSelect"]').click(function () {
		var t = $(this);
		t.parent().parent().click();
		$.MessageBox.Show({
			title: 'Xác nhận xóa',
			msg: 'Nếu bạn <strong>đồng ý</strong> xóa bản ghi này, nó sẽ <strong>không thể khôi phục</strong>. Bạn chắc chắn chứ?',
			type: 'yes/no',
			callback: function (result) {
				console.log(result);
			}
		});
	})

	$(document).on('click', 'label[itemid="delete"]', function () {
		var t = $(this);
		t.parent().parent().click();
		$.MessageBox.Show({
			title: 'Xác nhận xóa',
			msg: 'Nếu bạn <strong>đồng ý</strong> xóa bản ghi này, nó sẽ <strong>không thể khôi phục</strong>. Bạn chắc chắn chứ?',
			type: 'yes/no',
			callback: function (result) {
				console.log(result);
			}
		});
	})

	$('.table tr input[type="checkbox"]').click(function () {
		$(this).parent().parent().click();
	})

	$('label[itemid="createAccount"]').click(function () {
		$(this).parent().parent().click();
	})

	$(document).on('keypress', 'input[type="text"][role="only-number"]', function (event) {
		var t = $(this);
		var num = parseInt(event.key);

		if (num) {

		}
		else {
			event.preventDefault();
		}
	})

	$(document).on('paste', 'input[type="text"][role="only-number"]', function (event) {
		var pastedText = event.originalEvent.clipboardData.getData('text').trim();
		var num = parseInt(pastedText);

		event.preventDefault();
		if (num) {
			$(this).val($(this).val() + num);
		}
	})

	$(document).on('click', 'button.btn-main-menu', function () {
		$('#main-menu').removeClass('menu-hidden');
		$('.menu-background').show();
		$('body').addClass('menu-open');
	})

	$('.menu-background').click(function () {
		$('#main-menu').addClass('menu-hidden');
		$(this).hide();
		$('body').removeClass('menu-open');
	})

	$('#close-menu-btn span').click(function () {
		$('.menu-background').click();
	})

	$(document).on('click', '[role="collapse"]', function () {
		var target = $(this).attr('data-target');
		$(target).slideToggle(2000);
	})

	$(document).on('click', 'span[role="collapse"]', function () {
		if ($(this).hasClass('glyphicon-collapse-down')) {
			$(this).removeClass('glyphicon-collapse-down');
			$(this).addClass('glyphicon-collapse-up');
		}
		else {
			$(this).removeClass('glyphicon-collapse-up');
			$(this).addClass('glyphicon-collapse-down');
		}
	})
});

function process_bar_marquee() {
	$('.process-bar').css('width', '50%');
}

function process_bar_process(timer) {
	var i = 0;

	if (timer == 'stop') {
		$('#static-panel').remove();
		$('.process-bar').addClass('hidden');
		$('body').removeClass('ajax-request');
		$('#static-panel').hide();
		if (process_bar_interval) {
			clearInterval(process_bar_interval);
		}

		return false;
	}

	var static_panel = document.createElement('div');
	$(static_panel).attr('id', 'static-panel');
	$(static_panel).html('<p>Đang xử lý...</p>');
	$('body').prepend(static_panel);

	$('.process-bar').removeClass('hidden');
	$('body').addClass('ajax-request');
	$('#static-panel').show();
	process_bar_interval = setInterval(function () {
		if ($('.process-bar').length > 0) {
			var bar = $('.process-bar');
			var oldColor;
			var newColor;
			var left = bar.offset().left;

			if (left > $(document).width()) {
				left = 0 - bar.width();
				bar.css('left', left);

				if (bar.hasClass('yellow')) {
					oldColor = 'yellow';
					newColor = 'green';
				}
				else if (bar.hasClass('green')) {
					oldColor = 'green';
					newColor = 'brown';
				}
				else {
					oldColor = 'brown';
					newColor = 'yellow';
				}
			}

			var newleft = left + 10;
			bar.css('left', newleft);
			bar.removeClass(oldColor);
			bar.addClass(newColor);
		}
	}, timer);
}

function input2span(parent) {
	if ($(parent).length) {
		var span = $(parent).find('span:first-child');
		var input = $(parent).find('input[type="text"]');

		if ($(span).length && $(input).length) {
			$(span).text($(input).val());
			$(input).addClass('no-display');
			$(span).removeClass('no-display');
		}
	}
}

function span2input(parent) {
	if ($(parent).length) {
		var span = $(parent).find('span:first-child');
		var input = $(parent).find('input[type="text"]');

		if ($(span).length && $(input).length) {
			$(input).val($(span).text());
			$(span).addClass('no-display');
			$(input).removeClass('no-display');
		}
	}
}

function CircleListGetNextObj(lstObj, index) {
	if (!lstObj) {
		return null;
	}
	if (index) {
		if (index >= lstObj.length) {
			index = 0;
		}
		return lstObj[index];
	}
	else {
		lstObj["selectedIndex"]++;
		if (lstObj["selectedIndex"] > lstObj.length - 1) {
			lstObj["selectedIndex"] = 0;
		}

		return lstObj[lstObj["selectedIndex"]];
	}
}

function CircleListGetPrevObj(lstObj, index) {
	if (!lstObj) {
		return null;
	}
	if (index) {
		if (index < 0) {
			index = lstObj.length - 1;
		}
		return lstObj[index];
	}
	else {
		lstObj["selectedIndex"]--;
		if (lstObj["selectedIndex"] < 0) {
			lstObj["selectedIndex"] = lstObj.length - 1;
		}
		return lstObj[lstObj["selectedIndex"]];
	}
}

function GetImageTag(className, src, width, height) {
	var tag = '<img class="img-responsive ' + className + '" src="' + src + '" alt="DSE_FITA" width="' + width + '" height="' + height + '"/>';
	return tag;
}

function GetVideoTag(src, width, height) {
	var tag = '<video class="img-thumbnail" width="' + width + '" height="' + height + '" controls><source src="' + src + '" type="video/mp4">Trình duyệt không hỗ trợ</video>';
	return tag;
}

$.fn.isOnScreen = function () {

	var win = $(window);

	var viewport = {
		top: win.scrollTop(),
		left: win.scrollLeft()
	};
	viewport.right = viewport.left + win.width();
	viewport.bottom = viewport.top + win.height();

	var bounds = this.offset();
	bounds.right = bounds.left + this.outerWidth();
	bounds.bottom = bounds.top + this.outerHeight();

	return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};

$.MessageBox = {
	Show: function (options) {
		var m = $('#message-box-modal');
		var title = options.title;
		var msg = options.msg;
		var type = options.type;

		if (!title && title == '') {
			title = 'Hệ thống quản lý đoàn thực tập ngoài Học Viện';
		}
		$('#message-box-modal .modal-title').text(title);
		$('#message-box-content').html(msg);
		$.each($('#message-box-modal .modal-footer button'), function (index, item) {
			if ($(item).attr('role') == type) {
				$(item).show();
			}
			else {
				$(item).hide();
			}
		})

		m.off('click.MessageBox', '.btn, .close').off('hidden.bs.modal').on('click.MessageBox', '.btn, .close', function () {
			$(this).addClass('modal-result');
		}).on('hidden.bs.modal', function () {
			var result = $(this).find('.modal-result').filter('.btn-info').length > 0;
			$(this).find('.modal-result').removeClass('modal-result');

			options.callback(result);
		});

		// ===> Setup message box modal <===
		m.modal({
			backdrop: 'static',
			keyboard: false
		})
	}
};

function alertBox(msg, type, duration, fadeInDuration = 2500, fadeOutDuration = 1500) {
	var wrapper = document.createElement('div');

	$(wrapper).attr('class', 'alert alert-' + type + ' message-box');
	$(wrapper).append(msg);
	$('body').append(wrapper);

	$('.btn-top').addClass('no-display-important');
	$(wrapper).fadeIn(parseInt(fadeInDuration));

	if($(window).width() >= 768){
		$(wrapper).on('mouseenter', function(){
			$(wrapper).css('display','block');		
		}).on('mouseleave', function(){
			setTimeout(function(){
				$(wrapper).fadeOut(parseInt(fadeOutDuration));

				setTimeout(function(){
					$('.btn-top').removeClass('no-display-important');
				}, parseInt(fadeOutDuration));
			}, parseInt(duration));	
		})
	}
	else{
		setTimeout(function(){
			$(wrapper).fadeOut(parseInt(fadeOutDuration));

			setTimeout(function(){
				$('.btn-top').removeClass('no-display-important');
			}, parseInt(fadeOutDuration));
		}, parseInt(duration));		
	}
}

function checkLength(elem) {
	var max = parseInt(elem.attr('max-length'));
	var min = parseInt(elem.attr('min-length'));
	var tLength = elem.val().length;

	if (max && min) {
		if (tLength > max || tLength < min) {
			//TODO: Thông báo cho người dùng biết
		}
		else {

		}
	}
}

function topNavHidden() {
	$('.row-info').next().css('margin-top', $('.row-info').outerHeight() + 'px');
	$('.row-info').addClass('row-info-fixed');
	$('.row-info').css('left', $('.row-info').next().offset().left);

	$('div.btn-top').show();
}

function topNavShow() {
	$('.row-info').next().css('margin-top', '0px');
	$('.row-info').removeClass('row-info-fixed');

	$('div.btn-top').hide();
}

function getProcessBarInterval() {
	var interval = 16000 / $(window).width();
	return interval > 20 ? 20 : interval;
}