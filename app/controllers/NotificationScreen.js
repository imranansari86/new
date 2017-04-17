// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

if (OS_IOS) {
	Alloy.Globals.notificationNavWindow = $.notificationNavWindow;
}

var notificationList = [];

$.is.init($.NotificationTable);

if (OS_ANDROID) {
	Alloy.Globals.notificationNavWindow = $.notificationScreen;

	var notificationSearchBar = Ti.UI.Android.createSearchView({
		hintText : "Search",
		hintTextColor : "#ffffff",
		color : "#fff"
	});
	notificationSearchBar.addEventListener('change', function(e) {
		var searchTxt = e.source.value;
		var newArr = [];
		for (var i = 0; i < notificationList.length; i++) {
			var title = notificationList[i].notification_title;
			var desc = notificationList[i].notification_description;
			if (title.toLowerCase().indexOf(searchTxt.toLowerCase()) != -1 || desc.toLowerCase().indexOf(searchTxt.toLowerCase()) != -1) {
				newArr.push(notificationList[i]);
			}
		}
		showNotificationsList(newArr);
	});

	$.notificationScreen.addEventListener('open', function() {
		var activity = $.notificationScreen.getActivity();
		var actionBar = activity.actionBar;
		actionBar.title = 'Notifications';
		actionBar.displayHomeAsUp = true;
		actionBar.onHomeIconItemSelected = function() {
			closeWindow();
		};

		activity.onCreateOptionsMenu = function(e) {
			e.menu.add({
				actionView : notificationSearchBar,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				itemId : Alloy.Globals.Itemid.SEARCH,
			});
		};
		activity.invalidateOptionsMenu();
	});
}

var getNotificationsBySingleApi = function(viaLoadMore) {
	if (!viaLoadMore && notificationList.length == 0) {
		$.ActivityView.visible = true;
		$.activityIndicator.show();
	}

	var url = Alloy.Globals.Constants.DOMAIN_URL + 'getNotifications';
	var lastId = "";
	if (notificationList.length > 0 && viaLoadMore) {
		lastId = notificationList[notificationList.length - 1].notification_id;
	}
	var userId = Ti.App.Properties.getObject("userDetails").user.id;
	var param = {
		'authKey' : 'llB8eTk=oKtG',
		'app_version' : Titanium.App.version,
		'max_id' : lastId,
		'user_id' : userId
	};
	Ti.API.info('url Notification listing : ' + url);
	Ti.API.info('Notification parameters : ' + JSON.stringify(param));

	Alloy.Globals.Communicator.post(url, param, function(e) {

		Ti.API.info('Response after post :  ' + JSON.stringify(e));
		try {
			if (e.success) {
				var responseData = JSON.parse(e.response);
				if (responseData.status == "true") {
					if (viaLoadMore) {
						notificationList = notificationList.concat(responseData.data);
					} else {
						notificationList = responseData.data;
					}

					Ti.API.info('notification Data : ' + JSON.stringify(notificationList));
					if (notificationList.length > 0) {
						$.noResultLbl.visible = false;
						$.NotificationTable.visible = true;

						showNotificationsList(notificationList);
						Alloy.Globals.DbManager.Save_NotificationAllList(responseData.data);
					}

					//	Ti.API.info("responseData.total_records = " + responseData.total_records);
					//Ti.API.info("notificationList.length = " + notificationList.length);

					if (responseData.total_records > notificationList.length) {
						if (viaLoadMore) {
							$.is.state($.is.SUCCESS, "");
						}
					} else {
						if (viaLoadMore) {
							$.is.state($.is.DONE, "");
						}
					}

					if (notificationList.length <= 0) {
						$.noResultLbl.text = L('noResultfound');
						$.noResultLbl.visible = true;
						$.is.state($.is.SUCCESS, "Tap to refresh");
					}

				} else if (responseData.status == "false") {
					$.is.state($.is.ERROR, "Tap to retry");
					if (!viaLoadMore && notificationList.length == 0) {
						$.noResultLbl.text = L('some_error');
						$.noResultLbl.visible = true;
					}
				} else {
					$.is.state($.is.ERROR, "Tap to retry");
					if (!viaLoadMore && notificationList.length == 0) {
						$.noResultLbl.text = L('some_error');
						$.noResultLbl.visible = true;
					}
				}
			} else {
				$.is.state($.is.ERROR, "Tap to retry");
				if (!viaLoadMore && notificationList.length == 0) {
					$.noResultLbl.text = L('some_error');
					$.noResultLbl.visible = true;
				}
			}
		} catch(e) {
			//alert('' + JSON.stringify(e));
			$.is.state($.is.ERROR, "Tap to retry");
			if (!viaLoadMore && notificationList.length == 0) {
				$.noResultLbl.text = L('some_error');
				$.noResultLbl.visible = true;
			}
		}
		isLoading = false;

		if (!viaLoadMore) {
			$.ActivityView.visible = false;
			$.activityIndicator.hide();
		}
	});
};

