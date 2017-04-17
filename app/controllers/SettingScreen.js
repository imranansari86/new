// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

if (OS_ANDROID) {
	$.settingScreen.addEventListener('open', function() {
		var actionBar = $.settingScreen.activity.actionBar;
		actionBar.displayHomeAsUp = true;
		actionBar.title = 'Settings';
		actionBar.onHomeIconItemSelected = function() {
			$.settingScreen.close();
		};

		var activity = $.settingScreen.activity;
		activity.onCreateOptionsMenu = function(e) {
			var menu = e.menu;
			var menuItem = menu.add({
				title : "Logout",
				showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
			});
			menuItem.addEventListener("click", function(e) {
				logout();
			});
		};
	});
	//$.countryPicker.hide();
}
var locationsList;

function settingWindowOpened() {
	$.userName.text = "Hello " + Ti.App.Properties.getObject("userDetails").user.fname;
	$.assignVal.text = Ti.App.Properties.getObject("userDetails").position.assignmentCode;
	$.countryVal.text = Ti.App.Properties.getObject("userDetails").position.countryTo.name;
	$.currentCountryVal.text = Ti.App.Properties.getString("currentCountry");

	var startDateStr = Ti.App.Properties.getObject("userDetails").position.start;
	var year = startDateStr.substr(0, 4);
	var month = startDateStr.substr(4, 2);
	var date = startDateStr.substr(6, 2);
	var startDate = new Date(year, month, date);

	var endDateStr = Ti.App.Properties.getObject("userDetails").position.end;
	year = endDateStr.substr(0, 4);
	month = endDateStr.substr(4, 2);
	date = endDateStr.substr(6, 2);
	var endDate = new Date(year, month, date);

	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	var dateStr = startDate.getDate();
	if (dateStr < 10) {
		dateStr = "0" + dateStr;
	}
	$.startVal.text = dateStr + "-" + months[startDate.getMonth() - 1] + "-" + startDate.getFullYear();

	dateStr = endDate.getDate();
	if (dateStr < 10) {
		dateStr = "0" + dateStr;
	}
	$.endVal.text = dateStr + "-" + months[endDate.getMonth() - 1] + "-" + endDate.getFullYear();

	locationsList = Alloy.Globals.DbManager.Get_locationAllList();
	if (locationsList != null && locationsList.length > 0) {
		addCountriesInPicker();
	} else {
		fetchLocations();
	}
}

var countryArray = [];
var selectedIndex = 0;
function addCountriesInPicker() {
	var data = [];
	var selectedId = Ti.App.Properties.getString("currentCountryId");
	for (var i = 0; i < locationsList.length; i++) {
		data[i] = Ti.UI.createPickerRow({
			title : locationsList[i].location_name,
			countryId : locationsList[i].location_id
		});

		if (locationsList[i].location_id == selectedId) {
			selectedIndex = i;
		}
	};
	if (OS_IOS) {
		$.countryPicker.add(data);
		$.countryPicker.setSelectedRow(0, selectedIndex, false);
	} else if (OS_ANDROID) {
		$.countryPicker.setOptions(data);
		countryArray = data;
	}
}

function fetchLocations() {
	$.countryLoadIndicator.show();
	var url = Alloy.Globals.Constants.DOMAIN_URL + 'getLocations';
	var param = {
		'authKey' : 'llB8eTk=oKtG',
		'app_version' : Titanium.App.version
	};
	Ti.API.info('url get locations : ' + url);
	Ti.API.info('get location parameters : ' + JSON.stringify(param));

	Alloy.Globals.Communicator.post(url, param, function(e) {

		Ti.API.info('Response after post :  ' + JSON.stringify(e));
		try {
			if (e.success) {
				var responseData = JSON.parse(e.response);
				if (responseData.status == "true") {
					locationsList = responseData.data;
					if (responseData.data.length > 0) {
						if (locationsList != null && locationsList.length > 0) {
							addCountriesInPicker();
						}

						Alloy.Globals.DbManager.Save_LocationAllList(responseData.data);
					}
				}
			}
		} catch(e) {
		}
		$.countryLoadIndicator.hide();
	});
}

var dialog = Ti.UI.createAlertDialog({
	ok : 0,
	buttonNames : ['Yes', 'No'],
	title : 'VolunteerCare',
	message : 'Are you sure, you want to logout?'
});

dialog.addEventListener('click', function(e) {
	if (e.index === e.source.ok) {
		var openLoginScreen = Alloy.createController("LoginScreen").getView();
		openLoginScreen.open();

		$.settingScreen.close();
		Alloy.Globals.MainTabGroup.close();

		setTimeout(function() {
			var user_id = Ti.App.Properties.getObject("userDetails").user.id;
			var url = Alloy.Globals.Constants.DOMAIN_URL + 'logout';
			var param = {
				'authKey' : 'llB8eTk=oKtG',
				'app_version' : Titanium.App.version,
				'user_id' : user_id,
			};
			Ti.API.info('url logout on Server : ' + url);
			Ti.API.info('logout parameter: ' + JSON.stringify(param));

			Alloy.Globals.Communicator.post(url, param, function(e) {
				Ti.API.info('Response after post :  ' + JSON.stringify(e));
			});

			Ti.App.Properties.setString('assignmentCode', null);
			Ti.App.Properties.setString('email', null);
			Ti.App.Properties.setString('userDOB', null);
			Ti.App.Properties.setString('lastSyncDateTime', null);
			Ti.App.Properties.setObject("userDetails", null);
			Ti.App.Properties.setInt('notificationCount', 0);
			Alloy.Globals.DbManager.cleanDatabase();
			if (OS_IOS) {
				Ti.UI.iPhone.setAppBadge(0);
				// Ti.Network.unregisterForPushNotifications();
			} else {
				Alloy.Globals.TiGoosh.setAppBadge(0);
				// Alloy.Globals.TiGoosh.unregisterForPushNotifications();
			}
		}, 300);
	}
});
function logout(e) {
	dialog.show();
}

