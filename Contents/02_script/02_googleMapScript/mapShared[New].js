var mapObj; // Biến chỉ đối tượng map cho toàn bộ chương trình
var mapsmObj; // Biến chỉ đối tượng map trên popup

var markersJson = [{'position': {'lat': 21.040242, 'lng': 105.870352},
					'type': ICONTYPE.CNTT,
					'name': "Đoàn 01",
					'boss': "Ngô Công Thắng",
					'faculty': "Công nghệ thông tin",
					'department': "Công nghệ phần mềm",
					'address': {'name': 'Học viện Nông Nghiệp Việt Nam',
								'specific_add': 'Số 286 Đội Cấn, Phường Cống Vị',
								'township': 'Ba Đình',
								'city': 'Hà Nội',
								'phone': '0488888888'},
				    'time': {'startDate': "01/01/2017", 'endDate': "10/01/2017"},
				    'media': [{'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/4.jpg', 'type':MEDIATYPE.IMAGE, 'height': 1131, 'width': 1698, 
				    			'comments': [{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 1, 'childs':null},
											{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 2, 'childs':[{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null},
																																																			{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null}]}]},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/5.jpg', 'type':MEDIATYPE.IMAGE, 'height': 333, 'width': 500},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/6.jpg', 'type':MEDIATYPE.IMAGE, 'height': 419, 'width': 630},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/7.jpg', 'type':MEDIATYPE.IMAGE, 'height': 606, 'width': 848},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/8.jpg', 'type':MEDIATYPE.IMAGE, 'height': 267, 'width': 400},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/9.jpg', 'type':MEDIATYPE.IMAGE, 'height': 667, 'width': 1000},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/video.mp4', 'type':MEDIATYPE.VIDEO, 'height': 0, 'width': 0}],
				    'id': 1,
				    'student': [{'name':'Nguyễn Văn A', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn B', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn C', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn D', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn E', 'code':'588888', 'class':'K58QLTT'}],
				    'history': [{'date':'18/03/2017 12:00', 'position':{'lat': 21.045952, 'lng': 105.876832}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.050450, 'lng': 105.892582}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.032186, 'lng': 105.909748}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 20.998535, 'lng': 105.937557}, 'type': ICONTYPE.CNTT}
					]},// Đoạn json này chỉ để demo về nguyên tắc không được show đoạn này ra khi chạy thật, cần thiết kế 1 đoạn ajax để lấy đoạn json này
					
					{'position': {'lat': 21.053699, 'lng': 105.895586},
					'type': ICONTYPE.KT,
					'name': "Đoàn 02",
					'boss': "Ngô Công Thắng",
					'faculty': "Công nghệ thông tin",
					'department': "Công nghệ phần mềm",
					'address': {'name': 'Học viện Nông Nghiệp Việt Nam',
								'specific_add': 'Số 286 Đội Cấn, Phường Cống Vị',
								'township': 'Ba Đình',
								'city': 'Hà Nội',
								'phone': '0488888888'},
				    'time': {'startDate': "01/01/2017", 'endDate': "10/01/2017"},
				    'media': [{'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/4.jpg', 'type':MEDIATYPE.IMAGE, 'height': 1131, 'width': 1698, 
				    			'comments': [{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 1, 'childs':null},
											{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 2, 'childs':[{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null},
																																																			{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null}]}]},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/5.jpg', 'type':MEDIATYPE.IMAGE, 'height': 333, 'width': 500},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/6.jpg', 'type':MEDIATYPE.IMAGE, 'height': 419, 'width': 630},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/7.jpg', 'type':MEDIATYPE.IMAGE, 'height': 606, 'width': 848},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/8.jpg', 'type':MEDIATYPE.IMAGE, 'height': 267, 'width': 400},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/9.jpg', 'type':MEDIATYPE.IMAGE, 'height': 667, 'width': 1000},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/video.mp4', 'type':MEDIATYPE.VIDEO, 'height': 0, 'width': 0}],
				    'id': 1,
				    'student': [{'name':'Nguyễn Văn A', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn B', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn C', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn D', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn E', 'code':'588888', 'class':'K58QLTT'}],
				    'history': [{'date':'18/03/2017 12:00', 'position':{'lat': 21.045952, 'lng': 105.876832}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.050450, 'lng': 105.892582}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.032186, 'lng': 105.909748}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 20.998535, 'lng': 105.937557}, 'type': ICONTYPE.CNTT}
					]},

					{'position': {'lat': 21.032071, 'lng': 105.887609},
					'type': ICONTYPE.CN,
					'name': "Đoàn 03",
					'boss': "Ngô Công Thắng",
					'faculty': "Công nghệ thông tin",
					'department': "Công nghệ phần mềm",
					'address': {'name': 'Học viện Nông Nghiệp Việt Nam',
								'specific_add': 'Số 286 Đội Cấn, Phường Cống Vị',
								'township': 'Ba Đình',
								'city': 'Hà Nội',
								'phone': '0488888888'},
				    'time': {'startDate': "01/01/2017", 'endDate': "10/01/2017"},
				    'media': [{'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/4.jpg', 'type':MEDIATYPE.IMAGE, 'height': 1131, 'width': 1698, 
				    			'comments': [{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 1, 'childs':null},
											{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 2, 'childs':[{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null},
																																																			{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null}]}]},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/5.jpg', 'type':MEDIATYPE.IMAGE, 'height': 333, 'width': 500},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/6.jpg', 'type':MEDIATYPE.IMAGE, 'height': 419, 'width': 630},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/7.jpg', 'type':MEDIATYPE.IMAGE, 'height': 606, 'width': 848},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/8.jpg', 'type':MEDIATYPE.IMAGE, 'height': 267, 'width': 400},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/9.jpg', 'type':MEDIATYPE.IMAGE, 'height': 667, 'width': 1000},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/video.mp4', 'type':MEDIATYPE.VIDEO, 'height': 0, 'width': 0}],
				    'id': 1,
				    'student': [{'name':'Nguyễn Văn A', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn B', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn C', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn D', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn E', 'code':'588888', 'class':'K58QLTT'}],
				    'history': [{'date':'18/03/2017 12:00', 'position':{'lat': 21.045952, 'lng': 105.876832}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.050450, 'lng': 105.892582}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.032186, 'lng': 105.909748}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 20.998535, 'lng': 105.937557}, 'type': ICONTYPE.CNTT}
					]},

					{'position': {'lat': 21.105551, 'lng': 105.873013},
					'type': ICONTYPE.CNTP,
					'name': "Đoàn 04",
					'boss': "Ngô Công Thắng",
					'faculty': "Công nghệ thông tin",
					'department': "Công nghệ phần mềm",
					'address': {'name': 'Học viện Nông Nghiệp Việt Nam',
								'specific_add': 'Số 286 Đội Cấn, Phường Cống Vị',
								'township': 'Ba Đình',
								'city': 'Hà Nội',
								'phone': '0488888888'},
				    'time': {'startDate': "01/01/2017", 'endDate': "10/01/2017"},
				    'media': [{'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/4.jpg', 'type':MEDIATYPE.IMAGE, 'height': 1131, 'width': 1698, 
				    			'comments': [{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 1, 'childs':null},
											{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 2, 'childs':[{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null},
																																																			{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null}]}]},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/5.jpg', 'type':MEDIATYPE.IMAGE, 'height': 333, 'width': 500},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/6.jpg', 'type':MEDIATYPE.IMAGE, 'height': 419, 'width': 630},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/7.jpg', 'type':MEDIATYPE.IMAGE, 'height': 606, 'width': 848},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/8.jpg', 'type':MEDIATYPE.IMAGE, 'height': 267, 'width': 400},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/9.jpg', 'type':MEDIATYPE.IMAGE, 'height': 667, 'width': 1000},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/video.mp4', 'type':MEDIATYPE.VIDEO, 'height': 0, 'width': 0}],
				    'id': 1,
				    'student': [{'name':'Nguyễn Văn A', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn B', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn C', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn D', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn E', 'code':'588888', 'class':'K58QLTT'}],
				    'history': [{'date':'18/03/2017 12:00', 'position':{'lat': 21.045952, 'lng': 105.876832}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.050450, 'lng': 105.892582}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.032186, 'lng': 105.909748}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 20.998535, 'lng': 105.937557}, 'type': ICONTYPE.CNTT}
					]},

					{'position': {'lat': 21.045003, 'lng': 105.839367},
					'type': ICONTYPE.CD,
					'name': "Đoàn 05",
					'boss': "Ngô Công Thắng",
					'faculty': "Công nghệ thông tin",
					'department': "Công nghệ phần mềm",
					'address': {'name': 'Học viện Nông Nghiệp Việt Nam',
								'specific_add': 'Số 286 Đội Cấn, Phường Cống Vị',
								'township': 'Ba Đình',
								'city': 'Hà Nội',
								'phone': '0488888888'},
				    'time': {'startDate': "01/01/2017", 'endDate': "10/01/2017"},
				    'media': [{'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/4.jpg', 'type':MEDIATYPE.IMAGE, 'height': 1131, 'width': 1698, 
				    			'comments': [{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 1, 'childs':null},
											{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 2, 'childs':[{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null},
																																																			{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null}]}]},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/5.jpg', 'type':MEDIATYPE.IMAGE, 'height': 333, 'width': 500},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/6.jpg', 'type':MEDIATYPE.IMAGE, 'height': 419, 'width': 630},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/7.jpg', 'type':MEDIATYPE.IMAGE, 'height': 606, 'width': 848},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/8.jpg', 'type':MEDIATYPE.IMAGE, 'height': 267, 'width': 400},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/9.jpg', 'type':MEDIATYPE.IMAGE, 'height': 667, 'width': 1000},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/video.mp4', 'type':MEDIATYPE.VIDEO, 'height': 0, 'width': 0}],
				    'id': 1,
				    'student': [{'name':'Nguyễn Văn A', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn B', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn C', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn D', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn E', 'code':'588888', 'class':'K58QLTT'}],
				    'history': [{'date':'18/03/2017 12:00', 'position':{'lat': 21.045952, 'lng': 105.876832}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.050450, 'lng': 105.892582}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.032186, 'lng': 105.909748}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 20.998535, 'lng': 105.937557}, 'type': ICONTYPE.CNTT}
					]},

					{'position': {'lat': 21.017444, 'lng': 105.898762},
					'type': ICONTYPE.CNSH,
					'name': "Đoàn 06",
					'boss': "Ngô Công Thắng",
					'faculty': "Công nghệ thông tin",
					'department': "Công nghệ phần mềm",
					'address': {'name': 'Học viện Nông Nghiệp Việt Nam',
								'specific_add': 'Số 286 Đội Cấn, Phường Cống Vị',
								'township': 'Ba Đình',
								'city': 'Hà Nội',
								'phone': '0488888888'},
				    'time': {'startDate': "01/01/2017", 'endDate': "10/01/2017"},
				    'media': [{'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/4.jpg', 'type':MEDIATYPE.IMAGE, 'height': 1131, 'width': 1698, 
				    			'comments': [{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 1, 'childs':null},
											{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 2, 'childs':[{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null},
																																																			{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null}]}]},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/5.jpg', 'type':MEDIATYPE.IMAGE, 'height': 333, 'width': 500},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/6.jpg', 'type':MEDIATYPE.IMAGE, 'height': 419, 'width': 630},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/7.jpg', 'type':MEDIATYPE.IMAGE, 'height': 606, 'width': 848},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/8.jpg', 'type':MEDIATYPE.IMAGE, 'height': 267, 'width': 400},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/9.jpg', 'type':MEDIATYPE.IMAGE, 'height': 667, 'width': 1000},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/video.mp4', 'type':MEDIATYPE.VIDEO, 'height': 0, 'width': 0}],
				    'id': 1,
				    'student': [{'name':'Nguyễn Văn A', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn B', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn C', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn D', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn E', 'code':'588888', 'class':'K58QLTT'}],
				    'history': [{'date':'18/03/2017 12:00', 'position':{'lat': 21.045952, 'lng': 105.876832}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.050450, 'lng': 105.892582}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.032186, 'lng': 105.909748}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 20.998535, 'lng': 105.937557}, 'type': ICONTYPE.CNTT}
					]},

					{'position': {'lat': 21.112277, 'lng': 106.015835},
					'type': ICONTYPE.KTQT,
					'name': "Đoàn 07",
					'boss': "Ngô Công Thắng",
					'faculty': "Công nghệ thông tin",
					'department': "Công nghệ phần mềm",
					'address': {'name': 'Học viện Nông Nghiệp Việt Nam',
								'specific_add': 'Số 286 Đội Cấn, Phường Cống Vị',
								'township': 'Ba Đình',
								'city': 'Hà Nội',
								'phone': '0488888888'},
				    'time': {'startDate': "01/01/2017", 'endDate': "10/01/2017"},
				    'media': [{'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/4.jpg', 'type':MEDIATYPE.IMAGE, 'height': 1131, 'width': 1698, 
				    			'comments': [{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 1, 'childs':null},
											{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 2, 'childs':[{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null},
																																																			{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null}]}]},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/5.jpg', 'type':MEDIATYPE.IMAGE, 'height': 333, 'width': 500},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/6.jpg', 'type':MEDIATYPE.IMAGE, 'height': 419, 'width': 630},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/7.jpg', 'type':MEDIATYPE.IMAGE, 'height': 606, 'width': 848},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/8.jpg', 'type':MEDIATYPE.IMAGE, 'height': 267, 'width': 400},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/9.jpg', 'type':MEDIATYPE.IMAGE, 'height': 667, 'width': 1000},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/video.mp4', 'type':MEDIATYPE.VIDEO, 'height': 0, 'width': 0}],
				    'id': 1,
				    'student': [{'name':'Nguyễn Văn A', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn B', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn C', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn D', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn E', 'code':'588888', 'class':'K58QLTT'}],
				    'history': [{'date':'18/03/2017 12:00', 'position':{'lat': 21.045952, 'lng': 105.876832}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.050450, 'lng': 105.892582}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.032186, 'lng': 105.909748}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 20.998535, 'lng': 105.937557}, 'type': ICONTYPE.CNTT}
					]},

					{'position': {'lat': 21.017444, 'lng': 105.989056},
					'type': ICONTYPE.LLCT,
					'name': "Đoàn 08",
					'boss': "Ngô Công Thắng",
					'faculty': "Công nghệ thông tin",
					'department': "Công nghệ phần mềm",
					'address': {'name': 'Học viện Nông Nghiệp Việt Nam',
								'specific_add': 'Số 286 Đội Cấn, Phường Cống Vị',
								'township': 'Ba Đình',
								'city': 'Hà Nội',
								'phone': '0488888888'},
				    'time': {'startDate': "01/01/2017", 'endDate': "10/01/2017"},
				    'media': [{'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/4.jpg', 'type':MEDIATYPE.IMAGE, 'height': 1131, 'width': 1698, 
				    			'comments': [{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 1, 'childs':null},
											{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 2, 'childs':[{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null},
																																																			{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null}]}]},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/5.jpg', 'type':MEDIATYPE.IMAGE, 'height': 333, 'width': 500},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/6.jpg', 'type':MEDIATYPE.IMAGE, 'height': 419, 'width': 630},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/7.jpg', 'type':MEDIATYPE.IMAGE, 'height': 606, 'width': 848},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/8.jpg', 'type':MEDIATYPE.IMAGE, 'height': 267, 'width': 400},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/9.jpg', 'type':MEDIATYPE.IMAGE, 'height': 667, 'width': 1000},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/video.mp4', 'type':MEDIATYPE.VIDEO, 'height': 0, 'width': 0}],
				    'id': 1,
				    'student': [{'name':'Nguyễn Văn A', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn B', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn C', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn D', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn E', 'code':'588888', 'class':'K58QLTT'}],
				    'history': [{'date':'18/03/2017 12:00', 'position':{'lat': 21.045952, 'lng': 105.876832}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.050450, 'lng': 105.892582}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.032186, 'lng': 105.909748}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 20.998535, 'lng': 105.937557}, 'type': ICONTYPE.CNTT}
					]},

					{'position': {'lat': 21.057179, 'lng': 105.797138},
					'type': ICONTYPE.MT,
					'name': "Đoàn 09",
					'boss': "Ngô Công Thắng",
					'faculty': "Công nghệ thông tin",
					'department': "Công nghệ phần mềm",
					'address': {'name': 'Học viện Nông Nghiệp Việt Nam',
								'specific_add': 'Số 286 Đội Cấn, Phường Cống Vị',
								'township': 'Ba Đình',
								'city': 'Hà Nội',
								'phone': '0488888888'},
				    'time': {'startDate': "01/01/2017", 'endDate': "10/01/2017"},
				    'media': [{'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/4.jpg', 'type':MEDIATYPE.IMAGE, 'height': 1131, 'width': 1698, 
				    			'comments': [{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 1, 'childs':null},
											{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 2, 'childs':[{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null},
																																																			{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null}]}]},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/5.jpg', 'type':MEDIATYPE.IMAGE, 'height': 333, 'width': 500},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/6.jpg', 'type':MEDIATYPE.IMAGE, 'height': 419, 'width': 630},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/7.jpg', 'type':MEDIATYPE.IMAGE, 'height': 606, 'width': 848},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/8.jpg', 'type':MEDIATYPE.IMAGE, 'height': 267, 'width': 400},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/9.jpg', 'type':MEDIATYPE.IMAGE, 'height': 667, 'width': 1000},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/video.mp4', 'type':MEDIATYPE.VIDEO, 'height': 0, 'width': 0}],
				    'id': 1,
				    'student': [{'name':'Nguyễn Văn A', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn B', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn C', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn D', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn E', 'code':'588888', 'class':'K58QLTT'}],
				    'history': [{'date':'18/03/2017 12:00', 'position':{'lat': 21.045952, 'lng': 105.876832}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.050450, 'lng': 105.892582}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.032186, 'lng': 105.909748}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 20.998535, 'lng': 105.937557}, 'type': ICONTYPE.CNTT}
					]},

					{'position': {'lat': 21.056858, 'lng': 105.964680},
					'type': ICONTYPE.NH,
					'name': "Đoàn 10",
					'boss': "Ngô Công Thắng",
					'faculty': "Công nghệ thông tin",
					'department': "Công nghệ phần mềm",
					'address': {'name': 'Học viện Nông Nghiệp Việt Nam',
								'specific_add': 'Số 286 Đội Cấn, Phường Cống Vị',
								'township': 'Ba Đình',
								'city': 'Hà Nội',
								'phone': '0488888888'},
				    'time': {'startDate': "01/01/2017", 'endDate': "10/01/2017"},
				    'media': [{'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/4.jpg', 'type':MEDIATYPE.IMAGE, 'height': 1131, 'width': 1698, 
				    			'comments': [{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 1, 'childs':null},
											{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 2, 'childs':[{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null},
																																																			{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null}]}]},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/5.jpg', 'type':MEDIATYPE.IMAGE, 'height': 333, 'width': 500},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/6.jpg', 'type':MEDIATYPE.IMAGE, 'height': 419, 'width': 630},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/7.jpg', 'type':MEDIATYPE.IMAGE, 'height': 606, 'width': 848},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/8.jpg', 'type':MEDIATYPE.IMAGE, 'height': 267, 'width': 400},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/9.jpg', 'type':MEDIATYPE.IMAGE, 'height': 667, 'width': 1000},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/video.mp4', 'type':MEDIATYPE.VIDEO, 'height': 0, 'width': 0}],
				    'id': 1,
				    'student': [{'name':'Nguyễn Văn A', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn B', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn C', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn D', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn E', 'code':'588888', 'class':'K58QLTT'}],
				    'history': [{'date':'18/03/2017 12:00', 'position':{'lat': 21.045952, 'lng': 105.876832}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.050450, 'lng': 105.892582}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.032186, 'lng': 105.909748}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 20.998535, 'lng': 105.937557}, 'type': ICONTYPE.CNTT}
					]},

					{'position': {'lat': 21.078964, 'lng': 105.933094},
					'type': ICONTYPE.QLDD,
					'name': "Đoàn 11",
					'boss': "Ngô Công Thắng",
					'faculty': "Công nghệ thông tin",
					'department': "Công nghệ phần mềm",
					'address': {'name': 'Học viện Nông Nghiệp Việt Nam',
								'specific_add': 'Số 286 Đội Cấn, Phường Cống Vị',
								'township': 'Ba Đình',
								'city': 'Hà Nội',
								'phone': '0488888888'},
				    'time': {'startDate': "01/01/2017", 'endDate': "10/01/2017"},
				    'media': [{'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/4.jpg', 'type':MEDIATYPE.IMAGE, 'height': 1131, 'width': 1698, 
				    			'comments': [{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 1, 'childs':null},
											{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 2, 'childs':[{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null},
																																																			{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null}]}]},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/5.jpg', 'type':MEDIATYPE.IMAGE, 'height': 333, 'width': 500},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/6.jpg', 'type':MEDIATYPE.IMAGE, 'height': 419, 'width': 630},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/7.jpg', 'type':MEDIATYPE.IMAGE, 'height': 606, 'width': 848},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/8.jpg', 'type':MEDIATYPE.IMAGE, 'height': 267, 'width': 400},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/9.jpg', 'type':MEDIATYPE.IMAGE, 'height': 667, 'width': 1000},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/video.mp4', 'type':MEDIATYPE.VIDEO, 'height': 0, 'width': 0}],
				    'id': 1,
				    'student': [{'name':'Nguyễn Văn A', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn B', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn C', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn D', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn E', 'code':'588888', 'class':'K58QLTT'}],
				    'history': [{'date':'18/03/2017 12:00', 'position':{'lat': 21.045952, 'lng': 105.876832}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.050450, 'lng': 105.892582}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.032186, 'lng': 105.909748}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 20.998535, 'lng': 105.937557}, 'type': ICONTYPE.CNTT}
					]},

					{'position': {'lat': 21.023213, 'lng': 105.930691},
					'type': ICONTYPE.SP,
					'name': "Đoàn 12",
					'boss': "Ngô Công Thắng",
					'faculty': "Công nghệ thông tin",
					'department': "Công nghệ phần mềm",
					'address': {'name': 'Học viện Nông Nghiệp Việt Nam',
								'specific_add': 'Số 286 Đội Cấn, Phường Cống Vị',
								'township': 'Ba Đình',
								'city': 'Hà Nội',
								'phone': '0488888888'},
				    'time': {'startDate': "01/01/2017", 'endDate': "10/01/2017"},
				    'media': [{'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/4.jpg', 'type':MEDIATYPE.IMAGE, 'height': 1131, 'width': 1698, 
				    			'comments': [{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 1, 'childs':null},
											{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 2, 'childs':[{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null},
																																																			{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null}]}]},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/5.jpg', 'type':MEDIATYPE.IMAGE, 'height': 333, 'width': 500},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/6.jpg', 'type':MEDIATYPE.IMAGE, 'height': 419, 'width': 630},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/7.jpg', 'type':MEDIATYPE.IMAGE, 'height': 606, 'width': 848},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/8.jpg', 'type':MEDIATYPE.IMAGE, 'height': 267, 'width': 400},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/9.jpg', 'type':MEDIATYPE.IMAGE, 'height': 667, 'width': 1000},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/video.mp4', 'type':MEDIATYPE.VIDEO, 'height': 0, 'width': 0}],
				    'id': 1,
				    'student': [{'name':'Nguyễn Văn A', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn B', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn C', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn D', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn E', 'code':'588888', 'class':'K58QLTT'}],
				    'history': [{'date':'18/03/2017 12:00', 'position':{'lat': 21.045952, 'lng': 105.876832}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.050450, 'lng': 105.892582}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.032186, 'lng': 105.909748}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 20.998535, 'lng': 105.937557}, 'type': ICONTYPE.CNTT}
					]},

					{'position': {'lat': 21.122205, 'lng': 105.926228},
					'type': ICONTYPE.TY,
					'name': "Đoàn 13",
					'boss': "Ngô Công Thắng",
					'faculty': "Công nghệ thông tin",
					'department': "Công nghệ phần mềm",
					'address': {'name': 'Học viện Nông Nghiệp Việt Nam',
								'specific_add': 'Số 286 Đội Cấn, Phường Cống Vị',
								'township': 'Ba Đình',
								'city': 'Hà Nội',
								'phone': '0488888888'},
				    'time': {'startDate': "01/01/2017", 'endDate': "10/01/2017"},
				    'media': [{'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/4.jpg', 'type':MEDIATYPE.IMAGE, 'height': 1131, 'width': 1698, 
				    			'comments': [{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 1, 'childs':null},
											{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 2, 'childs':[{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null},
																																																			{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null}]}]},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/5.jpg', 'type':MEDIATYPE.IMAGE, 'height': 333, 'width': 500},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/6.jpg', 'type':MEDIATYPE.IMAGE, 'height': 419, 'width': 630},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/7.jpg', 'type':MEDIATYPE.IMAGE, 'height': 606, 'width': 848},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/8.jpg', 'type':MEDIATYPE.IMAGE, 'height': 267, 'width': 400},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/9.jpg', 'type':MEDIATYPE.IMAGE, 'height': 667, 'width': 1000},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/video.mp4', 'type':MEDIATYPE.VIDEO, 'height': 0, 'width': 0}],
				    'id': 1,
				    'student': [{'name':'Nguyễn Văn A', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn B', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn C', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn D', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn E', 'code':'588888', 'class':'K58QLTT'}],
				    'history': [{'date':'18/03/2017 12:00', 'position':{'lat': 21.045952, 'lng': 105.876832}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.050450, 'lng': 105.892582}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.032186, 'lng': 105.909748}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 20.998535, 'lng': 105.937557}, 'type': ICONTYPE.CNTT}
					]},

					{'position': {'lat': 21.027379, 'lng': 105.988369},
					'type': ICONTYPE.TS,
					'name': "Đoàn 14",
					'boss': "Ngô Công Thắng",
					'faculty': "Công nghệ thông tin",
					'department': "Công nghệ phần mềm",
					'address': {'name': 'Học viện Nông Nghiệp Việt Nam',
								'specific_add': 'Số 286 Đội Cấn, Phường Cống Vị',
								'township': 'Ba Đình',
								'city': 'Hà Nội',
								'phone': '0488888888'},
				    'time': {'startDate': "01/01/2017", 'endDate': "10/01/2017"},
				    'media': [{'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/4.jpg', 'type':MEDIATYPE.IMAGE, 'height': 1131, 'width': 1698, 
				    			'comments': [{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 1, 'childs':null},
											{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'id': 2, 'childs':[{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null},
																																																			{'content':'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'timespan':'1 tiếng trước', 'userFullName':'Ngô Công Thắng', 'userAvatar':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/avatar.png', 'childs':null}]}]},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/5.jpg', 'type':MEDIATYPE.IMAGE, 'height': 333, 'width': 500},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/6.jpg', 'type':MEDIATYPE.IMAGE, 'height': 419, 'width': 630},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/7.jpg', 'type':MEDIATYPE.IMAGE, 'height': 606, 'width': 848},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/8.jpg', 'type':MEDIATYPE.IMAGE, 'height': 267, 'width': 400},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/9.jpg', 'type':MEDIATYPE.IMAGE, 'height': 667, 'width': 1000},
				    		  {'url':'https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/Marker_media/video.mp4', 'type':MEDIATYPE.VIDEO, 'height': 0, 'width': 0}],
				    'id': 1,
				    'student': [{'name':'Nguyễn Văn A', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn B', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn C', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn D', 'code':'588888', 'class':'K58QLTT'},
				    			{'name':'Nguyễn Văn E', 'code':'588888', 'class':'K58QLTT'}],
				    'history': [{'date':'18/03/2017 12:00', 'position':{'lat': 21.045952, 'lng': 105.876832}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.050450, 'lng': 105.892582}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 21.032186, 'lng': 105.909748}, 'type': ICONTYPE.CNTT},
							    {'date':'18/03/2017 12:00', 'position':{'lat': 20.998535, 'lng': 105.937557}, 'type': ICONTYPE.CNTT}
					]}];

