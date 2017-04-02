$(document).ready(function(){
	$('.map-toolbar-frame-btn').on('click', function(){
		var t = $(this);
		var parent = $(t).parent();
		var state = $(this).attr('itemid');
		var removeClass	= 'glyphicon-chevron-' + ($(t).find('span').hasClass('glyphicon-chevron-down') ? 'down' : 'up');
		var addClass = 'glyphicon-chevron-' + ($(t).find('span').hasClass('glyphicon-chevron-down') ? 'up' : 'down');

		switch (state){
			case 'close':
				//$('.map-frame-lg div.map-toolbar-frame').slideUp(500);
				$(parent).find('div.map-toolbar-frame').slideUp(500);
				break;
			case 'open':
				//$('.map-frame-lg div.map-toolbar-frame').slideDown(500);
				$(parent).find('div.map-toolbar-frame').slideDown(500);
				break;
			default:
				break;
		}

		$(t).attr('itemid', state == 'close' ? 'open' : 'close');

		$(t).find('span').removeClass(removeClass);
		$(t).find('span').addClass(addClass);
	})

	$('.map-toolbar-frame button.btn-maptoPopup').on('click', function(){
		var t = $(this);
		var id = $(t).attr('itemid');
		var sm = $(t).parent().parent().hasClass('map-frame-sm');

		switch	(id)
		{
			case 'geolocation':
				if(sm == true)
				{
					if(mapGeoPos && sm_mapGlobal)
					{
						sm_mapGlobal.setCenter(mapGeoPos);
					}
				}
				else if(mapGeoPos && mapGlobal)
				{
            		mapGlobal.setCenter(mapGeoPos);
				}
				break;
			case 'zoomin':
			case 'zoomout':
				if(sm == true)
				{
					if(sm_mapGlobal)
					{
						sm_mapGlobal.setZoom(id == 'zoomout' ? sm_iZoomLevel - 1 : sm_iZoomLevel + 1);
					}
				}
				else if(mapGlobal)
				{
					mapGlobal.setZoom(id == 'zoomout' ? iZoomLevel - 1 : iZoomLevel + 1);
				}
				break;
			case 'expand':
				var state = $(t).val();
				var frame = $(t).parent().parent();
				var dialog = frame.parent().parent().parent();
				var toolbar_frame = $(t).parent();

				var map_child = $('#sm-map').find('div:first-child')[0];
				
				if(map_child)
				{
					if($(map_child).length > 0)
					{
						if(state == 'false')
						{
							frame.css({'position': 'fixed', 'top': '0px', 'left': '0px', 'padding': '57px 1px 1px 1px',
								   	   'border': 'none', 'height': '100%', 'z-index': '2'});
							
							$(map_child).css('border-radius', '0px 0px 6px 6px');
							$(toolbar_frame).css('right', '1px');
							$(toolbar_frame).next().attr('role', 'lager-view');
						}
						else
						{
							frame.attr('style', '');
							$(map_child).css('border-radius', '0px');
							$(toolbar_frame).css('right', '15px');
							$(toolbar_frame).next().attr('role', 'small-view');
						}

						if(dialog.hasClass('modal-dialog'))
						{
							dialog.toggleClass('modal-lg');
							dialog.toggleClass('modal-lg-map-fixed-height');
						}
					}
				}
            	google.maps.event.trigger(sm_mapGlobal, "resize");
            	if(mapGeoPos)
            	{
					sm_mapGlobal.setCenter(mapGeoPos);
            	}
				break;
			default:
				break;
		}
	})

	$(document).on('click', 'span.map-marker-content-btn-close', function(){
		$('#map-marker-close').click();
	})

	$(document).on('click', 'span.btn-media-direction', function(){
		/*var t = $(this);

		var mediaItem;
		switch ($(t).attr('itemid'))
		{
			case "next":
				mediaItem = CircleListGetNextObj(lstMedia);
				break;
			case "prev":
				mediaItem = CircleListGetPrevObj(lstMedia);
				break;
		}

		if(mediaItem)
		{
			LoadContentMedia($(t).parent().parent(), mediaItem);
		}*/
	})

	$(document).on('click', 'div.map-marker-content-info button.btn-info', function(){
		$('#detail-modal').modal('toggle');
	})

	$(document).on('click', 'div.map-marker-content-info button.btn-success', function(){
		$('#stream-modal').modal('toggle');
	})

	$(document).on('mouseenter', 'table[itemid="log-position"] tbody tr', function(){
		var t = $(this);
		var marker = sm_mapListMarker[$(t).find('th:first-child').text() - 1];

		if(marker)
		{
			StopAllMarkerAnimation(sm_mapListMarker);

			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}).on('mouseleave', 'table[itemid="log-position"] tbody tr', function() {
		StopAllMarkerAnimation(sm_mapListMarker);
  	});
})