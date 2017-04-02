//Định nghĩa các icon start
var vnua_icon_myLocation = '../Contents/03_images/01_myImages/Marker_icon/vnua_map_icon_16.png';
var vnua_icon_trace = '../Contents/03_images/01_myImages/Marker_icon/vnua_map_icon_15.png';
var vnua_icon_cntt = '../Contents/03_images/01_myImages/Marker_icon/vnua_map_icon_0.png';
//Định nghĩa các icon end

var mapGlobal;
var mapMarkerGlobal = null;
var mapGeoPosInfoWindow = null;
var mapInfoWindow = null;
var iZoomLevel = 13;

var sm_mapGlobal;
var sm_iZoomLevel = 10;
var sm_mapListMarker = [];
var sm_mapMarkerGlobal = null;

//Data test
var lstMedia = [{"Type":"Image", "Url":"../Contents/03_images/01_myImages/Marker_media/1.png", "Height":169, "Width": 300},
                {"Type":"Image", "Url":"../Contents/03_images/01_myImages/Marker_media/2.png", "Height":169, "Width": 300},
                {"Type":"Image", "Url":"../Contents/03_images/01_myImages/Marker_media/3.png", "Height":169, "Width": 300},
                {"Type":"Video", "Url":"../Contents/03_images/01_myImages/Marker_media/video.mp4", "Height":169, "Width": 300}];
lstMedia["selectedIndex"] = 0;

var locations = [{lat: 21.037638, lng: 105.860382},
                 {lat: 21.044146, lng: 105.820280}]
function TYPE()
{
    this.CNTT       = 0;              // Công nghệ thông tin
    this.KT         = 1;                // Kinh tế và phát triển nông thôn
    this.CN         = 2;                // Chăn nuôi
    this.CNTP       = 3;              // Công nghệ thực phẩm
    this.CD         = 4;                // Cơ điện
    this.CNSH       = 5;              // Công nghệ sinh học
    this.GDQP       = 6;              // Giáo dục quốc phòng
    this.KTQT       = 7;              // Kế toán quản trị
    this.LLCT       = 8;              // Lý luận chính trị
    this.MT         = 9;                // Môi trường
    this.NH         = 10;                // Nông học
    this.QLDD       = 11;              // Quản lý đất đai
    this.SP         = 12;                // Sư phạm
    this.TY         = 13;                // Thú y
    this.TS         = 14;                // Thủy sản
}
function marker(googleMarkerObj)
{
    this.markerObj = googleMarkerObj;
    //this.infoWindow;               //Đối tượng infoWindow

    this.getLat = function(){
        return this.markerObj.getPosition().lat();
    };

    this.setLat = function(val){
        this.markerObj.setPosition({lat: val, lng: this.getLng()});
    };

    this.getLng = function(){
        return this.markerObj.getPosition().lng();
    };

    this.setLng = function(val){
        this.markerObj.setPosition({lat: this.getLat(), lng: val});
    };

    this.getIcon = function(){
        return this.markerObj.getIcon();
    };

    this.setIcon = function(val){
        this.markerObj.setIcon(val);
    };
}
function initMap() {
    console.log(google.maps);
    console.log((new TYPE()).CNTT);
    mapGlobal = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 21.027764, lng: 105.834160},
        zoom: iZoomLevel,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    mapInfoWindow = new google.maps.InfoWindow({ map: mapGlobal });
    mapInfoWindow.close();

    google.maps.event.addListener(mapGlobal, 'click', function (event) {
        placeMarker(mapGlobal, event.latLng, vnua_icon_trace);
    });

    initSearchAutoComplete('pac-input');

    GeoLocation(mapGlobal, true);

    //Just Test
    var testMarker = new google.maps.Marker({
        position: mapGlobal.getCenter(),
        map: mapGlobal,
        icon: vnua_icon_cntt,
        animation: google.maps.Animation.DROP
    });

    var abc = new marker(testMarker);
    console.log(testMarker);
    console.log(abc.markerObj);
    console.log(abc.getLat());
    abc.setLat(abc.getLat() + 1)
    console.log(abc.getLat());

    var infoWindowContent = $('div#map-marker-content-outter').html();//need get html
    
    google.maps.event.addListener(mapGlobal, "zoom_changed", function (e){
        iZoomLevel = mapGlobal.getZoom();
    });

    google.maps.event.addListener(testMarker, "click", function (e) {
        mapInfoWindow.setContent(infoWindowContent);
        mapInfoWindow.open(mapGlobal, testMarker);
        
        var gm_style_iw = [];

        $.each($(document).find('.gm-style-iw'), function(index, item){
            if($(item).parent().find('.map-marker-content').length > 0)
            {
                gm_style_iw.push(item);
            }
        })

        $.each(gm_style_iw, function(index, item){
            var iwBackground = $(item).prev();
            $(item).next().attr('id', 'map-marker-close');
            $(item).parent().append('<span class="glyphicon glyphicon-remove map-marker-content-btn-close no-margin"></span>');

            $(item).css('left', '0px');
            $(item).css('top', '20px');

            iwBackground.children(':nth-child(1)').css({'left' : '119px'});
            iwBackground.children(':nth-child(2)').css({'width' : '257px'});
            iwBackground.children(':nth-child(2)').css({'height' : '271px'});
            iwBackground.children(':nth-child(2)').css({'top' : '19px'});
            iwBackground.children(':nth-child(3)').css({'left' : '119px'});
            iwBackground.children(':nth-child(4)').css({'width' : '255px'});
            iwBackground.children(':nth-child(4)').css({'height' : '269px'});
            iwBackground.children(':nth-child(4)').css({'top' : '20px'});
            $(item).parent().css('margin-left', '22px');

            LoadContentMedia($(item).find('.map-marker-content-media-frame'), lstMedia[lstMedia["selectedIndex"]]);
        })
    });

    initSmallMap();
    mapType('detail');
}

