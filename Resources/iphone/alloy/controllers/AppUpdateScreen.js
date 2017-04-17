function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function gotoStore() {
        Ti.Platform.openURL("https://itunes.apple.com/us/app/volunteercare/id1193123288?ls=1&mt=8");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AppUpdateScreen";
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
    $.__views.updateWindow = Ti.UI.createWindow({
        id: "updateWindow",
        backgroundColor: "#ffffff"
    });
    $.__views.updateWindow && $.addTopLevelView($.__views.updateWindow);
    $.__views.__alloyId0 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "__alloyId0"
    });
    $.__views.updateWindow.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createImageView({
        width: 100,
        height: 100,
        image: "/images/applogo.png",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.versionLbl = Ti.UI.createLabel({
        top: "5",
        color: "#616161",
        font: {
            fontSize: 14
        },
        text: "Version 1.2",
        id: "versionLbl"
    });
    $.__views.__alloyId0.add($.__views.versionLbl);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        text: "This version of VolunteerCare app is expired.\nGo to app store and download the latest version",
        top: 50,
        width: "90%",
        textAlign: "center",
        color: "#616161",
        id: "__alloyId2"
    });
    $.__views.__alloyId0.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createButton({
        title: "Go to Store",
        top: 50,
        id: "__alloyId3"
    });
    $.__views.__alloyId0.add($.__views.__alloyId3);
    gotoStore ? $.addListener($.__views.__alloyId3, "click", gotoStore) : __defers["$.__views.__alloyId3!click!gotoStore"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    $.versionLbl.text = "Version " + Titanium.App.version;
    __defers["$.__views.__alloyId3!click!gotoStore"] && $.addListener($.__views.__alloyId3, "click", gotoStore);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;