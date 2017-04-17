// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

/*
 * Set title and html string in webView..
 */
$.title.text = args.heading;
if (OS_IOS) {
	var htmlText = '<html><body style="word-break: normal; font-family: Arial, Helvetica, sans-serif;"><meta name="viewport" content="width=95%, background-color=#ff0000, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"><div style="width:100%; height:auto; word-wrap:normal; float:left;  white-space: normal;">' + args.description + '</div></body></html>';
	$.webView.html = htmlText;
} else {
	var htmlText = '<html><body style="word-break: normal; font-family: Arial, Helvetica, sans-serif;"><meta name="viewport" content="width=95%, background-color=#ff0000, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"><div style="width:100%; height:auto; word-wrap:normal; float:left;  white-space: normal;">' + args.description + '</div></body></html>';
	$.webView.setHtml(htmlText);

	// Notification icon and setting icon should not display when this screen is opened from notification detail screen.
	// if (Alloy.Globals.notificationNavWindow == null) {
		// var outerBadgeView = Ti.UI.createView();
		// outerBadgeView.addEventListener('click', function(e) {
			// var NotificationScreen = Alloy.createController('NotificationScreen').getView();
			// NotificationScreen.open();
		// });
// 
		// var bellIconImg = Ti.UI.createImageView({
			// image : "/images/bell.png"
		// });
		// var proxyView = Ti.UI.createView({
			// width : 40,
			// height : 20
		// });
		// var notificationV = Ti.UI.createView({
			// width : 15,
			// height : 15,
			// top : 0,
			// right : 4,
			// backgroundColor : "#F6001E",
			// borderRadius : 3,
			// visible : false,
		// });
		// var notificationLbl = Ti.UI.createLabel({
			// color : "white",
			// font : {
				// fontSize : 10
			// },
			// textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
			// text : "1"
		// });
		// notificationV.add(notificationLbl);
// 
		// outerBadgeView.add(bellIconImg);
		// outerBadgeView.add(proxyView);
		// outerBadgeView.add(notificationV);
	// }

	$.guideInfoScreen.addEventListener("open", function(e) {
		var activity = $.guideInfoScreen.getActivity();
		var actionBar = $.guideInfoScreen.activity.actionBar;
		actionBar.title = 'Guide';
		actionBar.displayHomeAsUp = true;
		actionBar.onHomeIconItemSelected = function() {
			$.guideInfoScreen.close();
		};

		// Notification icon and setting icon should not display when this screen is opened from notification detail screen.
		// if (Alloy.Globals.notificationNavWindow == null) {
			// activity.onCreateOptionsMenu = function(e) {
				// var bell = e.menu.add({
					// actionView : outerBadgeView,
					// showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
					// icon : "/images/bell.png",
					// itemId : Alloy.Globals.Itemid.BELL,
				// });
// 
				// var setting = e.menu.add({
					// showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
					// icon : "/images/settings.png",
					// itemId : Alloy.Globals.Itemid.SETTING,
				// });
// 
				// setting.addEventListener("click", openSettingScreen);
			// };
			// activity.invalidateOptionsMenu();
// 
			// activity.onResume = function(e) {
				// var notificationCount = Ti.App.Properties.getInt('notificationCount');
				// if (notificationCount && notificationCount > 0) {
					// notificationLbl.text = notificationCount + "";
					// notificationV.visible = true;
				// } else {
					// notificationV.visible = false;
					// notificationLbl.text = 0 + "";
				// }
			// };
		// }
	});
}

function openSettingScreen() {
	//alert("Open setting screen");
	var settingScreen = Alloy.createController("SettingScreen").getView();
	if (OS_IOS) {
		Alloy.Globals.guidNavWin.openWindow(settingScreen);
	}
}

function openNotificationScreen() {
	var notificationScreen = Alloy.createController("NotificationScreen").getView();
	if (OS_IOS) {
		notificationScreen.open();
	}
}

$.activityIndicator.show();
$.ActivityView.visible = true;
$.webView.addEventListener('load', function(e) {
	$.activityIndicator.hide();
	$.ActivityView.visible = false;
});
$.webView.addEventListener('error', function(e) {
	$.activityIndicator.hide();
	$.ActivityView.visible = false;
});

$.webView.addEventListener('beforeload', function(e) {
	Ti.API.info('e beforeload:  ' + JSON.stringify(e));
	if (OS_IOS) {
		if (e.navigationType == Titanium.UI.iOS.WEBVIEW_NAVIGATIONTYPE_LINK_CLICKED) {
			// stop the event
			e.bubble = false;
			// stop the url from loading
			$.webView.stopLoading();
			// open in safari
			Ti.Platform.openURL(e.url);
		}
	} else if (OS_ANDROID) {
		if (e.url && e.url.indexOf("http") != -1) {
			// stop the event
			e.bubble = false;
			// stop the url from loading
			$.webView.stopLoading();
			// open in safari
			Ti.Platform.openURL(e.url);
		}
	}
});

if (Alloy.Globals.notificationNavWindow != null && OS_IOS) {
	$.settingButton.visible = false;
	$.notificationButton.visible = false;
}

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

$.guideInfoScreen.addEventListener('close', function(e) {
	Ti.App.removeEventListener("notificationupdate", updateNotificationCount);
});
