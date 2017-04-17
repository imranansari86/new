function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function backtoPrevious() {
        args.navWindow.closeWindow($.questionScreen);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "QuestionScreen";
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
    $.__views.questionScreen = Ti.UI.createWindow({
        titleAttributes: {
            color: "#fff",
            font: {
                fontFamily: "SourceSansPro-Semibold",
                fontSize: "18"
            }
        },
        backButtonTitle: "Cancel",
        id: "questionScreen",
        tabBarHidden: true,
        titleid: "toolsquestion_title",
        navTintColor: "#fff",
        backgroundColor: "#fff",
        barColor: "#3386b7"
    });
    $.__views.questionScreen && $.addTopLevelView($.__views.questionScreen);
    $.__views.__alloyId105 = Ti.UI.createView({
        left: 0,
        id: "__alloyId105"
    });
    $.__views.backBtn = Ti.UI.createButton({
        font: {
            fontWeight: "normal",
            fontSize: "14"
        },
        id: "backBtn",
        bottom: 0,
        color: "#fff",
        title: "Cancel",
        left: 0
    });
    $.__views.__alloyId105.add($.__views.backBtn);
    backtoPrevious ? $.addListener($.__views.backBtn, "click", backtoPrevious) : __defers["$.__views.backBtn!click!backtoPrevious"] = true;
    $.__views.questionScreen.leftNavButton = $.__views.__alloyId105;
    $.__views.questionListView = Ti.UI.createView({
        id: "questionListView",
        top: 0,
        bottom: 0,
        width: Ti.UI.FILL
    });
    $.__views.questionScreen.add($.__views.questionListView);
    $.__views.topView = Ti.UI.createView({
        id: "topView",
        height: Ti.UI.SIZE,
        top: 0,
        layout: "vertical",
        width: "90%"
    });
    $.__views.questionListView.add($.__views.topView);
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
            left: 0,
            textid: "firstQuestion_title"
        });
        return o;
    }());
    $.__views.topView.add($.__views.questionLable);
    $.__views.__alloyId106 = Ti.UI.createView({
        bottom: 80,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId106"
    });
    $.__views.questionListView.add($.__views.__alloyId106);
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
            titleid: "fistBtn_title"
        });
        return o;
    }());
    $.__views.__alloyId106.add($.__views.firstBtn);
    $.__views.secondBtn = Ti.UI.createButton(function() {
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
            id: "secondBtn",
            top: 10,
            titleid: "secondBtn_title"
        });
        return o;
    }());
    $.__views.__alloyId106.add($.__views.secondBtn);
    $.__views.thirdBtn = Ti.UI.createButton(function() {
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
            id: "thirdBtn",
            top: 10,
            titleid: "thirdBtn_title"
        });
        return o;
    }());
    $.__views.__alloyId106.add($.__views.thirdBtn);
    $.__views.__alloyId107 = Ti.UI.createView({
        layout: "horizontal",
        top: 30,
        height: 5,
        right: 20,
        left: 20,
        id: "__alloyId107"
    });
    $.__views.__alloyId106.add($.__views.__alloyId107);
    $.__views.__alloyId108 = Ti.UI.createView({
        height: "4",
        width: "31%",
        left: 0,
        borderRadius: "3",
        backgroundColor: "#69b086",
        id: "__alloyId108"
    });
    $.__views.__alloyId107.add($.__views.__alloyId108);
    $.__views.__alloyId109 = Ti.UI.createView({
        height: "4",
        width: "31%",
        left: "3%",
        borderRadius: "3",
        backgroundColor: "#3386b7",
        id: "__alloyId109"
    });
    $.__views.__alloyId107.add($.__views.__alloyId109);
    $.__views.__alloyId110 = Ti.UI.createView({
        height: "4",
        width: "31%",
        left: "3%",
        borderRadius: "3",
        backgroundColor: "#3386b7",
        id: "__alloyId110"
    });
    $.__views.__alloyId107.add($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createView({
        bottom: 0,
        height: 80,
        id: "__alloyId111"
    });
    $.__views.questionListView.add($.__views.__alloyId111);
    $.__views.__alloyId112 = Ti.UI.createLabel(function() {
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
            id: "__alloyId112"
        });
        return o;
    }());
    $.__views.__alloyId111.add($.__views.__alloyId112);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    Alloy.Globals.questionScreen = $.questionScreen;
    Alloy.Globals.questionScreen.navWindow = args.navWindow;
    $.firstBtn.addEventListener("touchstart", function() {
        $.firstBtn.backgroundColor = "#69b086";
        Alloy.Globals.questionNumber = 1;
    });
    $.secondBtn.addEventListener("touchstart", function() {
        $.secondBtn.backgroundColor = "#69b086";
        Alloy.Globals.questionNumber = 2;
    });
    $.thirdBtn.addEventListener("touchstart", function() {
        $.thirdBtn.backgroundColor = "#69b086";
        Alloy.Globals.questionNumber = 3;
    });
    $.firstBtn.addEventListener("touchend", function() {
        $.firstBtn.backgroundColor = "#3386b7";
        var questionfirstScreen = Alloy.createController("QuestionFirstScreen").getView();
        $.questionScreen.add(questionfirstScreen);
    });
    $.secondBtn.addEventListener("touchend", function() {
        $.secondBtn.backgroundColor = "#3386b7";
        var questionfirstScreen = Alloy.createController("QuestionFirstScreen").getView();
        $.questionScreen.add(questionfirstScreen);
    });
    $.thirdBtn.addEventListener("touchend", function() {
        $.thirdBtn.backgroundColor = "#3386b7";
        var questionfirstScreen = Alloy.createController("QuestionFirstScreen").getView();
        $.questionScreen.add(questionfirstScreen);
    });
    myAlert = Ti.UI.createAlertDialog({
        cancel: 1,
        buttonNames: [ "Confirm", "Cancel" ],
        message: L("survey_cancel_msg"),
        title: "Volunteer Care"
    });
    myAlert.addEventListener("click", function(e) {
        "1" != e.index && backtoPrevious();
    });
    __defers["$.__views.backBtn!click!backtoPrevious"] && $.addListener($.__views.backBtn, "click", backtoPrevious);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;