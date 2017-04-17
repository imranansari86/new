function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getTipsBySingleApi() {
        Alloy.Globals.LoadingScreen.open();
        var url = Alloy.Globals.Constants.DOMAIN_URL + "getFeaturedTipWithCategoryLists";
        var userId = Ti.App.Properties.getObject("userDetails").user.id;
        var param = {
            authKey: "llB8eTk=oKtG",
            app_version: Titanium.App.version,
            user_id: userId
        };
        Ti.API.info("url Tips listing : " + url);
        Ti.API.info("Tips parameters : " + JSON.stringify(param));
        Alloy.Globals.Communicator.post(url, param, function(e) {
            Ti.API.info("Response after post Tips :  " + JSON.stringify(e));
            try {
                if (e.success) {
                    var responseData = JSON.parse(e.response);
                    if ("true" == responseData.status) {
                        Ti.API.info("data of tips : " + JSON.stringify(responseData.data));
                        var categoriesList = responseData.data.categories;
                        var featuredTipsList = responseData.data.featuredTips;
                        Ti.API.info("categoriesList.length = " + categoriesList.length);
                        Ti.API.info("featuredTipsList.length = " + featuredTipsList.length);
                        if (categoriesList.length > 0 || featuredTipsList.length > 0) {
                            $.noResultLbl.visible = false;
                            $.tipsListNotificationTable.visible = true;
                            showTipsList(categoriesList, featuredTipsList);
                            categoriesList.length > 0 && Alloy.Globals.DbManager.Save_CategoriesAllList(categoriesList);
                            if (featuredTipsList.length > 0) {
                                Alloy.Globals.DbManager.Save_TipsAllList(featuredTipsList);
                                var abcfeaturedTipsList = Alloy.Globals.DbManager.Get_FeaturedtipsAllList();
                                Ti.API.info("get Data from featured Tips:" + JSON.stringify(abcfeaturedTipsList));
                            }
                        } else {
                            $.noResultLbl.text = L("noResultfound");
                            $.noResultLbl.visible = true;
                            $.tipsListNotificationTable.visible = false;
                        }
                        Ti.API.info("responseData.total_records = " + responseData.total_records);
                    } else if ("false" == responseData.status) {
                        $.noResultLbl.text = L("some_error");
                        $.noResultLbl.visible = true;
                    } else {
                        $.noResultLbl.text = L("some_error");
                        $.noResultLbl.visible = true;
                    }
                } else {
                    $.noResultLbl.text = L("some_error");
                    $.noResultLbl.visible = true;
                }
            } catch (e) {
                $.noResultLbl.text = L("some_error");
                $.noResultLbl.visible = true;
            }
            isLoading = false;
            Alloy.Globals.LoadingScreen.close();
        });
    }
    function fetchTips() {
        featuredTipsList = Alloy.Globals.DbManager.Get_FeaturedtipsAllList();
        categoriesList = Alloy.Globals.DbManager.Get_categoriesAllList();
        Ti.API.info("featuredTipsList :" + JSON.stringify(featuredTipsList));
        if (featuredTipsList.length > 0 || categoriesList.length > 0) {
            Ti.API.info("show list when DB has data");
            showTipsList(categoriesList, featuredTipsList);
        } else {
            Ti.API.info("show list when DB blank");
            getTipsBySingleApi();
        }
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
    function openCategoriesWiseScreen(e) {
        Ti.API.info("categoreis :  " + JSON.stringify(e));
        if ("first" == e.row.section1) ; else {
            var CategoryWiseListScreen = Alloy.createController("CategoryWiseListScreen", e.row.detail).getView();
            Alloy.Globals.tipsNavWin.openWindow(CategoryWiseListScreen);
        }
    }
    function openSettingScreen() {
        var SettingScreen = Alloy.createController("SettingScreen").getView();
        Alloy.Globals.tipsNavWin.openWindow(SettingScreen);
    }
    function openNotificationScreen() {
        var notificationScreen = Alloy.createController("NotificationScreen").getView();
        notificationScreen.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TipsScreen";
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
    $.__views.tipsWindow = Ti.UI.createWindow({
        titleAttributes: {
            color: "#fff"
        },
        id: "tipsWindow",
        titleImage: "/images/guide_logo.png",
        titleid: "tips_title",
        barColor: "#3386b7",
        navTintColor: "#fff"
    });
    $.__views.__alloyId153 = Ti.UI.createView({
        id: "__alloyId153"
    });
    $.__views.__alloyId154 = Ti.UI.createView({
        height: 40,
        width: 40,
        right: 0,
        id: "__alloyId154"
    });
    $.__views.__alloyId153.add($.__views.__alloyId154);
    openSettingScreen ? $.addListener($.__views.__alloyId154, "click", openSettingScreen) : __defers["$.__views.__alloyId154!click!openSettingScreen"] = true;
    $.__views.settingBtn = Ti.UI.createButton({
        id: "settingBtn",
        backgroundImage: "none",
        image: "/images/settings.png"
    });
    $.__views.__alloyId154.add($.__views.settingBtn);
    $.__views.notificationButton = Ti.UI.createView({
        id: "notificationButton",
        width: 40,
        height: 40,
        right: 40
    });
    $.__views.__alloyId153.add($.__views.notificationButton);
    $.__views.notificationBtn = Ti.UI.createButton({
        id: "notificationBtn",
        width: 40,
        height: 40,
        backgroundImage: "none",
        image: "/images/bell.png"
    });
    $.__views.notificationButton.add($.__views.notificationBtn);
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
    $.__views.notificationButton.add($.__views.notificationV);
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
    $.__views.tipsWindow.rightNavButton = $.__views.__alloyId153;
    $.__views.view = Ti.UI.createView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        top: 0,
        id: "view"
    });
    $.__views.tipsWindow.add($.__views.view);
    $.__views.tipsListNotificationTable = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "#C8C7CC",
        height: "100%",
        top: 0,
        id: "tipsListNotificationTable",
        selectionStyle: Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY,
        separatorStyle: Titanium.UI.TABLE_VIEW_SEPARATOR_STYLE_SINGLE_LINE
    });
    $.__views.view.add($.__views.tipsListNotificationTable);
    openCategoriesWiseScreen ? $.addListener($.__views.tipsListNotificationTable, "click", openCategoriesWiseScreen) : __defers["$.__views.tipsListNotificationTable!click!openCategoriesWiseScreen"] = true;
    $.__views.noResultLbl = Ti.UI.createLabel({
        id: "noResultLbl",
        color: "#BDBDBD",
        width: "95%",
        text: "",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
    });
    $.__views.view.add($.__views.noResultLbl);
    $.__views.tipsNavWin = Ti.UI.createTab({
        titleAttributes: {
            color: "#fff"
        },
        window: $.__views.tipsWindow,
        id: "tipsNavWin",
        titleid: "tips_title",
        backgroundImage: "none",
        icon: "/images/lightf-bulb_only.png",
        activeIcon: "/images/lightf-bulb_only_hover.png"
    });
    $.__views.tipsNavWin && $.addTopLevelView($.__views.tipsNavWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    Alloy.Globals.tipsNavWin = $.tipsNavWin;
    var categoriesList = [];
    var featuredTipsList = [];
    showTipsList = function(categoriesList, featuredTipsList) {
        Ti.API.info("" + JSON.stringify(categoriesList) + "....featured : " + JSON.stringify(featuredTipsList));
        var sections = [];
        if (categoriesList.length > 0 || featuredTipsList.length > 0) {
            $.noResultLbl.visible = false;
            $.tipsListNotificationTable.visible = true;
            var headerView = Ti.UI.createView({
                backgroundColor: "#F0EFF5",
                height: "40dp"
            });
            var headerTitle = Ti.UI.createLabel({
                font: {
                    fontSize: "14dp",
                    fontFamily: "calibril",
                    fontWeight: "bold"
                },
                color: "#2E3C45",
                left: "15dp",
                bottom: "5dp",
                text: L("headerFirst_title"),
                textAlign: "left"
            });
            headerView.add(headerTitle);
            var headerView2 = Ti.UI.createView({
                backgroundColor: "#F0EFF5",
                height: "40dp"
            });
            var headerTitle2 = Ti.UI.createLabel({
                font: {
                    fontSize: "14dp",
                    fontFamily: "calibril",
                    fontWeight: "bold"
                },
                color: "#2E3C45",
                left: "15dp",
                bottom: "5dp",
                text: L("headerSecond_title"),
                textAlign: "left"
            });
            headerView2.add(headerTitle2);
            var sectionFeaturedTipsList = Ti.UI.createTableViewSection({
                headerView: headerView
            });
            var sectionCategoriesList = Ti.UI.createTableViewSection({
                headerView: headerView2
            });
            if (featuredTipsList.length > 0) {
                var featuredRow = Ti.UI.createTableViewRow({
                    backgroundColor: "transparent",
                    selectedColor: "transparent",
                    section1: "first",
                    backgroundSelectedColor: "#D9D9D9"
                });
                var featuredTipsScrollableView = Ti.UI.createScrollableView({
                    left: 0,
                    right: 0,
                    height: 150
                });
                featuredTipsScrollableView.overlayEnabled = true;
                featuredTipsScrollableView.currentPageIndicatorColor = "#3386b7";
                featuredTipsScrollableView.pageIndicatorColor = "#ffffff";
                featuredTipsScrollableView.pagingControlColor = "transparent";
                featuredTipsScrollableView.showPagingControl = true;
                var imageArr = [];
                for (var i = 0; i < featuredTipsList.length; i++) {
                    Ti.API.info("Hello" + i);
                    var BaseView = Ti.UI.createView({
                        backgroundColor: "transparent",
                        height: "150dp",
                        backgroundColor: "white",
                        top: 0,
                        width: Ti.UI.FILL
                    });
                    var imageView = Ti.UI.createImageView({
                        image: featuredTipsList[i].tip_banner,
                        width: Ti.UI.FILL,
                        index: i,
                        touchEnabled: true,
                        top: 0,
                        detail: featuredTipsList[i]
                    });
                    imageView.height = Ti.UI.FILL;
                    imageView.addEventListener("click", function(e) {
                        Ti.API.info("On click of imageView : " + JSON.stringify(e));
                        var TipsInfoScreen = Alloy.createController("TipsInfoScreen", e.source.detail).getView();
                        Alloy.Globals.tipsNavWin.openWindow(TipsInfoScreen);
                    });
                    var labelView = Ti.UI.createView({
                        backgroundColor: "#66000000",
                        height: "30dp",
                        top: 0,
                        width: Ti.UI.FILL
                    });
                    var featuredListTitleLbl = Ti.UI.createLabel({
                        textAlign: "left",
                        color: "#fff",
                        top: 0,
                        text: featuredTipsList[i].list_title,
                        height: 30,
                        width: "95%",
                        font: {
                            fontSize: 14,
                            fontFamily: "calibril"
                        }
                    });
                    BaseView.add(imageView);
                    BaseView.add(labelView);
                    BaseView.add(featuredListTitleLbl);
                    imageArr.push(BaseView);
                }
                var i;
                featuredTipsScrollableView.views = imageArr;
                featuredRow.add(featuredTipsScrollableView);
                sectionFeaturedTipsList.add(featuredRow);
            } else {
                var nofeaturedRow = Ti.UI.createTableViewRow({
                    backgroundColor: "white",
                    selectedColor: "transparent",
                    touchEnabled: false,
                    height: 150,
                    section1: "first",
                    backgroundSelectedColor: "white"
                });
                var nofeaturedTipTitleLbl = Ti.UI.createLabel({
                    textAlign: "center",
                    color: "#BDBDBD",
                    text: L("nofeaturedTipsListAvailable"),
                    height: 25,
                    font: {
                        fontSize: 12,
                        fontFamily: "calibril"
                    },
                    touchEnabled: false
                });
                nofeaturedRow.addEventListener("click", function() {});
                nofeaturedRow.add(nofeaturedTipTitleLbl);
                sectionFeaturedTipsList.add(nofeaturedRow);
            }
            if (categoriesList.length > 0) for (var i = 0; i < categoriesList.length; i++) {
                var categoriesRow = Ti.UI.createTableViewRow({
                    backgroundColor: "#fff",
                    category_id: categoriesList[i].category_id,
                    detail: categoriesList[i],
                    height: 40,
                    title: categoriesList[i].name,
                    color: "transparent",
                    layout: "horizontal",
                    selectedColor: "transparent",
                    section1: "second",
                    backgroundSelectedColor: "#D9D9D9"
                });
                var leftImage = Ti.UI.createImageView({
                    image: categoriesList[i].image,
                    height: 20,
                    top: 10,
                    width: 20,
                    left: 20
                });
                var categoriesTitleLbl = Ti.UI.createLabel({
                    left: 15,
                    top: 11,
                    color: "#2E3C45",
                    text: categoriesList[i].name,
                    height: 18,
                    font: {
                        fontSize: 15,
                        fontFamily: "calibril"
                    }
                });
                categoriesTitleLbl.right = 20;
                categoriesRow.add(leftImage);
                categoriesRow.add(categoriesTitleLbl);
                sectionCategoriesList.add(categoriesRow);
                categoriesRow.hasChild = true;
            } else {
                var nocategoriesRow = Ti.UI.createTableViewRow({
                    backgroundColor: "#ffffff",
                    selectedColor: "transparent",
                    touchEnabled: false,
                    section1: "first",
                    height: 40,
                    backgroundSelectedColor: "white"
                });
                var nocategoriesTitleLbl = Ti.UI.createLabel({
                    textAlign: "center",
                    color: "#BDBDBD",
                    text: L("noCategoriesTipsListAvailable"),
                    height: 25,
                    top: 7.5,
                    font: {
                        fontSize: 12,
                        fontFamily: "calibril"
                    },
                    touchEnabled: false
                });
                nocategoriesRow.addEventListener("click", function() {});
                nocategoriesRow.add(nocategoriesTitleLbl);
                sectionCategoriesList.add(nocategoriesRow);
            }
            sections.push(sectionFeaturedTipsList);
            sections.push(sectionCategoriesList);
            $.tipsListNotificationTable.setData(sections);
        } else {
            $.noResultLbl.text = L("noResultfound");
            $.noResultLbl.visible = true;
            $.tipsListNotificationTable.visible = false;
        }
    };
    fetchTips();
    Ti.App.addEventListener("dataUpdatedTips", function() {
        Ti.API.info("Call Fire Event On tips category Or FeaturedTips Screen");
        featuredTipsList = Alloy.Globals.DbManager.Get_FeaturedtipsAllList();
        categoriesList = Alloy.Globals.DbManager.Get_categoriesAllList();
        Ti.API.info("featuredTipsList length: " + featuredTipsList.length);
        Ti.API.info("categoriesList length: " + categoriesList.length);
        showTipsList(categoriesList, featuredTipsList);
    });
    Ti.App.addEventListener("notificationupdate", updateNotificationCount);
    updateNotificationCount();
    __defers["$.__views.__alloyId154!click!openSettingScreen"] && $.addListener($.__views.__alloyId154, "click", openSettingScreen);
    __defers["$.__views.notificationBtn!click!openNotificationScreen"] && $.addListener($.__views.notificationBtn, "click", openNotificationScreen);
    __defers["$.__views.notificationV!click!openNotificationScreen"] && $.addListener($.__views.notificationV, "click", openNotificationScreen);
    __defers["$.__views.tipsListNotificationTable!click!openCategoriesWiseScreen"] && $.addListener($.__views.tipsListNotificationTable, "click", openCategoriesWiseScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;