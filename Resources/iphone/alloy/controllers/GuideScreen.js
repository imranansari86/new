function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getGuidBySingleApi(viaLoadMore) {
        false == viaLoadMore && 0 == guideList.length && Alloy.Globals.LoadingScreen.open();
        var url = Alloy.Globals.Constants.DOMAIN_URL + "getGuides";
        var lastId = "";
        guideList.length > 0 && (lastId = guideList[guideList.length - 1].record_order);
        var userId = Ti.App.Properties.getObject("userDetails").user.id;
        var param = {
            authKey: "llB8eTk=oKtG",
            app_version: Titanium.App.version,
            max_id: lastId,
            user_id: userId
        };
        Ti.API.info("url Guide listing : " + url);
        Ti.API.info("Guide parameters : " + JSON.stringify(param));
        Alloy.Globals.Communicator.post(url, param, function(e) {
            Ti.API.info("Response after post :  " + JSON.stringify(e));
            try {
                if (e.success) {
                    var responseData = JSON.parse(e.response);
                    if ("true" == responseData.status) {
                        guideList = guideList.concat(responseData.data);
                        if (responseData.data.length > 0) {
                            $.noResultLbl.visible = false;
                            $.guideNotificationTable.visible = true;
                            Alloy.Globals.showGuideList(guideList);
                            Alloy.Globals.DbManager.Save_GuideAllList(responseData.data);
                        }
                        Ti.API.info("responseData.total_records = " + responseData.total_records);
                        Ti.API.info("guideList.length = " + guideList.length);
                        responseData.total_records > guideList.length ? $.is.state($.is.SUCCESS, "") : $.is.state($.is.DONE, "");
                        if (guideList.length <= 0) {
                            $.noResultLbl.text = L("noResultfound");
                            $.noResultLbl.visible = true;
                            $.guideNotificationTable.visible = false;
                            $.is.state($.is.SUCCESS, "Tap to refresh");
                        }
                    } else if ("false" == responseData.status) {
                        $.is.state($.is.ERROR, "Tap to retry");
                        if (!viaLoadMore) {
                            $.noResultLbl.text = L("some_error");
                            $.noResultLbl.visible = true;
                        }
                    } else {
                        $.is.state($.is.ERROR, "Tap to retry");
                        if (!viaLoadMore) {
                            $.noResultLbl.text = L("some_error");
                            $.noResultLbl.visible = true;
                        }
                    }
                } else {
                    $.is.state($.is.ERROR, "Tap to retry");
                    if (!viaLoadMore) {
                        $.noResultLbl.text = L("some_error");
                        $.noResultLbl.visible = true;
                    }
                }
            } catch (e) {
                $.is.state($.is.ERROR, "Tap to retry");
                if (!viaLoadMore) {
                    $.noResultLbl.text = L("some_error");
                    $.noResultLbl.visible = true;
                }
            }
            isLoading = false;
            Alloy.Globals.LoadingScreen.close();
        });
    }
    function fetchGuides() {
        guideList = Alloy.Globals.DbManager.Get_guideAllList();
        if (guideList.length > 0) {
            Ti.API.info("show list when DB has data: " + JSON.stringify(guideList));
            Alloy.Globals.showGuideList(guideList);
        } else {
            Ti.API.info("show list when DB blank");
            getGuidBySingleApi(false);
        }
    }
    function loadMore() {
        setTimeout(function() {
            getGuidBySingleApi(true);
        }, 500);
    }
    function updateNotificationCount() {
        var notificationCount = Ti.App.Properties.getInt("notificationCount");
        Ti.API.info("received notification update in guide list: notificationCount = " + notificationCount);
        if (notificationCount && notificationCount > 0) {
            $.notificationLbl.text = notificationCount + "";
            $.notificationV.visible = true;
        } else {
            $.notificationV.visible = false;
            $.notificationLbl.text = "0";
        }
    }
    function openGuidInfoScreen(e) {
        var openGuideInfo = Alloy.createController("GuideInfoScreen", e.row.detail).getView();
        Alloy.Globals.guidNavWin.openWindow(openGuideInfo);
    }
    function openSettingScreen() {
        var settingScreen = Alloy.createController("SettingScreen").getView();
        Alloy.Globals.guidNavWin.openWindow(settingScreen);
    }
    function openNotificationScreen() {
        var notificationScreen = Alloy.createController("NotificationScreen").getView();
        notificationScreen.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "GuideScreen";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
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
    $.__views.guidWindow = Ti.UI.createWindow({
        titleAttributes: {
            color: "#fff",
            font: {
                fontFamily: "SourceSansPro-Semibold",
                fontSize: "18"
            }
        },
        id: "guidWindow",
        titleImage: "/images/guide_logo.png",
        tintColor: "#fff",
        barColor: "#3386b7",
        navTintColor: "#fff",
        backButtonTitle: ""
    });
    $.__views.__alloyId48 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId48"
    });
    $.__views.__alloyId49 = Ti.UI.createView({
        width: 40,
        height: 40,
        id: "__alloyId49"
    });
    $.__views.__alloyId48.add($.__views.__alloyId49);
    $.__views.notificationBtn = Ti.UI.createButton({
        id: "notificationBtn",
        width: 40,
        height: 40,
        backgroundImage: "none",
        image: "/images/bell.png"
    });
    $.__views.__alloyId49.add($.__views.notificationBtn);
    openNotificationScreen ? $.addListener($.__views.notificationBtn, "click", openNotificationScreen) : __defers["$.__views.notificationBtn!click!openNotificationScreen"] = true;
    $.__views.notificationV = Ti.UI.createView({
        top: 3,
        right: 5,
        width: 16,
        height: 16,
        backgroundColor: "#F6001E",
        borderRadius: 8,
        visible: false,
        id: "notificationV"
    });
    $.__views.__alloyId49.add($.__views.notificationV);
    openNotificationScreen ? $.addListener($.__views.notificationV, "click", openNotificationScreen) : __defers["$.__views.notificationV!click!openNotificationScreen"] = true;
    $.__views.notificationLbl = Ti.UI.createLabel({
        color: "white",
        font: {
            fontSize: 10
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "1",
        id: "notificationLbl"
    });
    $.__views.notificationV.add($.__views.notificationLbl);
    $.__views.settingBtn = Ti.UI.createButton({
        id: "settingBtn",
        width: 40,
        height: 40,
        backgroundImage: "none",
        image: "/images/settings.png"
    });
    $.__views.__alloyId48.add($.__views.settingBtn);
    openSettingScreen ? $.addListener($.__views.settingBtn, "click", openSettingScreen) : __defers["$.__views.settingBtn!click!openSettingScreen"] = true;
    $.__views.guidWindow.rightNavButton = $.__views.__alloyId48;
    $.__views.view = Ti.UI.createView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        top: 0,
        id: "view"
    });
    $.__views.guidWindow.add($.__views.view);
    $.__views.__alloyId50 = Ti.UI.createSearchBar({
        tintColor: "#3386b7",
        height: 40,
        id: "__alloyId50"
    });
    $.__views.is = Alloy.createWidget("nl.fokkezb.infiniteScroll", "widget", {
        id: "is",
        __parentSymbol: __parentSymbol
    });
    loadMore ? $.__views.is.on("end", loadMore) : __defers["$.__views.is!end!loadMore"] = true;
    $.__views.guideNotificationTable = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "#C8C7CC",
        height: "100%",
        top: 0,
        search: $.__views.__alloyId50,
        footerView: $.__views.is.getProxyPropertyEx("footerView", {
            recurse: true
        }),
        id: "guideNotificationTable",
        visible: true,
        selectionStyle: Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY,
        separatorStyle: Titanium.UI.TABLE_VIEW_SEPARATOR_STYLE_SINGLE_LINE
    });
    $.__views.view.add($.__views.guideNotificationTable);
    openGuidInfoScreen ? $.addListener($.__views.guideNotificationTable, "click", openGuidInfoScreen) : __defers["$.__views.guideNotificationTable!click!openGuidInfoScreen"] = true;
    $.__views.noResultLbl = Ti.UI.createLabel({
        id: "noResultLbl",
        color: "#BDBDBD",
        width: "95%",
        text: "",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
    });
    $.__views.view.add($.__views.noResultLbl);
    $.__views.guidNavWin = Ti.UI.createTab({
        window: $.__views.guidWindow,
        titleid: "guide_title",
        backgroundColor: "transparent",
        id: "guidNavWin",
        backgroundImage: "none",
        icon: "/images/open-book_normal.png"
    });
    $.__views.guidNavWin && $.addTopLevelView($.__views.guidNavWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    Alloy.Globals.guidNavWin = $.guidNavWin;
    var guideList = [];
    $.is.init($.guideNotificationTable);
    Alloy.Globals.showGuideList = function(guideList) {
        var tableViewRowArr = [];
        if (guideList.length > 0) {
            $.noResultLbl.visible = false;
            $.guideNotificationTable.visible = true;
            for (i = 0; i < guideList.length; i++) {
                var row = Ti.UI.createTableViewRow({
                    backgroundColor: "transparent",
                    detail: guideList[i],
                    title: guideList[i].heading + " " + guideList[i].description,
                    color: "transparent",
                    selectedColor: "transparent",
                    backgroundSelectedColor: "#D9D9D9"
                });
                var guideTitleLbl = Ti.UI.createLabel({
                    right: 30,
                    top: 10,
                    bottom: 10,
                    color: "#2E3C45",
                    text: guideList[i].heading,
                    font: {
                        fontSize: 15,
                        fontFamily: "calibril"
                    }
                });
                row.hasChild = true;
                guideTitleLbl.height = 40;
                guideTitleLbl.left = 20;
                row.add(guideTitleLbl);
                tableViewRowArr.push(row);
            }
            $.guideNotificationTable.setData(tableViewRowArr);
        } else {
            $.noResultLbl.text = L("noResultfound");
            $.noResultLbl.visible = true;
            $.guideNotificationTable.visible = false;
        }
    };
    fetchGuides();
    Ti.App.addEventListener("dataUpdatedGuide", function() {
        fetchGuides();
    });
    Ti.App.addEventListener("notificationupdate", updateNotificationCount);
    updateNotificationCount();
    __defers["$.__views.notificationBtn!click!openNotificationScreen"] && $.addListener($.__views.notificationBtn, "click", openNotificationScreen);
    __defers["$.__views.notificationV!click!openNotificationScreen"] && $.addListener($.__views.notificationV, "click", openNotificationScreen);
    __defers["$.__views.settingBtn!click!openSettingScreen"] && $.addListener($.__views.settingBtn, "click", openSettingScreen);
    __defers["$.__views.is!end!loadMore"] && $.__views.is.on("end", loadMore);
    __defers["$.__views.guideNotificationTable!click!openGuidInfoScreen"] && $.addListener($.__views.guideNotificationTable, "click", openGuidInfoScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;