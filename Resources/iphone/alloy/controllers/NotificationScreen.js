function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function fetchNotifications() {
        notificationList = Alloy.Globals.DbManager.Get_NotificationAllList();
        if (notificationList.length > 0) {
            Ti.API.info("show list when DB has notification data");
            showNotificationsList(notificationList);
        }
        getNotificationsBySingleApi(false);
    }
    function loadMore() {
        setTimeout(function() {
            getNotificationsBySingleApi(true);
        }, 500);
    }
    function openNotificationInfoScreen(e) {
        var NotificationInfo = Alloy.createController("NotificationInfoScreen", e.row.detail).getView();
        Alloy.Globals.notificationNavWindow.openWindow(NotificationInfo);
        try {
            if (1 != notificationList[e.row.index].read_status) {
                e.row.children[0].visible = false;
                notificationList[e.row.index].read_status = 1;
                Alloy.Globals.DbManager.Save_NotificationAsRead(notificationList[e.row.index].notification_id);
                ReadStatusApiCall(notificationList[e.row.index].notification_id);
            }
        } catch (e) {
            Ti.API.info("Inside catch : " + JSON.stringify(e));
        }
    }
    function ReadStatusApiCall(notificationId) {
        var newCount = Ti.App.Properties.getInt("notificationCount") - 1;
        0 > newCount && (newCount = 0);
        Ti.App.Properties.setInt("notificationCount", newCount);
        Ti.App.fireEvent("notificationupdate", null);
        Ti.UI.iPhone.setAppBadge(Ti.App.Properties.getInt("notificationCount"));
        var user_id = Ti.App.Properties.getObject("userDetails").user.id;
        var url = Alloy.Globals.Constants.DOMAIN_URL + "changeNotificationStatus";
        var param = {
            authKey: "llB8eTk=oKtG",
            app_version: Titanium.App.version,
            notification_id: notificationId,
            user_id: user_id
        };
        Ti.API.info("url of set read status of notification : " + url);
        Ti.API.info("notification read status parameter: " + JSON.stringify(param));
        Alloy.Globals.Communicator.post(url, param, function() {});
    }
    function closeWindow() {
        $.notificationNavWindow.close();
        Alloy.Globals.notificationNavWindow = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "NotificationScreen";
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
    $.__views.notificationScreen = Ti.UI.createWindow({
        titleAttributes: {
            color: "#fff",
            font: {
                fontFamily: "SourceSansPro-Semibold",
                fontSize: "18"
            }
        },
        id: "notificationScreen",
        backButtonTitle: "",
        tintColor: "#fff",
        backgroundColor: "#fff",
        tabBarHidden: true,
        titleid: "notification_title",
        navTintColor: "#fff",
        barColor: "#3386b7"
    });
    $.__views.__alloyId65 = Ti.UI.createButton({
        title: "Close",
        backgroundImage: "none",
        id: "__alloyId65"
    });
    closeWindow ? $.addListener($.__views.__alloyId65, "click", closeWindow) : __defers["$.__views.__alloyId65!click!closeWindow"] = true;
    $.__views.notificationScreen.leftNavButton = $.__views.__alloyId65;
    $.__views.view = Ti.UI.createView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        top: 0,
        id: "view"
    });
    $.__views.notificationScreen.add($.__views.view);
    $.__views.is = Alloy.createWidget("nl.fokkezb.infiniteScroll", "widget", {
        id: "is",
        __parentSymbol: __parentSymbol
    });
    loadMore ? $.__views.is.on("end", loadMore) : __defers["$.__views.is!end!loadMore"] = true;
    $.__views.NotificationTable = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "#C8C7CC",
        height: "100%",
        top: 0,
        footerView: $.__views.is.getProxyPropertyEx("footerView", {
            recurse: true
        }),
        id: "NotificationTable",
        visible: true,
        style: Titanium.UI.iOS.TableViewStyle.PLAIN,
        selectionStyle: Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY,
        separatorStyle: Titanium.UI.TABLE_VIEW_SEPARATOR_STYLE_SINGLE_LINE
    });
    $.__views.view.add($.__views.NotificationTable);
    openNotificationInfoScreen ? $.addListener($.__views.NotificationTable, "click", openNotificationInfoScreen) : __defers["$.__views.NotificationTable!click!openNotificationInfoScreen"] = true;
    $.__views.noResultLbl = Ti.UI.createLabel({
        id: "noResultLbl",
        color: "#BDBDBD",
        width: "95%",
        text: "",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
    });
    $.__views.view.add($.__views.noResultLbl);
    $.__views.ActivityView = Ti.UI.createView({
        backgroundColor: "black",
        opacity: .9,
        width: 80,
        height: 80,
        borderRadius: 10,
        id: "ActivityView",
        visible: false
    });
    $.__views.notificationScreen.add($.__views.ActivityView);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 18,
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        height: 28,
        width: 28,
        id: "activityIndicator"
    });
    $.__views.ActivityView.add($.__views.activityIndicator);
    $.__views.loadingLabel = Ti.UI.createLabel({
        text: "Please wait...",
        color: "white",
        bottom: 18,
        font: {
            fontSize: 11
        },
        id: "loadingLabel"
    });
    $.__views.ActivityView.add($.__views.loadingLabel);
    $.__views.notificationNavWindow = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.notificationScreen,
        id: "notificationNavWindow",
        modal: true
    });
    $.__views.notificationNavWindow && $.addTopLevelView($.__views.notificationNavWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    Alloy.Globals.notificationNavWindow = $.notificationNavWindow;
    var notificationList = [];
    $.is.init($.NotificationTable);
    var getNotificationsBySingleApi = function(viaLoadMore) {
        if (!viaLoadMore && 0 == notificationList.length) {
            $.ActivityView.visible = true;
            $.activityIndicator.show();
        }
        var url = Alloy.Globals.Constants.DOMAIN_URL + "getNotifications";
        var lastId = "";
        notificationList.length > 0 && viaLoadMore && (lastId = notificationList[notificationList.length - 1].notification_id);
        var userId = Ti.App.Properties.getObject("userDetails").user.id;
        var param = {
            authKey: "llB8eTk=oKtG",
            app_version: Titanium.App.version,
            max_id: lastId,
            user_id: userId
        };
        Ti.API.info("url Notification listing : " + url);
        Ti.API.info("Notification parameters : " + JSON.stringify(param));
        Alloy.Globals.Communicator.post(url, param, function(e) {
            Ti.API.info("Response after post :  " + JSON.stringify(e));
            try {
                if (e.success) {
                    var responseData = JSON.parse(e.response);
                    if ("true" == responseData.status) {
                        notificationList = viaLoadMore ? notificationList.concat(responseData.data) : responseData.data;
                        Ti.API.info("notification Data : " + JSON.stringify(notificationList));
                        if (notificationList.length > 0) {
                            $.noResultLbl.visible = false;
                            $.NotificationTable.visible = true;
                            showNotificationsList(notificationList);
                            Alloy.Globals.DbManager.Save_NotificationAllList(responseData.data);
                        }
                        responseData.total_records > notificationList.length ? viaLoadMore && $.is.state($.is.SUCCESS, "") : viaLoadMore && $.is.state($.is.DONE, "");
                        if (notificationList.length <= 0) {
                            $.noResultLbl.text = L("noResultfound");
                            $.noResultLbl.visible = true;
                            $.is.state($.is.SUCCESS, "Tap to refresh");
                        }
                    } else if ("false" == responseData.status) {
                        $.is.state($.is.ERROR, "Tap to retry");
                        if (!viaLoadMore && 0 == notificationList.length) {
                            $.noResultLbl.text = L("some_error");
                            $.noResultLbl.visible = true;
                        }
                    } else {
                        $.is.state($.is.ERROR, "Tap to retry");
                        if (!viaLoadMore && 0 == notificationList.length) {
                            $.noResultLbl.text = L("some_error");
                            $.noResultLbl.visible = true;
                        }
                    }
                } else {
                    $.is.state($.is.ERROR, "Tap to retry");
                    if (!viaLoadMore && 0 == notificationList.length) {
                        $.noResultLbl.text = L("some_error");
                        $.noResultLbl.visible = true;
                    }
                }
            } catch (e) {
                $.is.state($.is.ERROR, "Tap to retry");
                if (!viaLoadMore && 0 == notificationList.length) {
                    $.noResultLbl.text = L("some_error");
                    $.noResultLbl.visible = true;
                }
            }
            isLoading = false;
            if (!viaLoadMore) {
                $.ActivityView.visible = false;
                $.activityIndicator.hide();
            }
        });
    };
    Alloy.Globals.updateNotificationsList = getNotificationsBySingleApi;
    showNotificationsList = function(notificationList) {
        var sections = [];
        var lastProcessedDate = null;
        var tableViewSection;
        Ti.API.info("notificationList.length :  " + notificationList.length);
        if (notificationList.length > 0) {
            $.noResultLbl.visible = false;
            $.NotificationTable.visible = true;
            Ti.API.info("hello1");
            var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            for (i = 0; i < notificationList.length; i++) {
                var notification = notificationList[i];
                var showDate = notification.created_at.split(" ")[0];
                var year = showDate.substr(0, 4);
                var month = showDate.substr(5, 2);
                month = parseInt(month);
                var date = showDate.substr(8, 2);
                showDate = new Date(year, month - 1, date);
                if (null == lastProcessedDate || lastProcessedDate > showDate) {
                    var currentDate = new Date();
                    var yesterdayDate = new Date();
                    yesterdayDate.setDate(currentDate.getDate() - 1);
                    var dateStr;
                    if (currentDate.getDate() == showDate.getDate() && currentDate.getMonth() == showDate.getMonth() && currentDate.getFullYear() == showDate.getFullYear()) dateStr = "Today"; else if (yesterdayDate.getDate() == showDate.getDate() && yesterdayDate.getMonth() == showDate.getMonth() && yesterdayDate.getFullYear() == showDate.getFullYear()) dateStr = "Yesterday"; else {
                        date = showDate.getDate();
                        10 > date && (date = "0" + date);
                        dateStr = date + "-" + months[showDate.getMonth()] + "-" + showDate.getFullYear();
                    }
                    Ti.API.info(notification.created_at + "    " + lastProcessedDate);
                    var tableSectionHeaderView = Ti.UI.createView({
                        height: 30,
                        backgroundColor: "#F0EFF5"
                    });
                    var tableSectionHeaderLabel = Ti.UI.createLabel({
                        text: dateStr,
                        left: 20,
                        color: "#2E3C45",
                        font: {
                            fontSize: "15",
                            fontFamily: "calibril"
                        }
                    });
                    tableSectionHeaderView.add(tableSectionHeaderLabel);
                    tableViewSection = Ti.UI.createTableViewSection({});
                    tableViewSection.headerView = tableSectionHeaderView;
                    lastProcessedDate = showDate;
                    sections.push(tableViewSection);
                }
                var notificationTVR = Ti.UI.createTableViewRow({
                    backgroundColor: "white",
                    detail: notification,
                    color: "transparent",
                    selectedColor: "transparent",
                    index: i,
                    backgroundSelectedColor: "#D9D9D9"
                });
                notificationTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
                var notificationTVRView = Ti.UI.createView({
                    left: 20,
                    right: 15,
                    top: 10,
                    bottom: 10,
                    detail: notification,
                    height: Ti.UI.SIZE,
                    layout: "vertical"
                });
                var notificationTitleLabel = Ti.UI.createLabel({
                    top: 0,
                    left: 0,
                    height: 20,
                    color: "#2E3C45",
                    width: "95%",
                    index: i,
                    text: notification.notification_title
                });
                var descStr = notification.notification_description.replace(/(<\?[a-z]*(\s[^>]*)?\?(>|$)|<!\[[a-z]*\[|\]\]>|<!DOCTYPE[^>]*?(>|$)|<!--[\s\S]*?(-->|$)|<[a-z?!\/]([a-z0-9_:.])*(\s[^>]*)?(>|$))/gi, "");
                descStr = descStr.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
                var notificationDescriptionLabel = Ti.UI.createLabel({
                    top: 0,
                    left: 0,
                    height: 30,
                    color: "#2E3C45",
                    width: "95%",
                    index: i,
                    text: descStr,
                    font: {
                        fontSize: 14,
                        fontFamily: "calibril"
                    }
                });
                notificationTVR.hasChild = true;
                if (1 != notification.read_status) {
                    var unreadView = Ti.UI.createView({
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        left: 5,
                        backgroundColor: "#3386b7"
                    });
                    notificationTVR.add(unreadView);
                }
                notificationTVRView.add(notificationTitleLabel);
                notificationTVRView.add(notificationDescriptionLabel);
                notificationTVR.hasChild = true;
                notificationTVRView.height = 55;
                notificationTitleLabel.left = 0;
                notificationDescriptionLabel.left = 0;
                notificationTVR.add(notificationTVRView);
                tableViewSection.add(notificationTVR);
            }
            $.NotificationTable.setData(sections);
        } else {
            $.noResultLbl.text = L("noResultfound");
            $.noResultLbl.visible = true;
            $.NotificationTable.visible = false;
        }
    };
    fetchNotifications();
    __defers["$.__views.__alloyId65!click!closeWindow"] && $.addListener($.__views.__alloyId65, "click", closeWindow);
    __defers["$.__views.is!end!loadMore"] && $.__views.is.on("end", loadMore);
    __defers["$.__views.NotificationTable!click!openNotificationInfoScreen"] && $.addListener($.__views.NotificationTable, "click", openNotificationInfoScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;