Alloy.Globals.updateNotificationsList = getNotificationsBySingleApi;

function strip(html) {
	var tmp = document.createElement("DIV");
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || "";
}

showNotificationsList = function(notificationList) {
	var sections = [];
	var lastProcessedDate = null;
	var tableViewSection;
	Ti.API.info('notificationList.length :  ' + notificationList.length);
	if (notificationList.length > 0) {
		$.noResultLbl.visible = false;
		$.NotificationTable.visible = true;
		Ti.API.info('hello1');
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		for ( i = 0; i < notificationList.length; i++) {
			var notification = notificationList[i];
			var showDate = notification.created_at.split(" ")[0];

			var year = showDate.substr(0, 4);
			var month = showDate.substr(5, 2);
			month = parseInt(month);
			var date = showDate.substr(8, 2);
			showDate = new Date(year, month - 1, date);

			if (lastProcessedDate == null || showDate < lastProcessedDate) {
				var currentDate = new Date();
				var yesterdayDate = new Date();
				yesterdayDate.setDate(currentDate.getDate() - 1);
				var dateStr;

				if (currentDate.getDate() == showDate.getDate() && currentDate.getMonth() == showDate.getMonth() && currentDate.getFullYear() == showDate.getFullYear()) {
					dateStr = "Today";
				} else if (yesterdayDate.getDate() == showDate.getDate() && yesterdayDate.getMonth() == showDate.getMonth() && yesterdayDate.getFullYear() == showDate.getFullYear()) {
					dateStr = "Yesterday";
				} else {
					date = showDate.getDate();
					if (date < 10) {
						date = "0" + date;
					}
					dateStr = date + "-" + months[showDate.getMonth()] + "-" + showDate.getFullYear();
				}
				Ti.API.info(notification.created_at + "    " + lastProcessedDate);

				var tableSectionHeaderView = Ti.UI.createView({
					height : 30,
					backgroundColor : "#F0EFF5"
				});

				var tableSectionHeaderLabel = Ti.UI.createLabel({
					text : dateStr,
					left : 20,
					color : '#2E3C45',
					font : {
						fontSize : "15",
						fontFamily : 'calibril',
						//fontWeight : 'Bold'
					}
				});

				tableSectionHeaderView.add(tableSectionHeaderLabel);

				tableViewSection = Ti.UI.createTableViewSection({
				});
				tableViewSection.headerView = tableSectionHeaderView;
				//Ti.App.Properties.setString('lastProcessedDate', notification.created_at);
				lastProcessedDate = showDate;
				sections.push(tableViewSection);
			}

			var notificationTVR = Ti.UI.createTableViewRow({
				backgroundColor : "white",
				detail : notification,
				color : "transparent",
				selectedColor : "transparent",
				index : i,
				backgroundSelectedColor : "#D9D9D9"
			});
			if (OS_IOS) {
				notificationTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
			}
			var notificationTVRView = Ti.UI.createView({
				left : 20,
				right : 15,
				top : 10,
				bottom : 10,
				detail : notification,

				height : Ti.UI.SIZE,
				layout : "vertical"
			});
			var notificationTitleLabel = Ti.UI.createLabel({
				top : 0,
				left : 0,
				height : 20,
				color : '#2E3C45',
				width : "95%",
				index : i,
				text : notification.notification_title
			});

			var descStr = notification.notification_description.replace(/(<\?[a-z]*(\s[^>]*)?\?(>|$)|<!\[[a-z]*\[|\]\]>|<!DOCTYPE[^>]*?(>|$)|<!--[\s\S]*?(-->|$)|<[a-z?!\/]([a-z0-9_:.])*(\s[^>]*)?(>|$))/gi, '');
			descStr = descStr.replace(/&nbsp;/g," ").replace(/&amp;/g,"&");
			var notificationDescriptionLabel = Ti.UI.createLabel({
				top : 0,
				left : 0,
				height : 30,
				color : '#2E3C45',
				width : "95%",
				index : i,
				text : descStr,
				font : {
					fontSize : 14,
					fontFamily : 'calibril',
				}
			});
			if (OS_IOS) {
				notificationTVR.hasChild = true;
			} else if (OS_ANDROID) {
				var rightArrow = Ti.UI.createImageView({
					height : 13,
					right : 15,
					image : "/images/right_arrow_2.png"
				});

				notificationTVR.add(rightArrow);

				notificationTitleLabel.font = {
					fontWeight : 'Bold',
					fontFamily : 'calibril',
					fontSize : 17,
				};
				notificationDescriptionLabel.font = {
					fontWeight : 'Normal',
					fontFamily : 'calibril',
					fontSize : 14,
				};

				if (notificationTitleLabel.text.length > 85) {
					notificationTitleLabel.text = notificationTitleLabel.text.substr(0, 85) + "...";
				}
				if (notificationDescriptionLabel.text.length > 85) {
					notificationDescriptionLabel.text = notificationDescriptionLabel.text.substr(0, 85) + "...";
				}

			}

			if (notification.read_status != 1) {
				var unreadView = Ti.UI.createView({
					width : 10,
					height : 10,
					borderRadius : 5,
					left : 5,
					backgroundColor : "#3386b7"
				});

				notificationTVR.add(unreadView);
			}
			notificationTVRView.add(notificationTitleLabel);
			notificationTVRView.add(notificationDescriptionLabel);
			if (OS_IOS) {
				notificationTVR.hasChild = true;
				notificationTVRView.height = 55;
				notificationTitleLabel.left = 0;
				notificationDescriptionLabel.left = 0;
			}
			notificationTVR.add(notificationTVRView);
			tableViewSection.add(notificationTVR);
		}

		$.NotificationTable.setData(sections);
	} else {
		$.noResultLbl.text = L('noResultfound');
		$.noResultLbl.visible = true;
		$.NotificationTable.visible = false;
	}
};

