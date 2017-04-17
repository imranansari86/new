function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function GotoScreen() {
        if ("Reminders" != args.notification_category) {
            if ("contact" == args.notification_link) {
                var contactInfoData = Alloy.Globals.DbManager.Get_contactByIDForNotification(args.link_ids);
                if (contactInfoData.length > 0) {
                    Ti.API.info("Contact detail from notification = " + JSON.stringify(contactInfoData[0]));
                    var openContactInfo = Alloy.createController("ContactDetailScreen", contactInfoData[0]).getView();
                    Alloy.Globals.notificationNavWindow.openWindow(openContactInfo);
                } else {
                    Alloy.Globals.LoadingScreen.open();
                    {
                        Ti.App.Properties.getObject("userDetails").user.id;
                    }
                    var url = Alloy.Globals.Constants.DOMAIN_URL + "getDataByParam";
                    var param = {
                        authKey: "llB8eTk=oKtG",
                        app_version: Titanium.App.version,
                        table_type: args.notification_link,
                        primary_key: args.link_ids
                    };
                    Ti.API.info("url of get single record of contact : " + url);
                    Ti.API.info("get single record contact parameter: " + JSON.stringify(param));
                    Alloy.Globals.Communicator.post(url, param, function(e) {
                        try {
                            if (e.success) {
                                var responseData = JSON.parse(e.response);
                                var contactData = responseData.data;
                                var openContactInfo = Alloy.createController("ContactDetailScreen", contactData).getView();
                                Alloy.Globals.notificationNavWindow.openWindow(openContactInfo);
                            } else alert("false" == responseData.status ? responseData.message : e.message);
                        } catch (e) {
                            Ti.API.info("in catch login" + JSON.stringify(e));
                        }
                        Alloy.Globals.LoadingScreen.close();
                    });
                }
            } else if ("guide" == args.notification_link) {
                var guidInfoData = Alloy.Globals.DbManager.Get_guideByIDForNotification(args.link_ids);
                if (guidInfoData.length > 0) {
                    var openGuideInfo = Alloy.createController("GuideInfoScreen", guidInfoData[0]).getView();
                    Alloy.Globals.notificationNavWindow.openWindow(openGuideInfo);
                } else {
                    Alloy.Globals.LoadingScreen.open();
                    {
                        Ti.App.Properties.getObject("userDetails").user.id;
                    }
                    var url = Alloy.Globals.Constants.DOMAIN_URL + "getDataByParam";
                    var param = {
                        authKey: "llB8eTk=oKtG",
                        app_version: Titanium.App.version,
                        table_type: args.notification_link,
                        primary_key: args.link_ids
                    };
                    Ti.API.info("url of get single record of contact : " + url);
                    Ti.API.info("get single record contact parameter: " + JSON.stringify(param));
                    Alloy.Globals.Communicator.post(url, param, function(e) {
                        try {
                            if (e.success) {
                                var responseData = JSON.parse(e.response);
                                var guidedata = responseData.data;
                                var openGuideInfo = Alloy.createController("GuideInfoScreen", guidedata).getView();
                                Alloy.Globals.notificationNavWindow.openWindow(openGuideInfo);
                            } else alert("false" == responseData.status ? responseData.message : e.message);
                        } catch (e) {
                            Ti.API.info("in catch login" + JSON.stringify(e));
                        }
                        Alloy.Globals.LoadingScreen.close();
                    });
                }
            } else if ("tip" == args.notification_link) {
                var tipInfoData = Alloy.Globals.DbManager.Get_tipByIDForNotification(args.link_ids);
                if (tipInfoData.length > 0) {
                    var tipInfoData = Alloy.createController("TipsInfoScreen", tipInfoData[0]).getView();
                    Alloy.Globals.notificationNavWindow.openWindow(tipInfoData);
                } else {
                    Alloy.Globals.LoadingScreen.open();
                    {
                        Ti.App.Properties.getObject("userDetails").user.id;
                    }
                    var url = Alloy.Globals.Constants.DOMAIN_URL + "getDataByParam";
                    var param = {
                        authKey: "llB8eTk=oKtG",
                        app_version: Titanium.App.version,
                        table_type: args.notification_link,
                        primary_key: args.link_ids
                    };
                    Ti.API.info("url of get single record of contact : " + url);
                    Ti.API.info("get single record contact parameter: " + JSON.stringify(param));
                    Alloy.Globals.Communicator.post(url, param, function(e) {
                        try {
                            if (e.success) {
                                var responseData = JSON.parse(e.response);
                                var tipsdata = responseData.data;
                                var tipInfoData = Alloy.createController("TipsInfoScreen", tipsdata).getView();
                                Alloy.Globals.notificationNavWindow.openWindow(tipInfoData);
                            } else alert("false" == responseData.status ? responseData.message : e.message);
                        } catch (e) {
                            Ti.API.info("in catch login" + JSON.stringify(e));
                        }
                        Alloy.Globals.LoadingScreen.close();
                    });
                }
            }
        } else {
            var winargs = {};
            winargs.navWindow = Alloy.Globals.notificationNavWindow;
            var openToolsQuestion = Alloy.createController("QuestionScreen", winargs).getView();
            Alloy.Globals.notificationNavWindow.openWindow(openToolsQuestion);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "NotificationInfoScreen";
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
    $.__views.notificationInfoScreen = Ti.UI.createWindow({
        titleAttributes: {
            color: "#fff",
            font: {
                fontFamily: "SourceSansPro-Semibold",
                fontSize: "18"
            }
        },
        id: "notificationInfoScreen",
        backButtonTitle: "",
        navTintColor: "#fff",
        backgroundColor: "#fff",
        barColor: "#3386b7"
    });
    $.__views.notificationInfoScreen && $.addTopLevelView($.__views.notificationInfoScreen);
    $.__views.mainView = Ti.UI.createView({
        top: 0,
        id: "mainView",
        layout: "vertical",
        bottom: 40
    });
    $.__views.notificationInfoScreen.add($.__views.mainView);
    $.__views.View = Ti.UI.createView({
        id: "View",
        top: 0,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#f2f2f2"
    });
    $.__views.mainView.add($.__views.View);
    $.__views.title = Ti.UI.createLabel({
        color: "#2E3C45",
        font: {
            fontSize: 15,
            fontFamily: "calibril"
        },
        width: "95%",
        height: Ti.UI.SIZE,
        top: 8,
        bottom: 8,
        id: "title"
    });
    $.__views.View.add($.__views.title);
    $.__views.webView = Ti.UI.createWebView({
        top: "0",
        backgroundColor: "white",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        hideLoadIndicator: true,
        id: "webView"
    });
    $.__views.mainView.add($.__views.webView);
    $.__views.gotoBtn = Ti.UI.createLabel({
        font: {
            fontSize: 15,
            fontWeight: "bold"
        },
        color: "white",
        id: "gotoBtn",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        visible: false,
        bottom: 0,
        height: 50,
        backgroundColor: "#69b086",
        width: "100%"
    });
    $.__views.notificationInfoScreen.add($.__views.gotoBtn);
    GotoScreen ? $.addListener($.__views.gotoBtn, "click", GotoScreen) : __defers["$.__views.gotoBtn!click!GotoScreen"] = true;
    $.__views.ActivityView = Ti.UI.createView({
        backgroundColor: "transparent",
        width: 80,
        height: 80,
        borderRadius: 10,
        id: "ActivityView"
    });
    $.__views.notificationInfoScreen.add($.__views.ActivityView);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 18,
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        height: 28,
        width: 28,
        id: "activityIndicator"
    });
    $.__views.ActivityView.add($.__views.activityIndicator);
    $.__views.loadingLabel = Ti.UI.createLabel({
        text: "Please wait...",
        bottom: 18,
        color: "#BDBDBD",
        font: {
            fontSize: 11
        },
        id: "loadingLabel"
    });
    $.__views.ActivityView.add($.__views.loadingLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    $.notificationInfoScreen.title = "Notification";
    $.title.text = args.notification_title;
    var htmlText = '<html><body style="word-break: normal; font-family: Arial, Helvetica, sans-serif;"><meta name="viewport" content="width=95%, background-color=#ff0000, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"><div style="width:100%; height:auto; word-wrap:normal; float:left;  white-space: normal;">' + args.notification_description + "</div></body></html>";
    $.webView.html = htmlText;
    var htmlText;
    if ("Information" == args.notification_category && null != args.notification_link && "" != args.notification_link) {
        $.mainView.bottom = 40;
        $.gotoBtn.visible = true;
        $.gotoBtn.text = "This notification is linked with a " + args.notification_link + " article. Click here to view the article.";
    } else if ("Reminders" == args.notification_category) {
        $.mainView.bottom = 40;
        $.gotoBtn.visible = true;
        $.gotoBtn.text = "This notification is linked with a task. Click here to start the task";
    } else {
        $.mainView.bottom = 0;
        $.gotoBtn.visible = false;
    }
    $.activityIndicator.show();
    $.ActivityView.visible = true;
    $.webView.addEventListener("load", function() {
        $.activityIndicator.hide();
        $.ActivityView.visible = false;
    });
    $.webView.addEventListener("error", function() {
        $.activityIndicator.hide();
        $.ActivityView.visible = false;
    });
    $.webView.addEventListener("beforeload", function(e) {
        Ti.API.info("e beforeload:  " + JSON.stringify(e));
        if (e.navigationType == Titanium.UI.iOS.WEBVIEW_NAVIGATIONTYPE_LINK_CLICKED) {
            e.bubble = false;
            $.webView.stopLoading();
            Ti.Platform.openURL(e.url);
        }
    });
    __defers["$.__views.gotoBtn!click!GotoScreen"] && $.addListener($.__views.gotoBtn, "click", GotoScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;