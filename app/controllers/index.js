var allowIndexClose = false;
if(OS_ANDROID){
	// $.index.open();
	
	// $.index.addEventListener('android:back', function(e) {
		// if(allowIndexClose){
			// $.index.close();	
		// }
	// });
}

Alloy.Globals.getBadgeCount = function(isFromResume, isPushForeground) {
	if (Ti.App.Properties.getObject("userDetails") == null) {
		return;
	}
	var user_id = Ti.App.Properties.getObject("userDetails").user.id;
	var url = Alloy.Globals.Constants.DOMAIN_URL + 'getBadgeCount';

	var param = {
		'authKey' : 'llB8eTk=oKtG',
		'app_version' : Titanium.App.version,
		'user_id' : user_id
	};

	Ti.API.info('url of get badge count : ' + url);
	Ti.API.info('get badge count parameter: ' + JSON.stringify(param));

	Alloy.Globals.Communicator.post(url, param, function(e) {
		Ti.API.info('Response of getBadgeCount :  ' + JSON.stringify(e));
		try {
			if (e.success) {
				var responseData = JSON.parse(e.response);
				if (responseData.status == "true") {
					var badgeCount = parseInt(responseData.data.badge_count);

					if (badgeCount != null) {
						Ti.API.info("latest badge count = " + badgeCount);
						Ti.App.Properties.setInt('notificationCount', badgeCount);

						Ti.App.fireEvent("notificationupdate", null);

						if (isPushForeground) {
							if (OS_IOS) {
								Titanium.Media.beep();
								Titanium.Media.vibrate();

								Ti.UI.iPhone.setAppBadge(badgeCount);
							} else {
								Titanium.Media.vibrate([0, 500]);
								
								Alloy.Globals.TiGoosh.setAppBadge(badgeCount);
							}
						}else{
							if (OS_IOS) {
								Ti.UI.iPhone.setAppBadge(badgeCount);
							} else {
								Alloy.Globals.TiGoosh.setAppBadge(badgeCount);
							}
						}
					}
				}
			}
		} catch(e) {

		}
	});
};

/**
 * Open Login Screen..
 */

function CheckCredentials() {
	if (Ti.App.Properties.getString('assignmentCode') != undefined || Ti.App.Properties.getString('email') != undefined) {
		Ti.API.info('login already ' + Alloy.Globals.loginType);
		if (Ti.App.Properties.getString('assignmentCode') != undefined) {
			var loginUserNameAssignmentCode = Ti.App.Properties.getString('assignmentCode');
			var loginUserPassword = Ti.App.Properties.getString('userDOB');
			if (Ti.Network.online) {
				doLoginFromBackground(loginUserNameAssignmentCode, loginUserPassword);
			} else {
				var guideNotification = Alloy.createController('HomeScreen').getView();
				guideNotification.open();
				
				allowIndexClose = true;
			}
		} else {
			if (Ti.Network.online) {
				var loginUserNameEmail = Ti.App.Properties.getString('email');
				var loginUserPassword = Ti.App.Properties.getString('userDOB');
				doLoginFromBackground(loginUserNameEmail, loginUserPassword);
			} else {
				var guideNotification = Alloy.createController('HomeScreen').getView();
				guideNotification.open();
				
				allowIndexClose = true;
			}
		}
	} else {
		Ti.API.info('not logged in open Login Screen');
		var guideNotification = Alloy.createController('LoginScreen').getView();
		guideNotification.open({
			animated : false
		});
		
		allowIndexClose = true;
	}
}

CheckCredentials();

