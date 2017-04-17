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
        var parentView = $.contractByPsychologist.parent;
        parentView.remove($.contractByPsychologist);
    }
    function getDetail(e) {
        "yes" == e.source.titleid ? dataIs = {
            event: L("yes")
        } : "no" == e.source.titleid && (dataIs = {
            event: L("no")
        });
        var PhysoContactScreen = Alloy.createController("PsychologistContactDetails", dataIs).getView();
        $.contractByPsychologist.add(PhysoContactScreen);
    }
    function touchStart(e) {
        e.source.backgroundColor = "#69b086";
    }
    function touchEnd(e) {
        e.source.backgroundColor = "#3386b7";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ContractedByPsychogist";
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
    $.__views.contractByPsychologist = Ti.UI.createView({
        id: "contractByPsychologist",
        backgroundColor: "#fff",
        top: 0,
        bottom: 0,
        width: Ti.UI.FILL
    });
    $.__views.contractByPsychologist && $.addTopLevelView($.__views.contractByPsychologist);
    $.__views.topView = Ti.UI.createView({
        id: "topView",
        height: Ti.UI.SIZE,
        top: 0,
        layout: "vertical",
        width: "90%"
    });
    $.__views.contractByPsychologist.add($.__views.topView);
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
            textid: "PsychologistSoonLabel",
            top: 30
        });
        return o;
    }());
    $.__views.topView.add($.__views.headingLbl);
    $.__views.__alloyId24 = Ti.UI.createView({
        bottom: 80,
        height: Ti.UI.SIZE,
        layout: "vertical",
        width: "100%",
        id: "__alloyId24"
    });
    $.__views.contractByPsychologist.add($.__views.__alloyId24);
    $.__views.yesButton = Ti.UI.createButton(function() {
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
            id: "yesButton",
            top: 10,
            titleid: "yes"
        });
        return o;
    }());
    $.__views.__alloyId24.add($.__views.yesButton);
    getDetail ? $.addListener($.__views.yesButton, "click", getDetail) : __defers["$.__views.yesButton!click!getDetail"] = true;
    touchStart ? $.addListener($.__views.yesButton, "touchstart", touchStart) : __defers["$.__views.yesButton!touchstart!touchStart"] = true;
    touchEnd ? $.addListener($.__views.yesButton, "touchend", touchEnd) : __defers["$.__views.yesButton!touchend!touchEnd"] = true;
    $.__views.noButton = Ti.UI.createButton(function() {
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
            id: "noButton",
            top: 10,
            titleid: "no"
        });
        return o;
    }());
    $.__views.__alloyId24.add($.__views.noButton);
    getDetail ? $.addListener($.__views.noButton, "click", getDetail) : __defers["$.__views.noButton!click!getDetail"] = true;
    touchStart ? $.addListener($.__views.noButton, "touchstart", touchStart) : __defers["$.__views.noButton!touchstart!touchStart"] = true;
    touchEnd ? $.addListener($.__views.noButton, "touchend", touchEnd) : __defers["$.__views.noButton!touchend!touchEnd"] = true;
    $.__views.barLines = Ti.UI.createView({
        id: "barLines",
        layout: "horizontal",
        top: 30,
        height: 5,
        right: 20,
        left: 20
    });
    $.__views.__alloyId24.add($.__views.barLines);
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
        backgroundColor: "#3386b7"
    });
    $.__views.barLines.add($.__views.three);
    $.__views.__alloyId25 = Ti.UI.createView({
        bottom: 0,
        height: 80,
        id: "__alloyId25"
    });
    $.__views.contractByPsychologist.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createLabel(function() {
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
            textid: "question2Of3",
            textAlign: "center",
            id: "__alloyId26"
        });
        return o;
    }());
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createView({
        height: 40,
        width: 80,
        left: 0,
        id: "__alloyId27"
    });
    $.__views.__alloyId25.add($.__views.__alloyId27);
    backtoScreen ? $.addListener($.__views.__alloyId27, "click", backtoScreen) : __defers["$.__views.__alloyId27!click!backtoScreen"] = true;
    $.__views.__alloyId28 = Ti.UI.createImageView({
        left: 20,
        backgroundImage: "none",
        image: "/images/Back-icon.png",
        id: "__alloyId28"
    });
    $.__views.__alloyId27.add($.__views.__alloyId28);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    var dataIs;
    __defers["$.__views.yesButton!click!getDetail"] && $.addListener($.__views.yesButton, "click", getDetail);
    __defers["$.__views.yesButton!touchstart!touchStart"] && $.addListener($.__views.yesButton, "touchstart", touchStart);
    __defers["$.__views.yesButton!touchend!touchEnd"] && $.addListener($.__views.yesButton, "touchend", touchEnd);
    __defers["$.__views.noButton!click!getDetail"] && $.addListener($.__views.noButton, "click", getDetail);
    __defers["$.__views.noButton!touchstart!touchStart"] && $.addListener($.__views.noButton, "touchstart", touchStart);
    __defers["$.__views.noButton!touchend!touchEnd"] && $.addListener($.__views.noButton, "touchend", touchEnd);
    __defers["$.__views.__alloyId27!click!backtoScreen"] && $.addListener($.__views.__alloyId27, "click", backtoScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;