function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "Loader/" + s : s.substring(0, index) + "/Loader/" + s.substring(index + 1);
    return path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function showIndicator() {
        $.activityIndicator.show();
    }
    new (require("alloy/widget"))("Loader");
    this.__widgetId = "Loader";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.widget = Ti.UI.createWindow({
        backgroundColor: "transparent",
        id: "widget"
    });
    $.__views.widget && $.addTopLevelView($.__views.widget);
    showIndicator ? $.addListener($.__views.widget, "open", showIndicator) : __defers["$.__views.widget!open!showIndicator"] = true;
    $.__views.ActivityView = Ti.UI.createView({
        backgroundColor: "black",
        opacity: .9,
        width: 80,
        height: 80,
        borderRadius: 10,
        id: "ActivityView"
    });
    $.__views.widget.add($.__views.ActivityView);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 18,
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        height: 28,
        width: 28,
        id: "activityIndicator"
    });
    $.__views.ActivityView.add($.__views.activityIndicator);
    $.__views.loadingLabel = Ti.UI.createLabel({
        text: "Please wait...",
        color: "white",
        bottom: 18,
        font: {
            fontSize: 11
        },
        id: "loadingLabel"
    });
    $.__views.ActivityView.add($.__views.loadingLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.open = function() {
        $.activityIndicatorAnd.show();
    };
    exports.close = function() {
        $.activityIndicatorAnd.hide();
    };
    __defers["$.__views.widget!open!showIndicator"] && $.addListener($.__views.widget, "open", showIndicator);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;