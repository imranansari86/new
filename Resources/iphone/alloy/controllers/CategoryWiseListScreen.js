function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getTipsByCategoryWiseSingleApi(viaLoadMore) {
        false == viaLoadMore && 0 == tipsList.length && Alloy.Globals.LoadingScreen.open();
        var url = Alloy.Globals.Constants.DOMAIN_URL + "getTips";
        var lastId = "";
        tipsList.length > 0 && viaLoadMore && (lastId = tipsList[tipsList.length - 1].record_order);
        Ti.API.info("lastID : " + lastId);
        var userId = Ti.App.Properties.getObject("userDetails").user.id;
        var param = {
            authKey: "llB8eTk=oKtG",
            app_version: Titanium.App.version,
            max_id: lastId,
            category_id: category_id,
            user_id: userId
        };
        Ti.API.info("url Tips listing : " + url);
        Ti.API.info("Tips parameters : " + JSON.stringify(param));
        Alloy.Globals.Communicator.post(url, param, function(e) {
            Ti.API.info("Response after post :  " + JSON.stringify(e));
            try {
                if (e.success) {
                    var responseData = JSON.parse(e.response);
                    if ("true" == responseData.status) {
                        tipsList = viaLoadMore ? tipsList.concat(responseData.data) : responseData.data;
                        if (responseData.data.length > 0) {
                            $.noResultLbl.visible = false;
                            $.categoryWiseNotificationTable.visible = true;
                            Alloy.Globals.showtipsList(tipsList);
                            Alloy.Globals.DbManager.Save_TipsAllList(responseData.data);
                        }
                        Ti.API.info("responseData.total_records = " + responseData.total_records);
                        Ti.API.info("contactList.length = " + tipsList.length);
                        responseData.total_records > tipsList.length ? viaLoadMore && $.is.state($.is.SUCCESS, "") : viaLoadMore && $.is.state($.is.DONE, "");
                        if (tipsList.length <= 0) {
                            $.noResultLbl.text = L("noResultfound");
                            $.noResultLbl.visible = true;
                            $.categoryWiseNotificationTable.visible = false;
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
    function fetchTips() {
        tipsList = Alloy.Globals.DbManager.Get_tipsAllListByCategory(category_id);
        Alloy.Globals.showtipsList(tipsList);
        getTipsByCategoryWiseSingleApi(false);
    }
    function loadMore() {
        setTimeout(function() {
            getTipsByCategoryWiseSingleApi(true);
        }, 500);
    }
    function updateNotificationCount() {
        var notificationCount = Ti.App.Properties.getInt("notificationCount");
        if (notificationCount && notificationCount > 0) {
            $.notificationLbl.text = notificationCount + "";
            $.notificationV.visible = true;
        } else {
            $.notificationV.visible = false;
            $.notificationLbl.text = "0";
        }
    }
    function tipsInfoScreen(e) {
        var TipsInfoScreen = Alloy.createController("TipsInfoScreen", e.row.detail).getView();
        Alloy.Globals.tipsNavWin.openWindow(TipsInfoScreen);
    }
    function openSettingScreen() {
        var openGuideInfo = Alloy.createController("SettingScreen").getView();
        Alloy.Globals.tipsNavWin.openWindow(openGuideInfo);
    }
    function openNotificationScreen() {
        var notificationScreen = Alloy.createController("NotificationScreen").getView();
        notificationScreen.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "CategoryWiseListScreen";
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
    $.__views.categoryWiseWin = Ti.UI.createWindow({
        titleAttributes: {
            color: "#fff",
            font: {
                fontFamily: "SourceSansPro-Semibold",
                fontSize: "18"
            }
        },
        id: "categoryWiseWin",
        backButtonTitle: "",
        navTintColor: "#fff",
        backgroundColor: "#fff",
        barColor: "#3386b7"
    });
    $.__views.categoryWiseWin && $.addTopLevelView($.__views.categoryWiseWin);
    $.__views.__alloyId6 = Ti.UI.createView({
        id: "__alloyId6"
    });
    $.__views.__alloyId7 = Ti.UI.createView({
        height: 40,
        width: 40,
        right: 0,
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    openSettingScreen ? $.addListener($.__views.__alloyId7, "click", openSettingScreen) : __defers["$.__views.__alloyId7!click!openSettingScreen"] = true;
    $.__views.settingBtn = Ti.UI.createButton({
        id: "settingBtn",
        backgroundImage: "none",
        image: "/images/settings.png"
    });
    $.__views.__alloyId7.add($.__views.settingBtn);
    $.__views.__alloyId8 = Ti.UI.createView({
        width: 40,
        height: 40,
        right: 40,
        id: "__alloyId8"
    });
    $.__views.__alloyId6.add($.__views.__alloyId8);
    $.__views.notificationBtn = Ti.UI.createButton({
        id: "notificationBtn",
        width: 40,
        height: 40,
        backgroundImage: "none",
        image: "/images/bell.png"
    });
    $.__views.__alloyId8.add($.__views.notificationBtn);
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
    $.__views.__alloyId8.add($.__views.notificationV);
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
    $.__views.categoryWiseWin.rightNavButton = $.__views.__alloyId6;
    $.__views.view = Ti.UI.createView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        top: 0,
        id: "view"
    });
    $.__views.categoryWiseWin.add($.__views.view);
    $.__views.__alloyId9 = Ti.UI.createSearchBar({
        tintColor: "#3386b7",
        height: 40,
        id: "__alloyId9"
    });
    $.__views.is = Alloy.createWidget("nl.fokkezb.infiniteScroll", "widget", {
        id: "is",
        __parentSymbol: __parentSymbol
    });
    loadMore ? $.__views.is.on("end", loadMore) : __defers["$.__views.is!end!loadMore"] = true;
    $.__views.categoryWiseNotificationTable = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "#C8C7CC",
        height: "100%",
        top: 0,
        search: $.__views.__alloyId9,
        footerView: $.__views.is.getProxyPropertyEx("footerView", {
            recurse: true
        }),
        id: "categoryWiseNotificationTable",
        visible: true,
        selectionStyle: Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY,
        separatorStyle: Titanium.UI.TABLE_VIEW_SEPARATOR_STYLE_SINGLE_LINE
    });
    $.__views.view.add($.__views.categoryWiseNotificationTable);
    tipsInfoScreen ? $.addListener($.__views.categoryWiseNotificationTable, "click", tipsInfoScreen) : __defers["$.__views.categoryWiseNotificationTable!click!tipsInfoScreen"] = true;
    $.__views.noResultLbl = Ti.UI.createLabel({
        id: "noResultLbl",
        color: "#BDBDBD",
        width: "95%",
        text: "",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
    });
    $.__views.view.add($.__views.noResultLbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    var nameTitle = args.name;
    var category_id = args.category_id;
    $.categoryWiseWin.title = nameTitle;
    $.is.init($.categoryWiseNotificationTable);
    var tipsList = [];
    Alloy.Globals.showtipsList = function(tipsList) {
        var tableViewRowArr = [];
        if (tipsList.length > 0) {
            $.noResultLbl.visible = false;
            $.categoryWiseNotificationTable.visible = true;
            for (i = 0; i < tipsList.length; i++) {
                var row = Ti.UI.createTableViewRow({
                    backgroundColor: "transparent",
                    detail: tipsList[i],
                    title: tipsList[i].list_title + " " + tipsList[i].title_description,
                    color: "transparent",
                    selectedColor: "transparent",
                    backgroundSelectedColor: "#D9D9D9"
                });
                var tipsTitleLbl = Ti.UI.createLabel({
                    left: 20,
                    right: 30,
                    top: 10,
                    bottom: 10,
                    color: "#2E3C45",
                    text: tipsList[i].list_title,
                    height: 34,
                    font: {
                        fontSize: 15,
                        fontFamily: "calibril"
                    }
                });
                row.hasChild = true;
                row.add(tipsTitleLbl);
                tableViewRowArr.push(row);
            }
            $.categoryWiseNotificationTable.setData(tableViewRowArr);
        } else {
            $.noResultLbl.text = L("noResultfound");
            $.noResultLbl.visible = true;
            $.categoryWiseNotificationTable.visible = false;
        }
    };
    fetchTips();
    Ti.App.addEventListener("dataUpdatedTips", function() {
        tipsList = Alloy.Globals.DbManager.Get_tipsAllListByCategory(category_id);
        Alloy.Globals.showtipsList(tipsList);
    });
    Ti.App.addEventListener("notificationupdate", updateNotificationCount);
    updateNotificationCount();
    $.categoryWiseWin.addEventListener("close", function() {
        Ti.App.removeEventListener("notificationupdate", updateNotificationCount);
    });
    __defers["$.__views.__alloyId7!click!openSettingScreen"] && $.addListener($.__views.__alloyId7, "click", openSettingScreen);
    __defers["$.__views.notificationBtn!click!openNotificationScreen"] && $.addListener($.__views.notificationBtn, "click", openNotificationScreen);
    __defers["$.__views.notificationV!click!openNotificationScreen"] && $.addListener($.__views.notificationV, "click", openNotificationScreen);
    __defers["$.__views.is!end!loadMore"] && $.__views.is.on("end", loadMore);
    __defers["$.__views.categoryWiseNotificationTable!click!tipsInfoScreen"] && $.addListener($.__views.categoryWiseNotificationTable, "click", tipsInfoScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;