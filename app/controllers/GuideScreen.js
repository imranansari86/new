// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.guidNavWin = $.guidNavWin;
var guideList = [];

//Crash app here
//var fb = require('facebook');

$.is.init($.guideNotificationTable);

if (OS_ANDROID) {
	$.guidWindow.addEventListener("focus", function(e) {
		if (Alloy.Globals.searchMenuItem) {
			Alloy.Globals.searchMenuItem.visible = true;
			Alloy.Globals.searchMenuItem.collapseActionView();
		}
		if(Alloy.Globals.searchBar){
			Alloy.Globals.searchBar.addEventListener('change', searchGuides);	
			Alloy.Globals.searchBar.value = "";
		}
	});
	$.guidWindow.addEventListener("blur", function(e) {
		Alloy.Globals.searchBar.removeEventListener('change', searchGuides);
	});

	$.guidWindow.addEventListener("open", function(e) {
		Alloy.Globals.searchBar.addEventListener('change', searchGuides); 
	});

	var searchGuides = function(e) {
		var searchTxt = e.source.value;
		var newArr = [];
		for (var i = 0; i < guideList.length; i++) {
			var title = guideList[i].heading;
			var desc = guideList[i].description;
			if (title.toLowerCase().indexOf(searchTxt.toLowerCase()) != -1 || desc.toLowerCase().indexOf(searchTxt.toLowerCase()) != -1) {
				newArr.push(guideList[i]);
			}
		}
		Alloy.Globals.showGuideList(newArr);
	};

}

function getGuidBySingleApi(viaLoadMore) {
	if (viaLoadMore == false && guideList.length == 0) {
		Alloy.Globals.LoadingScreen.open();
	}
	var url = Alloy.Globals.Constants.DOMAIN_URL + 'getGuides';
	var lastId = "";
	if (guideList.length > 0) {
		lastId = guideList[guideList.length - 1].record_order;
	}
	var userId = Ti.App.Properties.getObject("userDetails").user.id;
	var param = {
		'authKey' : 'llB8eTk=oKtG',
		'app_version' : Titanium.App.version,
		'max_id' : lastId,
		'user_id' : userId
	};
	Ti.API.info('url Guide listing : ' + url);
	Ti.API.info('Guide parameters : ' + JSON.stringify(param));

	Alloy.Globals.Communicator.post(url, param, function(e) {
		Ti.API.info('Response after post :  ' + JSON.stringify(e));
		try {
			if (e.success) {
				var responseData = JSON.parse(e.response);
				if (responseData.status == "true") {
					guideList = guideList.concat(responseData.data);
					if (responseData.data.length > 0) {
						$.noResultLbl.visible = false;
						$.guideNotificationTable.visible = true;

						Alloy.Globals.showGuideList(guideList);
						Alloy.Globals.DbManager.Save_GuideAllList(responseData.data);
					}

					Ti.API.info("responseData.total_records = " + responseData.total_records);
					Ti.API.info("guideList.length = " + guideList.length);

					if (responseData.total_records > guideList.length) {
						$.is.state($.is.SUCCESS, "");
					} else {
						$.is.state($.is.DONE, "");
					}

					if (guideList.length <= 0) {
						$.noResultLbl.text = L('noResultfound');
						$.noResultLbl.visible = true;
						$.guideNotificationTable.visible = false;
						$.is.state($.is.SUCCESS, "Tap to refresh");
					}

				} else if (responseData.status == "false") {
					$.is.state($.is.ERROR, "Tap to retry");
					if (!viaLoadMore) {
						$.noResultLbl.text = L('some_error');
						$.noResultLbl.visible = true;
					}
				} else {
					$.is.state($.is.ERROR, "Tap to retry");
					if (!viaLoadMore) {
						$.noResultLbl.text = L('some_error');
						$.noResultLbl.visible = true;
					}
				}
			} else {
				$.is.state($.is.ERROR, "Tap to retry");
				if (!viaLoadMore) {
					$.noResultLbl.text = L('some_error');
					$.noResultLbl.visible = true;
				}
			}
		} catch(e) {
			$.is.state($.is.ERROR, "Tap to retry");
			if (!viaLoadMore) {
				$.noResultLbl.text = L('some_error');
				$.noResultLbl.visible = true;
			}
		}

		isLoading = false;
		Alloy.Globals.LoadingScreen.close();
	});
}