function doLoginFromBackground(userID, userDOB) {
	var url = Alloy.Globals.Constants.DOMAIL_URL_LOGIN_API;
	url = url + 'vendorUsername=' + Alloy.Globals.venderUserName;
	url = url + '&vendorPassword=' + Alloy.Globals.vendorPassword;

	var AssignmentCodeOREmail = Alloy.Globals.checkemail(userID);
	Ti.API.info('AssignmentCodeOREmail  :  ' + AssignmentCodeOREmail);
	if (!AssignmentCodeOREmail) {
		url = url + '&assignmentCode=' + userID;
	} else {
		url = url + '&email=' + userID;
	}
	url = url + '&userDOB=' + userDOB;

	var a = "";
	Alloy.Globals.Communicator.post(url, a, function(e) {
		try {
			if (e.success) {
				Ti.API.info('e details : ' + JSON.stringify(e));
				var responseData = JSON.parse(e.response);

				if (responseData.responseType == "AUTH-ASSIGNMENT") {
					var userResponse = responseData.response;
					var checkAuthentication = userResponse.authSuccess;
					Ti.API.info('checkAuthentication : ' + checkAuthentication);
					if (checkAuthentication) {
						var userDetails = userResponse.authAssignment;
						Ti.App.Properties.setObject("userDetails", null);
						Ti.App.Properties.setObject("userDetails", userDetails);
						Ti.API.info('hello User Refresh Data : ' + JSON.stringify(Ti.App.Properties.getObject("userDetails")));

						//alert("Call do registerUser");

						Alloy.Globals.registerPushNotification(function(deviceToken) {
							Ti.API.info("Inside push register callback");
							if (deviceToken != null) {
								Alloy.Globals.devicePushToken = deviceToken;
							} else {
								Alloy.Globals.devicePushToken = "";
							}
							doRegisterUserFromBackground();
						});

					} else {
						var loginWindow = Alloy.createController('LoginScreen').getView();
						loginWindow.open({
							animated : false
						});
					}

				} else if (responseData.responseType == "ERROR") {
					var loginWindow = Alloy.createController('LoginScreen').getView();
					loginWindow.open({
						animated : false
					});
				} else {
					var guideNotification = Alloy.createController('HomeScreen').getView();
					guideNotification.open();
				}
			} else {
				var guideNotification = Alloy.createController('HomeScreen').getView();
				guideNotification.open();
			}
		} catch(e) {
			var guideNotification = Alloy.createController('HomeScreen').getView();
			guideNotification.open();

			Ti.API.info('e.message catch  :  ' + e.message);
			Ti.API.info('in catch' + JSON.stringify(e));
		}
	});

}

function doRegisterUserFromBackground() {
	var registerData = Ti.App.Properties.getObject("userDetails");
	Ti.API.info('register Data :  ' + JSON.stringify(registerData));

	var user_id = registerData.user.id;
	var first_name = registerData.user.fname;
	var last_name = "";
	if (Ti.App.Properties.getString('email') != undefined) {
		var email = "";
	} else {
		var email = Ti.App.Properties.getString('assignmentCode');
	}
	var phone = "";
	var username = Alloy.Globals.venderUserName;
	var password = Alloy.Globals.vendorPassword;
	var assignment_code = registerData.position.assignmentCode;
	var dob = registerData.user.dob;
	var sex = registerData.user.sex;
	var assignment_country = registerData.position.countryTo.name;
	var position_start_date = registerData.position.start;
	var position_end_date = registerData.position.end;

	var url = Alloy.Globals.Constants.DOMAIN_URL + 'signup';

	var deviceType;
	if (OS_IOS) {
		deviceType = "iPhone";
	} else {
		deviceType = "android";
	}

	var param = {
		'user_id' : user_id,
		'first_name' : first_name,
		'last_name' : last_name,
		'email' : email,
		'phone' : phone,
		'username' : username,
		'password' : password,
		'assignment_code' : assignment_code,
		'dob' : dob,
		'sex' : sex,
		'assignment_country' : assignment_country,
		'position_start_date' : position_start_date,
		'position_end_date' : position_end_date,
		'authKey' : 'llB8eTk=oKtG',
		'device_id' : Titanium.Platform.id,
		'device_type' : deviceType,
		'device_token' : Alloy.Globals.devicePushToken,
		'loginType' : Alloy.Globals.loginType,
		'app_version' : Titanium.App.version
	};

	Ti.API.info('url signUp on Server : ' + url);
	Ti.API.info('signUp parameter: ' + JSON.stringify(param));

	Alloy.Globals.Communicator.post(url, param, function(e) {
		try {
			if (e.success) {
				var responseData = JSON.parse(e.response);
				Ti.API.info('responseData :  ' + JSON.stringify(responseData));
				if (responseData.status == "true") {
					Ti.App.Properties.setString('currentCountry', responseData.data.country);
					Ti.App.Properties.setString('currentCountryId', responseData.data.location_id);
					
					if(responseData.data.is_changed_country == "true"){
						Alloy.Globals.DbManager.cleanDatabase();
					}
				}
			}
		} catch(e) {

		}

		var guideNotification = Alloy.createController('HomeScreen').getView();
		guideNotification.open();
		
		allowIndexClose = true;
	});

}

