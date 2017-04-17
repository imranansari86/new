function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.pullToRefresh/" + s : s.substring(0, index) + "/nl.fokkezb.pullToRefresh/" + s.substring(index + 1);
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
    function refresh() {
        if (!list) return;
        show();
        onRefreshstart();
    }
    function hide() {
        if (!refreshControl) return;
        refreshControl.endRefreshing();
    }
    function show() {
        if (!refreshControl) return;
        refreshControl.beginRefreshing();
    }
    function getList() {
        return list;
    }
    function getControl() {
        return refreshControl;
    }
    function onRefreshstart() {
        $.trigger("release", {
            source: $,
            hide: hide
        });
    }
    new (require("alloy/widget"))("nl.fokkezb.pullToRefresh");
    this.__widgetId = "nl.fokkezb.pullToRefresh";
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var refreshControl;
    var list;
    $.refresh = refresh;
    $.show = show;
    $.hide = hide;
    $.getList = getList;
    $.getControl = getControl;
    !function(args) {
        if (args.dontInit || false) {
            args.dontInit || console.warn("[pullToRefresh] only supports iOS and Android.");
            _.isArray(args.children) && _.map(args.children, $.addTopLevelView);
            return;
        }
        if (!_.isArray(args.children) || !_.contains([ "Titanium.UI.ListView", "Titanium.UI.TableView", "Ti.UI.ListView", "Ti.UI.TableView", "de.marcelpociot.CollectionView" ], args.children[args.children.length - 1].apiName)) {
            console.error("[pullToRefresh] is missing required Ti.UI.ListView or Ti.UI.TableView or de.marcelpociot.CollectionView as first child element.");
            return;
        }
        list = _.last(args.children);
        delete args.children;
        _.extend($, args);
        refreshControl = Ti.UI.createRefreshControl(args);
        refreshControl.addEventListener("refreshstart", onRefreshstart);
        list.refreshControl = refreshControl;
        $.addTopLevelView(list);
    }(arguments[0] || {});
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;