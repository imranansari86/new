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
        var parentView = $.PsychologistContactDetails.parent;
        parentView.remove($.PsychologistContactDetails);
    }
    function openOnlineAsst() {
        var onlineAsstScreen = Alloy.createController("RequestForOnlineAssessmnt").getView();
        $.PsychologistContactDetails.add(onlineAsstScreen);
    }
    function dailNumber(e) {
        var numberIS = e.source.text;
        Ti.Platform.openURL("tel:" + numberIS);
    }
    function openEmail(e) {
        var emailIS = e.source.text;
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Volunteer App";
        emailDialog.toRecipients = [ emailIS ];
        emailDialog.open();
    }
    function touchStart(e) {
        e.source.backgroundColor = "#69b086";
    }
    function touchEnd(e) {
        e.source.backgroundColor = "#3386b7";
    }
    function dailNumber(e) {
        var numberIS = e.source.text;
        Ti.Platform.openURL("tel:" + numberIS);
    }
    function openEmail() {
        var emailDialog = Titanium.UI.createEmailDialog();
        emailDialog.subject = "I want to contact my Psychologist";
        emailDialog.toRecipients = [ "example@gmail.com" ];
        emailDialog.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "PsychologistContactDetails";
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
    $.__views.PsychologistContactDetails = Ti.UI.createView({
        id: "PsychologistContactDetails",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: "#fff"
    });
    $.__views.PsychologistContactDetails && $.addTopLevelView($.__views.PsychologistContactDetails);
    $.__views.topView = Ti.UI.createView({
        id: "topView",
        height: Ti.UI.SIZE,
        top: 0,
        layout: "vertical"
    });
    $.__views.PsychologistContactDetails.add($.__views.topView);
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
            top: 30,
            width: "90%"
        });
        return o;
    }());
    $.__views.topView.add($.__views.headingLbl);
    $.__views.__alloyId76 = Ti.UI.createView({
        top: "20dp",
        right: "20dp",
        left: "20dp",
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId76"
    });
    $.__views.topView.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createView({
        height: .4,
        left: 0,
        right: 0,
        backgroundColor: "#3386b7",
        id: "__alloyId77"
    });
    $.__views.__alloyId76.add($.__views.__alloyId77);
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
    $.__views.__alloyId76.add($.__views.headingLbl);
    $.__views.__alloyId78 = Ti.UI.createView({
        height: .4,
        left: 0,
        right: 0,
        top: 10,
        backgroundColor: "#3386b7",
        id: "__alloyId78"
    });
    $.__views.__alloyId76.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createScrollView({
        top: "10dp",
        height: "23%",
        id: "__alloyId79"
    });
    $.__views.topView.add($.__views.__alloyId79);
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
    $.__views.__alloyId79.add($.__views.detail);
    $.__views.contactInfo = Ti.UI.createLabel(function() {
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
            id: "contactInfo",
            textid: "contact_info",
            top: 10,
            width: "90%"
        });
        return o;
    }());
    $.__views.topView.add($.__views.contactInfo);
    $.__views.__alloyId80 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId80"
    });
    $.__views.topView.add($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId81"
    });
    $.__views.__alloyId80.add($.__views.__alloyId81);
    $.__views.phone = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            font: {
                fontSize: 12
            },
            color: "#bfbfbf"
        });
        Alloy.Globals.iPhoneFour && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 10
            },
            color: "#bfbfbf"
        });
        Alloy.Globals.iPhoneFive && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 11
            },
            color: "#bfbfbf"
        });
        Alloy.Globals.iPhoneSix && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 12
            },
            color: "#bfbfbf"
        });
        Alloy.deepExtend(true, o, {
            id: "phone",
            top: 5,
            textid: "phone",
            left: "20dp"
        });
        return o;
    }());
    $.__views.__alloyId81.add($.__views.phone);
    $.__views.phoneDetail = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            font: {
                fontSize: 14
            }
        });
        Alloy.Globals.iPhoneFour && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 12
            }
        });
        Alloy.Globals.iPhoneFive && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 13
            }
        });
        Alloy.Globals.iPhoneSix && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 14
            }
        });
        Alloy.deepExtend(true, o, {
            text: "+613 9016 0400",
            id: "phoneDetail",
            top: 5,
            left: 20
        });
        return o;
    }());
    $.__views.__alloyId81.add($.__views.phoneDetail);
    dailNumber ? $.addListener($.__views.phoneDetail, "click", dailNumber) : __defers["$.__views.phoneDetail!click!dailNumber"] = true;
    $.__views.__alloyId82 = Ti.UI.createView({
        height: .4,
        left: 20,
        right: 20,
        top: 5,
        backgroundColor: "#e6e6e6",
        id: "__alloyId82"
    });
    $.__views.__alloyId81.add($.__views.__alloyId82);
    $.__views.__alloyId83 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId83"
    });
    $.__views.__alloyId80.add($.__views.__alloyId83);
    $.__views.email = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            font: {
                fontSize: 12
            },
            color: "#bfbfbf"
        });
        Alloy.Globals.iPhoneFour && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 10
            },
            color: "#bfbfbf"
        });
        Alloy.Globals.iPhoneFive && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 11
            },
            color: "#bfbfbf"
        });
        Alloy.Globals.iPhoneSix && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 12
            },
            color: "#bfbfbf"
        });
        Alloy.deepExtend(true, o, {
            id: "email",
            top: 5,
            textid: "email",
            left: "20dp"
        });
        return o;
    }());
    $.__views.__alloyId83.add($.__views.email);
    $.__views.emailDetail = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            font: {
                fontSize: 14
            }
        });
        Alloy.Globals.iPhoneFour && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 12
            }
        });
        Alloy.Globals.iPhoneFive && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 13
            }
        });
        Alloy.Globals.iPhoneSix && Alloy.deepExtend(true, o, {
            font: {
                fontSize: 14
            }
        });
        Alloy.deepExtend(true, o, {
            text: "response@responsepsychological.com",
            id: "emailDetail",
            top: 5,
            left: 20
        });
        return o;
    }());
    $.__views.__alloyId83.add($.__views.emailDetail);
    openEmail ? $.addListener($.__views.emailDetail, "click", openEmail) : __defers["$.__views.emailDetail!click!openEmail"] = true;
    $.__views.__alloyId84 = Ti.UI.createView({
        height: .4,
        left: 20,
        right: 20,
        top: 5,
        backgroundColor: "#e6e6e6",
        id: "__alloyId84"
    });
    $.__views.__alloyId83.add($.__views.__alloyId84);
    $.__views.__alloyId85 = Ti.UI.createView({
        bottom: 80,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId85"
    });
    $.__views.PsychologistContactDetails.add($.__views.__alloyId85);
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
    $.__views.__alloyId85.add($.__views.nextBitton);
    openOnlineAsst ? $.addListener($.__views.nextBitton, "click", openOnlineAsst) : __defers["$.__views.nextBitton!click!openOnlineAsst"] = true;
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
    $.__views.__alloyId85.add($.__views.barLines);
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
    $.__views.__alloyId86 = Ti.UI.createView({
        bottom: 0,
        height: 80,
        id: "__alloyId86"
    });
    $.__views.PsychologistContactDetails.add($.__views.__alloyId86);
    $.__views.__alloyId87 = Ti.UI.createLabel(function() {
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
            id: "__alloyId87"
        });
        return o;
    }());
    $.__views.__alloyId86.add($.__views.__alloyId87);
    $.__views.__alloyId88 = Ti.UI.createView({
        height: 40,
        width: 80,
        left: 0,
        id: "__alloyId88"
    });
    $.__views.__alloyId86.add($.__views.__alloyId88);
    backtoScreen ? $.addListener($.__views.__alloyId88, "click", backtoScreen) : __defers["$.__views.__alloyId88!click!backtoScreen"] = true;
    $.__views.__alloyId89 = Ti.UI.createImageView({
        left: 20,
        backgroundImage: "none",
        image: "/images/Back-icon.png",
        id: "__alloyId89"
    });
    $.__views.__alloyId88.add($.__views.__alloyId89);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    Ti.API.info("args " + JSON.stringify(args));
    $.headingLbl.text = args.event;
    "Yes" == args.event ? $.detail.text = L("PsychologistPoints") : "No" == args.event && ($.detail.text = L("PsychologistPoints_No"));
    __defers["$.__views.phoneDetail!click!dailNumber"] && $.addListener($.__views.phoneDetail, "click", dailNumber);
    __defers["$.__views.emailDetail!click!openEmail"] && $.addListener($.__views.emailDetail, "click", openEmail);
    __defers["$.__views.nextBitton!click!openOnlineAsst"] && $.addListener($.__views.nextBitton, "click", openOnlineAsst);
    __defers["$.__views.nextBitton!touchstart!touchStart"] && $.addListener($.__views.nextBitton, "touchstart", touchStart);
    __defers["$.__views.nextBitton!touchend!touchEnd"] && $.addListener($.__views.nextBitton, "touchend", touchEnd);
    __defers["$.__views.__alloyId88!click!backtoScreen"] && $.addListener($.__views.__alloyId88, "click", backtoScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;