function initSmallMap(){
    // Small map marker Start => TEST
    sm_mapGlobal = new google.maps.Map(document.getElementById('sm-map'), {
        //center: mapGeoPos,
        zoom: sm_iZoomLevel,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    GeoLocation(sm_mapGlobal, false);

    google.maps.event.addListener(sm_mapGlobal, "zoom_changed", function (e){
        sm_iZoomLevel = sm_mapGlobal.getZoom();
    });
    // Small map marker End
}

function mapType(type)
{
    // Có 2 loại là update và create nếu là update thì bỏ event click của map và đổ list marker
    if(type=='detail')
    {
        if(mapMarkerGlobal != null)
        {
            mapMarkerGlobal.setVisible(false);
        }
        google.maps.event.clearListeners(sm_mapGlobal, 'click');
        if(sm_mapListMarker.length == 0)
        {
            /*var sm_testMarker = new google.maps.Marker({
                position: {lat: 21.037638, lng: 105.860382},
                map: sm_mapGlobal,
                icon: vnua_icon_trace,
                animation: google.maps.Animation.DROP
            });

            sm_mapListMarker.push(sm_testMarker);

            var sm_testMarker1 = new google.maps.Marker({
                position: {lat: 21.044146, lng: 105.820280},
                map: sm_mapGlobal,
                icon: vnua_icon_trace,
                animation: google.maps.Animation.DROP
            });*/

            var markers = locations.map(function(location, i) {
                return new google.maps.Marker({
                    position: location,
                    icon: vnua_icon_trace,
                    animation: google.maps.Animation.DROP
                });
            });

            Array.prototype.push.apply(sm_mapListMarker, markers);

            /*var clusterStyles = [
              { textColor: 'white',
                url: 'https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m2.png',
                height: 50,
                width: 50 },
              { textColor: 'white',
                url: 'https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m2.png',
                height: 50,
                width: 50 },
              { textColor: 'white',
                url: 'https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m2.png',
                height: 50,
                width: 50 }];

            var mcOptions = {
                gridSize: 50,
                styles: clusterStyles,
                maxZoom: 15
            };*/

            var markerCluster = new MarkerClusterer(sm_mapGlobal, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

            //sm_mapListMarker.push(sm_testMarker1);
        }
        else
        {
            $.each(sm_mapListMarker, function(index, item){
                item.setVisible(true);
            });
        }
    }
    else
    {
        if(mapMarkerGlobal != null)
        {
            mapMarkerGlobal.setVisible(true);
        }
        // Ẩn tất cả marker trên map
        $.each(sm_mapListMarker, function(index, item){
            item.setVisible(false);
        });

        google.maps.event.addListener(sm_mapGlobal, 'click', function (event) {
            placeMarker(sm_mapGlobal, event.latLng, vnua_icon_trace);
        });
    }
}

function GeoLocation(mapVariable, isMaplg) {
    // Try HTML5 geolocation.
    var bDisableBtn = false;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            mapGeoPos = pos;

            var Geomarker = new google.maps.Marker({
                position: pos,
                map: mapVariable,
                icon: vnua_icon_myLocation//getIcon("mylocation").image
            });

            var InfoWindow = new google.maps.InfoWindow({ map: mapVariable });
            InfoWindow.close();
            InfoWindow.setContent("Vị trí của bạn...");

            if(isMaplg == true)
            {
                InfoWindow.open(mapVariable, Geomarker);
                mapGeoPosInfoWindow = InfoWindow;
            }

            Geomarker.addListener('click', function () {
                InfoWindow.setContent("Vị trí của bạn...");
                InfoWindow.open(mapVariable, Geomarker);
            });

            mapVariable.setCenter(pos);
        }, function () {
            handleLocationError(true, mapInfoWindow, mapVariable.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, mapInfoWindow, mapVariable.getCenter());
        bDisableBtn = true;
    }

    $('.map-toolbar-frame button.btn-maptoPopup[itemid="geolocation"]').prop('disabled', bDisableBtn);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	if(infoWindow == null)
	{
		infoWindow = mapInfoWindow;
	}

    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: Hệ thống định vị lỗi.' :
                          'Error: Trình duyệt của bạn không hỗ trợ định vị.');
}

function clearAllMarker(){
	mapMarkerGlobal = null;
}

function placeMarker(map, location, iconString) {
    if (mapMarkerGlobal != null) {
        mapMarkerGlobal.setVisible(true);
        mapMarkerGlobal.setPosition(location);
    }
    else {
        mapMarkerGlobal = new google.maps.Marker({
            position: location,
            map: map,
            icon: iconString
        });
    }
}

function initSearchAutoComplete(textboxId) {
    var input = document.getElementById(textboxId);
    var searchBox = new google.maps.places.SearchBox(input);
    mapGlobal.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    mapGlobal.addListener('bounds_changed', function () {
        searchBox.setBounds(mapGlobal.getBounds());
    });

    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            var icon = vnua_icon_trace/*getIcon("choose").image*/;

            if (mapMarkerGlobal != null) {
                mapMarkerGlobal.setPosition(place.geometry.location);
            }
            else {
                mapMarkerGlobal = new google.maps.Marker({
                    map: mapGlobal,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                });
            }

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        mapGlobal.fitBounds(bounds);
    });
}

function LoadContentMedia(frame_element, mediaItem)
{
    var frame = $(frame_element).find(mediaItem.Type == "Image" ? '.map-marker-content-img' : '.map-marker-content-video');
    var frameLess = $(frame_element).find(mediaItem.Type != "Image" ? '.map-marker-content-img' : '.map-marker-content-video');

    $(frameLess).hide();
    $(frame).show();

    $(frameLess).attr('src', '');
    $(frame).attr('src', mediaItem.Url);
}

function StopAllMarkerAnimation(lMarker)
{
    $.each(sm_mapListMarker, function(index, item){
        item.setAnimation(0);
    })
}

$(document).ready(function(){
    // 2016.11.16   Trung.DV    Hàm này hỗ trợ việc hiển thị google map trên modal
    $('div.modal[role="dialog"]').on('shown.bs.modal', function () 
    {
        if(sm_mapGlobal)
        {
            google.maps.event.trigger(sm_mapGlobal, "resize");
            if(mapGeoPos)
            {
                sm_mapGlobal.setCenter(mapGeoPos);
            }
        }
    });
})