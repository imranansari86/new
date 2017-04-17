// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

/*
 * Set title and html string in webView..
 */
$.notificationInfoScreen.title = "Notification"; 
$.title.text = args.notification_title;
if (OS_IOS) {
	var htmlText = '<html><body style="word-break: normal; font-family: Arial, Helvetica, sans-serif;"><meta name="viewport" content="width=95%, background-color=#ff0000, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"><div style="width:100%; height:auto; word-wrap:normal; float:left;  white-space: normal;">' + args.notification_description + '</div></body></html>';
	$.webView.html = htmlText;
}
if (OS_ANDROID) {
	var htmlText = '<html><body style="word-break: normal; font-family: Arial, Helvetica, sans-serif;"><meta name="viewport" content="width=95%, background-color=#ff0000, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"><div style="width:100%; height:auto; word-wrap:normal; float:left;  white-space: normal;">' + args.notification_description + '</div></body></html>';
	$.webView.setHtml(htmlText);
	
	$.title.backgroundColor = "transparent";
	$.notificationInfoScreen.addEventListener('open', function() {
		var actionBar = $.notificationInfoScreen.activity.actionBar;
		actionBar.title = "Notification";
		actionBar.displayHomeAsUp = true;
		actionBar.onHomeIconItemSelected = function() {
			$.notificationInfoScreen.close();
		};
	});
}

if (args.notification_category == 'Information' && args.notification_link != null && args.notification_link != "") {
	$.mainView.bottom = 40;
	$.gotoBtn.visible = true;
	$.gotoBtn.text = "This notification is linked with a " + args.notification_link + " article. Click here to view the article.";

} else if (args.notification_category == 'Reminders') {
	$.mainView.bottom = 40;
	$.gotoBtn.visible = true;
	$.gotoBtn.text = "This notification is linked with a task. Click here to start the task";
} else {
	$.mainView.bottom = 0;
	$.gotoBtn.visible = false;
}

