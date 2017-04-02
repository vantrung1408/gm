// Define các biến const
function TYPE()
{
    this.CNTT       = 0;              // Công nghệ thông tin
    this.KT         = 1;              // Kinh tế và phát triển nông thôn
    this.CN         = 2;              // Chăn nuôi
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

    this.MYLOCATION = 15;               // Chỉ vị trí của người dùng
    this.SELECTOR   = 16;               // Chỉ icon khi click chuột trên bản đồ
}

function MEDIAENUM(){
    this.IMAGE = 0;
    this.VIDEO = 1;
}

var MEDIATYPE = new MEDIAENUM();
var ICONTYPE = new TYPE();      // Định nghĩa enum TYPE dưới dạng biến để sử dụng ở dạng iconType.CNTT thay vì (new TYPE()).CNTT
var defaultZoomVal = 13;        // Giá trị khởi đầu của việc init map
var zoomTick       = 1;         // Giá trị thay đổi khi zoomOut hoặc zoomIn

// NOTE: Tất cả các đối tượng của google map nằm trong đối tượng google.maps

// Define các đối tượng sử dụng trong 1 map
function map(googleMapObj, element, markersJson, allowMarkerClusterer = true, viewDetailCallback = null, viewMediaCb = null)
{
    // Fields
    this.mapObj;                    //Đối tượng thể hiện cho google.maps.Map
    this.staticMarkers = [];        //Chứa danh sách các icon tĩnh trên map
    this.myLocation;                //Đối tượng chỉ icon vị trí hiện tại
    this.selectorMarker;            //Marker chỉ tọa độ đang được lựa chọn
    this.markerClusterer;           //Đối tượng cho phép gộp các điểm sát nhau thành 1 icon khi zoom nhỏ bản đồ
    this.allowMarkerClusterer;      //
    this.allowGeolocation;          //Cho biến trình duyệt có cho phép định vị hay không
    this.selectedMarker;

    // Methods
    this.getMapObj = function(){
        return this.mapObj;
    };

    this.getZoom = function(){
        return this.mapObj.getZoom();
    };

    this.setZoom = function(val){
        this.mapObj.setZoom(val);
    };

    this.setCenter = function(marker){
        if(marker && this.mapObj)
        {
            this.mapObj.setCenter({lat: marker.getLat(), lng: marker.getLng()});
        }
    };

    this.getCenter = function(){
        return this.mapObj.getCenter();
    }

    this.getStaticMarker = function(index){
        if(index < this.staticMarkers.length)
        {
            return this.staticMarkers[index];
        }
        return null;
    };

    this.addStaticMarker = function(position, type, elem = null, markerJson = null, viewDetailCallback = null, viewMediaCb = null){
        if(position && type != null){
            var mk = new marker(this, googleMapObj, position, type, markerJson, viewDetailCallback, viewMediaCb);
            mk.installMember();
            this.staticMarkers.push(mk);
            if(elem){
                elem.attr('data-index', this.staticMarkers.length - 1);
            }
            var t = this;
            setTimeout(function(){
                var infoWindow = mk.getInfoWindow();
                t.geocodePosition(position, infoWindow);
            }, 1000);
        }
    };

    this.getStaticMarkers = function(){
        return this.staticMarkers;
    };

    this.clearStaticMarkerAnimation = function(){
        for(var i = 0; i < this.staticMarkers.length; i++)
        {
            this.staticMarkers[i].getMarkerObj().setAnimation(null);
        }
    };

    this.getSelectedPosition = function(){
        return {'lat': this.selectorMarker.getLat(), 'lng': this.selectorMarker.getLng()};
    };

    this.resizeTrigger = function(position){
        var map = this.mapObj;
        googleMapObj.event.trigger(map, 'resize');
        this.mapObj.setCenter(position);
    };

    this.geocodePosition = function(position, infoWindow = null, mapObj = null, markerObj = null){
        // Chi phí khi dùng geocoder https://developers.google.com/maps/documentation/javascript/geocoding#quotas
        var geocoder = new googleMapObj.Geocoder;
        geocoder.geocode({'location': position}, function(results, status){
            if(infoWindow){
                if(status == 'OK'){
                    if(results[0]){
                        infoWindow.setContent('<strong>' + results[0].formatted_address + '</strong>');
                        infoWindow.getInfoWindowObj().open(mapObj, markerObj);
                    }
                    else{
                        infoWindow.setContent(null);
                        infoWindow.getInfoWindowObj().close();
                    }
                }
                else{
                    infoWindow.setContent(null);
                    infoWindow.getInfoWindowObj().close();
                }
            }
        })
    };

    this.initMarkerCluster = function(){
        // Add a marker clusterer to manage the markers
        var staticMarkersObj = this.staticMarkers.map(function(marker){
            return marker.getMarkerObj();
        });
        this.markerClusterer = new MarkerClusterer(this.mapObj, staticMarkersObj,
               {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    this.clearAllStaticMarker = function(){
        for(var i = 0; i < this.staticMarkers.length; i++){
            //1. Clear infoWindow
            this.staticMarkers[i].getInfoWindow().getInfoWindowObj().close();
            this.staticMarkers[i].getInfoWindow().setInfoWindowObj(null);
            this.staticMarkers[i].setInfoWindow(null);
            //2. Clear marker
            this.staticMarkers[i].getMarkerObj().setMap(null);
            this.staticMarkers[i].setMarkerObj(null);
            this.staticMarkers[i] = null;
        }
        this.staticMarkers = [];
    };

    this.closeAllStaticMarkersInfoWindow = function(){
        for(var i = 0; i < this.staticMarkers.length; i++){
            this.staticMarkers[i].getInfoWindow().getInfoWindowObj().close();
        }
    };

    this.getMarkerMyLocation = function(){
        return this.myLocation;
    }

    this.setSelectedMarker = function(marker){
        this.selectedMarker = marker;
    }

    this.getSelectedMarker = function(){
        return this.selectedMarker;
    }

    this.setSelectorMarker = function(position){
        if(this.selectorMarker){
            //1. Clear infoWindow
            this.selectorMarker.getInfoWindow().getInfoWindowObj().close();
            this.selectorMarker.getInfoWindow().setInfoWindowObj(null);
            this.selectorMarker.setInfoWindow(null);
            //2. Clear marker
            this.selectorMarker.getMarkerObj().setMap(null);
            this.selectorMarker.setMarkerObj(null);
            this.selectorMarker = null;
            googleMapObj.event.clearListeners(this.getMapObj(), 'click');
        }

        this.selectorMarker = new marker(this, googleMapObj, position, ICONTYPE.SELECTOR);
        this.selectorMarker.installMember();

        this.selectorMarker.createInfoWindow();
        if(position){
            this.geocodePosition(position, this.selectorMarker.getInfoWindow(), this.getMapObj(), this.selectorMarker.getMarkerObj());
        }

        var mapObj = this;
        var selector = this.selectorMarker;
        var infoWindow = this.selectorMarker.getInfoWindow();
        googleMapObj.event.addListener(this.getMapObj(), 'click', function(e){
            selector.setPosition(e.latLng);
            mapObj.geocodePosition(e.latLng, infoWindow, mapObj.getMapObj(), selector.getMarkerObj());
        });
    }

    this.getSelectorMarker = function(){
        return this.selectorMarker;
    }

    // Constructor tính toán các giá trị default cho obj
    this.installMember = function(bGeolocation, bSelector){      
        if(googleMapObj)
        {
            this.mapObj = new googleMapObj.Map(element, {
                center: {lat: 21.027764, lng: 105.834160},
                zoom: defaultZoomVal,
                clickableIcons: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            if(bGeolocation == true)
            {
                // alloc my location
                allocMyLocation(this, googleMapObj);
            }

            // alloc all static markers
            var length = markersJson ? markersJson.length : 0;
            for(var i = 0; i < length; i++) // Chỉ dùng for vì các đối tượng forEach hoặc $.each tạo ra các function không đồng bộ (Async)
            {
                var mk = new marker(this, googleMapObj, markersJson[i].position, markersJson[i].type, markersJson[i], viewDetailCallback, viewMediaCb);
                mk.installMember();
                this.staticMarkers.push(mk);
            }

            if(bSelector)
            {
                // alloc selector marker
                this.setSelectorMarker(null);
            }

            // marker cluster define
            this.allowMarkerClusterer = allowMarkerClusterer;
            if(this.allowMarkerClusterer == true && this.staticMarkers.length > 0)
            {
                this.initMarkerCluster();
            }
        }
    }
}

function marker(mapObj, googleMapObj, position, iconType, markerJson = null, viewDetailCallback = null, viewMediaCb = null)
{
    this.markerObj;
    this.infoWindow;               //Đối tượng infoWindow

    this.getMarkerObj = function(){
        return this.markerObj;
    };

    this.setMarkerObj = function(val){
        this.markerObj = val;
    }

    this.getInfoWindow = function(){
        return this.infoWindow;
    }

    this.setInfoWindow = function(val){
        this.infoWindow = val;
    }

    this.createInfoWindow = function(){
        this.infoWindow = new infoWindow(mapObj.getMapObj(), googleMapObj, iconType, markerJson, viewMediaCb);
        this.infoWindow.installMember();
        this.infoWindow.getInfoWindowObj().close();
    }

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

    this.setIcon = function(type){
        this.markerObj.setIcon(new icon(type));
    };

    this.setPosition = function(pos){
        this.markerObj.setPosition(pos);
    };

    this.installMember = function(){
        this.markerObj = new googleMapObj.Marker({
                        position: position,
                        map: mapObj.getMapObj(),
                        flat: true,
                        icon: (new icon(iconType, googleMapObj)).getIcon()
                    });
        if(iconType != ICONTYPE.SELECTOR)
        {
            this.infoWindow = new infoWindow(mapObj.getMapObj(), googleMapObj, iconType, markerJson, viewMediaCb);
            this.infoWindow.installMember();
            if(iconType != ICONTYPE.MYLOCATION)
            {
                this.infoWindow.getInfoWindowObj().close();    
            }
            else
            {
                this.infoWindow.getInfoWindowObj().open(mapObj.getMapObj(), this.markerObj);
            }

            // Attach các sự kiện của googleMap
            //var i = this.infoWindow.getInfoWindowObj();
            var i = this.infoWindow;
            //var mk = this.markerObj;
            var mk = this;
            //Attack map function
            this.markerObj.addListener("click", function (e) {
                mapObj.closeAllStaticMarkersInfoWindow();
                mapObj.setSelectedMarker(mk);
                i.getInfoWindowObj().open(mapObj.getMapObj(), mk.markerObj);

                // Install member of mediaFile selected HERE
                if(i.getMediaFile(i.getMediaSelectedIndex())){
                    i.getMediaFile(i.getMediaSelectedIndex()).installMember();
                }

                //attack event
                if(i.getDivWrapperId())
                {
                    //director
                    $(i.getDivWrapperId()).find('.director.left').on('click', function(){
                        i.previousMedia();
                    });

                    $(i.getDivWrapperId()).find('.director.right').on('click', function(){
                        i.nextMedia();
                    });

                    //another
                    $(i.getDivWrapperId()).find('.director.bottom').on('click', function(){
                        var t = $(this).parent().find('div[data-type="display-info"]');
                        $(this).hide();
                        i.switchMedia(false, t);
                    });

                    $(i.getDivWrapperId()).find('.director.top').on('click', function(){
                        var t = $(this).parent().find('div[data-type="display-info"]');
                        $(i.getDivWrapperId()).find('.director.bottom').show();
                        i.switchMedia(true, t);
                    });

                    $(i.getDivWrapperId()).find('a[data-type="view-detail"]').on('click', function(){
                        viewDetailCallback(markerJson);
                    });

                    if($(window).width() < 768){
                        $(i.getDivWrapperId()).onSwipe('up', function(){
                            if($(i.getDivWrapperId()).find('>div[data-type="display-info"]').css('display') == 'none'){
                                $(i.getDivWrapperId()).find('.director.top').click();
                            }
                            else{
                                $(i.getDivWrapperId()).find('.director.bottom').click();
                            }
                        }).onSwipe('right', function(){
                            if($(i.getDivWrapperId()).find('>div[data-type="display-info"]').css('display') == 'none'){
                                $(i.getDivWrapperId()).find('.director.left').click();    
                            }
                        }).onSwipe('left', function(){
                            if($(i.getDivWrapperId()).find('>div[data-type="display-info"]').css('display') == 'none'){
                                $(i.getDivWrapperId()).find('.director.right').click();    
                            }
                        })
                    }
                }
            });
        }
    };
}

function infoWindow(mapObj, googleMapObj, iconType, markerJson = null, viewMediaCb = null)
{
    this.infoWindowObj;
    this.content;
    this.mediaFiles = [];       //Chứa danh sách các đối tượng mediaFile
    this.mediaSelectedIndex;    //Chỉ số tệp media đang được hiển thị
    this.divWrapperId;
    this.address;

    this.getInfoWindowObj = function(){
        return this.infoWindowObj;
    };

    this.setInfoWindowObj = function(val){
        this.infoWindowObj = val;
    }

    this.getContent = function(){
        return this.content;
    };

    this.setContent = function(val){
        this.content = val;
        this.infoWindowObj.setContent(this.content);
    }

    this.getMediaFile = function(index){
        if(index < this.mediaFiles.length){
            return this.mediaFiles[index];
        }
        return null;
    }

    this.getMediaFiles = function(){
        return this.mediaFiles;
    }

    this.getMediaSelectedIndex = function(){
        return this.mediaSelectedIndex;
    }

    this.setMediaSelectedIndex = function(index){
        if(index >= 0 && index < this.mediaFiles.length){
            this.mediaSelectedIndex = index;
            this.mediaFiles[this.mediaSelectedIndex].installMember();                
        }
    }

    this.nextMedia = function(){
        this.mediaSelectedIndex++;
        if(this.mediaSelectedIndex == this.mediaFiles.length){
            this.mediaSelectedIndex = 0;
        }

        this.mediaFiles[this.mediaSelectedIndex].installMember();
    }

    this.previousMedia = function(){
        this.mediaSelectedIndex--;
        if(this.mediaSelectedIndex < 0){
            this.mediaSelectedIndex = this.mediaFiles.length - 1;
        }

        this.mediaFiles[this.mediaSelectedIndex].installMember();
    }

    this.switchMedia = function(isShow, elem){
        if (!elem){
            elem = $(this.divWrapperId).find('div[data-type="display-info"]');
        }

        var z_index = parseInt(elem.css('z-index'));

        if(isShow == false){
            if($(window).width() < 768){
               elem.hide();
            }
            else{
                elem.slideUp(500);
            }
        }
        else{
            if($(window).width() < 768){
                elem.show();
            }
            else{
                elem.slideDown(500);
            }
        }
    }

    this.getSelectedMedia = function(){
        return this.mediaFiles[this.mediaSelectedIndex];
    }

    this.getDivWrapperId = function(){
        return this.divWrapperId;
    }

    this.getAddress = function(){
        return this.address;
    }

    this.installMember = function(){
        this.content = new infoWindowContent(iconType, markerJson).getContent();
        this.infoWindowObj = new googleMapObj.InfoWindow({map: mapObj});
        this.infoWindowObj.setContent(this.content);
        this.mediaSelectedIndex = 0;

        if(markerJson)
        {
            this.address = markerJson.address;
            this.divWrapperId = '#infowindow' + markerJson.id;

            for(var i = 0; i < markerJson.media.length; i++)
            {
                var media = new mediaFile(markerJson.media[i].url, 
                                        markerJson.media[i].type,
                                        this.divWrapperId,
                                        markerJson.media[i].height,
                                        markerJson.media[i].width,
                                        markerJson.media[i].comments,
                                        viewMediaCb);     
                //not install member of media HERE
                this.mediaFiles.push(media);           
            }
        }
    };
}

function mediaFile(url, type, divWrapperId, height, width, comments, viewMediaCb = null) 
{
    this.url;
    this.type;
    this.divWrapperId;
    this.height;
    this.width;
    this.commentJson;

    this.setUrl = function(value){
        this.url = value;
    }

    this.getUrl = function(){
        return this.url;
    }

    this.setType = function(value){
        this.type = value;
    }

    this.getType = function(){
        return this.type;
    }

    this.getComment = function(){
        return this.commentJson;
    }

    this.getHeight = function(){
        return this.height;
    }

    this.getWidth = function(){
        return this.width;
    }

    this.installMember = function(createElement = true){
        this.url = url;
        this.type = type;
        this.divWrapperId = divWrapperId;
        this.height = parseFloat(height);
        this.width = parseFloat(width);
        this.commentJson = comments;

        if(createElement == true){
            var divHeight = parseFloat($(divWrapperId).outerHeight());
            var divWidth = parseFloat($(divWrapperId).outerWidth());
            
            if(this.type == MEDIATYPE.IMAGE){
                var div = document.createElement('div');
                div = $(div);
                div.addClass('infoWindowContent');

                if((this.height/this.width > divHeight/divWidth) && this.height/this.width < 1){
                    div.addClass('vertical');
                }
                else{
                    div.addClass('horizontal');
                }

                div.css('background-image', 'url(' + this.url + ')');

                //$(divWrapperId).html('');
                div.css('z-index', $(divWrapperId).find('.infoWindowContent').css('z-index'));
                $(divWrapperId).find('.infoWindowContent').remove();
                $(divWrapperId).append(div);

                div.on('click', function(){
                    if(viewMediaCb){
                        viewMediaCb(divWrapperId);
                    }
                })
            }
            else if(this.type == MEDIATYPE.VIDEO){
                var vid = document.createElement('video');
                vid = $(vid);
                vid.addClass('infoWindowContent');

                vid.attr('src', this.url);
                vid.attr('controls', true);

                vid.css('z-index', $(divWrapperId).find('.infoWindowContent').css('z-index'));
                $(divWrapperId).find('.infoWindowContent').remove();
                $(divWrapperId).append(vid);

                vid.on('click', function(){
                    if(viewMediaCb){
                        viewMediaCb(divWrapperId);
                    }
                })
            }
        }
    }
}

function icon(type, googleMapObj = null)
{
    this.type = type;
    this.getIcon = function(){
        if(googleMapObj){
            return {url: this.getUrl(), scaledSize: new googleMapObj.Size(48, 48)};
        }
        return null;
    }

    this.getUrl = function(){
        return '..https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_icon/vnua_map_icon_' + this.type + '.png';
    }
}

function infoWindowContent(type, markerJson = null)
{
    this.type = type;
    this.getContent = function(){
        var e = new TYPE();
        switch(this.type)
        {
            case e.CNTT:
            case e.KT:
            case e.CN:
            case e.CNTP:
            case e.CD:
            case e.CNSH:
            case e.GDQP:
            case e.KTQT:
            case e.LLCT:
            case e.MT:
            case e.NH:
            case e.QLDD:
            case e.SP:
            case e.TY:
            case e.TS:
                return parseInfoWindowContent(markerJson);

            case e.MYLOCATION:
                return "<strong>Vị trí của bạn</strong>";
            case e.SELECTOR:
                return "";
            default:
                break;
        }
    }
}

function allocMyLocation(mapObj, googleMapObj){
    // Định vị tọa độ của người dùng
    mapObj.allowGeolocation = navigator.geolocation != null ? true : false;
    if (mapObj.allowGeolocation == true)
    {
        navigator.geolocation.getCurrentPosition(function (position){
            mapObj.myLocation = new marker(mapObj, googleMapObj, {lat: position.coords.latitude, lng: position.coords.longitude}, ICONTYPE.MYLOCATION);     
            mapObj.myLocation.installMember();
            mapObj.setCenter(mapObj.myLocation);
        }, function () {
            alertBox('Lỗi định vị', 'error', 5000);
        });
    }
}

function parseInfoWindowContent(markerJson){
    if(markerJson)
    {
        var div = document.createElement('div');
        div = $(div);
        div.addClass('infoWindow-wrapper');

        // create direction button
        var direction = document.createElement('div');
        direction = $(direction);
        direction.addClass('director left');
        div.append(direction.clone());

        direction.removeClass('left');
        direction.addClass('right');
        div.append(direction.clone());

        // create element display info
        var info = document.createElement('div');
        info = $(info);
        info.attr('data-type', 'display-info');
        info.html(getDisplayInfo(markerJson, true));
        div.prepend(info);

        // create element for show/hide display-info
        direction.removeClass('right');
        direction.addClass('bottom');
        direction.attr('title', 'Nhấn để hiện danh sách ảnh và video');
        div.prepend(direction.clone());

        direction.removeClass('bottom');
        direction.addClass('top');
        direction.attr('title', 'Nhấn để hiện thông tin đoàn');
        div.prepend(direction);

        div.attr('id', 'infowindow' + markerJson.id);

        return $('<div />').append(div).clone().html();
    }
    return null;
}

function getDisplayInfo(markerJson, forInfoWindow = false){
    return '<p>Tên đoàn: <strong title="' + markerJson.name + '">' + markerJson.name + '</strong></p>' +
            '<p>Trưởng đoàn: <strong title="' + markerJson.boss + '">' + markerJson.boss + '</strong></p>' +
            '<p class="hidden">Khoa: <strong title="' + markerJson.faculty + '">' + markerJson.faculty + '</strong></p>' +
            '<p class="hidden">Bộ môn: <strong title="' + markerJson.department + '">' + markerJson.department + '</strong></p>' +
            '<p>Địa điểm: <strong title="' + markerJson.address.name + '">' + markerJson.address.name + '</strong></p>' +
            '<p>Thời gian: <span title="' + markerJson.time.startDate + 'đến' + markerJson.time.endDate + '"><strong>' + markerJson.time.startDate + '</strong> đến <strong>' + markerJson.time.endDate + '</strong></span></p>' +
            (forInfoWindow ? '<p><a data-toggle="modal" data-target="#file-modal" data-backdrop="static" data-keyboard="false">Tải tệp lên</a> - <a href="#" data-toggle="modal" data-target="#stream-modal">Yêu cầu báo cáo</a> - <a data-type="view-detail" href="#">Xem chi tiết</a></p>':'');
}