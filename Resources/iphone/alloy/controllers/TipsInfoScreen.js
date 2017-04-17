function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openSettingScreen() {
        var openGuideInfo = Alloy.createController("SettingScreen").getView();
        Alloy.Globals.tipsNavWin.openWindow(openGuideInfo);
    }
    function openNotificationScreen() {
        var notificationScreen = Alloy.createController("NotificationScreen").getView();
        notificationScreen.open();
    }
    function updateNotificationCount() {
        var notificationCount = Ti.App.Properties.getInt("notificationCount");
        if (notificationCount && notificationCount > 0) {
            $.notificationLbl.text = notificationCount + "";
            $.notificationV.visible = true;
        } else {
            $.notificationV.visible = false;
            $.notificationLbl.text = "0";
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TipsInfoScreen";
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
    $.__views.tipsInfoScreen = Ti.UI.createWindow({
        titleAttributes: {
            color: "#fff",
            font: {
                fontFamily: "SourceSansPro-Semibold",
                fontSize: "18"
            }
        },
        id: "tipsInfoScreen",
        titleid: "tips_title",
        backButtonTitle: "",
        navTintColor: "#fff",
        backgroundColor: "#fff",
        barColor: "#3386b7"
    });
    $.__views.tipsInfoScreen && $.addTopLevelView($.__views.tipsInfoScreen);
    $.__views.__alloyId150 = Ti.UI.createView({
        id: "__alloyId150"
    });
    $.__views.settingButton = Ti.UI.createView({
        id: "settingButton",
        height: 40,
        width: 40,
        right: 0
    });
    $.__views.__alloyId150.add($.__views.settingButton);
    openSettingScreen ? $.addListener($.__views.settingButton, "click", openSettingScreen) : __defers["$.__views.settingButton!click!openSettingScreen"] = true;
    $.__views.settingBtn = Ti.UI.createButton({
        id: "settingBtn",
        backgroundImage: "none",
        image: "/images/settings.png"
    });
    $.__views.settingButton.add($.__views.settingBtn);
    $.__views.notificationButton = Ti.UI.createView({
        id: "notificationButton",
        width: 40,
        height: 40,
        right: 40
    });
    $.__views.__alloyId150.add($.__views.notificationButton);
    $.__views.notificationBtn = Ti.UI.createButton({
        id: "notificationBtn",
        width: 40,
        height: 40,
        backgroundImage: "none",
        image: "/images/bell.png"
    });
    $.__views.notificationButton.add($.__views.notificationBtn);
    openNotificationScreen ? $.addListener($.__views.notificationBtn, "click", openNotificationScreen) : __defers["$.__views.notificationBtn!click!openNotificationScreen"] = true;
    $.__views.notificationV = Ti.UI.createView({
        top: 3,
        right: 5,
        width: 16,
        height: 16,
        backgroundColor: "#F6001E",
        borderRadius: 8,
        visible: false,
        id: "notificationV"
    });
    $.__views.notificationButton.add($.__views.notificationV);
    openNotificationScreen ? $.addListener($.__views.notificationV, "click", openNotificationScreen) : __defers["$.__views.notificationV!click!openNotificationScreen"] = true;
    $.__views.notificationLbl = Ti.UI.createLabel({
        color: "white",
        font: {
            fontSize: 10
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "1",
        id: "notificationLbl"
    });
    $.__views.notificationV.add($.__views.notificationLbl);
    $.__views.tipsInfoScreen.rightNavButton = $.__views.__alloyId150;
    $.__views.__alloyId151 = Ti.UI.createView({
        top: 0,
        layout: "vertical",
        id: "__alloyId151"
    });
    $.__views.tipsInfoScreen.add($.__views.__alloyId151);
    $.__views.View = Ti.UI.createView({
        id: "View",
        top: 0,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#f2f2f2"
    });
    $.__views.__alloyId151.add($.__views.View);
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
    $.__views.__alloyId151.add($.__views.webView);
    $.__views.ActivityView = Ti.UI.createView({
        backgroundColor: "transparent",
        width: 80,
        height: 80,
        borderRadius: 10,
        id: "ActivityView"
    });
    $.__views.tipsInfoScreen.add($.__views.ActivityView);
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
    $.title.text = args.list_title;
    var htmlText;
    var htmlText = '<html><body style="word-break: normal; font-family: Arial, Helvetica, sans-serif;"><meta name="viewport" content="width=95%, background-color=#ff0000, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"><div style="width:100%; height:auto; word-wrap:normal; float:left;  white-space: normal;">' + args.title_description + "</div></body></html>";
    $.webView.html = htmlText;
    $.activityIndicator.show();
    $.ActivityView.visible = true;
    $.webView.addEventListener("load", function(e) {
        Ti.API.info("load  .. e " + JSON.stringify(e));
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
    if (true && null != Alloy.Globals.notificationNavWindow) {
        $.settingButton.visible = false;
        $.notificationButton.visible = false;
    }
    Ti.App.addEventListener("notificationupdate", updateNotificationCount);
    updateNotificationCount();
    $.tipsInfoScreen.addEventListener("close", function() {
        Ti.App.removeEventListener("notificationupdate", updateNotificationCount);
    });
    __defers["$.__views.settingButton!click!openSettingScreen"] && $.addListener($.__views.settingButton, "click", openSettingScreen);
    __defers["$.__views.notificationBtn!click!openNotificationScreen"] && $.addListener($.__views.notificationBtn, "click", openNotificationScreen);
    __defers["$.__views.notificationV!click!openNotificationScreen"] && $.addListener($.__views.notificationV, "click", openNotificationScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;