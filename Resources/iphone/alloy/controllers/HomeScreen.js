function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "HomeScreen";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __alloyId53 = [];
    $.__views.__alloyId54 = Alloy.createController("GuideScreen", {
        id: "__alloyId54",
        __parentSymbol: __parentSymbol
    });
    __alloyId53.push($.__views.__alloyId54.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId55 = Alloy.createController("ToolsScreen", {
        id: "__alloyId55",
        __parentSymbol: __parentSymbol
    });
    __alloyId53.push($.__views.__alloyId55.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId56 = Alloy.createController("ContactScreen", {
        id: "__alloyId56",
        __parentSymbol: __parentSymbol
    });
    __alloyId53.push($.__views.__alloyId56.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId57 = Alloy.createController("TipsScreen", {
        id: "__alloyId57",
        __parentSymbol: __parentSymbol
    });
    __alloyId53.push($.__views.__alloyId57.getViewEx({
        recurse: true
    }));
    $.__views.tabgroupMain = Ti.UI.createTabGroup({
        titleAttributes: {
            color: "#fff",
            font: {
                fontFamily: "SourceSansPro-Semibold",
                fontSize: "18"
            }
        },
        tabs: __alloyId53,
        id: "tabgroupMain",
        tintColor: "#3386B7",
        backgroundColor: "#fff",
        tabsBackgroundColor: "#f2f2f2",
        navTintColor: "#fff",
        barColor: "#3386B7"
    });
    $.__views.tabgroupMain && $.addTopLevelView($.__views.tabgroupMain);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    Alloy.Globals.MainTabGroup = $.tabgroupMain;
    Alloy.Globals.Itemid = {};
    Alloy.Globals.Itemid.SEARCH = 1;
    Alloy.Globals.Itemid.BELL = 2;
    Alloy.Globals.Itemid.SETTING = 3;
    Alloy.Globals.Itemid.LOGO = 4;
    Alloy.Globals.GetDataFromSyn();
    Alloy.Globals.androidAppPaused = false;
    Alloy.Globals.getBadgeCount(false);
    Ti.App.addEventListener("pause", function() {
        Ti.API.info("app was paused from the foreground");
    });
    Ti.App.addEventListener("resumed", function() {
        Ti.API.info("app was resumed from the background");
        Alloy.Globals.getBadgeCount(true, false);
        Alloy.Globals.GetDataFromSyn();
        null != Alloy.Globals.notificationNavWindow && Alloy.Globals.updateNotificationsList(false);
    });
    Ti.Network.addEventListener("change", function(e) {
        var networkIsOnline = e.online;
        e.networkType;
        networkIsOnline && Alloy.Globals.GetDataFromSyn();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;