$(document).ready(function(){
	// Sự kiện khi click nút tìm kiếm trên thanh toolbox
	$('#search').click(function(){
		$(this).parent().toggleClass('search-open');
		if($(this).parent().hasClass('search-open'))
		{
			$('#search-box').show();
			$('#search-box').animate({
				width: '400px',
			}, 1000);	
		}
		else
		{
			$('#search-box').animate({
				width: '0px',
			}, 1000);	

			setTimeout(function(){
				$('#search-box').hide();
			}, 950);	
		}
	})

	$('.static-background').on('click', function(){
		//if($('body').hasClass('filter-open')){
		//	$('#filter').click();
		//}
		//if($('body').hasClass('explain-open')){
		//	$('#explain').click();
		//}
	})

	// Sự kiện khi click nút tăng độ zoom trên thanh toolbox
	$('#plus').click(function(){
		if(mapObj)
		{
			mapObj.setZoom(mapObj.getZoom() + zoomTick);
		}
	})

	// Sự kiện khi click nút giảm độ zoom trên thanh toolbox
	$('#minus').click(function(){
		if(mapObj)
		{
			mapObj.setZoom(mapObj.getZoom() - zoomTick);
		}	
	})

	$('#filter').click(function(){
		if($(window).width() < 768 && $('body').hasClass('explain-open')){
			$('#explain').click();
		}

		$('body').toggleClass('filter-open');
		if($('body').hasClass('filter-open')){
			$('#filter-box').show();
			//$('#filter-box').animate({
			//	width: '30%',
			//}, 1000);
		}
		else
		{
			$('#filter-box').hide();
			//$('#filter-box').animate({
			//	width: '0px',
			//}, 1000);

			if(mapObj)
			{
				mapObj.clearStaticMarkerAnimation();
			}

			setTimeout(function(){
				$('#filter-box').hide();
			}, 950);	
		}
		recenterGoogleMap(mapObj);
	})

	$('#explain').click(function(){
		if($(window).width() < 768 && $('body').hasClass('filter-open')){
			$('#filter').click();
		}

		$('body').toggleClass('explain-open');
		if($('body').hasClass('explain-open')){
			$('#explain-box').show();
			//$('#explain-box').animate({
			//	width: '250px',
			//}, 1000);
		}
		else{
			$('#explain-box').hide();
			//$('#explain-box').animate({
			//	width: '0px',
			//}, 1000);

			setTimeout(function(){
				$('#explain-box').hide();
			}, 950);	
		}
		recenterGoogleMap(mapObj);
	})

	$(document).on('click', '[data-toggle="myCollapse"]', function(){
		var data_target = $(this).attr('data-target');
		$(data_target).slideToggle(1000);

		if($(this).find('span').hasClass('glyphicon'))
		{
			$(this).find('span').toggleClass('glyphicon-chevron-down');
		}
	})

	$('a[data-type="display-history"').click(function(){
		$('#detail-modal .row:nth-child(1)').toggle(1000);
		$('#detail-modal .row:nth-child(2)').toggle(1000);
		setTimeout(function(){
			recenterGoogleMap(mapsmObj);
			// Reopen my position
			if(mapsmObj.getMarkerMyLocation()){
				mapsmObj.getMarkerMyLocation().getInfoWindow().getInfoWindowObj().close();	
			}
			
			setTimeout(function(){
				mapsmObj.getMarkerMyLocation().getInfoWindow().getInfoWindowObj().open(mapsmObj.getMapObj(), mapsmObj.getMarkerMyLocation().getMarkerObj());
			}, 1000);
		}, 1000);
	})

	$('a[data-type="display-media"]').click(function(){
		var id = parseInt($('#detail-modal').find('[data-bind="id"]').val());
		//viewMedia(id);
		//$('#media-modal .modal-body>div:nth-child(1)').hide();
		//$('#media-modal .modal-body>div:nth-child(2)').show();
		$('#album-modal').modal('toggle');

		var mediaFiles = mapObj.getSelectedMarker().getInfoWindow().getMediaFiles();
		var wrapper = $('#album-modal .modal-body>div');
		wrapper.html('');
		if(mediaFiles)
		{
			var selectedIndex = mapObj.getSelectedMarker().getInfoWindow().getMediaSelectedIndex();
			
			for(var i = 0; i < mediaFiles.length; i++){
				mediaFiles[i].installMember(false);
				var div = $('<div class="col-xs-3"></div>');
				var background;

				if(mediaFiles[i].getType() == MEDIATYPE.IMAGE){
					background = $('<div data-index="' + i + '" data-type="view-media" data-id="' + id + '" style="background-image:url(' + mediaFiles[i].getUrl() + ')"></div>');

					if(mediaFiles[i].getHeight() / mediaFiles[i].getWidth() > 1){
						background.addClass('vertical');
					}
					else{
						background.addClass('horizontal');
					}
				}
				else{
					background = $('<video data-index="' + i + '" data-type="view-media" data-id="' + id + '" src="' + mediaFiles[i].getUrl() + '" controls></video>');	
				}

				if(i == selectedIndex){
					background.addClass('active');
				}

				div.append(background);
				div.append('<img src="https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/map-sm.png" style="width: 100%;">');
				wrapper.append(div);
			}	
		}
	});

	$(document).on('click', '#media-modal .director', function(){
		var idOfElem = $(this).parent().attr('data-id');
		if($(this).hasClass('left')){
			$('#' + idOfElem).find('.director.left').click();	
		}
		else{
			$('#' + idOfElem).find('.director.right').click();
		}
		var newContent = $('#' + idOfElem).find('.infoWindowContent').clone();
		$('#media-modal>div.modal-dialog>div.modal-content>div.modal-body>div.row>div:nth-child(1)').find('.infoWindowContent').remove();
		$('#media-modal>div.modal-dialog>div.modal-content>div.modal-body>div.row>div:nth-child(1)').find('.infoWindow-wrapper').append(newContent);
		$('#media-modal div[data-type="display-mess"]').html(parseComment(mapObj.getSelectedMarker().getInfoWindow().getSelectedMedia().getComment(), false).html());
	})

	$(document).on('click', 'a[data-type="view-feedback"]', function(){
		$(this).parent().next().next().find('>div[data-type="mess"]').slideToggle(100);
	})

	$(document).on('click', 'a[data-type="post-comment"]', function(){
		$(this).parent().next().next().find('>div:last-child').slideToggle(100);
	})

	$('a[data-bind="address"]').popover({
        html: true,
        trigger: 'hover',
        content: function(){
			var data = mapObj.getSelectedMarker().getInfoWindow().getAddress();
        	//var table = $('<table class="table no-margin"></table>');
        	//table.append('<tr><td>Tên:</td></tr>');
        	//table.append('<tr><td>' + data.name + '</td></tr>');
        	//table.append('<tr><td>Địa chỉ:</td></tr>');
        	//table.append('<tr><td>' + data.specific_add + '</td></tr>');
        	//table.append('<tr><td>Quận/Huyện:</td></tr>');
        	//table.append('<tr><td>' + data.township + '</td></tr>');
        	//table.append('<tr><td>Thành phố:</td></tr>');
        	//table.append('<tr><td>' + data.city + '</td></tr>');
        	//table.append('<tr><td>Điện thoại:</td></tr>');
        	//table.append('<tr><td>' + data.phone + '</td></tr>');
        	var div = $('<div class="row"></div>');
        	div.append('<div class="col-xs-12">Tên: <strong>' + data.name + '</strong></div>');
        	div.append('<div class="col-xs-12">Địa chỉ: <strong>' + data.specific_add + '</strong></div>');
        	div.append('<div class="col-xs-12">Quận/Huyện: <strong>' + data.township + '</strong></div>');
        	div.append('<div class="col-xs-12">Thành phố: <strong>' + data.city + '</strong></div>');
        	div.append('<div class="col-xs-12">Điện thoại: <strong>' + data.phone + '</strong></div>');

        	return div;
        },
        placement: 'bottom',
        title: 'Thông tin địa điểm',
    });

    $(document).on('click', '#album-modal .modal-body>div>div>[data-type="view-media"]', function(){
    	var allMediaDiv = $('#album-modal [data-type="view-media"]');
    	allMediaDiv.removeClass('active');
    	$(this).addClass('active');

    	var id = $(this).attr('data-id');
    	var index = parseInt($(this).attr('data-index'));
    	mapObj.getSelectedMarker().getInfoWindow().setMediaSelectedIndex(index);
    	viewMedia('#infowindow' + id);
    })

    $("#media-modal").on('hide.bs.modal', function () {
    	var index = parseInt(mapObj.getSelectedMarker().getInfoWindow().getMediaSelectedIndex());
    	var allMediaDiv = $('#album-modal [data-type="view-media"]');
    	allMediaDiv.removeClass('active');

    	$(allMediaDiv[index]).addClass('active');
    })

    $('.modal[role="dialog"]').on('hidden.bs.modal', function(){
    	var dialog = $('.modal[role="dialog"]');
    	var anyStillShow = false;
    	for(var i = 0; i < dialog.length; i++){
    		if($(dialog[i]).css('display') == 'block'){
    			anyStillShow = true;
    			break;
    		}
    	}

    	if(anyStillShow){
    		$('body').addClass('modal-open');
    	}
    })

    if($(window).width() < 768){
    	$('.main-body').onSwipe('right', function(){
    		if($('body').hasClass('explain-open')){
    			$('#explain').click();
    		}

    		if($('body').hasClass('filter-open')){
    			$('#filter').click();
    		}
    	})
    }
})