var pushCallbackFunc;
if (OS_IOS) {
	Alloy.Globals.registerPushNotification = function(pushCallback) {
		Ti.API.info("Inside registerPushNotification");
		
		pushCallbackFunc = pushCallback;
		if (Ti.Platform.model === 'Simulator' || Ti.Platform.model.indexOf('sdk') != -1) {
			if (pushCallbackFunc) {
				pushCallbackFunc(null);
				return;
			}
		}
		var deviceToken = null;
		/**
		 * Check if the device is running iOS 8 or later
		 *
		 */
		Ti.API.info("Ti.Platform.name = " + Ti.Platform.name);
		Ti.API.info("Ti.Platform.version.split = " + Ti.Platform.version.split(".")[0]);
		if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {

			Ti.Network.registerForPushNotifications({
				success : deviceTokenSuccess,
				error : deviceTokenError,
				callback : receivePush
			});

			/**
			 * Register notification types to use
			 */
			Ti.App.iOS.registerUserNotificationSettings({
				types : [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
			});
		}

		/**
		 * For iOS 7 and earlier
		 */
		else {
			Ti.Network.registerForPushNotifications({
				// Specifies which notifications to receive
				types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
				success : deviceTokenSuccess,
				error : deviceTokenError,
				callback : receivePush
			});
		}

		/**
		 * Process incoming push notifications
		 */
		function receivePush(e) {
			// Iphone
			/**
			 * When app in Background
			 */
			if (e.inBackground) {
				if (Ti.App.Properties.getString('assignmentCode') != undefined || Ti.App.Properties.getString('email') != undefined) {
					var notificationScreen = Alloy.createController("NotificationScreen").getView();
					notificationScreen.open();
				}
				//alert("push in background: " + JSON.stringify(e));
				// Alloy.Globals.pushData = e;
			} else {
				Alloy.Globals.getBadgeCount(false, true);

				if (Alloy.Globals.notificationNavWindow != null) {
					Alloy.Globals.updateNotificationsList(false);
				}

				Alloy.Globals.GetDataFromSyn();
			}
		}

		/**
		 * Save the device token for subsequent API calls
		 */
		function deviceTokenSuccess(e) {
			deviceToken = e.deviceToken;
			var deviceID = Ti.Platform.id;
			Ti.API.info('deviceID ' + deviceID);
			Ti.API.info('deviceToken ' + deviceToken);
			if (pushCallbackFunc) {
				pushCallbackFunc(deviceToken);
			}
		}

		function deviceTokenError(e) {
			Ti.API.info("Inside deviceTokenError");
			if (pushCallbackFunc) {
				pushCallbackFunc(null);
			}
		}

	};
} else {
	Alloy.Globals.TiGoosh = require('ti.goosh');

	Alloy.Globals.registerPushNotification = function(pushCallback) {
		pushCallbackFunc = pushCallback;
		if (Ti.Platform.model === 'Simulator' || Ti.Platform.model.indexOf('sdk') != -1 || Ti.Platform.manufacturer === 'Genymotion') {
			if (pushCallbackFunc) {
				pushCallbackFunc(null);
				return;
			}
		}
		var deviceToken = null;

		Alloy.Globals.TiGoosh.registerForPushNotifications({
			success : deviceTokenSuccess,
			error : deviceTokenError,
			callback : receivePush
		});

		/**
		 * Process incoming push notifications
		 */
		function receivePush(e) {
			Ti.API.info("e = " + JSON.stringify(e));
			e = JSON.parse(e.data || '');

			//Android

			/**
			 * When app in Background
			 */
			if (e.inBackground) {
				if (Ti.App.Properties.getString('assignmentCode') != undefined || Ti.App.Properties.getString('email') != undefined) {
					var notificationScreen = Alloy.createController("NotificationScreen").getView();
					notificationScreen.open();
				}
			} else {
				Alloy.Globals.getBadgeCount(false, true);

				if (Alloy.Globals.notificationNavWindow != null) {
					Alloy.Globals.updateNotificationsList(false);
				}
				
				Alloy.Globals.GetDataFromSyn();
			}
		}

		/**
		 * Save the device token for subsequent API calls
		 */
		function deviceTokenSuccess(e) {//
			deviceToken = e.deviceToken;
			var deviceID = Ti.Platform.id;
			Ti.API.info('deviceID ' + deviceID);
			Ti.API.info('deviceToken ' + deviceToken);
			if (pushCallbackFunc) {
				pushCallbackFunc(deviceToken);
			}
		}

		function deviceTokenError(e) {
			if (pushCallbackFunc) {
				pushCallbackFunc(null);
			}
		}

	};
}

/**
 * This Function is used for show toast in foreground push.
 */
function toast(e) {
	var window = Ti.UI.createWindow({
		backgroundColor : "transparent",
		theme : "Theme.AppCompat.Translucent.NoTitleBar"
	});
	var transulentView = Ti.UI.createView({
		backgroundColor : "black",
		opacity : 0.8,
		width : "100%",
		height : 98,
		top : 0
	});
	var alertLbl = Ti.UI.createLabel({
		text : e,
		color : "white",
		left : 10,
		right : 10,
		height : 98,
		top : 5,
		font : {
			fontSize : 15,
			fontFamily : 'calibril',
			fontType : "Normal"
		}
	});
	window.add(transulentView);
	window.add(alertLbl);

	window.open();
	var timeoutHandle = setTimeout(function(e) {
		window.close();
	}, 5000);

	window.addEventListener("click", function(e) {
		clearTimeout(timeoutHandle);
		window.close();
	});
}

