var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.iPhoneFour = true && "iphone" == Ti.Platform.osname && 480 == Ti.Platform.displayCaps.platformHeight;

Alloy.Globals.iPhoneFive = true && "iphone" == Ti.Platform.osname && 568 == Ti.Platform.displayCaps.platformHeight;

Alloy.Globals.iPhoneSixPlus = true && "iphone" == Ti.Platform.osname && 736 == Ti.Platform.displayCaps.platformHeight;

Alloy.Globals.iPhoneSix = true && "iphone" == Ti.Platform.osname && 667 == Ti.Platform.displayCaps.platformHeight;

Alloy.Globals.LoadingScreen = Alloy.createWidget("Loader").getView();

Alloy.Globals.Constants = require("./Constant");

Alloy.Globals.Communicator = require("./Communicator");

Alloy.Globals.DbManager = require("./DbManager");

Alloy.Globals.venderUserName = "cdnsol";

Alloy.Globals.vendorPassword = "meHcdjQDOvYEhJyx0yikFJUl";

Alloy.Globals.deviceToken = null;

Alloy.Globals.questionNumber = 1;

Alloy.Globals.loginType;

Alloy.Globals.checkemail = function(emailAddress) {
    Ti.API.info("in check mail " + emailAddress);
    var str = emailAddress;
    var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    testresults = filter.test(str) ? true : false;
    return testresults;
};

Alloy.Globals.GetDataFromSyn = function() {
    try {
        Ti.API.info("Call from index , backgroun and after a 10 seconds time interval");
        var url = Alloy.Globals.Constants.DOMAIN_URL + "getWebserviceUpdate";
        var userId = Ti.App.Properties.getObject("userDetails").user.id;
        var param = {
            authKey: "llB8eTk=oKtG",
            app_version: Titanium.App.version,
            user_id: userId
        };
        if (null != Ti.App.Properties.getString("lastSyncDateTime")) {
            Ti.API.info("rest of the time");
            param.last_sync_time = Ti.App.Properties.getString("lastSyncDateTime");
        } else {
            var dateTime = new Date();
            var year = dateTime.getFullYear();
            var month = dateTime.getMonth() + 1;
            var day = dateTime.getDate();
            var hour = dateTime.getHours();
            var minute = dateTime.getMinutes();
            var second = dateTime.getSeconds();
            var finalDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
            Ti.API.info("date Time : " + finalDate);
            param.last_sync_time = finalDate;
        }
        Ti.API.info("url get on Server : " + url);
        Ti.API.info("sync parameter: " + JSON.stringify(param));
        Alloy.Globals.Communicator.post(url, param, function(e) {
            try {
                if (e.success) {
                    var responseData = JSON.parse(e.response);
                    Ti.API.info("responseData :  " + JSON.stringify(responseData));
                    if ("true" == responseData.status) {
                        Ti.API.info("responseData data : " + responseData.data);
                        var allData = responseData.data;
                        if (null != Ti.App.Properties.getString("lastSyncDateTime")) {
                            if ("" != allData.guides && allData.guides.length > 0) {
                                Alloy.Globals.DbManager.Save_GuideAllList(allData.guides);
                                Ti.API.info("Call Data By fire Event");
                                Ti.App.fireEvent("dataUpdatedGuide", null);
                            }
                            if ("" != allData.tips && allData.tips.length > 0) {
                                Alloy.Globals.DbManager.Save_TipsAllList(allData.tips);
                                Ti.API.info("Call Data By fire Event");
                                Ti.App.fireEvent("dataUpdatedTips", null);
                            }
                            if ("" != allData.contacts && allData.contacts.length > 0) {
                                Alloy.Globals.DbManager.Save_ContactsAllList(allData.contacts);
                                Ti.API.info("Call Data By fire Event");
                                Ti.App.fireEvent("dataUpdatedContacts", null);
                            }
                            if ("" != allData.categories && allData.categories.length > 0) {
                                Alloy.Globals.DbManager.Save_CategoriesAllList(allData.categories);
                                Ti.API.info("Call Data By fire Event");
                                Ti.App.fireEvent("dataUpdatedTips", null);
                            }
                            if ("" != allData.locations && allData.locations.length > 0) {
                                Alloy.Globals.DbManager.Save_LocationAllList(allData.locations);
                                Ti.API.info("Call Data By fire Event");
                                Ti.App.fireEvent("dataUpdatedLocation", null);
                            }
                            if (allData.user) {
                                Ti.API.info("Call Data By fire Event");
                                Ti.App.Properties.setString("currentCountry", allData.user.country);
                                Ti.App.Properties.setString("currentCountryId", allData.user.location_id);
                            }
                            if ("" != allData.guide_updated && allData.guide_updated.length > 0) {
                                Alloy.Globals.DbManager.deleteGarbageGuides(allData.guide_updated);
                                Ti.API.info("Call Data By fire Event");
                                Ti.App.fireEvent("dataUpdatedGuide", null);
                            }
                            if ("" != allData.contacts_updated && allData.contacts_updated.length > 0) {
                                Alloy.Globals.DbManager.deleteGarbageContacts(allData.contacts_updated);
                                Ti.API.info("Call Data By fire Event");
                                Ti.App.fireEvent("dataUpdatedContacts", null);
                            }
                            if ("" != allData.tips_updated && allData.tips_updated.length > 0) {
                                Alloy.Globals.DbManager.deleteGarbageTips(allData.tips_updated);
                                Ti.API.info("Call Data By fire Event");
                                Ti.App.fireEvent("dataUpdatedTips", null);
                            }
                        }
                        var last_sync_time = allData.last_sync_time;
                        Ti.API.info("last_sync_time :" + last_sync_time);
                        Ti.App.Properties.setString("lastSyncDateTime", last_sync_time);
                    } else "false" == responseData.status;
                }
            } catch (e) {
                Ti.API.info("in catch Guide screen" + JSON.stringify(e));
            }
        });
    } catch (e) {
        Ti.API.info("inside catch : line no 161");
    }
};

Alloy.Globals.notificationV;

Alloy.Globals.notificationLbl;

Alloy.createController("index");