function initMap(){
    var element = document.getElementById('map');
    if(element)
    {
        mapObj = new map(google.maps, element, markersJson, true, viewDetail, viewMedia);
        mapObj.installMember(true, true);

        // For install search box
        var input = document.getElementById('search-box');
        if(input)
        {
        	var searchBox = new google.maps.places.SearchBox(input);
        	if(mapObj)
        	{
        		if(mapObj.getMapObj())
        		{
        			mapObj.getMapObj().controls[google.maps.ControlPosition.TOP_RIGHT].push(input);
        			mapObj.getMapObj().addListener('bounds_changed', function () {
				        searchBox.setBounds(mapObj.getMapObj().getBounds());
				    });

				    searchBox.addListener('places_changed', function () {
				        var places = searchBox.getPlaces();

				        if (places.length == 0) {
				            return;
				        }

				        var place = places[0];

				        mapObj.setSelectorMarker(place.geometry.location);
				        mapObj.setCenter(mapObj.getSelectorMarker());
				    });
        		}
        	}
        }

        // Init result list
        var ul = document.createElement('ul');
        for(var i = 0; i < markersJson.length; i++)
        {
        	var item = markersJson[i];
        	var li = document.createElement('li');
        	var div = document.createElement('div');
        	$(div).html(getDisplayInfo(item));
        	$(li).append(div);
        	$(li).css('background-image', 'url(' + (new icon(item.type)).getUrl() + ')')

        	$(ul).append(li);
        }
        if($('#results').find('ul').length == 0)
        {
        	$('#results').append(ul);

			// Init result popover
			$('#results>ul>li').popover({
		        html: true,
		        trigger: 'hover',
		        content: function(){
		        	return $(this).clone().html();
		        },
		        placement: 'left'
		    });

		    $(document).on('click', '#results>ul>li', function(){
		    	var index = $("#results>ul>li").index($(this));
		    	if(mapObj)
		    	{
		    		var chooseMarker = mapObj.getStaticMarker(index);
		    		if(chooseMarker)
		    		{
		    			mapObj.setZoom(defaultZoomVal);
		    			mapObj.setCenter(chooseMarker);
		    			mapObj.clearStaticMarkerAnimation();
		    			if($(window).width() < 768){
							google.maps.event.trigger(chooseMarker.getMarkerObj(), 'click');
		    			}
		    			else{
		    				chooseMarker.getMarkerObj().setAnimation(google.maps.Animation.BOUNCE);	
		    			}
		    		}	
		    	}
		    })
        }
    }

    element = document.getElementById('map-sm');
    if(element)
    {
    	mapsmObj = new map(google.maps, element, null);
        mapsmObj.installMember(true, false);
        setTimeout(function(){
        	// set lại chiều cao cho element chứa map đảm bảo rằng nó luôn luôn vuông
        	$('#map-sm').prepend('<img src="https://vantrung1408.github.io/gm/Contents/03_images/01_myImages/map-sm.png" style="width: 100%;">');
        }, 1000);

        $("#detail-modal").on("shown.bs.modal", function () {
		    recenterGoogleMap(mapsmObj);
		});
    }
}

