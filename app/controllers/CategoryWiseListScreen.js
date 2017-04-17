// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var nameTitle = args.name;
var category_id = args.category_id;
$.categoryWiseWin.title = nameTitle;
$.is.init($.categoryWiseNotificationTable);

var tipsList = [];
if (OS_ANDROID) {
	var tipsSearchBar = Ti.UI.Android.createSearchView({
		hintText : "Search",
		hintTextColor : "#ffffff",
		color : "#fff"
	});
	tipsSearchBar.addEventListener('change', function(e){
		var searchTxt = e.source.value;
		var newArr = [];
		for (var i = 0; i < tipsList.length; i++) {
			var title = tipsList[i].list_title;
			var desc = tipsList[i].title_description;
			if (title.toLowerCase().indexOf(searchTxt.toLowerCase()) != -1 || desc.toLowerCase().indexOf(searchTxt.toLowerCase()) != -1) {
				newArr.push(tipsList[i]);
			}
		}
		Alloy.Globals.showtipsList(newArr);
	});
	
	$.categoryWiseWin.addEventListener('open', function() {
		var activity = $.categoryWiseWin.getActivity();
		var actionBar = $.categoryWiseWin.activity.actionBar;
		actionBar.title = nameTitle;
		actionBar.displayHomeAsUp = true;
		actionBar.onHomeIconItemSelected = function() {
			$.categoryWiseWin.close();
		};

		activity.onCreateOptionsMenu = function(e) {
			e.menu.add({
				actionView : tipsSearchBar,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				itemId : Alloy.Globals.Itemid.SEARCH,
			});
		};
		activity.invalidateOptionsMenu();
		
		fetchTips();
	});
}

function callSetting(e) {
	var SettingScreenOpen = Alloy.createController('SettingScreen').getView();
	SettingScreenOpen.open({
		animated : false
	});
};

