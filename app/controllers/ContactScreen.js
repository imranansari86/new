// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.contactNavWin = $.contactNavWin;
var contactList = [];

$.is.init($.contactListNotificationTable);

if (OS_ANDROID) {
	$.contactWindow.addEventListener("focus", function(e) {
		if (Alloy.Globals.searchMenuItem) {
			Alloy.Globals.searchMenuItem.visible = true;
			Alloy.Globals.searchMenuItem.collapseActionView();
		}

		Alloy.Globals.searchBar.addEventListener('change', searchContacts);
		Alloy.Globals.searchBar.value = "";
		setTimeout(function(){
			Alloy.Globals.showContactList(contactList);
		}, 300);
	});

	$.contactWindow.addEventListener("blur", function(e) {
		Alloy.Globals.searchBar.removeEventListener('change', searchContacts);
	});

	var searchContacts = function(e) {
		var searchTxt = e.source.value;
		var newArr = [];
		for (var i = 0; i < contactList.length; i++) {
			var title = contactList[i].organisation_name;
			if (title.toLowerCase().indexOf(searchTxt.toLowerCase()) != -1) {
				newArr.push(contactList[i]);
			} else {

			}
		}
		Alloy.Globals.showContactList(newArr);
	};
}

function getContactListBySingleApi(viaLoadMore) {
	if (viaLoadMore == false && contactList.length == 0) {
		Alloy.Globals.LoadingScreen.open();
	}
	var url = Alloy.Globals.Constants.DOMAIN_URL + 'getContacts';
	var lastId = "";
	if (contactList.length > 0) {
		lastId = contactList[contactList.length - 1].record_order;
	}
	var userId = Ti.App.Properties.getObject("userDetails").user.id;
	var param = {
		'authKey' : 'llB8eTk=oKtG',
		'app_version' : Titanium.App.version,
		'max_id' : lastId,
		'user_id' : userId
	};
	Ti.API.info('url Contact listing : ' + url);
	Ti.API.info('Contact parameters : ' + JSON.stringify(param));

	Alloy.Globals.Communicator.post(url, param, function(e) {

		Ti.API.info('Response after post :  ' + JSON.stringify(e));
		try {
			if (e.success) {
				var responseData = JSON.parse(e.response);
				if (responseData.status == "true") {
					contactList = contactList.concat(responseData.data);
					if (responseData.data.length > 0) {
						$.noResultLbl.visible = false;
						$.contactListNotificationTable.visible = true;

						Alloy.Globals.showContactList(contactList);
						Alloy.Globals.DbManager.Save_ContactsAllList(responseData.data);

					}
					Ti.API.info("responseData.total_records = " + responseData.total_records);
					Ti.API.info("contactList.length = " + contactList.length);

					if (responseData.total_records > contactList.length) {
						if (viaLoadMore) {
							$.is.state($.is.SUCCESS, "");
						}
					} else {
						if (viaLoadMore) {
							$.is.state($.is.DONE, "");
						}
					}

					if (contactList.length <= 0) {
						$.noResultLbl.text = L('noResultfound');
						$.noResultLbl.visible = true;
						$.contactListNotificationTable.visible = false;
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

Alloy.Globals.showContactList = function(contactList) {
	var tableViewRowArr = [];

	if (contactList.length > 0) {
		$.noResultLbl.visible = false;
		$.contactListNotificationTable.visible = true;

		for ( i = 0; i < contactList.length; i++) {
			var row = Ti.UI.createTableViewRow({
				backgroundColor : "transparent",
				//hasChild : true,
				detail : contactList[i],
				height: 48,
				//title : contactList[i].organisation_name + " " + contactList[i].description,
				title : contactList[i].organisation_name,
				color : "transparent",
				selectedColor : "transparent",
				backgroundSelectedColor : "#D9D9D9"
			});
			if (OS_IOS) {
				row.hasChild = true;
			} else if (OS_ANDROID) {
				var rightArrow = Ti.UI.createImageView({
					height : 13,
					top: 13.5,
					right : 15,
					image : "/images/right_arrow_2.png"
				});

				row.add(rightArrow);
			}
			var contactTitleLbl = Ti.UI.createLabel({
				left : 20,
				right : 20,
				top : 15,
				color : '#2E3C45',
				text : contactList[i].organisation_name,
				//height : 40,
				height : 18,
				font : {
					fontSize : 15,
					fontFamily : 'calibril',
				}
			});

			row.add(contactTitleLbl);
			tableViewRowArr.push(row);
		}
		$.contactListNotificationTable.setData(tableViewRowArr);
	} else {
		//Alloy.Globals.LoadingScreen.open();
		$.noResultLbl.text = L('noResultfound');
		$.noResultLbl.visible = true;
		$.contactListNotificationTable.visible = false;
	}
};

// Get Data from Database...
function fetchContacts() {
	setTimeout(function() {
		contactList = Alloy.Globals.DbManager.Get_contactsAllList();
		if (contactList.length > 0) {
			Ti.API.info('show list when DB has data in contact table');
			Alloy.Globals.showContactList(contactList);
		} else {
			Ti.API.info('show list when Contact table is blank');
			getContactListBySingleApi(false);
		}
	}, 300);
}

function loadMore(e) {
	setTimeout(function() {
		getContactListBySingleApi(true);
	}, 500);
}

//fetchContacts();

Ti.App.addEventListener('dataUpdatedContacts', function(e) {
	fetchContacts();
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

if (OS_IOS) {
	Ti.App.addEventListener("notificationupdate", updateNotificationCount);
	updateNotificationCount();
}

function openContactDetailScreen(e) {
	var openContactDetail = Alloy.createController("ContactDetailScreen", contactList[e.index]).getView();
	if (OS_IOS) {
		Alloy.Globals.contactNavWin.openWindow(openContactDetail);
	} else if (OS_ANDROID) {
		openContactDetail.open();
	}
}

function openSettingScreen() {
	var SettingScreen = Alloy.createController("SettingScreen").getView();
	if (OS_IOS) {
		Alloy.Globals.contactNavWin.openWindow(SettingScreen);
	} else {
		SettingScreen.open();
	}
}

function openNotificationScreen() {
	var notificationScreen = Alloy.createController("NotificationScreen").getView();
	if (OS_IOS) {
		notificationScreen.open();
	} else {
		notificationScreen.open();
	}

}

// $.contactWindow.addEventListener('blur', function(e) {
// Ti.App.removeEventListener("notificationupdate", updateNotificationCount);
// });
//
// if (OS_IOS) {
// $.contactWindow.addEventListener('focus', function(e) {
// Ti.App.addEventListener("notificationupdate", updateNotificationCount);
// });
// }