function displayTableView() {
	// setTimeout(function(e) {
	// $.settingTable.opacity = 1;
	// }, 500);
}

function tableViewClicked(e) {
	if (e.index == 4) {
		if (locationsList != null && locationsList.length > 0) {

			if (OS_IOS) {
				$.countryPicker.setSelectedRow(0, selectedIndex, false);
				$.pickerView.animate({
					bottom : 0,
					duration : 300
				});
			} else if (OS_ANDROID) {
				//Ti.API.info('picker slected ');
				$.countryPicker.show();
			}

		} else {
			alert("Countries not available");
		}
	}
}

function changeCountryLblFunc(e) {
	Ti.API.info('value of e without selection' + JSON.stringify(e));
	Ti.API.info("Ti.App.Properties.getString('currentCountryId')" + Ti.App.Properties.getString('currentCountryId'));
	var lastCountry = $.currentCountryVal.text;
	Ti.API.info('lastCountry : ' + lastCountry);
	//$.countryPicker.selectedIndex = Ti.App.Properties.getString('currentCountryId');

	try {
		// var selectedVal = e.selectedValue;
		$.currentCountryVal.text = countryArray[e.index];
		selCountry = countryArray[e.index].title;
		selCountryId = countryArray[e.index].countryId;
		Ti.App.Properties.setString('currentCountry', selCountry);
		Ti.App.Properties.setString('currentCountryId', selCountryId);

		var url = Alloy.Globals.Constants.DOMAIN_URL + 'changeLocations';
		var param = {
			'authKey' : 'llB8eTk=oKtG',
			'app_version' : Titanium.App.version,
			'location_id' : selCountryId,
			'user_id' : Ti.App.Properties.getObject("userDetails").user.id
		};
		Ti.API.info('url change location : ' + url);
		Ti.API.info('Change location parameters : ' + JSON.stringify(param));
		Alloy.Globals.LoadingScreen.open();
		Alloy.Globals.Communicator.post(url, param, function(e) {

			Ti.API.info('Response after post :  ' + JSON.stringify(e));
			try {
				if (e.success) {
					var responseData = JSON.parse(e.response);
					if (responseData.status == "true") {
						Ti.App.Properties.setString('currentCountry', selCountry);
						Ti.App.Properties.setString('currentCountryId', selCountryId);

						for (var i = 0; i < locationsList.length; i++) {
							if (locationsList[i].location_id == selCountryId) {
								selectedIndex = i;
							}
						};
					} else {
						$.currentCountryVal.text = Ti.App.Properties.getString("currentCountry");
					}
				} else {
					$.currentCountryVal.text = Ti.App.Properties.getString("currentCountry");
				}
			} catch(e) {
				$.currentCountryVal.text = Ti.App.Properties.getString("currentCountry");
			}
			Alloy.Globals.LoadingScreen.close();
		});
	} catch(e) {
		Ti.API.info('nothing selectd ');
		$.currentCountryVal.text = lastCountry;
	}
}

function closePicker(e) {
	$.pickerView.animate({
		bottom : -262,
		duration : 300
	});

	if (e.source.id == "done") {
		var selCountry = $.countryPicker.getSelectedRow(0).title;
		var selCountryId = $.countryPicker.getSelectedRow(0).countryId;

		$.currentCountryVal.text = selCountry;
		Alloy.Globals.LoadingScreen.close();
		Alloy.Globals.LoadingScreen.open();

		var url = Alloy.Globals.Constants.DOMAIN_URL + 'changeLocations';
		var param = {
			'authKey' : 'llB8eTk=oKtG',
			'app_version' : Titanium.App.version,
			'location_id' : selCountryId,
			'user_id' : Ti.App.Properties.getObject("userDetails").user.id
		};
		Ti.API.info('url change location : ' + url);
		Ti.API.info('Change location parameters : ' + JSON.stringify(param));

		Alloy.Globals.Communicator.post(url, param, function(e) {

			Ti.API.info('Response after post :  ' + JSON.stringify(e));
			try {
				if (e.success) {
					var responseData = JSON.parse(e.response);
					if (responseData.status == "true") {
						Ti.App.Properties.setString('currentCountry', selCountry);
						Ti.App.Properties.setString('currentCountryId', selCountryId);

						for (var i = 0; i < locationsList.length; i++) {
							if (locationsList[i].location_id == selCountryId) {
								selectedIndex = i;
							}
						};
					} else {
						$.currentCountryVal.text = Ti.App.Properties.getString("currentCountry");
					}
				} else {
					$.currentCountryVal.text = Ti.App.Properties.getString("currentCountry");
				}
			} catch(e) {
				$.currentCountryVal.text = Ti.App.Properties.getString("currentCountry");
			}
			Alloy.Globals.LoadingScreen.close();
		});
	}
}