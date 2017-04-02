$(document).ready(function(){
	if($(window).width() <= 768)
	{
		toMobile();
	}

	$(window).resize(function(){
		if(process_bar_interval)
		{
			process_bar_timer = getProcessBarInterval();
			clearInterval(process_bar_interval);
			process_bar_process(process_bar_timer);
		}

		if($(window).width() <= 768)
		{
			if ($('.table-mobile').length == 0)
			{
				toDefault();
				toMobile();
			}
		}
		else
		{
			toDefault();
		}
	})

	$(document).on('click', '#close-menu-btn .img-avatar', function(){
		$(this).parent().next().slideToggle(500);
	})

	$(document).on('click', '.table-mobile tbody th.show-more-row', function(){
		var itemid = $(this).attr('itemid');
		$('tr[data-hidden="' + itemid + '"]').toggle(500);

		if($(this).text() == 'Xem chi tiết')
		{
			$(this).text('Ẩn chi tiết');
		}
		else
		{
			$(this).text('Xem chi tiết');
		}
	})
})

function toMobile(){
	var main_menu = $('#main-menu');
	var drop_down = main_menu.find('[data-toggle="dropdown"]');

	if(drop_down)
	{
		$.each(drop_down, function(index, item){
			if($(item).parent().find('div.collapse').length == 0)
			{
				var child_frame = document.createElement('div');
				$(child_frame).addClass('btn-menu-child');
				if($(item).prop('tagName').toLowerCase() != 'img')
				{
					$(child_frame).addClass('collapse');
				}
				$(child_frame).attr('id', 'menu_collapse_' + index)

				$.each($(item).next().find('li'), function(index, item){
					$(child_frame).append($(item).find('>a').clone());
				})

				$(item).parent().append(child_frame);
			}

			if($(item).prop('tagName').toLowerCase() != 'img')
			{
				$(item).attr('data-toggle', 'collapse');
				$(item).parent().attr('data-toggle', 'collapse');
			}
			$(item).attr('data-target', '#menu_collapse_' + index);
			$(item).parent().attr('data-target', '#menu_collapse_' + index);
		})
	}

	var btn_customer = $('#btn-customer-info').find('.dropdown').clone();
	var customer_avatar = btn_customer.find('>img');
	var customer_function = btn_customer.find('>div');
	$('#close-menu-btn').append(customer_avatar);
	$('#close-menu').append(customer_function);

	//Table process
	var main_panel = $('#main-panel');

	if(main_panel)
	{
		var main_table = main_panel.find('table')[0];
		if($(main_table).attr('data-responsive') != 'false'){
			var new_table = document.createElement('table');
			$(new_table).addClass('table');
			$(new_table).addClass('table-bordered');
			$(new_table).addClass('table-mobile');

			var header_cols = $(main_table).find('thead tr th');

			if($(main_table).hasClass('main-grid'))
			{
				var allTr = $(main_table).find('tbody tr');
				var row_class = 'even';

				for(var i = 0; i < allTr.length; i+=2)
				{
					var new_record = [];
					var new_detail_row; // Giữ lại dòng có các nút Sửa, xóa

					if(row_class == 'even')
					{
						row_class = 'odd';
					}
					else
					{
						row_class = 'even';
					}

					// Quét ở vị trí thứ i thì sẽ tạo thành các row nhìn thấy chứa dữ liệu
					$.each($(allTr[i]).find('td, th'), function(col_index, cell){
						if($(cell).find('input[type="checkbox"]').length == 0)
						{
							var new_row = document.createElement('tr');
							$(new_row).addClass(row_class);

							$(new_row).append(header_cols.clone()[col_index]);	//===> Cột tiêu đề
							$(new_row).append($(cell).clone());	//===> Cột data

							if($(header_cols[col_index]).hasClass('detail-col'))
							{
								new_detail_row = new_row;
							}
							else
							{
								new_record.push(new_row);
							}
						}
					});

					var hiddenRow = $(allTr[i+1]).find('td>div.row');

					if(hiddenRow)
					{
						if(new_detail_row)
						{
							$(new_detail_row).find('th').addClass('show-more-row');
							$(new_detail_row).find('th').attr('itemid', i);
							$(new_detail_row).find('th').html('Xem chi tiết');
						}
						else
						{
							new_record.push('<tr class="' + row_class + '"><th colspan="2" class="show-more-row" itemid="' + i + '">Xem chi tiết</th></tr>');
						}

						var headerOfhiddenRow = $(hiddenRow[0]).find('>div');
						var dataOfhiddenRow = $(hiddenRow[1]).find('>div');

						$.each(headerOfhiddenRow, function(hidden_index, hidden_item){
							var new_row = document.createElement('tr');
							$(new_row).addClass('no-display');
							$(new_row).attr('data-hidden', i);
							var hidden_data = dataOfhiddenRow[hidden_index];

							$(new_row).addClass(row_class);
							$(new_row).append('<th>' + $(hidden_item).html() + '</th>');
							$(new_row).append('<td>' + $(hidden_data).html() + '</td>');
							new_record.push(new_row);
						})
					}
					else
					{
						//TODO: chỉ còn trường hợp ThanhPho sử dụng bảng trong dòng 2
					}

					if(new_detail_row)
					{
						new_record.push(new_detail_row);
					}

					$(new_table).append(new_record);
				}
			}
			else
			{
				$.each($(main_table).find('tbody tr'), function(row_index, row){
					var new_record = [];
					var row_class = 'even';

					if(row_index % 2 == 0)
					{
						row_class = 'odd';
					}

					$.each($(row).find('td, th'), function(col_index, cell){
						if($(cell).find('input[type="checkbox"]').length == 0)
						{
							var new_row = document.createElement('tr');
							$(new_row).addClass(row_class);
							$(new_row).append(header_cols.clone()[col_index]);	//===> Cột tiêu đề
							$(new_row).append($(cell).clone());	//===> Cột data
							new_record.push(new_row);
						}
					})

					$(new_table).append(new_record);
				})
			}

			//main_panel.append(new_table);
			$(new_table).insertAfter($(main_table));
		}
	}
	//Search area and create modal
	$.each($('.search-area-frame tbody tr'), function(index, item){
		var td = $(item).find('td');
		if($(td[1]).find('p, #btn-search-advance').length == 0)
		{
			var p = document.createElement('p');
			$(p).addClass('show-mobile');
			$(p).text($(td[0]).text());
			$(td[1]).prepend(p);
		}
	})

	$.each($('.create-or-update-table tbody tr'), function(index, item){
		var td = $(item).find('td');
		if($(td[1]).find('p').length == 0)
		{
			var p = document.createElement('p');
			$(p).addClass('show-mobile');
			$(p).text($(td[0]).text());
			$(td[1]).prepend(p);
		}
	})
}

function toDefault(){
	var main_menu = $('#main-menu');
	var drop_down = main_menu.find('[data-toggle="collapse"]');

	if(drop_down)
	{
		$.each(drop_down, function(index, item){
			$(item).parent().find('.btn-menu-child').remove();
			$(item).attr('data-toggle', 'dropdown');
			$(item).attr('data-target', '');
			$(item).parent().attr('data-toggle', '');
			$(item).parent().attr('data-target', '');
		})
	}

	$('#close-menu-btn').find('img').remove();
	$('#close-menu').find('.btn-menu-child').remove();
	$('#btn-customer-info').find('.btn-menu-child').remove();

	var main_panel = $('#main-panel');

	if(main_panel)
	{
		main_panel.find('.table-mobile').remove();
	}
}