Alloy.Globals.showGuideList = function(guideList) {
	var tableViewRowArr = [];

	if (guideList.length > 0) {
		$.noResultLbl.visible = false;
		$.guideNotificationTable.visible = true;

		for ( i = 0; i < guideList.length; i++) {
			var row = Ti.UI.createTableViewRow({
				backgroundColor : "transparent",
				detail : guideList[i],
				title : guideList[i].heading + " " + guideList[i].description,
				color : "transparent",
				selectedColor : "transparent",
				backgroundSelectedColor : "#D9D9D9"
			});

			var guideTitleLbl = Ti.UI.createLabel({
				right : 30,
				top : 10,
				bottom : 10,
				color : '#2E3C45',
				text : guideList[i].heading,
				font : {
					fontSize : 15,
					fontFamily : 'calibril',
				}
			});

			if (OS_IOS) {
				row.hasChild = true;
				guideTitleLbl.height = 40;
				guideTitleLbl.left = 20;
			} else if (OS_ANDROID) {
				var rightArrow = Ti.UI.createImageView({
					height : 13,
					right : 15,
					image : "/images/right_arrow_2.png"
				});

				row.add(rightArrow);

				if (guideTitleLbl.text.length > 85) {
					guideTitleLbl.text = guideTitleLbl.text.substr(0, 85) + "...";
				}
				guideTitleLbl.right = 30;
				guideTitleLbl.left = 20;
				guideTitleLbl.height = 34;
			}

			row.add(guideTitleLbl);
			tableViewRowArr.push(row);
		}
		$.guideNotificationTable.setData(tableViewRowArr);
	} else {
		//Alloy.Globals.LoadingScreen.open();
		$.noResultLbl.text = L('noResultfound');
		$.noResultLbl.visible = true;
		$.guideNotificationTable.visible = false;
	}
};

// Get Data from Database...
function fetchGuides() { 
	guideList = Alloy.Globals.DbManager.Get_guideAllList();
	if (guideList.length > 0) {
		Ti.API.info('show list when DB has data: ' + JSON.stringify(guideList));
		Alloy.Globals.showGuideList(guideList);
	} else {
		Ti.API.info('show list when DB blank');
		getGuidBySingleApi(false);
	}
}

function loadMore(e) {
	setTimeout(function() {
		getGuidBySingleApi(true);
	}, 500);
}

fetchGuides();

Ti.App.addEventListener('dataUpdatedGuide', function(e) {
	fetchGuides();
});

function updateNotificationCount() {
	var notificationCount = Ti.App.Properties.getInt('notificationCount');
	Ti.API.info("received notification update in guide list: notificationCount = " + notificationCount);
	if (OS_IOS) {
		if (notificationCount && notificationCount > 0) {
			$.notificationLbl.text = notificationCount + "";
			$.notificationV.visible = true;
		} else {
			$.notificationV.visible = false;
			$.notificationLbl.text = 0 + "";
		}
	}
}

if (OS_IOS) {
	Ti.App.addEventListener("notificationupdate", updateNotificationCount);
	updateNotificationCount();
}

function openGuidInfoScreen(e) {
	var openGuideInfo = Alloy.createController("GuideInfoScreen", e.row.detail).getView();
	if (OS_IOS) {
		Alloy.Globals.guidNavWin.openWindow(openGuideInfo);
	} else if (OS_ANDROID) {
		openGuideInfo.open();
	}
}

function openSettingScreen() {
	var settingScreen = Alloy.createController("SettingScreen").getView();
	if (OS_IOS) {
		Alloy.Globals.guidNavWin.openWindow(settingScreen);
	} else if (OS_ANDROID) {
		settingScreen.open();
	}
}

function openNotificationScreen() {
	var notificationScreen = Alloy.createController("NotificationScreen").getView();
	if (OS_IOS) {
		notificationScreen.open();
	} else if (OS_ANDROID) {
		notificationScreen.open();
	}
}

// $.guidWindow.addEventListener('blur', function(e) {
// Ti.App.removeEventListener("notificationupdate", updateNotificationCount);
// });
//
// if (OS_IOS) {
// $.guidWindow.addEventListener('focus', function(e) {
// Ti.App.addEventListener("notificationupdate", updateNotificationCount);
// });
// }
