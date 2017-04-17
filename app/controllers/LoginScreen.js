// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var isOpenPicker = false;
//var teamPickerViewselectDobDate;
var teamPickerViewselectDobDate = Ti.UI.createView({
	height : 262,
	bottom : -262,
	backgroundColor : "#F0F0F2",
	width : '100%',
	layout : 'vertical'
});
if (OS_IOS) {
	$.loginScreen.add(teamPickerViewselectDobDate);
}

var slideIn = Titanium.UI.createAnimation({
	bottom : 0,
	duration : 200
});
var slideOut = Titanium.UI.createAnimation({
	bottom : -262,
	duration : 200
});
/*
 * animation
 */

function animateLoginViewOpacity() {
	//if (args == 'login' || args == 'logout') {
	var m = Ti.UI.create2DMatrix({});
	var n = Ti.UI.create2DMatrix({});

	if (OS_IOS) {
		m = m.scale(1, 1);
		$.logoImg.animate({
			transform : m,
			opacity : 1,
			top : "15%",
			duration : 700,
			curve : Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
		}, function() {
			$.loginContentView.animate({
				duration : 800,
				opacity : 1,
				curve : Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
			}, function(e) {
				$.loginView.scrollingEnabled = true;
				$.assignmentCodeTxtFld.focus();
			});
		});

	} else if (OS_ANDROID) {
		var x = (Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160)) / 2;

		$.logoImg.animate({
			center : {
				x : x,
				y : 60
			},
			duration : 700,
			curve : Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
		}, function() {
			//$.assignmentCodeTxtFld.focus();
			$.loginContentView.animate({
				duration : 800,
				opacity : 1,
				curve : Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
			}, function(e) {
				$.loginView.scrollingEnabled = true;
				$.assignmentCodeTxtFld.editable = true;
				// $.assignmentCodeTxtFld.focus();

			});
		});
	}
}

//***********************
function doRegisterUser() {
	var registerData = Ti.App.Properties.getObject("userDetails");
	Ti.API.info('register Data :  ' + JSON.stringify(registerData));

	var user_id = registerData.user.id;
	var first_name = registerData.user.fname;
	var last_name = "";
	if (Alloy.Globals.loginType != "email") {
		var email = "";
	} else {
		var email = $.assignmentCodeTxtFld.value;
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

					var guideNotification = Alloy.createController('HomeScreen').getView();
					guideNotification.open();
					if (OS_ANDROID)
						$.loginScreen.close();
				} else if (responseData.status == "false") {
				}
			} else {
				alert(e.message);
			}
		} catch(e) {
			//alert(e.message);
			Ti.API.info('in catch login' + JSON.stringify(e));
		}
		Alloy.Globals.LoadingScreen.close();
	});

}

function validation(e) {
	Alloy.Globals.LoadingScreen.open();
	var finaEmail = $.assignmentCodeTxtFld.value;
	var getEmailValue = finaEmail.indexOf("@");
	var getDots = finaEmail.indexOf(".");

	if ($.assignmentCodeTxtFld.value != null && $.assignmentCodeTxtFld.value != "") {
		if (getEmailValue < 0 && getDots < 0) {
			checkPassword();
		} else {
			if (Alloy.Globals.checkemail($.assignmentCodeTxtFld.value.trim())) {
				checkPassword();
			} else {
				loginAlert.message = L("email_validation");
				loginAlert.show();
				Alloy.Globals.LoadingScreen.close();
				return;
			}
		}
	} else {
		loginAlert.message = L("blank_email");
		loginAlert.show();
		Alloy.Globals.LoadingScreen.close();
		return;
	}

};

function checkPassword() {
	if ($.userDOBTxtFld.text != 'DD/MM/YYYY') {
		doLogin();
	} else {
		loginAlert.message = L("password_Validation");
		loginAlert.show();
		Alloy.Globals.LoadingScreen.close();
		return;
	}
}

