function doLoginFromBackground(userID, userDOB) {
    var url = Alloy.Globals.Constants.DOMAIL_URL_LOGIN_API;
    url = url + "vendorUsername=" + venderUserName;
    url = url + "&vendorPassword=" + vendorPassword;
    var AssignmentCodeOREmail = Alloy.Globals.checkemail(userID);
    Ti.API.info("AssignmentCodeOREmail  :  " + AssignmentCodeOREmail);
    url = AssignmentCodeOREmail ? url + "&email=" + userID : url + "&assignmentCode=" + userID;
    url = url + "&userDOB=" + userDOB;
    var a = "";
    Alloy.Globals.Communicator.post(url, a, function(e) {
        try {
            if (e.success) {
                Alloy.Globals.LoadingScreen.close();
                Ti.API.info("e details : " + JSON.stringify(e));
                var responseData = JSON.parse(e.response);
                Ti.API.info("responseData :  " + JSON.stringify(responseData));
                if ("AUTH-ASSIGNMENT" == responseData.responseType) {
                    var userResponse = responseData.response;
                    var checkAuthentication = userResponse.authSuccess;
                    Ti.API.info("checkAuthentication : " + checkAuthentication);
                    if (checkAuthentication) {
                        var userDetails = userResponse.authAssignment;
                        Ti.App.Properties.setObject("userDetails", null);
                        Ti.App.Properties.setObject("userDetails", userDetails);
                        Ti.API.info("hello User Refresh Data : " + JSON.stringify(Ti.App.Properties.getObject("userDetails")));
                        doRegisterUserFromBackground();
                    } else alert("Authentication failed!");
                } else "ERROR" == responseData.responseType && alert("Authentication failed!");
            } else Alloy.Globals.LoadingScreen.close();
        } catch (e) {
            Alloy.Globals.LoadingScreen.close();
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
    var username = venderUserName;
    var password = vendorPassword;
    var assignment_code = registerData.position.assignmentCode;
    var dob = registerData.user.dob;
    var sex = registerData.user.sex;
    var assignment_country = registerData.position.countryTo.name;
    var position_start_date = registerData.position.start;
    var position_end_date = registerData.position.end;
    var url = Alloy.Globals.Constants.DOMAIN_URL + "signup";
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
        loginType: Alloy.Globals.loginType
    };
    param.device_token = null != deviceToken ? Alloy.Globals.deviceToken : "";
    Ti.API.info("url signUp on Server : " + url);
    Ti.API.info("signUp parameter: " + JSON.stringify(param));
    Alloy.Globals.Communicator.post(url, param, function(e) {
        try {
            if (e.success) {
                var responseData = JSON.parse(e.response);
                Ti.API.info("responseData :  " + JSON.stringify(responseData));
                if ("true" == responseData.status) {
                    Ti.API.info("   " + JSON.stringify(responseData.data));
                    var guideNotification = Alloy.createController("HomeScreen").getView();
                    guideNotification.open();
                } else "false" == responseData.status;
            }
        } catch (e) {
            Ti.API.info("in catch Guide screen" + JSON.stringify(e));
        }
    });
}

var venderUserName = "cdnsol";

var vendorPassword = "meHcdjQDOvYEhJyx0yikFJUl";

var deviceToken = null;

if (void 0 != Ti.App.Properties.getString("assignmentCode") || void 0 != Ti.App.Properties.getString("email")) {
    Ti.API.info("login already " + Alloy.Globals.loginType);
    if (void 0 != Ti.App.Properties.getString("assignmentCode")) {
        var loginUserNameAssignmentCode = Ti.App.Properties.getString("assignmentCode");
        var loginUserPassword = Ti.App.Properties.getString("userDOB");
        doLoginFromBackground(loginUserNameAssignmentCode, loginUserPassword);
    } else {
        var loginUserNameEmail = Ti.App.Properties.getString("email");
        var loginUserPassword = Ti.App.Properties.getString("userDOB");
        doLoginFromBackground(loginUserNameEmail, loginUserPassword);
    }
} else {
    Ti.API.info("not logged in ");
    var guideNotification = Alloy.createController("loginScreen").getView();
    guideNotification.open();
}