function recenterGoogleMap(map){
	var center = map.getCenter();
	if(center){
		map.resizeTrigger(center);
	}
}

function viewDetail(markerJson){
	var t = $('#detail-modal');

	$('#detail-modal .row:nth-child(1)').show();
	$('#detail-modal .row:nth-child(2)').hide();

	t.modal('show');

	// Clear all static marker
	mapsmObj.clearAllStaticMarker();

	// Binding data here
	bindingMap(t, 'name', markerJson.name);
	bindingMap(t, 'faculty', markerJson.faculty);
	bindingMap(t, 'department', markerJson.department);
	bindingMap(t, 'boss', markerJson.boss);
	bindingMap(t, 'dtFrom', markerJson.time.startDate);
	bindingMap(t, 'dtTo', markerJson.time.endDate);
	bindingMap(t, 'address', markerJson.address.name);
	bindingMap(t, 'id', markerJson.id);

	t = t.find('[data-bind="student"]>tbody');
	if(t){
		t.html('');
		for(var i = 0; i < markerJson.student.length; i++){
			var tr = document.createElement('tr');
			tr = $(tr);
			tr.append('<th>' + (i + 1) + '</th>');
			tr.append('<td>' + markerJson.student[i].code + '</td>');
			tr.append('<td>' + markerJson.student[i].name + '</td>');
			tr.append('<td>' + markerJson.student[i].class + '</td>');
			t.append(tr);
		}
	}

	t = $('#detail-modal').find('[data-bind="history"]>tbody');
	if(t){
		t.html('');
		for(var i = 0; i < markerJson.history.length; i++){
			var tr = document.createElement('tr');
			tr = $(tr);
			tr.append('<th>' + (i + 1) + '</th>');
			tr.append('<td>' + markerJson.history[i].date + '</td>');
			mapsmObj.addStaticMarker(markerJson.history[i].position, markerJson.history[i].type, tr);
			t.append(tr);

			// attack hover function
			tr.on('mouseenter', function(){
				var index = parseInt($(this).attr('data-index'));
				if(index != null){
					//Dừng tất cả trạng thái chuyển động của static markers đồng thời đóng tất cả cửa sổ thông tin
					mapsmObj.setZoom(defaultZoomVal);
					mapsmObj.clearStaticMarkerAnimation();
					mapsmObj.closeAllStaticMarkersInfoWindow();

					var mk = mapsmObj.getStaticMarker(index);
					mapsmObj.setCenter(mk);
					//mk.getMarkerObj().setAnimation(google.maps.Animation.DROP);
					mk.getInfoWindow().getInfoWindowObj().open(mapsmObj.getMapObj(), mk.getMarkerObj());
				}
			}).on('mouseleave', function(){
				mapsmObj.clearStaticMarkerAnimation();
				mapsmObj.closeAllStaticMarkersInfoWindow();
				mapsmObj.setCenter(mapsmObj.getMarkerMyLocation());
			})
		}
		mapsmObj.initMarkerCluster();
	}
}