// Get Data from Database...
function fetchNotifications() {
	notificationList = Alloy.Globals.DbManager.Get_NotificationAllList();
	if (notificationList.length > 0) {
		Ti.API.info('show list when DB has notification data');
		showNotificationsList(notificationList);
	}
	getNotificationsBySingleApi(false);
}

function loadMore(e) {
	setTimeout(function() {
		getNotificationsBySingleApi(true);
	}, 500);
}

fetchNotifications();

// Ti.App.addEventListener('dataUpdatedNotification', function(e) {
// Ti.API.info('Inside dataUpdatedNotification');
// fetchNotifications();
// });

function openNotificationInfoScreen(e) {

	var NotificationInfo = Alloy.createController("NotificationInfoScreen", e.row.detail).getView();
	if (OS_IOS) {
		Alloy.Globals.notificationNavWindow.openWindow(NotificationInfo);
	} else if (OS_ANDROID) {
		NotificationInfo.open();
	}

	try {
		if (notificationList[e.row.index].read_status != 1) {
			if(OS_IOS){
				e.row.children[0].visible = false;
			}else{
				e.row.children[1].visible = false;	
			}
			notificationList[e.row.index].read_status = 1;
			Alloy.Globals.DbManager.Save_NotificationAsRead(notificationList[e.row.index].notification_id);

			ReadStatusApiCall(notificationList[e.row.index].notification_id);
		}

	} catch(e) {
		Ti.API.info("Inside catch : " + JSON.stringify(e));
	}
}

function ReadStatusApiCall(notificationId) {
	var newCount = Ti.App.Properties.getInt('notificationCount') - 1;
	if (newCount < 0) {
		newCount = 0;
	}
	Ti.App.Properties.setInt('notificationCount', newCount);
	Ti.App.fireEvent("notificationupdate", null);
	if (OS_IOS) {
		Ti.UI.iPhone.setAppBadge(Ti.App.Properties.getInt('notificationCount'));
	} else {
		Alloy.Globals.TiGoosh.setAppBadge(Ti.App.Properties.getInt('notificationCount'));
	}

	var user_id = Ti.App.Properties.getObject("userDetails").user.id;
	var url = Alloy.Globals.Constants.DOMAIN_URL + 'changeNotificationStatus';

	var param = {
		'authKey' : 'llB8eTk=oKtG',
		'app_version' : Titanium.App.version,
		'notification_id' : notificationId,
		'user_id' : user_id
	};

	Ti.API.info('url of set read status of notification : ' + url);
	Ti.API.info('notification read status parameter: ' + JSON.stringify(param));

	Alloy.Globals.Communicator.post(url, param, function(e) {

	});
}

function closeWindow() {
	if (OS_IOS) {
		$.notificationNavWindow.close();
	} else {
		$.notificationScreen.close();
	}
	Alloy.Globals.notificationNavWindow = null;
}

