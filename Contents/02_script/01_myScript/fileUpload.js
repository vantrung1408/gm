var fileRule = {'extensions': ['png','bmp','jpeg','jpg'], 'maxSize':2097152, 'maxFile':10};//maxSize calculation in bytes

$(document).ready(function(){
	//Init rules
	$('[data-bind="file-extension"]').text(fileRule.extensions.join(', '));
	$('[data-bind="file-maxSize"]').text(fileRule.maxSize/(1024*1024) + 'MB');

	//Init uploader
	var uld = new uploader($('input[type="file"][name="file-input"]'), fileRule, fileChanged, 
		$('#file-modal img[data-type="display-selected-image"]'));
	uld.installMember();

	function fileChanged(isDelete = false){
		if(!isDelete){
			var wrapper = $('#file-modal [data-type="display-files"]');
			wrapper.html('');

			var files = uld.getFiles();
			for(var i = 0; i < files.length; i++){
				var div = $('<div data-index="' + i + '" data-type="display-file"></div>');
				var span = $('<span title="' + files[i].name + '">' + files[i].name + '</span>');
				div.append(span.clone());
				span = $('<span data-type="file-size"><span data-type="saved"></span>' + files[i].size + '</span>');
				div.append(span.clone());
				span = $('<span data-type="remove-file" title="Loại bỏ tệp này">&times;</span>');
				div.append(span);

				wrapper.append(div);
			}
		}

		$('#file-modal div[data-type="display-files"]>div[data-type="display-file"]:nth-child(' + (uld.getFileSelectedIndex() + 1) + ')').addClass('active');

		if(uld.getFileCount() > 0){
			$('#file-modal [data-bind="num-file"]').text(uld.getFileCount());
			$('#file-modal .modal-body').addClass('hasFile');	
			$('#file-modal .modal-dialog').addClass('modal-lg');
		}
		else{
			$('#file-modal .modal-body').removeClass('hasFile');
			$('#file-modal .modal-dialog').removeClass('modal-lg');
		}
	}

	$('#file-modal').on('hidden.bs.modal', function () {
		$('#file-modal div[data-type="display-files"]').html('');
		uld.files = [];
		fileChanged(true);
	})

	$('button[data-type="choose-files"]').on('click', function(){
		var input = $('input[type="file"][name="file-input"]');
		if(input.length > 0){
			input.click();
		}
	})

	$(document).on('click', '#file-modal span[data-type="remove-file"]', function(){
		var index = parseInt($('#file-modal div[data-type="display-files"]>div[data-type="display-file"]').index($(this).parent()));
		$(this).parent().toggle(200);
		var t = $(this);
		setTimeout(function(){
			t.parent().remove();
			$('#file-modal [data-bind="num-file"]').text(uld.removeFile(index));
		}, 200);
	})

	$(document).on('click', '#file-modal div[data-type="display-files"]>div[data-type="display-file"]>span:nth-child(1)', function(){
		var allDisplayFile = $(this).parent().parent().find('>div[data-type="display-file"]');
		var index = parseInt(allDisplayFile.index($(this).parent()));

		$.each(allDisplayFile, function(index, item){
			$(item).removeClass('active');
		})

		$(this).parent().addClass('active');
		uld.setFileSelectedIndex(index);
	})

	$('button[data-type="save-crop-info"]').on('click', function(){
		$(this).hide();
		uld.files[uld.fileSelectedIndex].coords = uld.jcropHandle.ui.selection.last;
		$('div[data-type="display-files"]>div.active').addClass('cutted');
		$('div[data-type="display-files"]>div.active span[data-type="saved"]').text('[Đã cắt] ');
		$('button[data-type="clear-crop-info"]').slideDown(500);		
	})

	$('button[data-type="clear-crop-info"]').on('click', function(){
		$(this).hide();
		$(this).next().hide();
		uld.files[uld.fileSelectedIndex].coords = undefined;
		$('div[data-type="display-files"]>div.active').removeClass('cutted');
		$('div[data-type="display-files"]>div.active span[data-type="saved"]').text('');
		uld.imgElem.prev().hide();
		uld.imgElem.next().hide();
	})
})

