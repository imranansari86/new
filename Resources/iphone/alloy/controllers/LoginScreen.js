function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function animateLoginViewOpacity() {
        var m = Ti.UI.create2DMatrix({});
        Ti.UI.create2DMatrix({});
        if (OS_IOS) {
            m = m.scale(1, 1);
            $.logoImg.animate({
                transform: m,
                opacity: 1,
                top: "15%",
                duration: 700,
                curve: Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
            }, function() {
                $.loginContentView.animate({
                    duration: 800,
                    opacity: 1,
                    curve: Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
                }, function() {
                    $.loginView.scrollingEnabled = true;
                    $.assignmentCodeTxtFld.focus();
                });
            });
        } else ;
    }
    function doRegisterUser() {
        var registerData = Ti.App.Properties.getObject("userDetails");
        Ti.API.info("register Data :  " + JSON.stringify(registerData));
        var user_id = registerData.user.id;
        var first_name = registerData.user.fname;
        var last_name = "";
        if ("email" != Alloy.Globals.loginType) var email = ""; else var email = $.assignmentCodeTxtFld.value;
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
        deviceType = OS_IOS ? "iPhone" : "android";
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
                        var guideNotification = Alloy.createController("HomeScreen").getView();
                        guideNotification.open();
                    } else "false" == responseData.status;
                } else alert(e.message);
            } catch (e) {
                Ti.API.info("in catch login" + JSON.stringify(e));
            }
            Alloy.Globals.LoadingScreen.close();
        });
    }
    function validation() {
        Alloy.Globals.LoadingScreen.open();
        var finaEmail = $.assignmentCodeTxtFld.value;
        var getEmailValue = finaEmail.indexOf("@");
        var getDots = finaEmail.indexOf(".");
        if (null == $.assignmentCodeTxtFld.value || "" == $.assignmentCodeTxtFld.value) {
            loginAlert.message = L("blank_email");
            loginAlert.show();
            Alloy.Globals.LoadingScreen.close();
            return;
        }
        if (0 > getEmailValue && 0 > getDots) checkPassword(); else {
            if (!Alloy.Globals.checkemail($.assignmentCodeTxtFld.value.trim())) {
                loginAlert.message = L("email_validation");
                loginAlert.show();
                Alloy.Globals.LoadingScreen.close();
                return;
            }
            checkPassword();
        }
    }
    function checkPassword() {
        if ("DD/MM/YYYY" == $.userDOBTxtFld.text) {
            loginAlert.message = L("password_Validation");
            loginAlert.show();
            Alloy.Globals.LoadingScreen.close();
            return;
        }
        doLogin();
    }
    function doLogin() {
        Alloy.Globals.LoadingScreen.open();
        var url = Alloy.Globals.Constants.DOMAIL_URL_LOGIN_API;
        url = url + "vendorUsername=" + Alloy.Globals.venderUserName;
        url = url + "&vendorPassword=" + Alloy.Globals.vendorPassword;
        var AssignmentCodeOREmail = Alloy.Globals.checkemail($.assignmentCodeTxtFld.value);
        Ti.API.info("AssignmentCodeOREmail  :  " + AssignmentCodeOREmail);
        if (AssignmentCodeOREmail) {
            url = url + "&email=" + $.assignmentCodeTxtFld.value;
            Alloy.Globals.loginType = "email";
        } else {
            url = url + "&assignmentCode=" + $.assignmentCodeTxtFld.value;
            Alloy.Globals.loginType = "assignment_code";
        }
        url = url + "&userDOB=" + $.userDOBTxtFld.text;
        Ti.API.info("url " + url);
        var a = "";
        Alloy.Globals.Communicator.post(url, a, function(e) {
            try {
                if (e.success) {
                    var responseData = JSON.parse(e.response);
                    if ("AUTH-ASSIGNMENT" == responseData.responseType) {
                        var userResponse = responseData.response;
                        var checkAuthentication = userResponse.authSuccess;
                        if (checkAuthentication) {
                            var userDetails = userResponse.authAssignment;
                            Ti.App.Properties.setObject("userDetails", userDetails);
                            "email" != Alloy.Globals.loginType ? Ti.App.Properties.setString("assignmentCode", $.assignmentCodeTxtFld.value) : Ti.App.Properties.setString("email", $.assignmentCodeTxtFld.value);
                            Ti.App.Properties.setString("userDOB", $.userDOBTxtFld.text);
                            Alloy.Globals.registerPushNotification(function(deviceToken) {
                                Alloy.Globals.devicePushToken = null != deviceToken ? deviceToken : "";
                                doRegisterUser();
                            });
                        } else {
                            Alloy.Globals.LoadingScreen.close();
                            loginAlert.message = "Authentication failed!";
                            loginAlert.show();
                        }
                    } else if ("ERROR" == responseData.responseType) {
                        Alloy.Globals.LoadingScreen.close();
                        loginAlert.message("Authentication failed!");
                        loginAlert.show();
                    }
                } else {
                    Alloy.Globals.LoadingScreen.close();
                    loginAlert.message = e.message;
                    loginAlert.show();
                }
            } catch (e) {
                Alloy.Globals.LoadingScreen.close();
                Ti.API.info("in catch" + JSON.stringify(e));
            }
        });
    }
    function selectDobDate() {
        if (OS_IOS) {
            $.assignmentCodeTxtFld.blur();
            Ti.API.info("********* select Date of Birth ***********");
            $.userDOBTxtFld.touchEnabled = false;
            isOpenPicker = true;
            var spacer = Titanium.UI.createButton({
                systemButton: Titanium.UI.iOS.SystemButton.FLEXIBLE_SPACE
            });
            var cancel = Titanium.UI.createButton({
                title: L("cancelBtn"),
                color: "#3386b7",
                font: {
                    fontWeight: "normal",
                    fontSize: "17"
                },
                backgroundImage: "none",
                style: Titanium.UI.iOS.SystemButtonStyle.BORDERED
            });
            var done = Titanium.UI.createButton({
                title: L("doneBtn"),
                color: "#3386b7",
                font: {
                    fontWeight: "normal",
                    fontSize: "17"
                },
                backgroundImage: "none",
                style: Titanium.UI.iOS.SystemButtonStyle.BORDERED
            });
            var toolbar = Ti.UI.iOS.createToolbar({
                top: 0,
                barColor: "#f2f2f2",
                tintColor: "#3386b7",
                translucent: true,
                items: [ cancel, spacer, done ]
            });
            teamPickerViewselectDobDate.add(toolbar);
            var initialDate = new Date();
            initialDate.setFullYear(1990);
            var datepickerselectDobDate = Ti.UI.createPicker({
                type: Ti.UI.PICKER_TYPE_DATE,
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                maxDate: new Date(),
                value: initialDate,
                top: 0
            });
            teamPickerViewselectDobDate.add(datepickerselectDobDate);
            var value;
            datepickerselectDobDate.addEventListener("change", function(e) {
                value = e.value.getDate() + "/" + (e.value.getMonth() + 1) + "/" + e.value.getFullYear();
            });
            done.addEventListener("click", function() {
                isOpenPicker = false;
                if (void 0 == value || null == value) {
                    var currentDate = new Date();
                    value = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
                }
                $.userDOBTxtFld.color = "#fff";
                $.userDOBTxtFld.text = value;
                $.userDOBTxtFld.touchEnabled = true;
                teamPickerViewselectDobDate.animate(slideOut);
            });
            cancel.addEventListener("click", function() {
                isOpenPicker = false;
                teamPickerViewselectDobDate.animate(slideOut);
                $.userDOBTxtFld.touchEnabled = true;
            });
            teamPickerViewselectDobDate.animate(slideIn);
        } else {
            var initialDate = new Date();
            initialDate.setFullYear(1990);
            var pickerTime = Ti.UI.createPicker({
                type: Ti.UI.PICKER_TYPE_DATE,
                minDate: new Date(1950, 1, 1),
                value: initialDate
            });
            pickerTime.showDatePickerDialog({
                value: initialDate,
                callback: function(e) {
                    if (e.cancel) Ti.API.info("User canceled dialog"); else {
                        $.userDOBTxtFld.text = e.value.getDate() + "/" + (e.value.getMonth() + 1) + "/" + e.value.getFullYear();
                        $.userDOBTxtFld.color = "white";
                    }
                }
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "LoginScreen";
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
    var __defers = {};
    $.__views.loginScreen = Ti.UI.createWindow({
        id: "loginScreen",
        backgroundColor: "#3386b7"
    });
    $.__views.loginScreen && $.addTopLevelView($.__views.loginScreen);
    animateLoginViewOpacity ? $.addListener($.__views.loginScreen, "open", animateLoginViewOpacity) : __defers["$.__views.loginScreen!open!animateLoginViewOpacity"] = true;
    $.__views.loginView = Ti.UI.createScrollView({
        top: 0,
        id: "loginView"
    });
    $.__views.loginScreen.add($.__views.loginView);
    $.__views.logoImg = Ti.UI.createImageView({
        id: "logoImg",
        backgroundImage: "none",
        opacity: 1,
        image: "/images/logo.png"
    });
    $.__views.loginView.add($.__views.logoImg);
    $.__views.loginContentView = Ti.UI.createView({
        height: "60%",
        top: "38%",
        opacity: 0,
        id: "loginContentView",
        width: Ti.UI.FILL,
        layout: "vertical"
    });
    $.__views.loginView.add($.__views.loginContentView);
    $.__views.emailORAssignment = Ti.UI.createLabel({
        font: {
            fontSize: 13
        },
        color: "#fff",
        touchEnabled: false,
        id: "emailORAssignment",
        textid: "EmailORAssignmentLbl",
        top: 10,
        left: 25
    });
    $.__views.loginContentView.add($.__views.emailORAssignment);
    $.__views.__alloyId58 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: 5,
        left: 20,
        right: 20,
        layout: "horizontal",
        id: "__alloyId58"
    });
    $.__views.loginContentView.add($.__views.__alloyId58);
    $.__views.EmailImg = Ti.UI.createImageView({
        id: "EmailImg",
        backgroundImage: "none",
        image: "/images/mail-message.png",
        left: 5
    });
    $.__views.__alloyId58.add($.__views.EmailImg);
    $.__views.assignmentCodeTxtFld = Ti.UI.createTextField(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            font: {
                fontSize: 18,
                fontFamily: "calibril",
                fontName: "Helvetica LT Light"
            },
            color: "#3386b7"
        });
        Alloy.Globals.iPhoneFive && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 15,
                fontFamily: "calibril",
                fontName: "Helvetica LT Light"
            },
            color: "#3386b7"
        });
        Alloy.Globals.iPhoneFour && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 15,
                fontFamily: "calibril",
                fontName: "Helvetica LT Light"
            },
            color: "#3386b7"
        });
        Alloy.deepExtend(true, o, {
            hintText: L("emailhintText"),
            hintTextColor: "#bfbfbf",
            font: {
                fontSize: 14,
                fontName: "Helvetica LT Light"
            },
            color: "#fff",
            id: "assignmentCodeTxtFld",
            keyboardType: Titanium.UI.KEYBOARD_EMAIL,
            autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
            height: 30,
            tintColor: "#fff",
            maxLength: 40,
            leftButtonPadding: 10,
            returnKeyType: Ti.UI.RETURNKEY_DONE
        });
        return o;
    }());
    $.__views.__alloyId58.add($.__views.assignmentCodeTxtFld);
    $.__views.__alloyId59 = Ti.UI.createView({
        backgroundColor: "#F2F2F2",
        height: 1,
        top: 10,
        left: 20,
        right: 20,
        id: "__alloyId59"
    });
    $.__views.loginContentView.add($.__views.__alloyId59);
    $.__views.emailORAssignment = Ti.UI.createLabel({
        font: {
            fontSize: 13
        },
        color: "#fff",
        touchEnabled: false,
        id: "emailORAssignment",
        textid: "DobLbl",
        top: 20,
        left: 25
    });
    $.__views.loginContentView.add($.__views.emailORAssignment);
    $.__views.__alloyId60 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: 5,
        left: 20,
        right: 20,
        id: "__alloyId60"
    });
    $.__views.loginContentView.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId61"
    });
    $.__views.__alloyId60.add($.__views.__alloyId61);
    selectDobDate ? $.addListener($.__views.__alloyId61, "click", selectDobDate) : __defers["$.__views.__alloyId61!click!selectDobDate"] = true;
    $.__views.EmailImg = Ti.UI.createImageView({
        id: "EmailImg",
        backgroundImage: "none",
        image: "/images/date.png",
        left: 5
    });
    $.__views.__alloyId61.add($.__views.EmailImg);
    $.__views.userDOBTxtFld = Ti.UI.createLabel({
        hintText: L("emailhintText"),
        hintTextColor: "#D8D8D8",
        text: "DD/MM/YYYY",
        color: "#bfbfbf",
        font: {
            fontSize: 14,
            fontName: "Helvetica LT Light"
        },
        id: "userDOBTxtFld",
        left: 10,
        height: 30
    });
    $.__views.__alloyId61.add($.__views.userDOBTxtFld);
    $.__views.__alloyId62 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        right: 5,
        id: "__alloyId62"
    });
    $.__views.__alloyId60.add($.__views.__alloyId62);
    selectDobDate ? $.addListener($.__views.__alloyId62, "click", selectDobDate) : __defers["$.__views.__alloyId62!click!selectDobDate"] = true;
    $.__views.dropImage = Ti.UI.createImageView({
        id: "dropImage",
        backgroundImage: "none",
        image: "/images/drop_arrow.png"
    });
    $.__views.__alloyId62.add($.__views.dropImage);
    $.__views.__alloyId63 = Ti.UI.createView({
        backgroundColor: "#F2F2F2",
        height: 1,
        top: 10,
        left: 20,
        right: 20,
        id: "__alloyId63"
    });
    $.__views.loginContentView.add($.__views.__alloyId63);
    $.__views.loginBtn = Ti.UI.createButton({
        font: {
            fontSize: 15,
            fontWeight: "bold"
        },
        color: "#3386b7",
        id: "loginBtn",
        top: 40,
        titleid: "signin_title",
        borderRadius: 3,
        height: 40,
        backgroundColor: "#fff",
        left: 20,
        right: 20
    });
    $.__views.loginContentView.add($.__views.loginBtn);
    validation ? $.addListener($.__views.loginBtn, "click", validation) : __defers["$.__views.loginBtn!click!validation"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    var isOpenPicker = false;
    var teamPickerViewselectDobDate = Ti.UI.createView({
        height: 262,
        bottom: -262,
        backgroundColor: "#F0F0F2",
        width: "100%",
        layout: "vertical"
    });
    OS_IOS && $.loginScreen.add(teamPickerViewselectDobDate);
    var slideIn = Titanium.UI.createAnimation({
        bottom: 0,
        duration: 200
    });
    var slideOut = Titanium.UI.createAnimation({
        bottom: -262,
        duration: 200
    });
    var OS_IOS = true;
    var win = Ti.UI.createWindow({
        backgroundColor: "white"
    });
    win.open();
    var crashlytics = require("crashlytics");
    crashlytics.startWithAPIKey("0b2a50fa30c096f0b61aae2622ab361081013c2f");
    crashlytics.setDebugMode(true);
    crashlytics.setIntValue([ 3, "bb" ]);
    crashlytics.setObjectValue([ "ff", "bb" ]);
    crashlytics.setBoolValue([ true, "bb" ]);
    crashlytics.setFloatValue([ .1, "bb" ]);
    $.loginView.addEventListener("click", function(e) {
        crashlytics.setObjectValue([ crashlytics, "module name" ]);
        crashlytics.crash();
        Ti.API.info("e.source = " + e.source);
        if ("[object loginView]" == e.source || "[object logoImg]" == e.source || "loginContentView" == e.source) if (isOpenPicker) {
            teamPickerViewselectDobDate.animate(slideOut);
            $.userDOBTxtFld.touchEnabled = true;
            isOpenPicker = false;
        } else $.assignmentCodeTxtFld.blur(); else if ("[object assignmentCodeTxtFld]" == e.source) if (isOpenPicker) {
            teamPickerViewselectDobDate.animate(slideOut);
            $.userDOBTxtFld.touchEnabled = true;
            isOpenPicker = false;
            $.assignmentCodeTxtFld.focus();
        } else $.assignmentCodeTxtFld.focus(); else "[object userDOBTxtFld]" == e.source && $.assignmentCodeTxtFld.blur();
    });
    $.loginScreen.addEventListener("click", function(e) {
        "Ti.UI.TextField" != e.source.apiName && $.assignmentCodeTxtFld.blur();
    });
    $.assignmentCodeTxtFld.addEventListener("focus", function() {
        if (isOpenPicker) {
            teamPickerViewselectDobDate.animate(slideOut);
            $.userDOBTxtFld.touchEnabled = true;
            isOpenPicker = false;
        }
    });
    var loginAlert = Ti.UI.createAlertDialog({
        cancel: 1,
        buttonNames: [ "OK" ],
        title: "Volunteer Care"
    });
    __defers["$.__views.loginScreen!open!animateLoginViewOpacity"] && $.addListener($.__views.loginScreen, "open", animateLoginViewOpacity);
    __defers["$.__views.__alloyId61!click!selectDobDate"] && $.addListener($.__views.__alloyId61, "click", selectDobDate);
    __defers["$.__views.__alloyId62!click!selectDobDate"] && $.addListener($.__views.__alloyId62, "click", selectDobDate);
    __defers["$.__views.loginBtn!click!validation"] && $.addListener($.__views.loginBtn, "click", validation);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;