function getTipsByCategoryWiseSingleApi(viaLoadMore) {
	if (viaLoadMore == false && tipsList.length == 0) {
		Alloy.Globals.LoadingScreen.open();
	}
	var url = Alloy.Globals.Constants.DOMAIN_URL + 'getTips';
	var lastId = "";
	if (tipsList.length > 0 && viaLoadMore) {
		lastId = tipsList[tipsList.length - 1].record_order;
	}
	Ti.API.info('lastID : ' + lastId);
	var userId = Ti.App.Properties.getObject("userDetails").user.id;
	var param = {
		'authKey' : 'llB8eTk=oKtG',
		'app_version' : Titanium.App.version,
		'max_id' : lastId,
		'category_id' : category_id,
		'user_id' : userId
	};
	Ti.API.info('url Tips listing : ' + url);
	Ti.API.info('Tips parameters : ' + JSON.stringify(param));

	Alloy.Globals.Communicator.post(url, param, function(e) {

		Ti.API.info('Response after post :  ' + JSON.stringify(e));
		try {
			if (e.success) {
				var responseData = JSON.parse(e.response);
				if (responseData.status == "true") {
					if (viaLoadMore) {
						tipsList = tipsList.concat(responseData.data);
					} else {
						tipsList = responseData.data;
					}
					if (responseData.data.length > 0) {
						$.noResultLbl.visible = false;
						$.categoryWiseNotificationTable.visible = true;

						Alloy.Globals.showtipsList(tipsList);
						Alloy.Globals.DbManager.Save_TipsAllList(responseData.data);
					}
					Ti.API.info("responseData.total_records = " + responseData.total_records);
					Ti.API.info("contactList.length = " + tipsList.length);

					if (responseData.total_records > tipsList.length) {
						if (viaLoadMore) {
							$.is.state($.is.SUCCESS, "");
						}
					} else {
						if (viaLoadMore) {
							$.is.state($.is.DONE, "");
						}
					}

					if (tipsList.length <= 0) {
						$.noResultLbl.text = L('noResultfound');
						$.noResultLbl.visible = true;
						$.categoryWiseNotificationTable.visible = false;
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

Alloy.Globals.showtipsList = function(tipsList) {
	var tableViewRowArr = [];

	if (tipsList.length > 0) {
		$.noResultLbl.visible = false;
		$.categoryWiseNotificationTable.visible = true;

		for ( i = 0; i < tipsList.length; i++) {
			var row = Ti.UI.createTableViewRow({
				backgroundColor : "transparent",
				//hasChild : true,
				detail : tipsList[i],
				title : tipsList[i].list_title + " " + tipsList[i].title_description,
				color : "transparent",
				selectedColor : "transparent",
				backgroundSelectedColor : "#D9D9D9"
			});

			var tipsTitleLbl = Ti.UI.createLabel({
				left : 20,
				right : 30,
				top : 10,
				bottom : 10,
				color : '#2E3C45',
				text : tipsList[i].list_title,
				height : 34,
				font : {
					fontSize : 15,
					fontFamily : 'calibril',
				}
			});
			if (OS_IOS) {
				row.hasChild = true;
			} else if (OS_ANDROID) {
				var rightArrow = Ti.UI.createImageView({
					height : 13,
					right : 20,
					image : "/images/right_arrow_2.png"
				});
				row.add(rightArrow);
				
				if (tipsTitleLbl.text.length > 85) {
					tipsTitleLbl.text = tipsTitleLbl.text.substr(0, 85) + "...";
				}
			}
			row.add(tipsTitleLbl);
			tableViewRowArr.push(row);
		}
		$.categoryWiseNotificationTable.setData(tableViewRowArr);
	} else {
		$.noResultLbl.text = L('noResultfound');
		$.noResultLbl.visible = true;
		$.categoryWiseNotificationTable.visible = false;
	}
};

// Get Data from Database...
function fetchTips() {
	tipsList = Alloy.Globals.DbManager.Get_tipsAllListByCategory(category_id);
	Alloy.Globals.showtipsList(tipsList);
	getTipsByCategoryWiseSingleApi(false);
	// var fetauredList = Alloy.Globals.DbManager.Get_tipsAllListByCategoryWithoutFeatured(category_id);
	// if (fetauredList.length == 0) {
		// Ti.API.info('Hello call APi');
		// getTipsByCategoryWiseSingleApi(false);
	// } else {
		// Alloy.Globals.showtipsList(tipsList);
		// Ti.API.info('show dB data');
	// }
}

function loadMore(e) {
	setTimeout(function() {
		getTipsByCategoryWiseSingleApi(true);
	}, 500);
}

if(OS_IOS){
	fetchTips();	
}

Ti.App.addEventListener('dataUpdatedTips', function(e) {
	tipsList = Alloy.Globals.DbManager.Get_tipsAllListByCategory(category_id);
	Alloy.Globals.showtipsList(tipsList);
});

function updateNotificationCount() {
	var notificationCount = Ti.App.Properties.getInt('notificationCount');

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

if(OS_IOS){
	Ti.App.addEventListener("notificationupdate", updateNotificationCount);
	updateNotificationCount();
}

function tipsInfoScreen(e) {
	var TipsInfoScreen = Alloy.createController("TipsInfoScreen", e.row.detail).getView();
	if (OS_IOS) {
		Alloy.Globals.tipsNavWin.openWindow(TipsInfoScreen);
	} else if (OS_ANDROID) {
		TipsInfoScreen.open();
	}
}

function openSettingScreen() {
	var openGuideInfo = Alloy.createController("SettingScreen").getView();
	if (OS_IOS) {
		Alloy.Globals.tipsNavWin.openWindow(openGuideInfo);
	}
}

function openNotificationScreen() {
	var notificationScreen = Alloy.createController("NotificationScreen").getView();
	if (OS_IOS) {
		notificationScreen.open();
	}
}

$.categoryWiseWin.addEventListener('close', function(e) {
	Ti.App.removeEventListener("notificationupdate", updateNotificationCount);
});