function GotoScreen(e) {
	if (args.notification_category != 'Reminders') {
		if (args.notification_link == "contact") {
			var contactInfoData = Alloy.Globals.DbManager.Get_contactByIDForNotification(args.link_ids);
			if (contactInfoData.length > 0) {
				Ti.API.info("Contact detail from notification = " + JSON.stringify(contactInfoData[0]));
				var openContactInfo = Alloy.createController("ContactDetailScreen", contactInfoData[0]).getView();
				if (OS_IOS) {
					Alloy.Globals.notificationNavWindow.openWindow(openContactInfo);
				} else if (OS_ANDROID) {
					openContactInfo.open();
				}
			} else {
				Alloy.Globals.LoadingScreen.open();
				var user_id = Ti.App.Properties.getObject("userDetails").user.id;
				var url = Alloy.Globals.Constants.DOMAIN_URL + 'getDataByParam';

				var param = {
					'authKey' : 'llB8eTk=oKtG',
					'app_version' : Titanium.App.version,
					'table_type' : args.notification_link,
					'primary_key' : args.link_ids
				};

				Ti.API.info('url of get single record of contact : ' + url);
				Ti.API.info('get single record contact parameter: ' + JSON.stringify(param));

				Alloy.Globals.Communicator.post(url, param, function(e) {
					try {
						if (e.success) {
							var responseData = JSON.parse(e.response);
							var contactData = responseData.data;
							var openContactInfo = Alloy.createController("ContactDetailScreen", contactData).getView();
							if (OS_IOS) {
								Alloy.Globals.notificationNavWindow.openWindow(openContactInfo);
							} else if (OS_ANDROID) {
								openContactInfo.open();
							}
						} else if (responseData.status == "false") {
							alert(responseData.message);
						} else {
							alert(e.message);
						}

					} catch(e) {
						Ti.API.info('in catch login' + JSON.stringify(e));
					}
					Alloy.Globals.LoadingScreen.close();
				});
			}
		} else if (args.notification_link == "guide") {

			var guidInfoData = Alloy.Globals.DbManager.Get_guideByIDForNotification(args.link_ids);

			if (guidInfoData.length > 0) {
				var openGuideInfo = Alloy.createController("GuideInfoScreen", guidInfoData[0]).getView();
				if (OS_IOS) {
					Alloy.Globals.notificationNavWindow.openWindow(openGuideInfo);
				} else if (OS_ANDROID) {
					openGuideInfo.open();
				}
			} else {
				//Need to fetch object from server
				//alert("Record not available");
				Alloy.Globals.LoadingScreen.open();
				var user_id = Ti.App.Properties.getObject("userDetails").user.id;
				var url = Alloy.Globals.Constants.DOMAIN_URL + 'getDataByParam';

				var param = {
					'authKey' : 'llB8eTk=oKtG',
					'app_version' : Titanium.App.version,
					'table_type' : args.notification_link,
					'primary_key' : args.link_ids
				};

				Ti.API.info('url of get single record of contact : ' + url);
				Ti.API.info('get single record contact parameter: ' + JSON.stringify(param));

				Alloy.Globals.Communicator.post(url, param, function(e) {
					try {
						if (e.success) {
							var responseData = JSON.parse(e.response);
							var guidedata = responseData.data;
							var openGuideInfo = Alloy.createController("GuideInfoScreen", guidedata).getView();
							if (OS_IOS) {
								Alloy.Globals.notificationNavWindow.openWindow(openGuideInfo);
							} else if (OS_ANDROID) {
								openGuideInfo.open();
							}
						} else if (responseData.status == "false") {
							alert(responseData.message);
						} else {
							alert(e.message);
						}

					} catch(e) {
						Ti.API.info('in catch login' + JSON.stringify(e));
					}
					Alloy.Globals.LoadingScreen.close();
				});
			}
		} else if (args.notification_link == "tip") {
			var tipInfoData = Alloy.Globals.DbManager.Get_tipByIDForNotification(args.link_ids);
			if (tipInfoData.length > 0) {
				var tipInfoData = Alloy.createController("TipsInfoScreen", tipInfoData[0]).getView();
				if (OS_IOS) {
					Alloy.Globals.notificationNavWindow.openWindow(tipInfoData);
				} else if (OS_ANDROID) {
					tipInfoData.open();
				}
			} else {
				//Need to fetch object from server
				//alert("Record not available");
				Alloy.Globals.LoadingScreen.open();
				var user_id = Ti.App.Properties.getObject("userDetails").user.id;
				var url = Alloy.Globals.Constants.DOMAIN_URL + 'getDataByParam';

				var param = {
					'authKey' : 'llB8eTk=oKtG',
					'app_version' : Titanium.App.version,
					'table_type' : args.notification_link,
					'primary_key' : args.link_ids
				};
				Ti.API.info('url of get single record of contact : ' + url);
				Ti.API.info('get single record contact parameter: ' + JSON.stringify(param));

				Alloy.Globals.Communicator.post(url, param, function(e) {
					try {
						if (e.success) {
							var responseData = JSON.parse(e.response);
							var tipsdata = responseData.data;
							var tipInfoData = Alloy.createController("TipsInfoScreen", tipsdata).getView();
							if (OS_IOS) {
								Alloy.Globals.notificationNavWindow.openWindow(tipInfoData);
							} else if (OS_ANDROID) {
								tipInfoData.open();
							}
						} else if (responseData.status == "false") {
							alert(responseData.message);
						} else {
							alert(e.message);
						}

					} catch(e) {
						Ti.API.info('in catch login' + JSON.stringify(e));
					}
					Alloy.Globals.LoadingScreen.close();
				});
			}
		}
	} else {
		var winargs = {};
		winargs.navWindow = Alloy.Globals.notificationNavWindow;
		var openToolsQuestion = Alloy.createController("QuestionScreen", winargs).getView();
		if (OS_IOS) {
			Alloy.Globals.notificationNavWindow.openWindow(openToolsQuestion);
		} else if (OS_ANDROID) {
			openToolsQuestion.open();
		}
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
