// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.toolsNavWin = $.ToolsNavWin;

if (OS_ANDROID) {
	$.toolsScreen.addEventListener("focus", function(e) {
		if (Alloy.Globals.searchMenuItem) {
			Alloy.Globals.searchMenuItem.visible = false;
		}
	});
}

function openNotificationScreen() {
	var notificationScreen = Alloy.createController("NotificationScreen").getView();
	if (OS_IOS) {
		notificationScreen.open();
	} else {
		notificationScreen.open();
	}
}

function openSettingScreen() {
	var settingScreen = Alloy.createController("SettingScreen").getView();
	if (OS_IOS) {
		Alloy.Globals.toolsNavWin.openWindow(settingScreen);
	} else {
		settingScreen.open();
	}
}

var arr = [];
function showToolsList() {

	for ( i = 0; i < 1; i++) {
		var row = Ti.UI.createTableViewRow({
			height : Ti.UI.SIZE,
			backgroundColor : "transparent",
		});
		if (OS_IOS) {
			row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
		}
		var MainView = Ti.UI.createView({
			height : 150,
			width : Ti.UI.FILL,
		});
		var toolImage = Ti.UI.createImageView({
			image: "/images/banner.png",
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
		});
		MainView.add(toolImage);
		var titlelbl = Ti.UI.createLabel({
			text : "Mental Wellbeing\nCheck-In",
			color : "#fff",
			textAlign : "center",
			font : {
				fontSize : 22,
				fontFamily : 'SourceSansPro-Semibold',
				fontWeight : "bold",
			},
			height : '150',
			width : Ti.UI.FILL,
			//backgroundColor : "blue",
		});
		MainView.add(titlelbl);

		// var rightImg = Ti.UI.createImageView({
		// image : "/images/right-arrow-2.png",
		// right : "15",
		// });

		//MainView.add(rightImg);
		row.add(MainView);
		arr.push(row);
	}
	$.toolsTable.setData(arr);
}

showToolsList();
$.toolsTable.addEventListener('click', function(e) {
	Ti.API.info('table Click...' + JSON.stringify(e));
	var winargs = {};
	winargs.navWindow = Alloy.Globals.toolsNavWin;
	var openQuestionScreen = Alloy.createController("QuestionScreen", winargs).getView();
	if (OS_IOS) {
		Alloy.Globals.toolsNavWin.openWindow(openQuestionScreen);
	} else if (OS_ANDROID) {
		openQuestionScreen.open();
	}
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

// $.toolsScreen.addEventListener('blur', function(e) {
// Ti.App.removeEventListener("notificationupdate", updateNotificationCount);
// });
//
// if (OS_IOS) {
// $.toolsScreen.addEventListener('focus', function(e) {
// Ti.App.addEventListener("notificationupdate", updateNotificationCount);
// });
// }
