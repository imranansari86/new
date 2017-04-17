function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function settingWindowOpened() {
        $.userName.text = "Hello " + Ti.App.Properties.getObject("userDetails").user.fname;
        $.assignVal.text = Ti.App.Properties.getObject("userDetails").position.assignmentCode;
        $.countryVal.text = Ti.App.Properties.getObject("userDetails").position.countryTo.name;
        $.currentCountryVal.text = Ti.App.Properties.getString("currentCountry");
        var startDateStr = Ti.App.Properties.getObject("userDetails").position.start;
        var year = startDateStr.substr(0, 4);
        var month = startDateStr.substr(4, 2);
        var date = startDateStr.substr(6, 2);
        var startDate = new Date(year, month, date);
        var endDateStr = Ti.App.Properties.getObject("userDetails").position.end;
        year = endDateStr.substr(0, 4);
        month = endDateStr.substr(4, 2);
        date = endDateStr.substr(6, 2);
        var endDate = new Date(year, month, date);
        var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        var dateStr = startDate.getDate();
        10 > dateStr && (dateStr = "0" + dateStr);
        $.startVal.text = dateStr + "-" + months[startDate.getMonth() - 1] + "-" + startDate.getFullYear();
        dateStr = endDate.getDate();
        10 > dateStr && (dateStr = "0" + dateStr);
        $.endVal.text = dateStr + "-" + months[endDate.getMonth() - 1] + "-" + endDate.getFullYear();
        locationsList = Alloy.Globals.DbManager.Get_locationAllList();
        null != locationsList && locationsList.length > 0 ? addCountriesInPicker() : fetchLocations();
    }
    function addCountriesInPicker() {
        var data = [];
        var selectedId = Ti.App.Properties.getString("currentCountryId");
        for (var i = 0; i < locationsList.length; i++) {
            data[i] = Ti.UI.createPickerRow({
                title: locationsList[i].location_name,
                countryId: locationsList[i].location_id
            });
            locationsList[i].location_id == selectedId && (selectedIndex = i);
        }
        $.countryPicker.add(data);
        $.countryPicker.setSelectedRow(0, selectedIndex, false);
    }
    function fetchLocations() {
        $.countryLoadIndicator.show();
        var url = Alloy.Globals.Constants.DOMAIN_URL + "getLocations";
        var param = {
            authKey: "llB8eTk=oKtG",
            app_version: Titanium.App.version
        };
        Ti.API.info("url get locations : " + url);
        Ti.API.info("get location parameters : " + JSON.stringify(param));
        Alloy.Globals.Communicator.post(url, param, function(e) {
            Ti.API.info("Response after post :  " + JSON.stringify(e));
            try {
                if (e.success) {
                    var responseData = JSON.parse(e.response);
                    if ("true" == responseData.status) {
                        locationsList = responseData.data;
                        if (responseData.data.length > 0) {
                            null != locationsList && locationsList.length > 0 && addCountriesInPicker();
                            Alloy.Globals.DbManager.Save_LocationAllList(responseData.data);
                        }
                    }
                }
            } catch (e) {}
            $.countryLoadIndicator.hide();
        });
    }
    function logout() {
        dialog.show();
    }
    function displayTableView() {}
    function tableViewClicked(e) {
        if (4 == e.index) if (null != locationsList && locationsList.length > 0) {
            $.countryPicker.setSelectedRow(0, selectedIndex, false);
            $.pickerView.animate({
                bottom: 0,
                duration: 300
            });
        } else alert("Countries not available");
    }
    function closePicker(e) {
        $.pickerView.animate({
            bottom: -262,
            duration: 300
        });
        if ("done" == e.source.id) {
            var selCountry = $.countryPicker.getSelectedRow(0).title;
            var selCountryId = $.countryPicker.getSelectedRow(0).countryId;
            $.currentCountryVal.text = selCountry;
            Alloy.Globals.LoadingScreen.close();
            Alloy.Globals.LoadingScreen.open();
            var url = Alloy.Globals.Constants.DOMAIN_URL + "changeLocations";
            var param = {
                authKey: "llB8eTk=oKtG",
                app_version: Titanium.App.version,
                location_id: selCountryId,
                user_id: Ti.App.Properties.getObject("userDetails").user.id
            };
            Ti.API.info("url change location : " + url);
            Ti.API.info("Change location parameters : " + JSON.stringify(param));
            Alloy.Globals.Communicator.post(url, param, function(e) {
                Ti.API.info("Response after post :  " + JSON.stringify(e));
                try {
                    if (e.success) {
                        var responseData = JSON.parse(e.response);
                        if ("true" == responseData.status) {
                            Ti.App.Properties.setString("currentCountry", selCountry);
                            Ti.App.Properties.setString("currentCountryId", selCountryId);
                            for (var i = 0; i < locationsList.length; i++) locationsList[i].location_id == selCountryId && (selectedIndex = i);
                        } else $.currentCountryVal.text = Ti.App.Properties.getString("currentCountry");
                    } else $.currentCountryVal.text = Ti.App.Properties.getString("currentCountry");
                } catch (e) {
                    $.currentCountryVal.text = Ti.App.Properties.getString("currentCountry");
                }
                Alloy.Globals.LoadingScreen.close();
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "SettingScreen";
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
    $.__views.settingScreen = Ti.UI.createWindow({
        titleAttributes: {
            color: "#fff",
            font: {
                fontFamily: "SourceSansPro-Semibold",
                fontSize: "18"
            }
        },
        id: "settingScreen",
        tabBarHidden: true,
        titleid: "setting_title",
        backButtonTitle: "",
        navTintColor: "#fff",
        backgroundColor: "#F0EFF5",
        barColor: "#3386b7"
    });
    $.__views.settingScreen && $.addTopLevelView($.__views.settingScreen);
    settingWindowOpened ? $.addListener($.__views.settingScreen, "open", settingWindowOpened) : __defers["$.__views.settingScreen!open!settingWindowOpened"] = true;
    $.__views.logoutBtn = Ti.UI.createButton({
        id: "logoutBtn",
        title: "Logout"
    });
    logout ? $.addListener($.__views.logoutBtn, "click", logout) : __defers["$.__views.logoutBtn!click!logout"] = true;
    $.__views.settingScreen.rightNavButton = $.__views.logoutBtn;
    $.__views.__alloyId120 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId120"
    });
    $.__views.userName = Ti.UI.createLabel({
        color: "#4584B7",
        font: {
            fontFamily: "SourceSansPro-Semibold",
            fontSize: "15"
        },
        top: 10,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Hello Vinay",
        id: "userName"
    });
    $.__views.__alloyId120.add($.__views.userName);
    $.__views.assignLbl = Ti.UI.createLabel({
        color: "#6C6D72",
        font: {
            fontFamily: "SourceSansPro-Semibold",
            fontSize: "13"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "This app is for your assignment...",
        id: "assignLbl"
    });
    $.__views.__alloyId120.add($.__views.assignLbl);
    $.__views.__alloyId121 = Ti.UI.createView({
        backgroundColor: "#C8C7CD",
        height: .5,
        width: "100%",
        top: 10,
        id: "__alloyId121"
    });
    $.__views.__alloyId120.add($.__views.__alloyId121);
    var __alloyId122 = [];
    $.__views.__alloyId125 = Ti.UI.createView({
        backgroundColor: "#F0EFF5",
        height: 40,
        id: "__alloyId125"
    });
    $.__views.__alloyId126 = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontFamily: "calibril",
            fontWeight: "bold"
        },
        color: "#2E3C45",
        left: "15dp",
        bottom: "5dp",
        textAlign: "left",
        height: Ti.UI.SIZE,
        width: Titanium.UI.SIZE,
        text: "ASSIGNMENT DETAILS",
        id: "__alloyId126"
    });
    $.__views.__alloyId125.add($.__views.__alloyId126);
    $.__views.__alloyId123 = Ti.UI.createTableViewSection({
        headerView: $.__views.__alloyId125,
        id: "__alloyId123"
    });
    __alloyId122.push($.__views.__alloyId123);
    $.__views.__alloyId127 = Ti.UI.createTableViewRow({
        width: "100%",
        backgroundColor: "white",
        selectedBackgroundColor: "#FF8831",
        selectionStyle: Titanium.UI.iOS.TableViewCellSelectionStyle.NONE,
        id: "__alloyId127"
    });
    $.__views.__alloyId123.add($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createView({
        left: 15,
        right: 15,
        top: 5,
        bottom: 5,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId128"
    });
    $.__views.__alloyId127.add($.__views.__alloyId128);
    $.__views.__alloyId129 = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "14"
        },
        left: 0,
        text: "Assignment Code",
        id: "__alloyId129"
    });
    $.__views.__alloyId128.add($.__views.__alloyId129);
    $.__views.assignVal = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "15"
        },
        left: 0,
        top: 5,
        color: "#4584B7",
        text: "123456",
        id: "assignVal"
    });
    $.__views.__alloyId128.add($.__views.assignVal);
    $.__views.__alloyId130 = Ti.UI.createTableViewRow({
        width: "100%",
        backgroundColor: "white",
        selectedBackgroundColor: "#FF8831",
        selectionStyle: Titanium.UI.iOS.TableViewCellSelectionStyle.NONE,
        id: "__alloyId130"
    });
    $.__views.__alloyId123.add($.__views.__alloyId130);
    $.__views.__alloyId131 = Ti.UI.createView({
        left: 15,
        right: 15,
        top: 5,
        bottom: 5,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId131"
    });
    $.__views.__alloyId130.add($.__views.__alloyId131);
    $.__views.__alloyId132 = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "14"
        },
        left: 0,
        text: "Country",
        id: "__alloyId132"
    });
    $.__views.__alloyId131.add($.__views.__alloyId132);
    $.__views.countryVal = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "15"
        },
        left: 0,
        top: 5,
        color: "#4584B7",
        text: "India",
        id: "countryVal"
    });
    $.__views.__alloyId131.add($.__views.countryVal);
    $.__views.__alloyId133 = Ti.UI.createTableViewRow({
        width: "100%",
        backgroundColor: "white",
        selectedBackgroundColor: "#FF8831",
        selectionStyle: Titanium.UI.iOS.TableViewCellSelectionStyle.NONE,
        id: "__alloyId133"
    });
    $.__views.__alloyId123.add($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createView({
        left: 15,
        right: 15,
        top: 5,
        bottom: 5,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId134"
    });
    $.__views.__alloyId133.add($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "14"
        },
        left: 0,
        text: "Start Date",
        id: "__alloyId135"
    });
    $.__views.__alloyId134.add($.__views.__alloyId135);
    $.__views.startVal = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "15"
        },
        left: 0,
        top: 5,
        color: "#4584B7",
        text: "01-Feb-17",
        id: "startVal"
    });
    $.__views.__alloyId134.add($.__views.startVal);
    $.__views.__alloyId136 = Ti.UI.createTableViewRow({
        width: "100%",
        backgroundColor: "white",
        selectedBackgroundColor: "#FF8831",
        selectionStyle: Titanium.UI.iOS.TableViewCellSelectionStyle.NONE,
        id: "__alloyId136"
    });
    $.__views.__alloyId123.add($.__views.__alloyId136);
    $.__views.__alloyId137 = Ti.UI.createView({
        left: 15,
        right: 15,
        top: 5,
        bottom: 5,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId137"
    });
    $.__views.__alloyId136.add($.__views.__alloyId137);
    $.__views.__alloyId138 = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "14"
        },
        left: 0,
        text: "End Date",
        id: "__alloyId138"
    });
    $.__views.__alloyId137.add($.__views.__alloyId138);
    $.__views.endVal = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "15"
        },
        left: 0,
        top: 5,
        color: "#4584B7",
        text: "31-Mar-17",
        id: "endVal"
    });
    $.__views.__alloyId137.add($.__views.endVal);
    $.__views.__alloyId141 = Ti.UI.createView({
        backgroundColor: "#F0EFF5",
        height: 40,
        id: "__alloyId141"
    });
    $.__views.__alloyId142 = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontFamily: "calibril",
            fontWeight: "bold"
        },
        color: "#2E3C45",
        left: "15dp",
        bottom: "5dp",
        textAlign: "left",
        height: Ti.UI.SIZE,
        width: Titanium.UI.SIZE,
        text: "WHERE ARE YOU NOW?",
        id: "__alloyId142"
    });
    $.__views.__alloyId141.add($.__views.__alloyId142);
    $.__views.__alloyId139 = Ti.UI.createTableViewSection({
        headerView: $.__views.__alloyId141,
        id: "__alloyId139"
    });
    __alloyId122.push($.__views.__alloyId139);
    $.__views.__alloyId143 = Ti.UI.createTableViewRow({
        width: "100%",
        backgroundColor: "white",
        selectedBackgroundColor: "#FF8831",
        selectionStyle: Titanium.UI.iOS.TableViewCellSelectionStyle.NONE,
        hasChild: true,
        id: "__alloyId143"
    });
    $.__views.__alloyId139.add($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createView({
        left: 15,
        right: 45,
        top: 5,
        bottom: 5,
        height: 30,
        layout: "vertical",
        id: "__alloyId144"
    });
    $.__views.__alloyId143.add($.__views.__alloyId144);
    $.__views.currentCountryVal = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "15"
        },
        left: 0,
        top: 0,
        color: "#4584B7",
        text: "Phillipines",
        id: "currentCountryVal",
        height: "100%"
    });
    $.__views.__alloyId144.add($.__views.currentCountryVal);
    $.__views.countryLoadIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        width: 15,
        height: 15,
        id: "countryLoadIndicator",
        right: 15
    });
    $.__views.__alloyId143.add($.__views.countryLoadIndicator);
    $.__views.settingTable = Ti.UI.createTableView({
        backgroundColor: "#FFFFFF",
        separatorColor: "#C8C7CD",
        height: 382,
        top: 0,
        data: __alloyId122,
        headerView: $.__views.__alloyId120,
        id: "settingTable",
        scrollable: false,
        style: Titanium.UI.iOS.TableViewStyle.PLAIN
    });
    $.__views.settingScreen.add($.__views.settingTable);
    tableViewClicked ? $.addListener($.__views.settingTable, "click", tableViewClicked) : __defers["$.__views.settingTable!click!tableViewClicked"] = true;
    displayTableView ? $.addListener($.__views.settingTable, "postlayout", displayTableView) : __defers["$.__views.settingTable!postlayout!displayTableView"] = true;
    $.__views.pickerView = Ti.UI.createView({
        id: "pickerView",
        width: Ti.UI.FILL,
        height: 262,
        bottom: -262,
        layout: "vertical"
    });
    $.__views.settingScreen.add($.__views.pickerView);
    var __alloyId147 = [];
    $.__views.cancel = Ti.UI.createButton({
        color: "#3386b7",
        font: {
            fontWeight: "normal",
            fontSize: "17"
        },
        backgroundImage: "none",
        style: Titanium.UI.iOS.SystemButtonStyle.BORDERED,
        id: "cancel",
        systemButton: Ti.UI.iOS.SystemButton.CANCEL
    });
    __alloyId147.push($.__views.cancel);
    closePicker ? $.addListener($.__views.cancel, "click", closePicker) : __defers["$.__views.cancel!click!closePicker"] = true;
    $.__views.__alloyId148 = Ti.UI.createButton({
        systemButton: Ti.UI.iOS.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId147.push($.__views.__alloyId148);
    $.__views.done = Ti.UI.createButton({
        color: "#3386b7",
        font: {
            fontWeight: "normal",
            fontSize: "17"
        },
        backgroundImage: "none",
        style: Titanium.UI.iOS.SystemButtonStyle.BORDERED,
        id: "done",
        title: "Done",
        systemButton: Ti.UI.iOS.SystemButton.DONE
    });
    __alloyId147.push($.__views.done);
    closePicker ? $.addListener($.__views.done, "click", closePicker) : __defers["$.__views.done!click!closePicker"] = true;
    $.__views.__alloyId145 = Ti.UI.iOS.createToolbar({
        items: __alloyId147,
        barColor: "#f2f2f2",
        tintColor: "#3386b7",
        translucent: true,
        id: "__alloyId145"
    });
    $.__views.pickerView.add($.__views.__alloyId145);
    $.__views.countryPicker = Ti.UI.createPicker({
        id: "countryPicker",
        selectionIndicator: true,
        width: "100%"
    });
    $.__views.pickerView.add($.__views.countryPicker);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    var locationsList;
    var selectedIndex = 0;
    var dialog = Ti.UI.createAlertDialog({
        ok: 0,
        buttonNames: [ "Yes", "No" ],
        title: "VolunteerCare",
        message: "Are you sure, you want to logout?"
    });
    dialog.addEventListener("click", function(e) {
        if (e.index === e.source.ok) {
            var openLoginScreen = Alloy.createController("LoginScreen").getView();
            openLoginScreen.open();
            $.settingScreen.close();
            Alloy.Globals.MainTabGroup.close();
            setTimeout(function() {
                var user_id = Ti.App.Properties.getObject("userDetails").user.id;
                var url = Alloy.Globals.Constants.DOMAIN_URL + "logout";
                var param = {
                    authKey: "llB8eTk=oKtG",
                    app_version: Titanium.App.version,
                    user_id: user_id
                };
                Ti.API.info("url logout on Server : " + url);
                Ti.API.info("logout parameter: " + JSON.stringify(param));
                Alloy.Globals.Communicator.post(url, param, function(e) {
                    Ti.API.info("Response after post :  " + JSON.stringify(e));
                });
                Ti.App.Properties.setString("assignmentCode", null);
                Ti.App.Properties.setString("email", null);
                Ti.App.Properties.setString("userDOB", null);
                Ti.App.Properties.setString("lastSyncDateTime", null);
                Ti.App.Properties.setObject("userDetails", null);
                Ti.App.Properties.setInt("notificationCount", 0);
                Alloy.Globals.DbManager.cleanDatabase();
                Ti.UI.iPhone.setAppBadge(0);
            }, 300);
        }
    });
    __defers["$.__views.settingScreen!open!settingWindowOpened"] && $.addListener($.__views.settingScreen, "open", settingWindowOpened);
    __defers["$.__views.logoutBtn!click!logout"] && $.addListener($.__views.logoutBtn, "click", logout);
    __defers["$.__views.settingTable!click!tableViewClicked"] && $.addListener($.__views.settingTable, "click", tableViewClicked);
    __defers["$.__views.settingTable!postlayout!displayTableView"] && $.addListener($.__views.settingTable, "postlayout", displayTableView);
    __defers["$.__views.cancel!click!closePicker"] && $.addListener($.__views.cancel, "click", closePicker);
    __defers["$.__views.done!click!closePicker"] && $.addListener($.__views.done, "click", closePicker);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;