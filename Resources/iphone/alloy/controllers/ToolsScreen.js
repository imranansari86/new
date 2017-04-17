function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openNotificationScreen() {
        var notificationScreen = Alloy.createController("NotificationScreen").getView();
        notificationScreen.open();
    }
    function openSettingScreen() {
        var settingScreen = Alloy.createController("SettingScreen").getView();
        Alloy.Globals.toolsNavWin.openWindow(settingScreen);
    }
    function showToolsList() {
        for (i = 0; 1 > i; i++) {
            var row = Ti.UI.createTableViewRow({
                height: Ti.UI.SIZE,
                backgroundColor: "transparent"
            });
            row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
            var MainView = Ti.UI.createView({
                height: 150,
                width: Ti.UI.FILL
            });
            var toolImage = Ti.UI.createImageView({
                image: "/images/banner.png",
                height: Ti.UI.FILL,
                width: Ti.UI.FILL
            });
            MainView.add(toolImage);
            var titlelbl = Ti.UI.createLabel({
                text: "Mental Wellbeing\nCheck-In",
                color: "#fff",
                textAlign: "center",
                font: {
                    fontSize: 22,
                    fontFamily: "SourceSansPro-Semibold",
                    fontWeight: "bold"
                },
                height: "150",
                width: Ti.UI.FILL
            });
            MainView.add(titlelbl);
            row.add(MainView);
            arr.push(row);
        }
        $.toolsTable.setData(arr);
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
    this.__controllerPath = "ToolsScreen";
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
    $.__views.toolsWindow = Ti.UI.createWindow({
        titleAttributes: {
            color: "#fff",
            font: {
                fontFamily: "SourceSansPro-Semibold",
                fontSize: "18"
            }
        },
        id: "toolsWindow",
        titleid: "tools_title",
        titleImage: "/images/guide_logo.png",
        tintColor: "#fff",
        barColor: "#3386b7",
        navTintColor: "#fff",
        backButtonTitle: ""
    });
    $.__views.__alloyId156 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId156"
    });
    $.__views.__alloyId157 = Ti.UI.createView({
        width: 40,
        height: 40,
        id: "__alloyId157"
    });
    $.__views.__alloyId156.add($.__views.__alloyId157);
    $.__views.notificationBtn = Ti.UI.createButton({
        id: "notificationBtn",
        width: 40,
        height: 40,
        backgroundImage: "none",
        image: "/images/bell.png"
    });
    $.__views.__alloyId157.add($.__views.notificationBtn);
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
    $.__views.__alloyId157.add($.__views.notificationV);
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
    $.__views.settingBtn = Ti.UI.createButton({
        id: "settingBtn",
        width: 40,
        height: 40,
        backgroundImage: "none",
        image: "/images/settings.png"
    });
    $.__views.__alloyId156.add($.__views.settingBtn);
    openSettingScreen ? $.addListener($.__views.settingBtn, "click", openSettingScreen) : __defers["$.__views.settingBtn!click!openSettingScreen"] = true;
    $.__views.toolsWindow.rightNavButton = $.__views.__alloyId156;
    $.__views.view = Ti.UI.createView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        top: 0,
        id: "view"
    });
    $.__views.toolsWindow.add($.__views.view);
    $.__views.toolsTable = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        height: Ti.UI.FILL,
        top: 0,
        id: "toolsTable",
        scrollable: false
    });
    $.__views.view.add($.__views.toolsTable);
    $.__views.ToolsNavWin = Ti.UI.createTab({
        titleAttributes: {
            color: "#fff"
        },
        window: $.__views.toolsWindow,
        titleid: "tools_title",
        id: "ToolsNavWin",
        backgroundImage: "none",
        icon: "/images/tool_normal.png"
    });
    $.__views.ToolsNavWin && $.addTopLevelView($.__views.ToolsNavWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    Alloy.Globals.toolsNavWin = $.ToolsNavWin;
    var arr = [];
    showToolsList();
    $.toolsTable.addEventListener("click", function(e) {
        Ti.API.info("table Click..." + JSON.stringify(e));
        var winargs = {};
        winargs.navWindow = Alloy.Globals.toolsNavWin;
        var openQuestionScreen = Alloy.createController("QuestionScreen", winargs).getView();
        Alloy.Globals.toolsNavWin.openWindow(openQuestionScreen);
    });
    Ti.App.addEventListener("notificationupdate", updateNotificationCount);
    updateNotificationCount();
    __defers["$.__views.notificationBtn!click!openNotificationScreen"] && $.addListener($.__views.notificationBtn, "click", openNotificationScreen);
    __defers["$.__views.notificationV!click!openNotificationScreen"] && $.addListener($.__views.notificationV, "click", openNotificationScreen);
    __defers["$.__views.settingBtn!click!openSettingScreen"] && $.addListener($.__views.settingBtn, "click", openSettingScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;