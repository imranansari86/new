function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function CheckCredentials() {
        if (void 0 != Ti.App.Properties.getString("assignmentCode") || void 0 != Ti.App.Properties.getString("email")) {
            Ti.API.info("login already " + Alloy.Globals.loginType);
            if (void 0 != Ti.App.Properties.getString("assignmentCode")) {
                var loginUserNameAssignmentCode = Ti.App.Properties.getString("assignmentCode");
                var loginUserPassword = Ti.App.Properties.getString("userDOB");
                if (Ti.Network.online) doLoginFromBackground(loginUserNameAssignmentCode, loginUserPassword); else {
                    var guideNotification = Alloy.createController("HomeScreen").getView();
                    guideNotification.open();
                    allowIndexClose = true;
                }
            } else if (Ti.Network.online) {
                var loginUserNameEmail = Ti.App.Properties.getString("email");
                var loginUserPassword = Ti.App.Properties.getString("userDOB");
                doLoginFromBackground(loginUserNameEmail, loginUserPassword);
            } else {
                var guideNotification = Alloy.createController("HomeScreen").getView();
                guideNotification.open();
                allowIndexClose = true;
            }
        } else {
            Ti.API.info("not logged in open Login Screen");
            var guideNotification = Alloy.createController("LoginScreen").getView();
            guideNotification.open({
                animated: false
            });
            allowIndexClose = true;
        }
    }
    function doLoginFromBackground(userID, userDOB) {
        var url = Alloy.Globals.Constants.DOMAIL_URL_LOGIN_API;
        url = url + "vendorUsername=" + Alloy.Globals.venderUserName;
        url = url + "&vendorPassword=" + Alloy.Globals.vendorPassword;
        var AssignmentCodeOREmail = Alloy.Globals.checkemail(userID);
        Ti.API.info("AssignmentCodeOREmail  :  " + AssignmentCodeOREmail);
        url = AssignmentCodeOREmail ? url + "&email=" + userID : url + "&assignmentCode=" + userID;
        url = url + "&userDOB=" + userDOB;
        var a = "";
        Alloy.Globals.Communicator.post(url, a, function(e) {
            try {
                if (e.success) {
                    Ti.API.info("e details : " + JSON.stringify(e));
                    var responseData = JSON.parse(e.response);
                    if ("AUTH-ASSIGNMENT" == responseData.responseType) {
                        var userResponse = responseData.response;
                        var checkAuthentication = userResponse.authSuccess;
                        Ti.API.info("checkAuthentication : " + checkAuthentication);
                        if (checkAuthentication) {
                            var userDetails = userResponse.authAssignment;
                            Ti.App.Properties.setObject("userDetails", null);
                            Ti.App.Properties.setObject("userDetails", userDetails);
                            Ti.API.info("hello User Refresh Data : " + JSON.stringify(Ti.App.Properties.getObject("userDetails")));
                            Alloy.Globals.registerPushNotification(function(deviceToken) {
                                Ti.API.info("Inside push register callback");
                                Alloy.Globals.devicePushToken = null != deviceToken ? deviceToken : "";
                                doRegisterUserFromBackground();
                            });
                        } else {
                            var loginWindow = Alloy.createController("LoginScreen").getView();
                            loginWindow.open({
                                animated: false
                            });
                        }
                    } else if ("ERROR" == responseData.responseType) {
                        var loginWindow = Alloy.createController("LoginScreen").getView();
                        loginWindow.open({
                            animated: false
                        });
                    } else {
                        var guideNotification = Alloy.createController("HomeScreen").getView();
                        guideNotification.open();
                    }
                } else {
                    var guideNotification = Alloy.createController("HomeScreen").getView();
                    guideNotification.open();
                }
            } catch (e) {
                var guideNotification = Alloy.createController("HomeScreen").getView();
                guideNotification.open();
                Ti.API.info("e.message catch  :  " + e.message);
                Ti.API.info("in catch" + JSON.stringify(e));
            }
        });
    }
    function doRegisterUserFromBackground() {
        var registerData = Ti.App.Properties.getObject("userDetails");
        Ti.API.info("register Data :  " + JSON.stringify(registerData));
        var user_id = registerData.user.id;
        var first_name = registerData.user.fname;
        var last_name = "";
        if (void 0 != Ti.App.Properties.getString("email")) var email = ""; else var email = Ti.App.Properties.getString("assignmentCode");
        var phone = "";
        var username = Alloy.Globals.venderUserName;
        var password = Alloy.Globals.vendorPassword;
        var assignment_code = registerData.position.assignmentCode;
        var dob = registerData.user.dob;
        var sex = registerData.user.sex;
        var assignment_country = registerData.position.countryTo.name;
        var position_start_date = registerData.position.start;
        var position_end_date = registerData.position.end;
        var url = Alloy.Globals.Constants.DOMAIN_URL + "signup";
        var deviceType;
        deviceType = "iPhone";
        var param = {
            user_id: user_id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            username: username,
            password: password,
            assignment_code: assignment_code,
            dob: dob,
            sex: sex,
            assignment_country: assignment_country,
            position_start_date: position_start_date,
            position_end_date: position_end_date,
            authKey: "llB8eTk=oKtG",
            device_id: Titanium.Platform.id,
            device_type: deviceType,
            device_token: Alloy.Globals.devicePushToken,
            loginType: Alloy.Globals.loginType,
            app_version: Titanium.App.version
        };
        Ti.API.info("url signUp on Server : " + url);
        Ti.API.info("signUp parameter: " + JSON.stringify(param));
        Alloy.Globals.Communicator.post(url, param, function(e) {
            try {
                if (e.success) {
                    var responseData = JSON.parse(e.response);
                    Ti.API.info("responseData :  " + JSON.stringify(responseData));
                    if ("true" == responseData.status) {
                        Ti.App.Properties.setString("currentCountry", responseData.data.country);
                        Ti.App.Properties.setString("currentCountryId", responseData.data.location_id);
                        "true" == responseData.data.is_changed_country && Alloy.Globals.DbManager.cleanDatabase();
                    }
                }
            } catch (e) {}
            var guideNotification = Alloy.createController("HomeScreen").getView();
            guideNotification.open();
            allowIndexClose = true;
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#3386b7",
        theme: "Theme.AppCompat.NoTitleBar",
        exitOnClose: true,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId4 = Ti.UI.createImageView({
        backgroundImage: "none",
        image: "/images/logo.png",
        id: "__alloyId4"
    });
    $.__views.index.add($.__views.__alloyId4);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var allowIndexClose = false;
    Alloy.Globals.getBadgeCount = function(isFromResume, isPushForeground) {
        if (null == Ti.App.Properties.getObject("userDetails")) return;
        var user_id = Ti.App.Properties.getObject("userDetails").user.id;
        var url = Alloy.Globals.Constants.DOMAIN_URL + "getBadgeCount";
        var param = {
            authKey: "llB8eTk=oKtG",
            app_version: Titanium.App.version,
            user_id: user_id
        };
        Ti.API.info("url of get badge count : " + url);
        Ti.API.info("get badge count parameter: " + JSON.stringify(param));
        Alloy.Globals.Communicator.post(url, param, function(e) {
            Ti.API.info("Response of getBadgeCount :  " + JSON.stringify(e));
            try {
                if (e.success) {
                    var responseData = JSON.parse(e.response);
                    if ("true" == responseData.status) {
                        var badgeCount = parseInt(responseData.data.badge_count);
                        if (null != badgeCount) {
                            Ti.API.info("latest badge count = " + badgeCount);
                            Ti.App.Properties.setInt("notificationCount", badgeCount);
                            Ti.App.fireEvent("notificationupdate", null);
                            if (isPushForeground) {
                                Titanium.Media.beep();
                                Titanium.Media.vibrate();
                                Ti.UI.iPhone.setAppBadge(badgeCount);
                            } else Ti.UI.iPhone.setAppBadge(badgeCount);
                        }
                    }
                }
            } catch (e) {}
        });
    };
    CheckCredentials();
    var pushCallbackFunc;
    Alloy.Globals.registerPushNotification = function(pushCallback) {
        function receivePush(e) {
            if (e.inBackground) {
                if (void 0 != Ti.App.Properties.getString("assignmentCode") || void 0 != Ti.App.Properties.getString("email")) {
                    var notificationScreen = Alloy.createController("NotificationScreen").getView();
                    notificationScreen.open();
                }
            } else {
                Alloy.Globals.getBadgeCount(false, true);
                null != Alloy.Globals.notificationNavWindow && Alloy.Globals.updateNotificationsList(false);
                Alloy.Globals.GetDataFromSyn();
            }
        }
        function deviceTokenSuccess(e) {
            deviceToken = e.deviceToken;
            var deviceID = Ti.Platform.id;
            Ti.API.info("deviceID " + deviceID);
            Ti.API.info("deviceToken " + deviceToken);
            pushCallbackFunc && pushCallbackFunc(deviceToken);
        }
        function deviceTokenError() {
            Ti.API.info("Inside deviceTokenError");
            pushCallbackFunc && pushCallbackFunc(null);
        }
        Ti.API.info("Inside registerPushNotification");
        pushCallbackFunc = pushCallback;
        if (("Simulator" === Ti.Platform.model || -1 != Ti.Platform.model.indexOf("sdk")) && pushCallbackFunc) {
            pushCallbackFunc(null);
            return;
        }
        var deviceToken = null;
        Ti.API.info("Ti.Platform.name = iPhone OS");
        Ti.API.info("Ti.Platform.version.split = " + Ti.Platform.version.split(".")[0]);
        if (true && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
            Ti.Network.registerForPushNotifications({
                success: deviceTokenSuccess,
                error: deviceTokenError,
                callback: receivePush
            });
            Ti.App.iOS.registerUserNotificationSettings({
                types: [ Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE ]
            });
        } else Ti.Network.registerForPushNotifications({
            types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
            success: deviceTokenSuccess,
            error: deviceTokenError,
            callback: receivePush
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;