function bindingMap(elem, bindingPath, bindingValue){
	elem.find('[data-bind="' + bindingPath + '"]').text(bindingValue);
	elem.find('[data-bind="' + bindingPath + '"]').val(bindingValue);
	elem.find('[data-bind="' + bindingPath + '"]').attr('title', bindingValue);
}

function viewMedia(id = null){
	$('#media-modal').modal('toggle');

	var t = $(id).clone();
	var idOfElem = t.attr('id');
	t.attr('id', '');
	t.attr('data-id', idOfElem);

	$('#media-modal>div.modal-dialog>div.modal-content>div.modal-body>div.row:nth-child(1)>div:nth-child(1)').html($('<div />').append(t).html());
	$('#media-modal div[data-type="display-mess"]').html(parseComment(mapObj.getSelectedMarker().getInfoWindow().getSelectedMedia().getComment(), false).html());

    if($(window).width() < 768){
    	$('.infoWindow-wrapper[data-id=' + idOfElem + ']').onSwipe('left', function(){
    		$('.infoWindow-wrapper[data-id=' + idOfElem + ']>.right').click();
    	}).onSwipe('right', function(){
    		$('.infoWindow-wrapper[data-id=' + idOfElem + ']>.left').click();
    	})
    }
}

// Xử lý đoạn json và trả về thẻ div tổng chứa giao diện comment
function parseComment(commentJson, isChild){
	if(commentJson)
	{
		var displayMess = document.createElement('div');
		displayMess = $(displayMess);
		var clearfix = $('<div class="clearfix"></div>');

		for(var i = 0; i < commentJson.length; i++){
			var comment = commentJson[i];
			var mess = $('<div data-type="mess"></div>');
			var col_xs_12 = $('<div class="col-xs-12 no-padding"></div>');
			
			var child = $('<div class="avatar"></div>');
			child.html('<img src="' + comment.userAvatar + '" alt="DSE_FITA"/>');
			col_xs_12.append(child.clone());

			child = $('<div class="user-info"></div>');
			child.html('<p>' + comment.userFullName + '</p><p>' + comment.timespan + '</p>');
			col_xs_12.append(child.clone());
			mess.append(col_xs_12.clone());

			col_xs_12.html('<p>' + comment.content + '</p>');

			if(isChild == true){
				mess.attr('class', 'col-xs-12 no-padding');
				mess.append(col_xs_12);
				displayMess.append(mess);
			}
			else{
				var div = $('<div></div>');
				child = $('<div class="pull-right"></div>');
				if(comment.childs && comment.childs.length > 0){
					child.append('<a data-type="view-feedback">Phản hồi (' + comment.childs.length + ')</a> - <a data-parent-id="1" data-type="post-comment">Trả lời</a>');
				}
				else{
					child.append('<a data-parent-id="' + comment.id + '" data-type="post-comment">Trả lời</a>');	
				}

				div.append(child.clone());
				div.append(clearfix.clone());
				child = $('<div class="row no-margin"></div>');
				//child.append('<div class="col-xs-12 no-padding" data-type="mess"></div>');

				if(comment.childs && comment.childs.length > 0){
					child.html(parseComment(comment.childs, true).html());
				}

				child.append('<div class="col-xs-12 no-padding"></div>');
				child.find('>div:last-child').append('<div class="avatar"><img src="' + current_user_data.avatar + '" alt="DSE_FITA"/></div>');
				child.find('>div:last-child').append('<div class="user-info"></div>');
				child.find('>div:last-child>div.user-info').append('<div class="input-group" data-type="input-mess" data-relation="child"></div>');
				child.find('>div:last-child>div.user-info>div.input-group').append('<input type="text" class="form-control" placeholder="Để lại bình luận...">');
				child.find('>div:last-child>div.user-info>div.input-group').append('<span class="input-group-btn"><button class="btn btn-default" type="button">Gửi</button></span>');
				div.append(child);
				col_xs_12.append(div);
				mess.append(col_xs_12);
				mess.append(clearfix.clone());
				displayMess.append(mess);
			}
		}

		return displayMess;
	}
	else{
		return $('<div></div>');
	}
}

