function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getContactListBySingleApi(viaLoadMore) {
        false == viaLoadMore && 0 == contactList.length && Alloy.Globals.LoadingScreen.open();
        var url = Alloy.Globals.Constants.DOMAIN_URL + "getContacts";
        var lastId = "";
        contactList.length > 0 && (lastId = contactList[contactList.length - 1].record_order);
        var userId = Ti.App.Properties.getObject("userDetails").user.id;
        var param = {
            authKey: "llB8eTk=oKtG",
            app_version: Titanium.App.version,
            max_id: lastId,
            user_id: userId
        };
        Ti.API.info("url Contact listing : " + url);
        Ti.API.info("Contact parameters : " + JSON.stringify(param));
        Alloy.Globals.Communicator.post(url, param, function(e) {
            Ti.API.info("Response after post :  " + JSON.stringify(e));
            try {
                if (e.success) {
                    var responseData = JSON.parse(e.response);
                    if ("true" == responseData.status) {
                        contactList = contactList.concat(responseData.data);
                        if (responseData.data.length > 0) {
                            $.noResultLbl.visible = false;
                            $.contactListNotificationTable.visible = true;
                            Alloy.Globals.showContactList(contactList);
                            Alloy.Globals.DbManager.Save_ContactsAllList(responseData.data);
                        }
                        Ti.API.info("responseData.total_records = " + responseData.total_records);
                        Ti.API.info("contactList.length = " + contactList.length);
                        responseData.total_records > contactList.length ? viaLoadMore && $.is.state($.is.SUCCESS, "") : viaLoadMore && $.is.state($.is.DONE, "");
                        if (contactList.length <= 0) {
                            $.noResultLbl.text = L("noResultfound");
                            $.noResultLbl.visible = true;
                            $.contactListNotificationTable.visible = false;
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
    function fetchContacts() {
        setTimeout(function() {
            contactList = Alloy.Globals.DbManager.Get_contactsAllList();
            if (contactList.length > 0) {
                Ti.API.info("show list when DB has data in contact table");
                Alloy.Globals.showContactList(contactList);
            } else {
                Ti.API.info("show list when Contact table is blank");
                getContactListBySingleApi(false);
            }
        }, 300);
    }
    function loadMore() {
        setTimeout(function() {
            getContactListBySingleApi(true);
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
    function openContactDetailScreen(e) {
        var openContactDetail = Alloy.createController("ContactDetailScreen", contactList[e.index]).getView();
        Alloy.Globals.contactNavWin.openWindow(openContactDetail);
    }
    function openSettingScreen() {
        var SettingScreen = Alloy.createController("SettingScreen").getView();
        Alloy.Globals.contactNavWin.openWindow(SettingScreen);
    }
    function openNotificationScreen() {
        var notificationScreen = Alloy.createController("NotificationScreen").getView();
        notificationScreen.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ContactScreen";
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
    $.__views.contactWindow = Ti.UI.createWindow({
        titleAttributes: {
            color: "#fff",
            font: {
                fontFamily: "SourceSansPro-Semibold",
                fontSize: "18"
            }
        },
        id: "contactWindow",
        titleid: "contact_title",
        titleImage: "/images/guide_logo.png",
        navTintColor: "#fff",
        barColor: "#3386b7"
    });
    fetchContacts ? $.addListener($.__views.contactWindow, "open", fetchContacts) : __defers["$.__views.contactWindow!open!fetchContacts"] = true;
    $.__views.__alloyId19 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId19"
    });
    $.__views.__alloyId20 = Ti.UI.createView({
        width: 40,
        height: 40,
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    $.__views.notificationBtn = Ti.UI.createButton({
        id: "notificationBtn",
        width: 40,
        height: 40,
        backgroundImage: "none",
        image: "/images/bell.png"
    });
    $.__views.__alloyId20.add($.__views.notificationBtn);
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
    $.__views.__alloyId20.add($.__views.notificationV);
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
    $.__views.__alloyId19.add($.__views.settingBtn);
    openSettingScreen ? $.addListener($.__views.settingBtn, "click", openSettingScreen) : __defers["$.__views.settingBtn!click!openSettingScreen"] = true;
    $.__views.contactWindow.rightNavButton = $.__views.__alloyId19;
    $.__views.view = Ti.UI.createView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        top: 0,
        id: "view"
    });
    $.__views.contactWindow.add($.__views.view);
    $.__views.__alloyId21 = Ti.UI.createSearchBar({
        tintColor: "#3386b7",
        height: 40,
        id: "__alloyId21"
    });
    $.__views.is = Alloy.createWidget("nl.fokkezb.infiniteScroll", "widget", {
        id: "is",
        __parentSymbol: __parentSymbol
    });
    loadMore ? $.__views.is.on("end", loadMore) : __defers["$.__views.is!end!loadMore"] = true;
    $.__views.contactListNotificationTable = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "#C8C7CC",
        height: "100%",
        top: 0,
        search: $.__views.__alloyId21,
        footerView: $.__views.is.getProxyPropertyEx("footerView", {
            recurse: true
        }),
        id: "contactListNotificationTable",
        visible: true,
        selectionStyle: Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY,
        separatorStyle: Titanium.UI.TABLE_VIEW_SEPARATOR_STYLE_SINGLE_LINE
    });
    $.__views.view.add($.__views.contactListNotificationTable);
    openContactDetailScreen ? $.addListener($.__views.contactListNotificationTable, "click", openContactDetailScreen) : __defers["$.__views.contactListNotificationTable!click!openContactDetailScreen"] = true;
    $.__views.noResultLbl = Ti.UI.createLabel({
        id: "noResultLbl",
        color: "#BDBDBD",
        width: "95%",
        text: "",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
    });
    $.__views.view.add($.__views.noResultLbl);
    $.__views.contactNavWin = Ti.UI.createTab({
        window: $.__views.contactWindow,
        titleid: "contact_title",
        backgroundImage: "none",
        id: "contactNavWin",
        icon: "/images/contact-w.png",
        activeIcon: "/images/contact-b.png"
    });
    $.__views.contactNavWin && $.addTopLevelView($.__views.contactNavWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    Alloy.Globals.contactNavWin = $.contactNavWin;
    var contactList = [];
    $.is.init($.contactListNotificationTable);
    Alloy.Globals.showContactList = function(contactList) {
        var tableViewRowArr = [];
        if (contactList.length > 0) {
            $.noResultLbl.visible = false;
            $.contactListNotificationTable.visible = true;
            for (i = 0; i < contactList.length; i++) {
                var row = Ti.UI.createTableViewRow({
                    backgroundColor: "transparent",
                    detail: contactList[i],
                    height: 48,
                    title: contactList[i].organisation_name,
                    color: "transparent",
                    selectedColor: "transparent",
                    backgroundSelectedColor: "#D9D9D9"
                });
                row.hasChild = true;
                var contactTitleLbl = Ti.UI.createLabel({
                    left: 20,
                    right: 20,
                    top: 15,
                    color: "#2E3C45",
                    text: contactList[i].organisation_name,
                    height: 18,
                    font: {
                        fontSize: 15,
                        fontFamily: "calibril"
                    }
                });
                row.add(contactTitleLbl);
                tableViewRowArr.push(row);
            }
            $.contactListNotificationTable.setData(tableViewRowArr);
        } else {
            $.noResultLbl.text = L("noResultfound");
            $.noResultLbl.visible = true;
            $.contactListNotificationTable.visible = false;
        }
    };
    Ti.App.addEventListener("dataUpdatedContacts", function() {
        fetchContacts();
    });
    Ti.App.addEventListener("notificationupdate", updateNotificationCount);
    updateNotificationCount();
    __defers["$.__views.contactWindow!open!fetchContacts"] && $.addListener($.__views.contactWindow, "open", fetchContacts);
    __defers["$.__views.notificationBtn!click!openNotificationScreen"] && $.addListener($.__views.notificationBtn, "click", openNotificationScreen);
    __defers["$.__views.notificationV!click!openNotificationScreen"] && $.addListener($.__views.notificationV, "click", openNotificationScreen);
    __defers["$.__views.settingBtn!click!openSettingScreen"] && $.addListener($.__views.settingBtn, "click", openSettingScreen);
    __defers["$.__views.is!end!loadMore"] && $.__views.is.on("end", loadMore);
    __defers["$.__views.contactListNotificationTable!click!openContactDetailScreen"] && $.addListener($.__views.contactListNotificationTable, "click", openContactDetailScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;