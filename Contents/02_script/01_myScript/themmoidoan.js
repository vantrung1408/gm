$(document).ready(function(){
	// 2016.09.09	Trung.DV	Sự kiện khi click nút Thêm mới sinh viên add thêm 1 dòng vào table
	var isAdded = false;
	$('#create-new-add-student').click(function(){
		if(isAdded == false)
		{
			var tblStudent = $('.table-student');
			var col1 = '<th scope="row">' + $('.table-student tr').length + '</th>';
			var col2 = '<td><span></span><input type="text" class="form-control"/></td>';
			var col3 = '<td><span></span><input type="text" class="form-control"/></td>';
			var col4 = '<td><button class="btn btn-default btn-tbl create-new-add-student-edit no-display">Sửa</button>\n' +
						'<button class="btn btn-default btn-tbl create-new-add-student-delete no-display">Xóa</button>\n' +
						'<button class="btn btn-default btn-tbl create-new-add-student-save">Lưu</button>\n' +
						'<button class="btn btn-default btn-tbl create-new-add-student-cancel" itemid="0">Hủy bỏ</button>\n' +
						'<button class="btn btn-default btn-tbl create-new-add-student-cancel-edit no-display">Hủy bỏ</button></td>';
			var row = '<tr>' + col1 + col2 + col3 + col4 +'</tr>';
			tblStudent.append(row);

			isAdded = true;
		}
	})

	// 2016.09.09	Trung.DV	Sự kiện khi click nút hủy bỏ, trong trường hợp đang thêm mới
	$(document).on('click', 'button.create-new-add-student-cancel',function(){
		var t = $(this);
		t.parent().parent().remove();
		isAdded = false;
	})

	// 2016.09.09	Trung.DV	Sự kiện khi click nút hủy bỏ, trong trường hợp đang thêm mới
	$(document).on('click', 'button.create-new-add-student-cancel-edit',function(){
		var t = $(this);
		var tr = t.parent().parent();
		
		$.each($(tr).find('td'), function(index, item){
			var input = $(item).find('input[type="text"]');
			var span = $(item).find('span:first-child');
			if($(input).length)
			{
				$(input).addClass('no-display');
				$(span).removeClass('no-display');
			}
		});

		t.addClass('no-display');
		tr.find('.create-new-add-student-cancel').addClass('no-display');
		tr.find('.create-new-add-student-save').addClass('no-display');
		tr.find('.create-new-add-student-edit').removeClass('no-display');
		tr.find('.create-new-add-student-delete').removeClass('no-display');

		isAdded = false;
	})

	// 2016.09.09	Trung.DV	Sự kiện khi click nút lưu, trong trường hợp đang thêm mới
	$(document).on('click', 'button.create-new-add-student-save',function(){
		var t = $(this);
		var tr = t.parent().parent();

		$.each($(tr).find('td'), function(index, item){
			input2span(item);
		});

		t.addClass('no-display');
		tr.find('.create-new-add-student-cancel').addClass('no-display');
		tr.find('.create-new-add-student-cancel-edit').addClass('no-display');
		tr.find('.create-new-add-student-edit').removeClass('no-display');
		tr.find('.create-new-add-student-delete').removeClass('no-display');

		isAdded = false;
	})

	// 2016.09.09	Trung.DV	Sự kiện khi click nút chỉnh sửa, trong trường hợp đã được thêm
	$(document).on('click', 'button.create-new-add-student-edit',function(){
		var t = $(this);
		var tr = t.parent().parent();
		
		$.each($(tr).find('td'), function(index, item){
			span2input(item);
		});

		t.addClass('no-display');
		tr.find('.create-new-add-student-cancel').addClass('no-display');
		tr.find('.create-new-add-student-cancel-edit').removeClass('no-display');
		tr.find('.create-new-add-student-save').removeClass('no-display');
		tr.find('.create-new-add-student-delete').addClass('no-display');
	})

	// 2016.09.09	Trung.DV	Sự kiện khi click nút xóa, trong trường hợp đã được thêm
	$(document).on('click', 'button.create-new-add-student-delete',function(){
		var t = $(this);
		var tr = t.parent().parent();
		var table = tr.parent();

		tr.remove();

		$.each($(table).find('tr'), function(index, item){
			if(index != 0)
			{
				$(item).find('th:nth-child(1)').text(index);
			}
		})
	})
})
