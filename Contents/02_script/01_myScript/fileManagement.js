$(document).ready(function(){
	if(markersJson){
		for(var i = 0; i < markersJson.length; i++){
			var content = getElemDisplayAlbum(markersJson[i]);
			content.find('>div[data-bind="media.url"]').attr('data-parent-index', i);
			$('div[data-bind="displayAllFiles"]').append(content);
		}
	}
})

function getElemDisplayAlbum(markerJson){
	wrapper = $('<div class="col-sm-3 no-padding"></div>');
	div = $('<div></div>');
	prepareMediaContent(div, markerJson.media[0], 0);
	div.append('<img src="../Contents/03_images/01_myImages/map-sm.png"/>');
	div.append('<div class="director left" title="Xem ảnh trước"></div>');
	div.append('<div class="director right" title="Xem ảnh tiếp theo"></div>');
	div.append('<input type="checkbox" data-bind="id" data-value="' + markerJson.id + '" title="Lựa chọn để xóa"/>');
	div.append('<span data-bind="fileCount">' + markerJson.media.length + ' tệp</span>');
	wrapper.append(div.clone());
	div = $('<div></div>');
	div.append('<table class="table table-nobordered no-margin" data-responsive="false"></table>');
	wrapper.append(div);
	table = div.find('>table');
	table.append('<tr><td>Tên đoàn</td><td>' + markerJson.name + '</td></tr>');
	table.append('<tr><td>Giảng viên</td><td>' + markerJson.boss + '</td></tr>');
	table.append('<tr><td>Khoa</td><td>' + markerJson.faculty + '</td></tr>');
	table.append('<tr><td>Thời gian</td><td><span>' + markerJson.time.startDate + '</span> tới <span>' + markerJson.time.endDate + '</span></td></tr>');

	wrapper.find('>div:nth-child(1)>div.left').on('click', function(){
		div = $(this).parent().find('[data-bind="media.url"]');
		var index = parseInt($(div).attr('data-index'));
		index = --index < 0 ? markerJson.media.length - 1 : index;
		div.attr('data-index', index);
		prepareMediaContent(div.parent(), markerJson.media[index], index);
	})

	wrapper.find('>div:nth-child(1)>div.right').on('click', function(){
		div = $(this).parent().find('[data-bind="media.url"]');
		var index = parseInt($(div).attr('data-index'));
		index = ++index > markerJson.media.length - 1 ? 0 : index;
		div.attr('data-index', index);
		prepareMediaContent(div.parent(), markerJson.media[index], index);
	})

	wrapper.find('input[type="checkbox"]').on('change', function(){
		$(this).parent().parent().toggleClass('active');
		n = $(this).parent().find('[data-bind="fileCount"]');
		checked = $(this).prop('checked');
		markerJson.media.map(function(t){
			t.checked = checked;
			return t;
		})
		n.text(checked ? 'Đã chọn ' + markerJson.media.length + '/' + markerJson.media.length + ' tệp' : markerJson.media.length + ' tệp');

		toggleDeleteBtn();
	})

	wrapper.find('>div:nth-child(1)').onSwipe('right', function(t){
		$(t).find('>.left').click();
	}).onSwipe('left', function(t){
		$(t).find('>.right').click();
	})

	wrapper.find('>div:nth-child(1)').on('click', '>[data-bind="media.url"]', function(){
		$('#album-modal').modal('toggle');
		mainCheckbox = $(this).parent().find('>input[type="checkbox"]');
		wrapper = $('#album-modal .modal-body>div');
		wrapper.html('');

		var mediaFiles = markerJson.media;
		if(mediaFiles){
			var selectedIndex = parseInt($(this).attr('data-index'));

			for(var i = 0; i < mediaFiles.length; i++){
				div = $('<div class="col-xs-3"></div>');
				checkbox = $('<input type="checkbox" data-index=' + i + '/>')
				if(mediaFiles[i].checked != undefined){
					checkbox.prop('checked', mediaFiles[i].checked);
				}
				div.append(checkbox);

				checkbox.on('change', function(){
					c = $(this).parent().parent().find('input[type="checkbox"]').toArray().map(function(input){
						return $(input).prop('checked');
					}).filter(function(val){
						return val == true;
					})

					index = parseInt($(this).attr('data-index'));

					markerJson.media[index].checked = $(this).prop('checked');
					mainCheckbox.prop('checked', c.length != 0);
					mainCheckbox.parent().find('>span[data-bind="fileCount"]').text(c.length == 0 ? markerJson.media.length + ' tệp' : 'Đã chọn ' +  c.length + '/' + markerJson.media.length + ' tệp');

					toggleDeleteBtn();
				})

				var background;

				if(mediaFiles[i].type == MEDIATYPE.IMAGE){
					background = $('<div data-index="' + i + '" data-type="view-media" data-id="' + markerJson.id + '" style="background-image:url(' + mediaFiles[i].url + ')"></div>');

					if(mediaFiles[i].height / mediaFiles[i].width > 1){
						background.addClass('vertical');
					}
					else{
						background.addClass('horizontal');
					}
				}
				else{
					background = $('<video data-index="' + i + '" data-type="view-media" data-id="' + markerJson.id + '" src="' + mediaFiles[i].url + '" controls></video>');	
				}

				if(i == selectedIndex){
					background.addClass('active');
				}

				div.append(background);
				div.append('<img src="../Contents/03_images/01_myImages/map-sm.png" style="width: 100%;">');
				wrapper.append(div);
			}
		}
	})

	return wrapper;
}

function prepareMediaContent(elem, media, index){
	elem.find('[data-bind="media.url"]').remove();
	var content = media.type==MEDIATYPE.VIDEO ? $('<video data-bind="media.url" data-index="' + index + '" controls></video>') : $('<div data-bind="media.url" data-index="' + index + '"></div>')
	
	content.css('background-image', 'url(' + media.url + ')');
	content.attr('src', media.url);
	if(media.height > media.width){
		content.addClass('horizontal');
	}
	else{
		content.addClass('vertical');
	}

	elem.prepend(content);
}

function toggleDeleteBtn(){
	c = $('div[data-bind="displayAllFiles"]').find('input[type="checkbox"]').toArray().map(function(t){
		return $(t).prop('checked');
	}).filter(function(t){
		return t == true;
	});

	if(c.length == 0){
		$('button[itemid="deleteSelect"]').slideUp(500);	
	}
	else{
		$('button[itemid="deleteSelect"]').slideDown(500);
	}
}