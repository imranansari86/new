function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
    function openSettingScreen() {
        var openGuideInfo = Alloy.createController("SettingScreen").getView();
        Alloy.Globals.contactNavWin.openWindow(openGuideInfo);
    }
    function openNotificationScreen() {
        var notificationScreen = Alloy.createController("NotificationScreen").getView();
        notificationScreen.open();
    }
    function displayTableView() {
        setTimeout(function() {
            sections = [];
            sections.push(organizationCompactSection);
            sections.push(keyContactsSection);
            for (var i = 0; i < contactsSectionsArray.length; i++) sections.push(contactsSectionsArray[i]);
            $.table.sections = sections;
            $.table.visible = true;
        }, 10);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ContactDetailScreen";
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
    $.__views.contactDetailWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        titleAttributes: {
            color: "#fff",
            font: {
                fontFamily: "SourceSansPro-Semibold",
                fontSize: "18"
            }
        },
        id: "contactDetailWindow",
        titleid: "contact_detail_title",
        backButtonTitle: "",
        navTintColor: "#fff",
        barColor: "#3386b7"
    });
    $.__views.contactDetailWindow && $.addTopLevelView($.__views.contactDetailWindow);
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId13"
    });
    $.__views.__alloyId14 = Ti.UI.createView({
        width: 40,
        height: 40,
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.notificationBtn = Ti.UI.createButton({
        id: "notificationBtn",
        width: 40,
        height: 40,
        backgroundImage: "none",
        image: "/images/bell.png"
    });
    $.__views.__alloyId14.add($.__views.notificationBtn);
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
    $.__views.__alloyId14.add($.__views.notificationV);
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
    $.__views.__alloyId13.add($.__views.settingBtn);
    openSettingScreen ? $.addListener($.__views.settingBtn, "click", openSettingScreen) : __defers["$.__views.settingBtn!click!openSettingScreen"] = true;
    $.__views.contactDetailWindow.rightNavButton = $.__views.__alloyId13;
    $.__views.__alloyId16 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId16"
    });
    $.__views.organizationImage = Ti.UI.createImageView({
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: "#4584B7",
        preventDefaultImage: "true",
        top: 20,
        id: "organizationImage",
        image: "/images/placeholder.jpg"
    });
    $.__views.__alloyId16.add($.__views.organizationImage);
    $.__views.organizationName = Ti.UI.createLabel({
        color: "#4584B7",
        font: {
            fontFamily: "SourceSansPro-Semibold",
            fontSize: "15"
        },
        top: 10,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "CDN Solutions Group",
        id: "organizationName"
    });
    $.__views.__alloyId16.add($.__views.organizationName);
    $.__views.organizationBlurb = Ti.UI.createLabel({
        color: "#6C6D72",
        font: {
            fontFamily: "SourceSansPro-Semibold",
            fontSize: "13"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Consistently delivering quality solutions",
        id: "organizationBlurb"
    });
    $.__views.__alloyId16.add($.__views.organizationBlurb);
    $.__views.__alloyId17 = Ti.UI.createView({
        backgroundColor: "#C8C7CD",
        height: .5,
        width: "100%",
        top: 20,
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.table = Ti.UI.createTableView({
        backgroundColor: "#F0EFF5",
        separatorColor: "#C8C7CD",
        height: "100%",
        top: 0,
        headerView: $.__views.__alloyId16,
        id: "table",
        visible: false,
        style: Titanium.UI.iOS.TableViewStyle.GROUPED
    });
    $.__views.contactDetailWindow.add($.__views.table);
    displayTableView ? $.addListener($.__views.table, "postlayout", displayTableView) : __defers["$.__views.table!postlayout!displayTableView"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var contact = $.args;
    var sections = [];
    try {
        null != contact.organisation_logo && "" != contact.organisation_logo && ($.organizationImage.image = contact.organisation_logo);
        $.organizationName.text = contact.organisation_name;
        $.organizationBlurb.text = contact.organisation_blurb;
    } catch (e) {}
    var organizationSection = Ti.UI.createTableViewSection();
    var organizationSectionHeaderView = Ti.UI.createView({
        height: 40
    });
    var organizationSectionHeaderLabel = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontFamily: "calibril",
            fontWeight: "bold"
        },
        color: "#2E3C45",
        bottom: 5,
        textAlign: "left",
        text: "ORGANISATION DETAILS",
        left: 15
    });
    var organizationHeaderDownArrow = Ti.UI.createImageView({
        image: "/images/down_arrow.png",
        right: 15,
        bottom: 7
    });
    organizationSectionHeaderView.add(organizationSectionHeaderLabel);
    organizationSectionHeaderView.add(organizationHeaderDownArrow);
    organizationSectionHeaderView.addEventListener("click", function() {
        $.table.insertSectionBefore(0, organizationCompactSection, {
            animated: false
        });
        $.table.deleteSection(1, {
            animated: false
        });
    });
    organizationSection.headerView = organizationSectionHeaderView;
    var phoneTVR = Ti.UI.createTableViewRow({
        backgroundColor: "white"
    });
    phoneTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
    var phoneTVRView = Ti.UI.createView({
        left: 15,
        right: 15,
        top: 5,
        bottom: 5,
        text: contact.organisation_phone,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    var phoneLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "14"
        },
        text: "Phone",
        left: 0
    });
    var phoneVal = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "16"
        },
        text: contact.organisation_phone,
        left: 0,
        top: 5,
        color: "#4584B7"
    });
    phoneTVRView.add(phoneLbl);
    phoneTVRView.add(phoneVal);
    phoneTVR.add(phoneTVRView);
    organizationSection.add(phoneTVR);
    phoneTVR.addEventListener("click", function(e) {
        var numberIS = e.source.text;
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: [ "Call", "Cancel", "Message" ],
            message: "Do you want to make a Call or Message ?",
            title: L("app_name")
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel ? Ti.API.info("The cancel button was clicked") : 0 === e.index ? Ti.Platform.openURL("tel:" + numberIS) : 2 === e.index && Titanium.Platform.openURL("sms:" + numberIS);
        });
        dialog.show();
    });
    var emailTVR = Ti.UI.createTableViewRow({
        backgroundColor: "white"
    });
    emailTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
    var emailTVRView = Ti.UI.createView({
        left: 15,
        right: 15,
        top: 10,
        text: contact.organisation_email,
        bottom: 10,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    var emailLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "13"
        },
        text: "Email",
        left: 0
    });
    var emailVal = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "15"
        },
        text: contact.organisation_email,
        left: 0,
        top: 5,
        color: "#4584B7"
    });
    emailTVR.addEventListener("click", function(e) {
        var emailIS = e.source.text;
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Volunteer App";
        emailDialog.toRecipients = [ emailIS ];
        emailDialog.open();
    });
    emailTVRView.add(emailLbl);
    emailTVRView.add(emailVal);
    emailTVR.add(emailTVRView);
    organizationSection.add(emailTVR);
    var addressTVR = Ti.UI.createTableViewRow({
        backgroundColor: "white"
    });
    addressTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
    var addressTVRView = Ti.UI.createView({
        left: 15,
        right: 15,
        top: 10,
        bottom: 10,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    var addressLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "13"
        },
        text: "Address",
        left: 0
    });
    var addressVal = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "15"
        },
        text: contact.organisation_physical_address,
        left: 0,
        top: 5,
        color: "#4584B7"
    });
    addressTVRView.add(addressLbl);
    addressTVRView.add(addressVal);
    addressTVR.add(addressTVRView);
    organizationSection.add(addressTVR);
    var zipTVR = Ti.UI.createTableViewRow({
        backgroundColor: "white"
    });
    zipTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
    var zipTVRView = Ti.UI.createView({
        left: 15,
        right: 15,
        top: 10,
        bottom: 10,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    var zipLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "13"
        },
        text: "Zipcode",
        left: 0
    });
    var zipVal = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "15"
        },
        text: contact.organisational_postal_address,
        left: 0,
        top: 5,
        color: "#4584B7"
    });
    zipTVRView.add(zipLbl);
    zipTVRView.add(zipVal);
    zipTVR.add(zipTVRView);
    organizationSection.add(zipTVR);
    var webTVR = Ti.UI.createTableViewRow({
        backgroundColor: "white"
    });
    webTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
    var webTVRView = Ti.UI.createView({
        left: 15,
        right: 15,
        top: 10,
        bottom: 10,
        text: contact.organisation_web_address,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    var webLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "13"
        },
        text: "Website",
        left: 0
    });
    var webVal = Ti.UI.createLabel({
        font: {
            fontFamily: "calibril",
            fontSize: "15"
        },
        text: contact.organisation_web_address,
        left: 0,
        top: 5,
        color: "#4584B7"
    });
    webTVR.addEventListener("click", function(e) {
        var openUrlIS = e.source.text;
        Ti.Platform.openURL(openUrlIS);
    });
    webTVRView.add(webLbl);
    webTVRView.add(webVal);
    webTVR.add(webTVRView);
    organizationSection.add(webTVR);
    var organizationCompactSection = Ti.UI.createTableViewSection();
    var organizationCompactSectionHeaderView = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: 40
    });
    var organizationCompactSectionHeaderLabel = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontFamily: "calibril",
            fontWeight: "bold"
        },
        color: "#2E3C45",
        textAlign: "left",
        text: "ORGANISATION DETAILS",
        left: 15
    });
    var organizationCompactHeaderDownArrow = Ti.UI.createImageView({
        image: "/images/down_arrow.png",
        right: 15
    });
    var organizationCompactHeaderTopLine = Ti.UI.createView({
        backgroundColor: "#C8C7CD",
        height: .5,
        top: 0
    });
    var organizationCompactHeaderBottomLine = Ti.UI.createView({
        backgroundColor: "#C8C7CD",
        height: .5,
        bottom: 0
    });
    organizationCompactSectionHeaderView.add(organizationCompactSectionHeaderLabel);
    organizationCompactSectionHeaderView.add(organizationCompactHeaderDownArrow);
    organizationCompactSectionHeaderView.add(organizationCompactHeaderTopLine);
    organizationCompactSectionHeaderView.add(organizationCompactHeaderBottomLine);
    organizationCompactSectionHeaderView.addEventListener("click", function() {
        $.table.insertSectionBefore(0, organizationSection, {
            animated: false
        });
        $.table.deleteSection(1, {
            animated: false
        });
    });
    organizationCompactSection.headerView = organizationCompactSectionHeaderView;
    var keyContactsSection = Ti.UI.createTableViewSection();
    var keyContactsSectionHeaderView = Ti.UI.createView({
        height: Ti.UI.SIZE
    });
    var keyContactsSectionHeaderLabel = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontFamily: "calibril",
            fontWeight: "bold"
        },
        color: "#2E3C45",
        bottom: 5,
        textAlign: "left",
        left: 15,
        text: "Key Contacts"
    });
    keyContactsSectionHeaderView.add(keyContactsSectionHeaderLabel);
    keyContactsSection.headerView = keyContactsSectionHeaderView;
    var contactsSectionsArray = [];
    if (0 == contact.key_contacts.length) {
        var noContactCompactSection = Ti.UI.createTableViewSection();
        var noContactCompactSectionHeaderView = Ti.UI.createView({
            backgroundColor: "#ffffff",
            height: 40
        });
        var noContactCompactSectionHeaderLabel = Ti.UI.createLabel({
            font: {
                fontSize: "14dp",
                fontFamily: "calibril",
                fontWeight: "bold"
            },
            color: "#2E3C45",
            textAlign: "left",
            left: 15,
            text: "No Contacts Available"
        });
        var noContactCompactHeaderTopLine = Ti.UI.createView({
            backgroundColor: "#C8C7CD",
            height: .5,
            top: 0
        });
        var noContactCompactHeaderBottomLine = Ti.UI.createView({
            backgroundColor: "#C8C7CD",
            height: .5,
            bottom: 0
        });
        noContactCompactSectionHeaderView.add(noContactCompactSectionHeaderLabel);
        noContactCompactSectionHeaderView.add(noContactCompactHeaderTopLine);
        noContactCompactSectionHeaderView.add(noContactCompactHeaderBottomLine);
        noContactCompactSection.headerView = noContactCompactSectionHeaderView;
        contactsSectionsArray.push(noContactCompactSection);
    }
    for (var i = 0; i < contact.key_contacts.length; i++) {
        var keyContact = contact.key_contacts[i];
        var contactCompactSection = Ti.UI.createTableViewSection();
        var contactCompactSectionHeaderView = Ti.UI.createView({
            backgroundColor: "#ffffff",
            height: 40
        });
        var contactCompactSectionHeaderLabel = Ti.UI.createLabel({
            font: {
                fontSize: "14dp",
                fontFamily: "calibril",
                fontWeight: "bold"
            },
            color: "#2E3C45",
            textAlign: "left",
            left: 15,
            text: "CONTACT " + (i + 1)
        });
        var contactCompactHeaderDownArrow = Ti.UI.createImageView({
            image: "/images/down_arrow.png",
            right: 15
        });
        var contactCompactHeaderTopLine = Ti.UI.createView({
            backgroundColor: "#C8C7CD",
            height: .5,
            top: 0
        });
        var contactCompactHeaderBottomLine = Ti.UI.createView({
            backgroundColor: "#C8C7CD",
            height: .5,
            bottom: 0
        });
        contactCompactSectionHeaderView.add(contactCompactSectionHeaderLabel);
        contactCompactSectionHeaderView.add(contactCompactHeaderDownArrow);
        contactCompactSectionHeaderView.add(contactCompactHeaderTopLine);
        contactCompactSectionHeaderView.add(contactCompactHeaderBottomLine);
        contactCompactSection.headerView = contactCompactSectionHeaderView;
        contactsSectionsArray.push(contactCompactSection);
        var contactSection = Ti.UI.createTableViewSection();
        var contactSectionHeaderView = Ti.UI.createView({
            height: 40
        });
        var contactSectionHeaderLabel = Ti.UI.createLabel({
            font: {
                fontSize: "14dp",
                fontFamily: "calibril",
                fontWeight: "bold"
            },
            color: "#2E3C45",
            bottom: 5,
            textAlign: "left",
            left: 15,
            text: "CONTACT " + (i + 1)
        });
        var contactHeaderDownArrow = Ti.UI.createImageView({
            image: "/images/down_arrow.png",
            right: 15,
            bottom: 7
        });
        contactSectionHeaderView.add(contactSectionHeaderLabel);
        contactSectionHeaderView.add(contactHeaderDownArrow);
        contactSection.headerView = contactSectionHeaderView;
        var nameTVR = Ti.UI.createTableViewRow({
            backgroundColor: "white"
        });
        nameTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
        var nameTVRView = Ti.UI.createView({
            left: 15,
            right: 15,
            top: 5,
            bottom: 5,
            height: Ti.UI.SIZE,
            layout: "vertical"
        });
        var nameLbl = Ti.UI.createLabel({
            font: {
                fontFamily: "calibril",
                fontSize: "14"
            },
            text: "Full Name",
            left: 0
        });
        var nameVal = Ti.UI.createLabel({
            font: {
                fontFamily: "calibril",
                fontSize: "16"
            },
            text: keyContact.contact_name,
            left: 0,
            top: 5,
            color: "#4584B7"
        });
        nameTVRView.add(nameLbl);
        nameTVRView.add(nameVal);
        nameTVR.add(nameTVRView);
        contactSection.add(nameTVR);
        var phoneTVR = Ti.UI.createTableViewRow({
            backgroundColor: "white"
        });
        phoneTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
        var phoneTVRView = Ti.UI.createView({
            left: 15,
            right: 15,
            top: 5,
            bottom: 5,
            text: keyContact.contact_phone,
            height: Ti.UI.SIZE,
            layout: "vertical"
        });
        var phoneLbl = Ti.UI.createLabel({
            font: {
                fontFamily: "calibril",
                fontSize: "14"
            },
            text: "Phone",
            left: 0
        });
        var phoneVal = Ti.UI.createLabel({
            font: {
                fontFamily: "calibril",
                fontSize: "16"
            },
            text: keyContact.contact_phone,
            left: 0,
            top: 5,
            color: "#4584B7"
        });
        phoneTVR.addEventListener("click", function(e) {
            var numberIS = e.source.text;
            var dialog = Ti.UI.createAlertDialog({
                cancel: 1,
                buttonNames: [ "Call", "Cancel", "Message" ],
                message: "Do you want to make a Call or Message ?",
                title: L("app_name")
            });
            dialog.addEventListener("click", function(e) {
                e.index === e.source.cancel ? Ti.API.info("The cancel button was clicked") : 0 === e.index ? Ti.Platform.openURL("tel:" + numberIS) : 2 === e.index && Titanium.Platform.openURL("sms:" + numberIS);
            });
            dialog.show();
        });
        phoneTVRView.add(phoneLbl);
        phoneTVRView.add(phoneVal);
        phoneTVR.add(phoneTVRView);
        contactSection.add(phoneTVR);
        var emailTVR = Ti.UI.createTableViewRow({
            backgroundColor: "white"
        });
        emailTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
        var emailTVRView = Ti.UI.createView({
            left: 15,
            right: 15,
            top: 10,
            bottom: 10,
            text: keyContact.contact_email,
            height: Ti.UI.SIZE,
            layout: "vertical"
        });
        var emailLbl = Ti.UI.createLabel({
            font: {
                fontFamily: "calibril",
                fontSize: "13"
            },
            text: "Email",
            left: 0
        });
        var emailVal = Ti.UI.createLabel({
            font: {
                fontFamily: "calibril",
                fontSize: "15"
            },
            text: keyContact.contact_email,
            left: 0,
            top: 5,
            color: "#4584B7"
        });
        emailTVR.addEventListener("click", function(e) {
            var emailIS = e.source.text;
            var emailDialog = Ti.UI.createEmailDialog();
            emailDialog.subject = "Volunteer App";
            emailDialog.toRecipients = [ emailIS ];
            emailDialog.open();
        });
        emailTVRView.add(emailLbl);
        emailTVRView.add(emailVal);
        emailTVR.add(emailTVRView);
        contactSection.add(emailTVR);
        var addressTVR = Ti.UI.createTableViewRow({
            backgroundColor: "white"
        });
        addressTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
        var addressTVRView = Ti.UI.createView({
            left: 15,
            right: 15,
            top: 10,
            bottom: 10,
            height: Ti.UI.SIZE,
            layout: "vertical"
        });
        var addressLbl = Ti.UI.createLabel({
            font: {
                fontFamily: "calibril",
                fontSize: "13"
            },
            text: "Address",
            left: 0
        });
        var addressVal = Ti.UI.createLabel({
            font: {
                fontFamily: "calibril",
                fontSize: "15"
            },
            text: keyContact.physical_address,
            left: 0,
            top: 5,
            color: "#4584B7"
        });
        addressTVRView.add(addressLbl);
        addressTVRView.add(addressVal);
        addressTVR.add(addressTVRView);
        contactSection.add(addressTVR);
        contactCompactSectionHeaderView.fullSection = contactSection;
        contactCompactSectionHeaderView.index = i;
        contactSectionHeaderView.compactSection = contactCompactSection;
        contactSectionHeaderView.index = i;
        contactSectionHeaderView.addEventListener("click", function(e) {
            $.table.insertSectionBefore(e.source.index + 2, e.source.compactSection, {
                animated: false
            });
            $.table.deleteSection(e.source.index + 3, {
                animated: false
            });
        });
        contactCompactSectionHeaderView.addEventListener("click", function(e) {
            $.table.insertSectionBefore(e.source.index + 2, e.source.fullSection, {
                animated: false
            });
            $.table.deleteSection(e.source.index + 3, {
                animated: false
            });
        });
    }
    Ti.App.addEventListener("notificationupdate", updateNotificationCount);
    updateNotificationCount();
    var i;
    if (true && null != Alloy.Globals.notificationNavWindow) {
        $.settingBtn.visible = false;
        $.notificationBtn.visible = false;
        $.notificationV.visible = false;
    }
    $.contactDetailWindow.addEventListener("close", function() {
        Ti.App.removeEventListener("notificationupdate", updateNotificationCount);
    });
    __defers["$.__views.notificationBtn!click!openNotificationScreen"] && $.addListener($.__views.notificationBtn, "click", openNotificationScreen);
    __defers["$.__views.notificationV!click!openNotificationScreen"] && $.addListener($.__views.notificationV, "click", openNotificationScreen);
    __defers["$.__views.settingBtn!click!openSettingScreen"] && $.addListener($.__views.settingBtn, "click", openSettingScreen);
    __defers["$.__views.table!postlayout!displayTableView"] && $.addListener($.__views.table, "postlayout", displayTableView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;