function uploader(handleInput, rules, cbFunction, imgElem){
	this.inputElem;
	this.formData;
	this.files = [];
	this.imgElem;
	this.fileSelectedIndex;
	this.jcropHandle;

	this.getFiles = function(){
		var defNFiles = [];
		for(var i = 0; i < this.files.length; i++){
			fileSize = this.files[i].size/(1024*1024);
			var nFile = {'name':this.files[i].name, 'size':fileSize < 1 ? parseInt(this.files[i].size/1024) + 'KB' : fileSize.toFixed(3) + 'MB'};//Convert size from B to MB
			defNFiles.push(nFile);
		}

		return defNFiles;
	}

	this.removeFile = function(index){
		if(index >= 0 && index < this.files.length){
			this.files.splice(index, 1);
			if(index == this.fileSelectedIndex){
				this.setFileSelectedIndex(0);
			}
			else if(index < this.fileSelectedIndex){
				this.setFileSelectedIndex(this.setFileSelectedIndex - 1);
			}
			cbFunction(true);
			return this.files.length;
		}
		return null;
	}

	this.validationFile = function(f){
		//1. Check extension
		var fEx = f.name.substr(f.name.lastIndexOf('.') + 1).toLowerCase();
		if($.inArray(fEx, rules.extensions) == -1){
			return false; //==> validation extension false
		}

		//2. Check size
		return f.size <= rules.maxSize;
	}

	this.getFileCount = function(){
		return this.files.length;
	}

	this.displaySelectedImage = function(){
		if(this.fileSelectedIndex >=0 && this.fileSelectedIndex < this.files.length && this.imgElem)
		{
			var fr = new FileReader();
			var u = this;
			var t = u.imgElem;

	        fr.onload = function () {
	            t.attr('src', fr.result);
	            t.parent().parent().find('button[data-type="save-crop-info"]').hide();
	            t.parent().parent().find('button[data-type="clear-crop-info"]').hide();

	            var w = t[0].naturalWidth;
	            var h = t[0].naturalHeight;

	            if(!t.parent().hasClass('jcrop-active')){
	            	t.Jcrop({},function(){
	            		u.jcropHandle = this
	            	});	

	            	var jcrop_c = u.jcropHandle.container;

	            	jcrop_c.on('cropstart',function(e,s,c){
	            		t.prev().show();
	            	});

	            	jcrop_c.on('cropend',function(e,s,c){
					  	t.parent().parent().find('button[data-type="save-crop-info"]').slideDown(500);
					});
	            }
	            else{
	            	if(coords = u.files[u.fileSelectedIndex].coords){
	            		t.prev().show();
	            		t.next().show();
	            		u.jcropHandle.setSelect([coords.x, coords.y, coords.w, coords.h]);
	            		t.parent().parent().find('button[data-type="clear-crop-info"]').slideDown(500);
	            	}
	            	else{
	            		t.prev().hide();
	            		t.next().hide();
	            	}
	            }
	            
	            d = t.parent();
	            d.attr('class', 'jcrop-active');
	            t.attr('class', '');

	            if(w==h){
	            	d.addClass('squared');
	            	t.addClass('squared');
	            	d.css('left', '0px');
	            	d.css('top', '0px');
	            }
	            else if(w>h){
	            	d.addClass('horizontal');
	            	t.addClass('horizontal');
	            	h = t.outerHeight();
	            	d.css('left', '0px');
	            	d.css('top', (d.parent().outerHeight() - h)/2 + 'px');
	            }
	            else{
	            	d.addClass('vertical');
	            	t.addClass('vertical');
	            	w = t.outerWidth();
	            	d.css('top', '0px');
	            	d.css('left', (d.parent().outerWidth() - w)/2 + 'px');
	            }
	        }
	        fr.readAsDataURL(this.files[this.fileSelectedIndex]);	
		}
	}

	this.setFileSelectedIndex = function(index){
		if(index >= 0 && index < this.files.length){
			this.fileSelectedIndex = index;
			this.displaySelectedImage();	
		}
	}

	this.getFileSelectedIndex = function(){
		return this.fileSelectedIndex;
	}

	this.installMember = function(){
		if(handleInput){
			this.inputElem = handleInput;
			this.imgElem = imgElem;
			this.fileSelectedIndex = 0;

			var t = this;
			//Fire when input[File] files attribute changed
			this.inputElem.on('change', function(){
				var selectedFiles = this.files;
				if(selectedFiles.length > 0){
					for(var i = 0; i < selectedFiles.length; i++){
						if(t.validationFile(selectedFiles[i])){
							t.files.push(selectedFiles[i]);	
						}
					}
					cbFunction();
					t.displaySelectedImage();	
				}
				$(this).val(null);
			})
		}
	}
}