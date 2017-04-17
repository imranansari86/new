function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.infiniteScroll/" + s : s.substring(0, index) + "/nl.fokkezb.infiniteScroll/" + s.substring(index + 1);
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
    function init(parent) {
        if (parentSymbol) return;
        if ("Ti.UI.TableView" !== parent.apiName && "Ti.UI.ListView" !== parent.apiName && "de.marcelpociot.CollectionView" !== parent.apiName) {
            console.error("[" + $.__widgetId + "] Please call init() passing TableView or ListView");
            return;
        }
        parentSymbol = parent;
        parentSymbol.footerView || (parentSymbol.footerView = $.is);
        list = "Ti.UI.TableView" !== parentSymbol.apiName;
        delete args.__parentSymbol;
        delete args.__itemTemplate;
        delete args.$model;
        setOptions(args);
        $.isText.text = options.msgTap;
        $.isCenter.remove($.isIndicator);
        if (list) {
            mark();
            parentSymbol.addEventListener("marker", load);
        } else parentSymbol.addEventListener("scroll", onScroll);
        $.is.addEventListener("click", load);
        $.isText.addEventListener("click", load);
        return;
    }
    function mark() {
        if (list) {
            if (!_.isUndefined(parentSymbol.sectionCount) && parentSymbol.sectionCount > 0) {
                var sectionIndex = parentSymbol.sectionCount - 1;
                var itemIndex = Math.max(parentSymbol.sections[sectionIndex].items.length - 1);
                sectionIndex + itemIndex > 0 && parentSymbol.setMarker({
                    sectionIndex: sectionIndex,
                    itemIndex: itemIndex
                });
            }
        } else position = null;
    }
    function state(_state, _message) {
        $.isIndicator.hide();
        $.isCenter.remove($.isIndicator);
        if (0 !== _state && false !== _state && -1 !== _state && 1 !== _state && true !== _state) throw Error("Pass a valid state");
        currentState = _state;
        _updateMessage(_message);
        $.isCenter.add($.isText);
        $.isText.show();
        list && -1 !== _state && mark();
        setTimeout(function() {
            loading = false;
        }, 25);
        return true;
    }
    function load() {
        if (loading) return false;
        loading = true;
        $.isCenter.remove($.isText);
        $.isCenter.add($.isIndicator);
        $.isIndicator.show();
        $.trigger("end", {
            success: function(msg) {
                return state(exports.SUCCESS, msg);
            },
            error: function(msg) {
                return state(exports.ERROR, msg);
            },
            done: function(msg) {
                return state(exports.DONE, msg);
            }
        });
        return true;
    }
    function onScroll(e) {
        if (e.source !== parentSymbol) return;
        var triggerLoad;
        triggerLoad = position && e.contentOffset.y > position && e.contentOffset.y + e.size.height > e.contentSize.height;
        position = e.contentOffset.y;
        triggerLoad && load();
        return;
    }
    function detach() {
        state(exports.DONE);
        list ? parentSymbol.removeEventListener("marker", load) : parentSymbol.removeEventListener("scroll", onScroll);
        $.is.removeEventListener("click", load);
        return;
    }
    function cleanup() {
        detach();
        parentSymbol.footerView === $.is && (parentSymbol.footerView = void 0);
        parentSymbol = void 0;
    }
    function setOptions(_options) {
        _.extend(options, _options);
        _updateMessage();
    }
    function _updateMessage(_message) {
        $.isText.text = _message ? _message : 0 === currentState || false === currentState ? options.msgError : -1 === currentState ? options.msgDone : options.msgTap;
    }
    function hide() {
        $.is.hide();
    }
    function show() {
        $.is.show();
    }
    new (require("alloy/widget"))("nl.fokkezb.infiniteScroll");
    this.__widgetId = "nl.fokkezb.infiniteScroll";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.is = Ti.UI.createView({
        top: "0dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "is"
    });
    $.__views.isCenter = Ti.UI.createView({
        height: "50dp",
        bottom: "0dp",
        id: "isCenter"
    });
    $.__views.is.add($.__views.isCenter);
    $.__views.isText = Ti.UI.createLabel({
        wordWrap: false,
        color: "#777",
        font: {
            fontSize: "13dp"
        },
        id: "isText"
    });
    $.__views.isCenter.add($.__views.isText);
    $.__views.indicatorBack = Ti.UI.createView({
        opacity: .5,
        height: "30dp",
        width: "30dp",
        borderRadius: 3,
        backgroundColor: "black",
        id: "indicatorBack",
        visible: false
    });
    $.__views.isCenter.add($.__views.indicatorBack);
    $.__views.isIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        id: "isIndicator"
    });
    $.__views.isCenter.add($.__views.isIndicator);
    $.__views.is && $.addProxyProperty("footerView", $.__views.is);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var options = {
        msgTap: L("isTap", "Tap to load more"),
        msgDone: L("isDone", "No more to load"),
        msgError: L("isError", "Tap to try again")
    };
    var loading = false, position = null, list = false, currentState = 1, parentSymbol = null;
    !__parentSymbol || "Ti.UI.TableView" !== __parentSymbol.apiName && "Ti.UI.ListView" !== __parentSymbol.apiName && "de.marcelpociot.CollectionView" !== __parentSymbol.apiName ? console.debug("[" + $.__widgetId + "] Do not forget to call init() passing a TableView or ListView") : init(__parentSymbol);
    exports.SUCCESS = 1;
    exports.ERROR = 0;
    exports.DONE = -1;
    exports.setOptions = setOptions;
    exports.load = load;
    exports.state = state;
    exports.dettach = detach;
    exports.detach = detach;
    exports.cleanup = cleanup;
    exports.init = init;
    exports.mark = mark;
    exports.hide = hide;
    exports.show = show;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;