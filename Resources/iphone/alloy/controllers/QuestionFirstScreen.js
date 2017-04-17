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
        Ti.API.info("inside back to screen ");
        var parentView = $.questionfirstScreen.parent;
        Ti.API.info("parentView = : " + parentView.id);
        parentView.remove($.questionfirstScreen);
    }
    function openPhyso() {
        var PhysoScreen = Alloy.createController("ContractedByPsychogist").getView();
        $.questionfirstScreen.add(PhysoScreen);
    }
    function openWebLink(e) {
        Ti.API.info("open link is " + JSON.stringify(e));
        Ti.Platform.openURL(e.source.text);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "QuestionFirstScreen";
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
    $.__views.questionfirstScreen = Ti.UI.createView({
        id: "questionfirstScreen",
        backgroundColor: "#fff",
        top: 0,
        bottom: 0,
        width: Ti.UI.FILL
    });
    $.__views.questionfirstScreen && $.addTopLevelView($.__views.questionfirstScreen);
    $.__views.__alloyId90 = Ti.UI.createView({
        layout: "vertical",
        top: 0,
        bottom: 165,
        width: "90%",
        id: "__alloyId90"
    });
    $.__views.questionfirstScreen.add($.__views.__alloyId90);
    $.__views.topView = Ti.UI.createView({
        id: "topView",
        height: Ti.UI.SIZE,
        top: 0,
        layout: "vertical",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId90.add($.__views.topView);
    $.__views.questionLable = Ti.UI.createLabel(function() {
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
            id: "questionLable",
            top: 30,
            left: 0
        });
        return o;
    }());
    $.__views.topView.add($.__views.questionLable);
    $.__views.__alloyId91 = Ti.UI.createView({
        top: 10,
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId91"
    });
    $.__views.__alloyId90.add($.__views.__alloyId91);
    $.__views.__alloyId92 = Ti.UI.createView({
        height: .4,
        left: 0,
        right: 0,
        top: 10,
        backgroundColor: "#3386b7",
        id: "__alloyId92"
    });
    $.__views.__alloyId91.add($.__views.__alloyId92);
    $.__views.questiontitleId = Ti.UI.createLabel(function() {
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
            id: "questiontitleId",
            top: 10,
            width: "90%"
        });
        return o;
    }());
    $.__views.__alloyId91.add($.__views.questiontitleId);
    $.__views.__alloyId93 = Ti.UI.createView({
        height: .4,
        left: 0,
        right: 0,
        top: 10,
        backgroundColor: "#3386b7",
        id: "__alloyId93"
    });
    $.__views.__alloyId91.add($.__views.__alloyId93);
    $.__views.scrollview = Ti.UI.createScrollView({
        id: "scrollview",
        top: 10,
        height: Ti.UI.FILL,
        layout: "vertical"
    });
    $.__views.__alloyId90.add($.__views.scrollview);
    $.__views.questiondescription = Ti.UI.createLabel(function() {
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
            id: "questiondescription",
            left: 0,
            right: 0,
            top: 10
        });
        return o;
    }());
    $.__views.scrollview.add($.__views.questiondescription);
    $.__views.__alloyId94 = Ti.UI.createLabel(function() {
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
            top: 5,
            left: 0,
            text: "https://www.beyondblue.org.au",
            id: "__alloyId94"
        });
        return o;
    }());
    $.__views.scrollview.add($.__views.__alloyId94);
    openWebLink ? $.addListener($.__views.__alloyId94, "click", openWebLink) : __defers["$.__views.__alloyId94!click!openWebLink"] = true;
    $.__views.__alloyId95 = Ti.UI.createLabel(function() {
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
            top: 5,
            left: 0,
            text: "https://www.headspace.com",
            id: "__alloyId95"
        });
        return o;
    }());
    $.__views.scrollview.add($.__views.__alloyId95);
    openWebLink ? $.addListener($.__views.__alloyId95, "click", openWebLink) : __defers["$.__views.__alloyId95!click!openWebLink"] = true;
    $.__views.__alloyId96 = Ti.UI.createLabel(function() {
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
            top: 5,
            left: 0,
            text: "https://www.smilingmind.com",
            id: "__alloyId96"
        });
        return o;
    }());
    $.__views.scrollview.add($.__views.__alloyId96);
    openWebLink ? $.addListener($.__views.__alloyId96, "click", openWebLink) : __defers["$.__views.__alloyId96!click!openWebLink"] = true;
    $.__views.__alloyId97 = Ti.UI.createLabel(function() {
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
            top: 5,
            left: 0,
            text: "https://www.lifeline.org.au",
            id: "__alloyId97"
        });
        return o;
    }());
    $.__views.scrollview.add($.__views.__alloyId97);
    openWebLink ? $.addListener($.__views.__alloyId97, "click", openWebLink) : __defers["$.__views.__alloyId97!click!openWebLink"] = true;
    $.__views.__alloyId98 = Ti.UI.createLabel(function() {
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
            top: 5,
            left: 0,
            text: "https://www.mindhealthconnect.org.au",
            id: "__alloyId98"
        });
        return o;
    }());
    $.__views.scrollview.add($.__views.__alloyId98);
    openWebLink ? $.addListener($.__views.__alloyId98, "click", openWebLink) : __defers["$.__views.__alloyId98!click!openWebLink"] = true;
    $.__views.additionalContent = Ti.UI.createLabel(function() {
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
            id: "additionalContent",
            left: 0,
            right: 0,
            top: 10
        });
        return o;
    }());
    $.__views.scrollview.add($.__views.additionalContent);
    $.__views.__alloyId99 = Ti.UI.createView({
        bottom: 80,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId99"
    });
    $.__views.questionfirstScreen.add($.__views.__alloyId99);
    $.__views.firstBtn = Ti.UI.createButton(function() {
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
            id: "firstBtn",
            top: 10,
            titleid: "nextBtn_title"
        });
        return o;
    }());
    $.__views.__alloyId99.add($.__views.firstBtn);
    openPhyso ? $.addListener($.__views.firstBtn, "click", openPhyso) : __defers["$.__views.firstBtn!click!openPhyso"] = true;
    $.__views.barLines = Ti.UI.createView({
        id: "barLines",
        layout: "horizontal",
        top: 30,
        height: 5,
        right: 20,
        left: 20
    });
    $.__views.__alloyId99.add($.__views.barLines);
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
        backgroundColor: "#3386b7"
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
    $.__views.__alloyId100 = Ti.UI.createView({
        bottom: 0,
        height: 80,
        id: "__alloyId100"
    });
    $.__views.questionfirstScreen.add($.__views.__alloyId100);
    $.__views.__alloyId101 = Ti.UI.createLabel(function() {
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
            textid: "question1Of3",
            textAlign: "center",
            id: "__alloyId101"
        });
        return o;
    }());
    $.__views.__alloyId100.add($.__views.__alloyId101);
    $.__views.__alloyId102 = Ti.UI.createView({
        height: 40,
        width: 80,
        left: 0,
        id: "__alloyId102"
    });
    $.__views.__alloyId100.add($.__views.__alloyId102);
    backtoScreen ? $.addListener($.__views.__alloyId102, "click", backtoScreen) : __defers["$.__views.__alloyId102!click!backtoScreen"] = true;
    $.__views.__alloyId103 = Ti.UI.createImageView({
        left: 20,
        backgroundImage: "none",
        image: "/images/Back-icon.png",
        id: "__alloyId103"
    });
    $.__views.__alloyId102.add($.__views.__alloyId103);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    $.firstBtn.addEventListener("touchstart", function() {
        $.firstBtn.backgroundColor = "#69b086";
    });
    $.firstBtn.addEventListener("touchend", function() {
        $.firstBtn.backgroundColor = "#3386b7";
    });
    if (1 == Alloy.Globals.questionNumber) {
        $.questionLable.text = L("firstQuestion_title");
        $.questiontitleId.text = L("fistBtn_title");
        $.questiondescription.text = L("firstAnser_text");
        $.additionalContent.visible = false;
    } else if (2 == Alloy.Globals.questionNumber) {
        $.questionLable.text = L("firstQuestion_title");
        $.questiontitleId.text = L("secondBtn_title");
        $.questiondescription.text = L("secondAnswer_text");
        $.additionalContent.visible = false;
    } else if (3 == Alloy.Globals.questionNumber) {
        $.questionLable.text = L("firstQuestion_title");
        $.questiontitleId.text = L("thirdBtn_title");
        $.questiondescription.text = L("thirdAnswer_text");
        $.additionalContent.text = L("additional_content");
        $.additionalContent.visible = true;
    }
    __defers["$.__views.__alloyId94!click!openWebLink"] && $.addListener($.__views.__alloyId94, "click", openWebLink);
    __defers["$.__views.__alloyId95!click!openWebLink"] && $.addListener($.__views.__alloyId95, "click", openWebLink);
    __defers["$.__views.__alloyId96!click!openWebLink"] && $.addListener($.__views.__alloyId96, "click", openWebLink);
    __defers["$.__views.__alloyId97!click!openWebLink"] && $.addListener($.__views.__alloyId97, "click", openWebLink);
    __defers["$.__views.__alloyId98!click!openWebLink"] && $.addListener($.__views.__alloyId98, "click", openWebLink);
    __defers["$.__views.firstBtn!click!openPhyso"] && $.addListener($.__views.firstBtn, "click", openPhyso);
    __defers["$.__views.__alloyId102!click!backtoScreen"] && $.addListener($.__views.__alloyId102, "click", backtoScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;