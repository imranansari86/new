// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
Alloy.Globals.MainTabGroup = $.tabgroupMain;

Alloy.Globals.Itemid = {};
Alloy.Globals.Itemid.SEARCH = 1;
Alloy.Globals.Itemid.BELL = 2;
Alloy.Globals.Itemid.SETTING = 3;
Alloy.Globals.Itemid.LOGO = 4;

if (OS_ANDROID) {
	var abx = require('com.alcoapps.actionbarextras');
	abx.window = Alloy.Globals.MainTabGroup;

	Alloy.Globals.searchBar = Ti.UI.Android.createSearchView({
		hintText : "Search",
		hintTextColor : "#ffffff",
		color : "#fff"
	});

	var outerBadgeView = Ti.UI.createView();
	outerBadgeView.addEventListener('click', function(e) {
		var NotificationScreen = Alloy.createController('NotificationScreen').getView();
		NotificationScreen.open();
	});

	var bellIconImg = Ti.UI.createImageView({
		image : "/images/bell.png"
	});
	var proxyView = Ti.UI.createView({
		width : 40,
		height : 20
	});
	var notificationV = Ti.UI.createView({
		width : 15,
		height : 15,
		top : 0,
		right : 4,
		backgroundColor : "#F6001E",
		borderRadius : 3,
		visible : false,
	});
	var notificationLbl = Ti.UI.createLabel({
		color : "white",
		font : {
			fontSize : 10
		},
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		text : "1"
	});
	notificationV.add(notificationLbl);

	outerBadgeView.add(bellIconImg);
	outerBadgeView.add(proxyView);
	outerBadgeView.add(notificationV);

	var notificationCount = Ti.App.Properties.getInt('notificationCount');
	if (notificationCount && notificationCount > 0) {
		notificationLbl.text = notificationCount + "";
		notificationV.visible = true;
	} else {
		notificationV.visible = false;
		notificationLbl.text = 0 + "";
	}

	var outerSettingView = Ti.UI.createView();
	outerSettingView.addEventListener('click', function(e) {
		var settingScreen = Alloy.createController("SettingScreen").getView();
		settingScreen.open();
	});

	var settingIconImg = Ti.UI.createImageView({
		image : "/images/settings.png"
	});
	var proxySettingView = Ti.UI.createView({
		width : 44,
		height : 20
	});

	outerSettingView.add(settingIconImg);
	outerSettingView.add(proxySettingView);

	// var outerLogoView = Ti.UI.createView({
	// width: Ti.UI.FILL,
	// height: Ti.UI.SIZE
	// });
	//
	// var logoImg = Ti.UI.createImageView({
	// image : "/images/guide_logo.png",
	// left : 0
	// });
	// var proxyLogoView = Ti.UI.createView({
	// width : Ti.UI.FILL,
	// height : Ti.UI.SIZE
	// });

	// outerLogoView.add(proxyLogoView);
	// outerLogoView.add(logoImg);

	// Alloy.Globals.searchBar.addEventListener('focus', function(e) {
	// proxyLogoView.width = 0;
	// logoImg.width = 0;
	// });
	// Alloy.Globals.searchBar.addEventListener('blur', function(e) {
	// proxyLogoView.width = "60%";
	// logoImg.width = Ti.UI.SIZE;
	// });

	$.tabgroupMain.addEventListener("open", function(e) {
		var activity = Alloy.Globals.MainTabGroup.getActivity();
		// activity.actionBar.title = "Scope|Global";
		activity.requestedOrientation = Titanium.Android.SCREEN_ORIENTATION_PORTRAIT;

		var actionBar = activity.getActionBar();
		actionBar.setHomeButtonEnabled(true);
		abx.setDisplayShowHomeEnabled(true);
		abx.setDisplayUseLogoEnabled(true);
		actionBar.setLogo("/images/bar_logo.png");
		abx.setDisplayShowTitleEnabled(false);

		activity.onCreateOptionsMenu = function(e) {
			Alloy.Globals.menu = e.menu;

			// var logo = e.menu.add({
			// actionView : outerLogoView,
			// showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			// itemId : Alloy.Globals.Itemid.LOGO,
			// });

			Alloy.Globals.searchMenuItem = e.menu.add({
				actionView : Alloy.Globals.searchBar,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				itemId : Alloy.Globals.Itemid.SEARCH,
			});

			var bell = e.menu.add({
				actionView : outerBadgeView,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				itemId : Alloy.Globals.Itemid.BELL,
			});

			var setting = e.menu.add({
				actionView : outerSettingView,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				itemId : Alloy.Globals.Itemid.SETTING,
			});
		};
		activity.invalidateOptionsMenu();

		Ti.App.addEventListener("notificationupdate", function(e) {
			var notificationCount = Ti.App.Properties.getInt('notificationCount');
			// alert("Hello : " + notificationCount);
			if (notificationCount && notificationCount > 0) {
				notificationLbl.text = notificationCount + "";
				notificationV.visible = true;
			} else {
				notificationV.visible = false;
				notificationLbl.text = 0 + "";
			}
		});
	});
}

/**
 *  Automatically call the service of syn after a time Intervals..
 * For getting Updated data from server and insert into in Database
 */
//setInterval(Alloy.Globals.GetDataFromSyn, 60000);
Alloy.Globals.GetDataFromSyn();
Alloy.Globals.androidAppPaused = false;
if (OS_ANDROID) {
	Alloy.Globals.getBadgeCount(false);

	Ti.App.addEventListener('androidresumed', function() {
		if (Alloy.Globals.androidAppPaused == true) {
			Ti.API.info("App resume");
			Alloy.Globals.androidAppPaused = false;

			Alloy.Globals.getBadgeCount(true);

			Alloy.Globals.GetDataFromSyn();

			if (Alloy.Globals.notificationNavWindow != null) {
				Alloy.Globals.updateNotificationsList(false);
			}
		}
	});
	Ti.App.addEventListener('androidpaused', function() {
		Ti.API.info("App pause");
		Alloy.Globals.androidAppPaused = true;
	});

	var platformTools = require('bencoding.android.tools').createPlatform();
	var wasInForeGround = true;

	setInterval(function() {
		var isInForeground = platformTools.isInForeground();

		if (wasInForeGround !== isInForeground) {
			Ti.App.fireEvent( isInForeground ? 'androidresumed' : 'androidpaused');

			wasInForeGround = isInForeground;
		}
	}, 3000);
} else {
	Alloy.Globals.getBadgeCount(false);

	Ti.App.addEventListener('pause', function(e) {
		Ti.API.info("app was paused from the foreground");
	});

	Ti.App.addEventListener('resumed', function(e) {
		Ti.API.info("app was resumed from the background");

		Alloy.Globals.getBadgeCount(true, false);

		Alloy.Globals.GetDataFromSyn();

		if (Alloy.Globals.notificationNavWindow != null) {
			Alloy.Globals.updateNotificationsList(false);
		}
	});
}

/**
 * Network changing check..
 */
Ti.Network.addEventListener('change', function(e) {
	// Ti.API.info('Change Network :  ' + JSON.stringify(e));
	var networkIsOnline = e.online;
	var networkType = e.networkType;
	if (networkIsOnline) {
		Alloy.Globals.GetDataFromSyn();
	}
	// alert(networkIsOnline);
});
