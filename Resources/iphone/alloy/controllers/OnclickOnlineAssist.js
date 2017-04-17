function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function backtoScreen() {
        var parentView = $.onClickOnlineAsst.parent;
        parentView.remove($.onClickOnlineAsst);
    }
    function openFinishAsst() {
        var OpenFinishScreen = Alloy.createController("FinishMentalAssest").getView();
        Alloy.Globals.questionScreen.navWindow.openWindow(OpenFinishScreen);
        setTimeout(function() {
            Alloy.Globals.questionScreen.navWindow.closeWindow(Alloy.Globals.questionScreen);
        }, 100);
    }
    function touchStart(e) {
        e.source.backgroundColor = "#69b086";
    }
    function touchEnd(e) {
        e.source.backgroundColor = "#3386b7";
    }
    function openWebLink(e) {
        Ti.API.info("open link is " + JSON.stringify(e));
        Ti.Platform.openURL(e.source.text);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "OnclickOnlineAssist";
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
    $.__views.onClickOnlineAsst = Ti.UI.createView({
        id: "onClickOnlineAsst",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: "#fff"
    });
    $.__views.onClickOnlineAsst && $.addTopLevelView($.__views.onClickOnlineAsst);
    $.__views.topView = Ti.UI.createView({
        id: "topView",
        height: Ti.UI.SIZE,
        top: 0,
        layout: "vertical"
    });
    $.__views.onClickOnlineAsst.add($.__views.topView);
    $.__views.headingLbl = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            font: {
                fontSize: 20,
                fontFamily: "calibril"
            },
            color: "#000"
        });
        Alloy.Globals.iPhoneFive && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 14,
                fontFamily: "SourceSansPro-Semibold"
            },
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            color: "#000"
        });
        Alloy.Globals.iPhoneFour && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 13,
                fontFamily: "SourceSansPro-Semibold"
            },
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            color: "#000"
        });
        Alloy.Globals.iPhoneSix && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 15,
                fontFamily: "SourceSansPro-Semibold"
            },
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            color: "#000"
        });
        Alloy.Globals.iPhoneSixPlus && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 16,
                fontFamily: "SourceSansPro-Semibold"
            },
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            color: "#000"
        });
        Alloy.deepExtend(true, o, {
            id: "headingLbl",
            textid: "online_self_assesment_label",
            top: 30,
            width: "90%"
        });
        return o;
    }());
    $.__views.topView.add($.__views.headingLbl);
    $.__views.__alloyId68 = Ti.UI.createView({
        top: "20dp",
        right: "20dp",
        left: "20dp",
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId68"
    });
    $.__views.topView.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createView({
        height: .4,
        left: 0,
        right: 0,
        backgroundColor: "#3386b7",
        id: "__alloyId69"
    });
    $.__views.__alloyId68.add($.__views.__alloyId69);
    $.__views.headingLbl = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.Globals.iPhoneFour && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 16,
                fontFamily: "SourceSansPro-Semibold"
            },
            color: "#3386b7"
        });
        Alloy.Globals.iPhoneFive && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 17,
                fontFamily: "SourceSansPro-Semibold"
            },
            color: "#3386b7"
        });
        Alloy.Globals.iPhoneSix && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 18,
                fontFamily: "SourceSansPro-Semibold"
            },
            color: "#3386b7"
        });
        Alloy.Globals.iPhoneSixPlus && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 18,
                fontFamily: "SourceSansPro-Semibold"
            },
            color: "#3386b7"
        });
        Alloy.deepExtend(true, o, {
            id: "headingLbl",
            top: 10,
            width: "90%"
        });
        return o;
    }());
    $.__views.__alloyId68.add($.__views.headingLbl);
    $.__views.__alloyId70 = Ti.UI.createView({
        height: .4,
        left: 0,
        right: 0,
        top: 10,
        backgroundColor: "#3386b7",
        id: "__alloyId70"
    });
    $.__views.__alloyId68.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createScrollView({
        top: "20dp",
        height: "50%",
        scrollType: "vertical",
        layout: "vertical",
        id: "__alloyId71"
    });
    $.__views.topView.add($.__views.__alloyId71);
    $.__views.detail = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.Globals.iPhoneFour && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 11,
                fontFamily: "calibril"
            }
        });
        Alloy.Globals.iPhoneFive && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 12,
                fontFamily: "calibril"
            }
        });
        Alloy.Globals.iPhoneSix && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 14,
                fontFamily: "calibril"
            }
        });
        Alloy.Globals.iPhoneSixPlus && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 14,
                fontFamily: "calibril"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "detail",
            top: 0,
            width: "90%"
        });
        return o;
    }());
    $.__views.__alloyId71.add($.__views.detail);
    $.__views.selfAssesLink = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.Globals.iPhoneFour && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 16,
                fontFamily: "SourceSansPro-Semibold"
            },
            color: "#3386b7"
        });
        Alloy.Globals.iPhoneFive && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 17,
                fontFamily: "SourceSansPro-Semibold"
            },
            color: "#3386b7"
        });
        Alloy.Globals.iPhoneSix && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 18,
                fontFamily: "SourceSansPro-Semibold"
            },
            color: "#3386b7"
        });
        Alloy.Globals.iPhoneSixPlus && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 18,
                fontFamily: "SourceSansPro-Semibold"
            },
            color: "#3386b7"
        });
        Alloy.deepExtend(true, o, {
            id: "selfAssesLink",
            top: 5,
            width: "90%",
            text: "https://www.responsepsychological.com/assessment"
        });
        return o;
    }());
    $.__views.__alloyId71.add($.__views.selfAssesLink);
    openWebLink ? $.addListener($.__views.selfAssesLink, "click", openWebLink) : __defers["$.__views.selfAssesLink!click!openWebLink"] = true;
    $.__views.__alloyId72 = Ti.UI.createView({
        bottom: 80,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId72"
    });
    $.__views.onClickOnlineAsst.add($.__views.__alloyId72);
    $.__views.nextBitton = Ti.UI.createButton(function() {
        var o = {};
        Alloy.Globals.iPhoneFour && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 14,
                fontFamily: "SourceSansPro-Semibold"
            },
            borderRadius: "3",
            color: "#fff",
            focusable: "true",
            touchEnabled: true,
            backgroundImage: "none",
            backgroundSelectedColor: "#69b086",
            height: "40",
            backgroundColor: "#3386b7",
            left: "20",
            right: "20"
        });
        Alloy.Globals.iPhoneFive && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 15,
                fontFamily: "SourceSansPro-Semibold"
            },
            borderRadius: "3",
            color: "#fff",
            height: "40",
            backgroundImage: "none",
            focusable: "true",
            touchEnabled: true,
            backgroundSelectedColor: "#69b086",
            backgroundColor: "#3386b7",
            left: "20",
            right: "20"
        });
        Alloy.Globals.iPhoneSix && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 16,
                fontFamily: "SourceSansPro-Semibold"
            },
            borderRadius: "3",
            color: "#fff",
            height: "40",
            focusable: "true",
            touchEnabled: true,
            backgroundImage: "none",
            backgroundSelectedColor: "#69b086",
            backgroundColor: "#3386b7",
            left: "20",
            right: "20"
        });
        Alloy.Globals.iPhoneSixPlus && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 17,
                fontFamily: "SourceSansPro-Semibold"
            },
            borderRadius: "3",
            color: "#fff",
            height: "40",
            focusable: "true",
            touchEnabled: true,
            backgroundImage: "none",
            backgroundSelectedColor: "#69b086",
            backgroundColor: "#3386b7",
            left: "20",
            right: "20"
        });
        Alloy.deepExtend(true, o, {
            id: "nextBitton",
            top: 10,
            titleid: "next"
        });
        return o;
    }());
    $.__views.__alloyId72.add($.__views.nextBitton);
    openFinishAsst ? $.addListener($.__views.nextBitton, "click", openFinishAsst) : __defers["$.__views.nextBitton!click!openFinishAsst"] = true;
    touchStart ? $.addListener($.__views.nextBitton, "touchstart", touchStart) : __defers["$.__views.nextBitton!touchstart!touchStart"] = true;
    touchEnd ? $.addListener($.__views.nextBitton, "touchend", touchEnd) : __defers["$.__views.nextBitton!touchend!touchEnd"] = true;
    $.__views.barLines = Ti.UI.createView({
        id: "barLines",
        layout: "horizontal",
        right: 20,
        left: 20,
        top: 30,
        height: 5
    });
    $.__views.__alloyId72.add($.__views.barLines);
    $.__views.one = Ti.UI.createView({
        height: "4",
        width: "31%",
        left: 0,
        borderRadius: "3",
        id: "one",
        backgroundColor: "#69b086"
    });
    $.__views.barLines.add($.__views.one);
    $.__views.two = Ti.UI.createView({
        height: "4",
        width: "31%",
        left: "3%",
        borderRadius: "3",
        id: "two",
        backgroundColor: "#69b086"
    });
    $.__views.barLines.add($.__views.two);
    $.__views.three = Ti.UI.createView({
        height: "4",
        width: "31%",
        left: "3%",
        borderRadius: "3",
        id: "three",
        backgroundColor: "#69b086"
    });
    $.__views.barLines.add($.__views.three);
    $.__views.__alloyId73 = Ti.UI.createView({
        bottom: 0,
        height: 80,
        id: "__alloyId73"
    });
    $.__views.onClickOnlineAsst.add($.__views.__alloyId73);
    $.__views.questionNoTitle = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            font: {
                fontSize: 16,
                fontFamily: "calibril"
            },
            textAlign: "center",
            color: "#585858"
        });
        Alloy.Globals.iPhoneFive && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 14,
                fontFamily: "calibril"
            },
            textAlign: "center",
            color: "#585858"
        });
        Alloy.deepExtend(true, o, {
            textAlign: "center",
            id: "questionNoTitle"
        });
        return o;
    }());
    $.__views.__alloyId73.add($.__views.questionNoTitle);
    $.__views.__alloyId74 = Ti.UI.createView({
        height: 40,
        width: 80,
        left: 0,
        id: "__alloyId74"
    });
    $.__views.__alloyId73.add($.__views.__alloyId74);
    backtoScreen ? $.addListener($.__views.__alloyId74, "click", backtoScreen) : __defers["$.__views.__alloyId74!click!backtoScreen"] = true;
    $.__views.__alloyId75 = Ti.UI.createImageView({
        left: 20,
        backgroundImage: "none",
        image: "/images/Back-icon.png",
        id: "__alloyId75"
    });
    $.__views.__alloyId74.add($.__views.__alloyId75);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    Ti.API.info("args" + JSON.stringify(args));
    Ti.API.info("args evnt" + args.event);
    $.headingLbl.text = args.event;
    if ("Yes" == args.event) {
        $.detail.text = L("online_self_assesment_label_YES");
        $.questionNoTitle.text = L("question2Of3");
        $.selfAssesLink.visible = true;
    } else if ("No" == args.event) {
        $.detail.text = L("online_self_assesment_label_No");
        $.questionNoTitle.text = L("question2Of3");
        $.selfAssesLink.visible = false;
    } else if ("Maybe" == args.event) {
        $.detail.text = L("online_self_assesment_label_Maybe");
        $.questionNoTitle.text = L("question3Of3");
        $.selfAssesLink.visible = false;
    }
    __defers["$.__views.selfAssesLink!click!openWebLink"] && $.addListener($.__views.selfAssesLink, "click", openWebLink);
    __defers["$.__views.nextBitton!click!openFinishAsst"] && $.addListener($.__views.nextBitton, "click", openFinishAsst);
    __defers["$.__views.nextBitton!touchstart!touchStart"] && $.addListener($.__views.nextBitton, "touchstart", touchStart);
    __defers["$.__views.nextBitton!touchend!touchEnd"] && $.addListener($.__views.nextBitton, "touchend", touchEnd);
    __defers["$.__views.__alloyId74!click!backtoScreen"] && $.addListener($.__views.__alloyId74, "click", backtoScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;