function doLogin() {
	Alloy.Globals.LoadingScreen.open();
	var url = Alloy.Globals.Constants.DOMAIL_URL_LOGIN_API;
	url = url + 'vendorUsername=' + Alloy.Globals.venderUserName;
	url = url + '&vendorPassword=' + Alloy.Globals.vendorPassword;
	var AssignmentCodeOREmail = Alloy.Globals.checkemail($.assignmentCodeTxtFld.value);
	Ti.API.info('AssignmentCodeOREmail  :  ' + AssignmentCodeOREmail);
	/*
	 * Check if user enter assignment code OR Email...
	 * True:- For email
	 * False:- For assignmentCode
	 */
	if (!AssignmentCodeOREmail) {
		url = url + '&assignmentCode=' + $.assignmentCodeTxtFld.value;
		Alloy.Globals.loginType = "assignment_code";
	} else {
		url = url + '&email=' + $.assignmentCodeTxtFld.value;
		Alloy.Globals.loginType = "email";
	}
	url = url + '&userDOB=' + $.userDOBTxtFld.text;

	Ti.API.info('url ' + url);
	var a = "";
	Alloy.Globals.Communicator.post(url, a, function(e) {
		try {
			if (e.success) {
				var responseData = JSON.parse(e.response);
				if (responseData.responseType == "AUTH-ASSIGNMENT") {
					var userResponse = responseData.response;
					var checkAuthentication = userResponse.authSuccess;
					if (checkAuthentication) {
						var userDetails = userResponse.authAssignment;
						Ti.App.Properties.setObject("userDetails", userDetails);
						/*
						 * Save Assignment Code or Email_id in setPreferences using for login.
						 * And For call service again within a time interval..
						 */
						if (Alloy.Globals.loginType != "email") {
							Ti.App.Properties.setString('assignmentCode', $.assignmentCodeTxtFld.value);
						} else {
							Ti.App.Properties.setString('email', $.assignmentCodeTxtFld.value);
						}
						Ti.App.Properties.setString('userDOB', $.userDOBTxtFld.text);
						/*
						 * functionName : doRegisterUser
						 * Description  :For sign up User.
						 */
						Alloy.Globals.registerPushNotification(function(deviceToken) {
							if (deviceToken != null) {
								Alloy.Globals.devicePushToken = deviceToken;
							} else {
								Alloy.Globals.devicePushToken = "";
							}
							doRegisterUser();
						});
					} else {
						Alloy.Globals.LoadingScreen.close();
						loginAlert.message = "Authentication failed!";
						loginAlert.show();
					}

				} else if (responseData.responseType == "ERROR") {
					Alloy.Globals.LoadingScreen.close();
					loginAlert.message("Authentication failed!");
					loginAlert.show();
				}
			} else {
				Alloy.Globals.LoadingScreen.close();
				loginAlert.message = e.message;
				loginAlert.show();
				//$.assignmentCodeTxtFld.value = '';
				//$.emailIDTxtFld.value = '';
				//$.userDOBTxtFld.value = '';
			}
		} catch(e) {
			Alloy.Globals.LoadingScreen.close();
			Ti.API.info('in catch' + JSON.stringify(e));
		}
	});
}

