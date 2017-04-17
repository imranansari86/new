// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

/*
 * Set title and html string in webView..
 */
$.title.text = args.list_title;
if (OS_IOS) {
	var htmlText = '<html><body style="word-break: normal; font-family: Arial, Helvetica, sans-serif;"><meta name="viewport" content="width=95%, background-color=#ff0000, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"><div style="width:100%; height:auto; word-wrap:normal; float:left;  white-space: normal;">' + args.title_description + '</div></body></html>';
	$.webView.html = htmlText;
} else {
	var htmlText = '<html><body style="word-break: normal; font-family: Arial, Helvetica, sans-serif;"><meta name="viewport" content="width=95%, background-color=#ff0000, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"><div style="width:100%; height:auto; word-wrap:normal; float:left;  white-space: normal;">' + args.title_description + '</div></body></html>';
	$.webView.setHtml(htmlText);

	$.tipsInfoScreen.addEventListener('open', function() {
		var activity = $.tipsInfoScreen.getActivity();
		var actionBar = $.tipsInfoScreen.activity.actionBar;
		actionBar.title = args.list_title;
		actionBar.displayHomeAsUp = true;
		actionBar.onHomeIconItemSelected = function() {
			$.tipsInfoScreen.close();
		};
	});
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

$.activityIndicator.show();
$.ActivityView.visible = true;
$.webView.addEventListener('load', function(e) {
	Ti.API.info('load  .. e ' + JSON.stringify(e));
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

if (OS_IOS && Alloy.Globals.notificationNavWindow != null) {
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

$.tipsInfoScreen.addEventListener('close', function(e) {
	Ti.App.removeEventListener("notificationupdate", updateNotificationCount);
}); 