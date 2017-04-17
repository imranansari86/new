function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function FinishAssesment() {
        $.finishOnlineAssest.close();
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
    function openInBrowser(e) {
        var openLink = e.source.text;
        Ti.Platform.openURL(openLink);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "FinishMentalAssest";
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
    $.__views.finishOnlineAssest = Ti.UI.createWindow({
        titleAttributes: {
            color: "#fff",
            font: {
                fontFamily: "SourceSansPro-Semibold",
                fontSize: "18"
            }
        },
        id: "finishOnlineAssest",
        navTintColor: "#fff",
        barColor: "#3386b7",
        tintColor: "#fff",
        titleid: "toolsquestion_title",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: "#fff"
    });
    $.__views.finishOnlineAssest && $.addTopLevelView($.__views.finishOnlineAssest);
    $.__views.__alloyId29 = Ti.UI.createButton({
        id: "__alloyId29"
    });
    $.__views.finishOnlineAssest.leftNavButton = $.__views.__alloyId29;
    $.__views.topView = Ti.UI.createView({
        id: "topView",
        top: 0,
        bottom: 0,
        layout: "vertical"
    });
    $.__views.finishOnlineAssest.add($.__views.topView);
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
            textid: "complete_mental_title",
            top: 30,
            width: "90%"
        });
        return o;
    }());
    $.__views.topView.add($.__views.headingLbl);
    $.__views.__alloyId30 = Ti.UI.createScrollView({
        top: "20dp",
        bottom: 0,
        layout: "vertical",
        scrollingEnabled: true,
        id: "__alloyId30"
    });
    $.__views.topView.add($.__views.__alloyId30);
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
            width: "90%",
            textid: "complete_mental_message"
        });
        return o;
    }());
    $.__views.__alloyId30.add($.__views.detail);
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
    $.__views.__alloyId30.add($.__views.contactInfo);
    $.__views.__alloyId31 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId31"
    });
    $.__views.__alloyId30.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId32"
    });
    $.__views.__alloyId31.add($.__views.__alloyId32);
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
    $.__views.__alloyId32.add($.__views.phone);
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
    $.__views.__alloyId32.add($.__views.phoneDetail);
    dailNumber ? $.addListener($.__views.phoneDetail, "click", dailNumber) : __defers["$.__views.phoneDetail!click!dailNumber"] = true;
    $.__views.__alloyId33 = Ti.UI.createView({
        height: .4,
        left: 20,
        right: 20,
        top: 5,
        backgroundColor: "#e6e6e6",
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId34"
    });
    $.__views.__alloyId31.add($.__views.__alloyId34);
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
    $.__views.__alloyId34.add($.__views.email);
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
    $.__views.__alloyId34.add($.__views.emailDetail);
    openEmail ? $.addListener($.__views.emailDetail, "click", openEmail) : __defers["$.__views.emailDetail!click!openEmail"] = true;
    $.__views.__alloyId35 = Ti.UI.createView({
        height: .4,
        left: 20,
        right: 20,
        top: 5,
        backgroundColor: "#e6e6e6",
        id: "__alloyId35"
    });
    $.__views.__alloyId34.add($.__views.__alloyId35);
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
            top: 20,
            width: "90%",
            textid: "complete_mental_messageforMoreDetails"
        });
        return o;
    }());
    $.__views.__alloyId30.add($.__views.detail);
    $.__views.__alloyId36 = Ti.UI.createView({
        top: "10dp",
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId36"
    });
    $.__views.__alloyId30.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createView({
        height: .4,
        left: 0,
        right: 0,
        top: 5,
        backgroundColor: "#e6e6e6",
        id: "__alloyId37"
    });
    $.__views.__alloyId36.add($.__views.__alloyId37);
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
            left: 0,
            top: 10,
            textid: "forMoreDetalLink"
        });
        return o;
    }());
    $.__views.__alloyId36.add($.__views.headingLbl);
    openInBrowser ? $.addListener($.__views.headingLbl, "click", openInBrowser) : __defers["$.__views.headingLbl!click!openInBrowser"] = true;
    $.__views.__alloyId38 = Ti.UI.createView({
        height: .4,
        left: 0,
        right: 0,
        top: 5,
        backgroundColor: "#e6e6e6",
        id: "__alloyId38"
    });
    $.__views.__alloyId36.add($.__views.__alloyId38);
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
            top: 20,
            width: "90%",
            textid: "SeconDescriptionOnFinishScreen"
        });
        return o;
    }());
    $.__views.__alloyId30.add($.__views.detail);
    $.__views.__alloyId39 = Ti.UI.createView({
        top: "10dp",
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId39"
    });
    $.__views.__alloyId30.add($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createView({
        height: .4,
        left: 0,
        right: 0,
        top: 5,
        backgroundColor: "#e6e6e6",
        id: "__alloyId40"
    });
    $.__views.__alloyId39.add($.__views.__alloyId40);
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
            left: 0,
            text: "https://www.beyondblue.org.au/"
        });
        return o;
    }());
    $.__views.__alloyId39.add($.__views.headingLbl);
    openInBrowser ? $.addListener($.__views.headingLbl, "click", openInBrowser) : __defers["$.__views.headingLbl!click!openInBrowser"] = true;
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
            left: 0,
            text: "https://www.headspace.com/"
        });
        return o;
    }());
    $.__views.__alloyId39.add($.__views.headingLbl);
    openInBrowser ? $.addListener($.__views.headingLbl, "click", openInBrowser) : __defers["$.__views.headingLbl!click!openInBrowser"] = true;
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
            left: 0,
            text: "http://smilingmind.com/"
        });
        return o;
    }());
    $.__views.__alloyId39.add($.__views.headingLbl);
    openInBrowser ? $.addListener($.__views.headingLbl, "click", openInBrowser) : __defers["$.__views.headingLbl!click!openInBrowser"] = true;
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
            left: 0,
            text: "https://www.lifeline.org.au/"
        });
        return o;
    }());
    $.__views.__alloyId39.add($.__views.headingLbl);
    openInBrowser ? $.addListener($.__views.headingLbl, "click", openInBrowser) : __defers["$.__views.headingLbl!click!openInBrowser"] = true;
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
            left: 0,
            text: "http://www.mindhealthconnect.org.au/"
        });
        return o;
    }());
    $.__views.__alloyId39.add($.__views.headingLbl);
    openInBrowser ? $.addListener($.__views.headingLbl, "click", openInBrowser) : __defers["$.__views.headingLbl!click!openInBrowser"] = true;
    $.__views.__alloyId41 = Ti.UI.createView({
        height: .4,
        left: 0,
        right: 0,
        top: 5,
        backgroundColor: "#e6e6e6",
        id: "__alloyId41"
    });
    $.__views.__alloyId39.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createView({
        top: 0,
        height: Ti.UI.SIZE,
        id: "__alloyId42"
    });
    $.__views.__alloyId30.add($.__views.__alloyId42);
    FinishAssesment ? $.addListener($.__views.__alloyId42, "click", FinishAssesment) : __defers["$.__views.__alloyId42!click!FinishAssesment"] = true;
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
            titleid: "finish_Save",
            backgroundColor: "#69b086"
        });
        return o;
    }());
    $.__views.__alloyId42.add($.__views.nextBitton);
    $.__views.__alloyId43 = Ti.UI.createView({
        top: 0,
        height: 50,
        id: "__alloyId43"
    });
    $.__views.__alloyId30.add($.__views.__alloyId43);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    __defers["$.__views.phoneDetail!click!dailNumber"] && $.addListener($.__views.phoneDetail, "click", dailNumber);
    __defers["$.__views.emailDetail!click!openEmail"] && $.addListener($.__views.emailDetail, "click", openEmail);
    __defers["$.__views.headingLbl!click!openInBrowser"] && $.addListener($.__views.headingLbl, "click", openInBrowser);
    __defers["$.__views.headingLbl!click!openInBrowser"] && $.addListener($.__views.headingLbl, "click", openInBrowser);
    __defers["$.__views.headingLbl!click!openInBrowser"] && $.addListener($.__views.headingLbl, "click", openInBrowser);
    __defers["$.__views.headingLbl!click!openInBrowser"] && $.addListener($.__views.headingLbl, "click", openInBrowser);
    __defers["$.__views.headingLbl!click!openInBrowser"] && $.addListener($.__views.headingLbl, "click", openInBrowser);
    __defers["$.__views.headingLbl!click!openInBrowser"] && $.addListener($.__views.headingLbl, "click", openInBrowser);
    __defers["$.__views.__alloyId42!click!FinishAssesment"] && $.addListener($.__views.__alloyId42, "click", FinishAssesment);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;