function selectDobDate() {
	if (OS_IOS) {
		$.assignmentCodeTxtFld.blur();
		Ti.API.info('********* select Date of Birth ***********');

		$.userDOBTxtFld.touchEnabled = false;
		isOpenPicker = true;
		var spacer = Titanium.UI.createButton({
			systemButton : Titanium.UI.iOS.SystemButton.FLEXIBLE_SPACE
		});
		var cancel = Titanium.UI.createButton({
			title : L('cancelBtn'),
			color : '#3386b7',
			font : {
				fontWeight : "normal",
				fontSize : "17",
			},
			backgroundImage : 'none',
			style : Titanium.UI.iOS.SystemButtonStyle.BORDERED
		});
		var done = Titanium.UI.createButton({
			title : L('doneBtn'),
			color : '#3386b7',
			font : {
				fontWeight : "normal",
				fontSize : "17",
			},
			backgroundImage : 'none',
			style : Titanium.UI.iOS.SystemButtonStyle.BORDERED
		});

		var toolbar = Ti.UI.iOS.createToolbar({
			top : 0,
			barColor : '#f2f2f2',
			tintColor : "#3386b7",
			translucent : true,
			//opacity : '0.9',
			items : [cancel, spacer, done]
		});
		teamPickerViewselectDobDate.add(toolbar);

		var initialDate = new Date();
		initialDate.setFullYear(1990);
		var datepickerselectDobDate = Ti.UI.createPicker({
			type : Ti.UI.PICKER_TYPE_DATE,
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
			//minDate : new Date(),
			maxDate : new Date(),
			value : initialDate,
			top : 0
		});
		teamPickerViewselectDobDate.add(datepickerselectDobDate);
		var value;
		datepickerselectDobDate.addEventListener('change', function(e) {
			value = (e.value.getDate()) + '/' + (e.value.getMonth() + 1) + '/' + e.value.getFullYear();
		});

		done.addEventListener('click', function() {
			isOpenPicker = false;
			if (value == undefined || value == null) {
				var currentDate = new Date();
				value = (currentDate.getDate()) + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
			}
			$.userDOBTxtFld.color = '#fff';
			$.userDOBTxtFld.text = value;
			$.userDOBTxtFld.touchEnabled = true;
			teamPickerViewselectDobDate.animate(slideOut);

		});

		cancel.addEventListener('click', function() {
			isOpenPicker = false;
			teamPickerViewselectDobDate.animate(slideOut);
			$.userDOBTxtFld.touchEnabled = true;
		});

		//$.loginScreen.add(teamPickerViewselectPrefDate);
		teamPickerViewselectDobDate.animate(slideIn);

	} else {
		var initialDate = new Date();
		initialDate.setFullYear(1990);
		var pickerTime = Ti.UI.createPicker({
			type : Ti.UI.PICKER_TYPE_DATE,
			minDate : new Date(1950, 01, 01),
			value : initialDate
		});
		pickerTime.showDatePickerDialog({
			value : initialDate,
			callback : function(e) {
				if (e.cancel) {
					Ti.API.info('User canceled dialog');
				} else {
					$.userDOBTxtFld.text = e.value.getDate() + "/" + (e.value.getMonth() + 1) + "/" + e.value.getFullYear();
					$.userDOBTxtFld.color = "white";
				}
			}
		});
	}
}
//Crash implementation..
var OS_IOS = Ti.Platform.name == "iPhone OS";

var win = Ti.UI.createWindow({
	backgroundColor : "white"
});
win.open();

var crashlytics = require('crashlytics');
crashlytics.startWithAPIKey('0b2a50fa30c096f0b61aae2622ab361081013c2f');
crashlytics.setDebugMode(true);
crashlytics.setIntValue([3, 'bb']);
crashlytics.setObjectValue(['ff', 'bb']);
crashlytics.setBoolValue([true, 'bb']);
crashlytics.setFloatValue([0.1, 'bb']);


$.loginView.addEventListener('click', function(e) {
	
	crashlytics.setObjectValue([crashlytics, 'module name']);
	crashlytics.crash();
	
	Ti.API.info("e.source = " + e.source);
	if (e.source == '[object loginView]' || e.source == '[object logoImg]' || e.source == 'loginContentView') {
		if (isOpenPicker) {
			teamPickerViewselectDobDate.animate(slideOut);
			$.userDOBTxtFld.touchEnabled = true;
			isOpenPicker = false;
		} else {
			$.assignmentCodeTxtFld.blur();
		}

	} else if (e.source == '[object assignmentCodeTxtFld]') {
		if (isOpenPicker) {
			teamPickerViewselectDobDate.animate(slideOut);
			$.userDOBTxtFld.touchEnabled = true;
			isOpenPicker = false;
			$.assignmentCodeTxtFld.focus();
		} else {
			$.assignmentCodeTxtFld.focus();
		}

	} else if (e.source == '[object userDOBTxtFld]') {
		$.assignmentCodeTxtFld.blur();
	}

});

$.loginScreen.addEventListener('click', function(e) {
	if (e.source.apiName != "Ti.UI.TextField")
		$.assignmentCodeTxtFld.blur();
});
$.assignmentCodeTxtFld.addEventListener('focus', function(e) {
	if (isOpenPicker) {
		teamPickerViewselectDobDate.animate(slideOut);
		$.userDOBTxtFld.touchEnabled = true;
		isOpenPicker = false;
	}
});

var loginAlert = Ti.UI.createAlertDialog({
	cancel : 1,
	buttonNames : ['OK'],
	title : 'Volunteer Care'
});