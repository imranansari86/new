// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var contact = $.args;
var sections = [];

var notificationV;
var notificationLblContactScreen;
if (OS_ANDROID) {
	// var outerBadgeView = Ti.UI.createView();
	// var bellIconImg = Ti.UI.createImageView({
	// image : "/images/bell.png"
	// });
	// var proxyView = Ti.UI.createView({
	// width : 40,
	// height : 20
	// });
	// notificationV = Ti.UI.createView({
	// width : 15,
	// height : 15,
	// top : 0,
	// right : 4,
	// backgroundColor : "#F6001E",
	// borderRadius : 3,
	// visible : false,
	// });
	// notificationLblContactScreen = Ti.UI.createLabel({
	// color : "white",
	// font : {
	// fontSize : 10
	// },
	// textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	// text : "1"
	// });
	// notificationV.add(notificationLblContactScreen);
	//
	// outerBadgeView.add(bellIconImg);
	// outerBadgeView.add(proxyView);
	// outerBadgeView.add(notificationV);
	// outerBadgeView.addEventListener('click', function(e) {
	// var NotificationScreen = Alloy.createController('NotificationScreen').getView();
	// NotificationScreen.open();
	// });

	$.contactDetailWindow.addEventListener('open', function() {
		var activity = $.contactDetailWindow.getActivity();
		var actionBar = $.contactDetailWindow.activity.actionBar;
		actionBar.title = 'Contact';
		actionBar.displayHomeAsUp = true;
		actionBar.onHomeIconItemSelected = function() {
			$.contactDetailWindow.close();
		};

		// activity.onCreateOptionsMenu = function(e) {
		//
		// var bell = e.menu.add({
		// actionView : outerBadgeView,
		// showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
		// icon : "/images/bell.png",
		// });
		//
		// var setting = e.menu.add({
		// showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
		// icon : "/images/settings.png",
		// });
		//
		// // bell.addEventListener("click", callBell);
		// setting.addEventListener("click", callSetting);
		// };
		// activity.invalidateOptionsMenu();

	});
}

try {
	if(contact.organisation_logo != null && contact.organisation_logo != ""){
		$.organizationImage.image = contact.organisation_logo;	
	}
	$.organizationName.text = contact.organisation_name;
	$.organizationBlurb.text = contact.organisation_blurb;
} catch(e) {

}

/*=======================================Organization details section========================================*/
var organizationSection = Ti.UI.createTableViewSection();
var organizationSectionHeaderView = Ti.UI.createView({
	height : 40
});
var organizationSectionHeaderLabel = Ti.UI.createLabel({
	font : {
		fontSize : '14dp',
		fontFamily : 'calibril',
		fontWeight : "bold"
	},
	color : '#2E3C45',
	bottom : 5,
	textAlign : "left",
	text : "ORGANISATION DETAILS",
	left : 15
});
var organizationHeaderDownArrow = Ti.UI.createImageView({
	image : "/images/down_arrow.png",
	right : 15,
	bottom : 7
});
organizationSectionHeaderView.add(organizationSectionHeaderLabel);
organizationSectionHeaderView.add(organizationHeaderDownArrow);
organizationSectionHeaderView.addEventListener('click', function() {
	if (OS_IOS) {
		$.table.insertSectionBefore(0, organizationCompactSection, {
			animated : false
		});
		$.table.deleteSection(1, {
			animated : false
		});
	} else {
		sections = [];
		sections.push(organizationCompactSection);
		sections.push(keyContactsSection);
		for (var i = 0; i < contactsSectionsArray.length; i++) {
			sections.push(contactsSectionsArray[i]);
		};
		$.table.sections = sections;
	}
});

organizationSection.headerView = organizationSectionHeaderView;

var phoneTVR = Ti.UI.createTableViewRow({
	backgroundColor : "white"
});
if (OS_IOS) {
	phoneTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
}
var phoneTVRView = Ti.UI.createView({
	left : 15,
	right : 15,
	top : 5,
	bottom : 5,
	text : contact.organisation_phone,
	height : Ti.UI.SIZE,
	layout : "vertical"
});
var phoneLbl = Ti.UI.createLabel({
	font : {
		fontFamily : 'calibril',
		fontSize : "14"
	},
	text : "Phone",
	left : 0
});
var phoneVal = Ti.UI.createLabel({
	font : {
		fontFamily : 'calibril',
		fontSize : "16"
	},
	text : contact.organisation_phone,
	left : 0,
	top : 5,
	color : "#4584B7"
});
phoneTVRView.add(phoneLbl);
phoneTVRView.add(phoneVal);
phoneTVR.add(phoneTVRView);
organizationSection.add(phoneTVR);
phoneTVR.addEventListener('click', function(e) {
	var numberIS = e.source.text;
	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['Call', 'Cancel', 'Message'],
		message : 'Do you want to make a Call or Message ?',
		title : L('app_name'),
	});
	dialog.addEventListener('click', function(e) {

		if (e.index === e.source.cancel) {
			Ti.API.info('The cancel button was clicked');
		} else if (e.index === 0) {
			Ti.Platform.openURL('tel:' + numberIS);
		} else if (e.index === 2) {
			Titanium.Platform.openURL('sms:' + numberIS);
		}
	});
	dialog.show();
});

var emailTVR = Ti.UI.createTableViewRow({
	backgroundColor : "white"
});
if (OS_IOS) {
	emailTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
}
var emailTVRView = Ti.UI.createView({
	left : 15,
	right : 15,
	top : 10,
	text : contact.organisation_email,
	bottom : 10,
	height : Ti.UI.SIZE,
	layout : "vertical"
});
var emailLbl = Ti.UI.createLabel({
	font : {
		fontFamily : 'calibril',
		fontSize : "13"
	},
	text : "Email",
	left : 0
});

var emailVal = Ti.UI.createLabel({
	font : {
		fontFamily : 'calibril',
		fontSize : "15"
	},
	text : contact.organisation_email,
	left : 0,
	top : 5,
	color : "#4584B7"
});
emailTVR.addEventListener('click', function(e) {
	var emailIS = e.source.text;
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Volunteer App";
	emailDialog.toRecipients = [emailIS];
	//emailDialog.messageBody = '<b>Write meesage..!</b>';
	emailDialog.open();
});
emailTVRView.add(emailLbl);
emailTVRView.add(emailVal);
emailTVR.add(emailTVRView);
organizationSection.add(emailTVR);

var addressTVR = Ti.UI.createTableViewRow({
	backgroundColor : "white"
});
if (OS_IOS) {
	addressTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
}
var addressTVRView = Ti.UI.createView({
	left : 15,
	right : 15,
	top : 10,
	bottom : 10,
	height : Ti.UI.SIZE,
	layout : "vertical"
});
var addressLbl = Ti.UI.createLabel({
	font : {
		fontFamily : 'calibril',
		fontSize : "13"
	},
	text : "Address",
	left : 0
});
var addressVal = Ti.UI.createLabel({
	font : {
		fontFamily : 'calibril',
		fontSize : "15"
	},
	text : contact.organisation_physical_address,
	left : 0,
	top : 5,
	color : "#4584B7"
});
// addressVal.addEventListener('click', function(e) {
// alert(e.source.text);
// Ti.Platform.openURL(e.source.text)
// });
addressTVRView.add(addressLbl);
addressTVRView.add(addressVal);
addressTVR.add(addressTVRView);
organizationSection.add(addressTVR);

var zipTVR = Ti.UI.createTableViewRow({
	backgroundColor : "white"
});
if (OS_IOS) {
	zipTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
}
var zipTVRView = Ti.UI.createView({
	left : 15,
	right : 15,
	top : 10,
	bottom : 10,
	height : Ti.UI.SIZE,
	layout : "vertical"
});
var zipLbl = Ti.UI.createLabel({
	font : {
		fontFamily : 'calibril',
		fontSize : "13"
	},
	text : "Zipcode",
	left : 0
});
var zipVal = Ti.UI.createLabel({
	font : {
		fontFamily : 'calibril',
		fontSize : "15"
	},
	text : contact.organisational_postal_address,
	left : 0,
	top : 5,
	color : "#4584B7"
});
// zipVal.addEventListener('click', function(e) {
// alert(e.source.text);
// Ti.Platform.openURL(e.source.text)
// });
zipTVRView.add(zipLbl);
zipTVRView.add(zipVal);
zipTVR.add(zipTVRView);
organizationSection.add(zipTVR);

var webTVR = Ti.UI.createTableViewRow({
	backgroundColor : "white"
});
if (OS_IOS) {
	webTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
}
var webTVRView = Ti.UI.createView({
	left : 15,
	right : 15,
	top : 10,
	bottom : 10,
	text : contact.organisation_web_address,
	height : Ti.UI.SIZE,
	layout : "vertical"
});
var webLbl = Ti.UI.createLabel({
	font : {
		fontFamily : 'calibril',
		fontSize : "13"
	},
	text : "Website",
	left : 0
});
var webVal = Ti.UI.createLabel({
	font : {
		fontFamily : 'calibril',
		fontSize : "15"
	},
	text : contact.organisation_web_address,
	left : 0,
	top : 5,
	color : "#4584B7"
});
webTVR.addEventListener('click', function(e) {
	var openUrlIS = e.source.text;
	Ti.Platform.openURL(openUrlIS);
});
webTVRView.add(webLbl);
webTVRView.add(webVal);
webTVR.add(webTVRView);
organizationSection.add(webTVR);

/*=======================================Organization compact section========================================*/
var organizationCompactSection = Ti.UI.createTableViewSection();
var organizationCompactSectionHeaderView = Ti.UI.createView({
	backgroundColor : "#ffffff",
	height : 40
});
var organizationCompactSectionHeaderLabel = Ti.UI.createLabel({
	font : {
		fontSize : '14dp',
		fontFamily : 'calibril',
		fontWeight : "bold"
	},
	color : '#2E3C45',
	textAlign : "left",
	text : "ORGANISATION DETAILS",
	left : 15
});
var organizationCompactHeaderDownArrow = Ti.UI.createImageView({
	image : "/images/down_arrow.png",
	right : 15
});
var organizationCompactHeaderTopLine = Ti.UI.createView({
	backgroundColor : "#C8C7CD",
	height : 0.5,
	top : 0
});
var organizationCompactHeaderBottomLine = Ti.UI.createView({
	backgroundColor : "#C8C7CD",
	height : 0.5,
	bottom : 0
});
organizationCompactSectionHeaderView.add(organizationCompactSectionHeaderLabel);
organizationCompactSectionHeaderView.add(organizationCompactHeaderDownArrow);
if (OS_IOS) {
	organizationCompactSectionHeaderView.add(organizationCompactHeaderTopLine);
	organizationCompactSectionHeaderView.add(organizationCompactHeaderBottomLine);
}
organizationCompactSectionHeaderView.addEventListener('click', function() {
	if (OS_IOS) {
		$.table.insertSectionBefore(0, organizationSection, {
			animated : false
		});
		$.table.deleteSection(1, {
			animated : false
		});
	} else {
		sections = [];
		sections.push(organizationSection);
		sections.push(keyContactsSection);
		for (var i = 0; i < contactsSectionsArray.length; i++) {
			sections.push(contactsSectionsArray[i]);
		};
		$.table.sections = sections;
	}
});
organizationCompactSection.headerView = organizationCompactSectionHeaderView;

/*===========================================================================================================*/

/*============================================Key contacts section===========================================*/

var keyContactsSection = Ti.UI.createTableViewSection();
var keyContactsSectionHeaderView = Ti.UI.createView({
	height : Ti.UI.SIZE
});
if(OS_ANDROID){
	keyContactsSectionHeaderView.height = 40;
}
var keyContactsSectionHeaderLabel = Ti.UI.createLabel({
	font : {
		fontSize : '14dp',
		fontFamily : 'calibril',
		fontWeight : "bold"
	},
	color : '#2E3C45',
	bottom : 5,
	textAlign : "left",
	left : 15,
	text : "Key Contacts",
});
keyContactsSectionHeaderView.add(keyContactsSectionHeaderLabel);
keyContactsSection.headerView = keyContactsSectionHeaderView;

var contactsSectionsArray = [];
if (contact.key_contacts.length == 0) {
	var noContactCompactSection = Ti.UI.createTableViewSection();
	var noContactCompactSectionHeaderView = Ti.UI.createView({
		backgroundColor : "#ffffff",
		height : 40
	});
	var noContactCompactSectionHeaderLabel = Ti.UI.createLabel({
		font : {
			fontSize : '14dp',
			fontFamily : 'calibril',
			fontWeight : "bold"
		},
		color : '#2E3C45',
		textAlign : "left",
		left : 15,
		text : "No Contacts Available"
	});
	var noContactCompactHeaderTopLine = Ti.UI.createView({
		backgroundColor : "#C8C7CD",
		height : 0.5,
		top : 0
	});
	var noContactCompactHeaderBottomLine = Ti.UI.createView({
		backgroundColor : "#C8C7CD",
		height : 0.5,
		bottom : 0
	});
	noContactCompactSectionHeaderView.add(noContactCompactSectionHeaderLabel);
	if (OS_IOS) {
		noContactCompactSectionHeaderView.add(noContactCompactHeaderTopLine);
		noContactCompactSectionHeaderView.add(noContactCompactHeaderBottomLine);
	}
	noContactCompactSection.headerView = noContactCompactSectionHeaderView;

	contactsSectionsArray.push(noContactCompactSection);
}
for (var i = 0; i < contact.key_contacts.length; i++) {
	var keyContact = contact.key_contacts[i];

	var contactCompactSection = Ti.UI.createTableViewSection();
	var contactCompactSectionHeaderView = Ti.UI.createView({
		backgroundColor : "#ffffff",
		height : 40
	});
	var contactCompactSectionHeaderLabel = Ti.UI.createLabel({
		font : {
			fontSize : '14dp',
			fontFamily : 'calibril',
			fontWeight : "bold"
		},
		color : '#2E3C45',
		textAlign : "left",
		left : 15,
		text : "CONTACT " + (i + 1)
	});
	var contactCompactHeaderDownArrow = Ti.UI.createImageView({
		image : "/images/down_arrow.png",
		right : 15
	});
	var contactCompactHeaderTopLine = Ti.UI.createView({
		backgroundColor : "#C8C7CD",
		height : 0.5,
		top : 0
	});
	var contactCompactHeaderBottomLine = Ti.UI.createView({
		backgroundColor : "#C8C7CD",
		height : 0.5,
		bottom : 0
	});
	contactCompactSectionHeaderView.add(contactCompactSectionHeaderLabel);
	contactCompactSectionHeaderView.add(contactCompactHeaderDownArrow);
	if (OS_IOS) {
		contactCompactSectionHeaderView.add(contactCompactHeaderTopLine);
		contactCompactSectionHeaderView.add(contactCompactHeaderBottomLine);
	}
	contactCompactSection.headerView = contactCompactSectionHeaderView;

	contactsSectionsArray.push(contactCompactSection);

	var contactSection = Ti.UI.createTableViewSection();
	var contactSectionHeaderView = Ti.UI.createView({
		height : 40
	});
	var contactSectionHeaderLabel = Ti.UI.createLabel({
		font : {
			fontSize : '14dp',
			fontFamily : 'calibril',
			fontWeight : "bold"
		},
		color : '#2E3C45',
		bottom : 5,
		textAlign : "left",
		left : 15,
		text : "CONTACT " + (i + 1)
	});
	var contactHeaderDownArrow = Ti.UI.createImageView({
		image : "/images/down_arrow.png",
		right : 15,
		bottom : 7
	});
	contactSectionHeaderView.add(contactSectionHeaderLabel);
	contactSectionHeaderView.add(contactHeaderDownArrow);
	contactSection.headerView = contactSectionHeaderView;

	var nameTVR = Ti.UI.createTableViewRow({
		backgroundColor : "white"
	});
	if (OS_IOS) {
		nameTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
	}
	var nameTVRView = Ti.UI.createView({
		left : 15,
		right : 15,
		top : 5,
		bottom : 5,
		height : Ti.UI.SIZE,
		layout : "vertical"
	});
	var nameLbl = Ti.UI.createLabel({
		font : {
			fontFamily : 'calibril',
			fontSize : "14"
		},
		text : "Full Name",
		left : 0
	});
	var nameVal = Ti.UI.createLabel({
		font : {
			fontFamily : 'calibril',
			fontSize : "16"
		},
		text : keyContact.contact_name,
		left : 0,
		top : 5,
		color : "#4584B7"
	});

	nameTVRView.add(nameLbl);
	nameTVRView.add(nameVal);
	nameTVR.add(nameTVRView);
	contactSection.add(nameTVR);

	var phoneTVR = Ti.UI.createTableViewRow({
		backgroundColor : "white"
	});
	if (OS_IOS) {
		phoneTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
	}
	var phoneTVRView = Ti.UI.createView({
		left : 15,
		right : 15,
		top : 5,
		bottom : 5,
		text : keyContact.contact_phone,
		height : Ti.UI.SIZE,
		layout : "vertical"
	});
	var phoneLbl = Ti.UI.createLabel({
		font : {
			fontFamily : 'calibril',
			fontSize : "14"
		},
		text : "Phone",
		left : 0
	});
	var phoneVal = Ti.UI.createLabel({
		font : {
			fontFamily : 'calibril',
			fontSize : "16"
		},
		text : keyContact.contact_phone,
		left : 0,
		top : 5,
		color : "#4584B7"
	});
	phoneTVR.addEventListener('click', function(e) {
		var numberIS = e.source.text;
		var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['Call', 'Cancel', 'Message'],
			message : 'Do you want to make a Call or Message ?',
			title : L('app_name'),
		});
		dialog.addEventListener('click', function(e) {
			if (e.index === e.source.cancel) {
				Ti.API.info('The cancel button was clicked');
			} else if (e.index === 0) {
				Ti.Platform.openURL('tel:' + numberIS);
			} else if (e.index === 2) {
				Titanium.Platform.openURL('sms:' + numberIS);
			}
		});
		dialog.show();
	});
	phoneTVRView.add(phoneLbl);
	phoneTVRView.add(phoneVal);
	phoneTVR.add(phoneTVRView);
	contactSection.add(phoneTVR);

	var emailTVR = Ti.UI.createTableViewRow({
		backgroundColor : "white"
	});
	if (OS_IOS) {
		emailTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
	}
	var emailTVRView = Ti.UI.createView({
		left : 15,
		right : 15,
		top : 10,
		bottom : 10,
		text : keyContact.contact_email,
		height : Ti.UI.SIZE,
		layout : "vertical"
	});
	var emailLbl = Ti.UI.createLabel({
		font : {
			fontFamily : 'calibril',
			fontSize : "13"
		},
		text : "Email",
		left : 0
	});
	var emailVal = Ti.UI.createLabel({
		font : {
			fontFamily : 'calibril',
			fontSize : "15"
		},
		text : keyContact.contact_email,
		left : 0,
		top : 5,
		color : "#4584B7"
	});
	emailTVR.addEventListener('click', function(e) {
		var emailIS = e.source.text;
		var emailDialog = Ti.UI.createEmailDialog();
		emailDialog.subject = "Volunteer App";
		emailDialog.toRecipients = [emailIS];
		//emailDialog.messageBody = '<b>Write meesage..!</b>';
		emailDialog.open();
	});
	emailTVRView.add(emailLbl);
	emailTVRView.add(emailVal);
	emailTVR.add(emailTVRView);
	contactSection.add(emailTVR);

	var addressTVR = Ti.UI.createTableViewRow({
		backgroundColor : "white"
	});
	if (OS_IOS) {
		addressTVR.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.GRAY;
	}
	var addressTVRView = Ti.UI.createView({
		left : 15,
		right : 15,
		top : 10,
		bottom : 10,
		height : Ti.UI.SIZE,
		layout : "vertical"
	});
	var addressLbl = Ti.UI.createLabel({
		font : {
			fontFamily : 'calibril',
			fontSize : "13"
		},
		text : "Address",
		left : 0
	});
	var addressVal = Ti.UI.createLabel({
		font : {
			fontFamily : 'calibril',
			fontSize : "15"
		},
		text : keyContact.physical_address,
		left : 0,
		top : 5,
		color : "#4584B7"
	});

	addressTVRView.add(addressLbl);
	addressTVRView.add(addressVal);
	addressTVR.add(addressTVRView);
	contactSection.add(addressTVR);

	contactCompactSectionHeaderView.fullSection = contactSection;
	contactCompactSectionHeaderView.index = i;
	contactSectionHeaderView.compactSection = contactCompactSection;
	contactSectionHeaderView.index = i;

	contactSectionHeaderView.addEventListener('click', function(e) {
		if (OS_IOS) {
			$.table.insertSectionBefore(e.source.index + 2, e.source.compactSection, {
				animated : false
			});
			$.table.deleteSection(e.source.index + 3, {
				animated : false
			});
		} else {
			Ti.API.info("e.source.index = " + e.source.index);

			sections = [];
			sections.push(organizationCompactSection);
			sections.push(keyContactsSection);
			for (var i = 0; i < contactsSectionsArray.length; i++) {
				if (i == e.source.index) {
					sections.push(e.source.compactSection);
				} else {
					sections.push(contactsSectionsArray[i]);
				}
			};
			$.table.sections = sections;
		}
	});

	contactCompactSectionHeaderView.addEventListener('click', function(e) {
		if (OS_IOS) {
			$.table.insertSectionBefore(e.source.index + 2, e.source.fullSection, {
				animated : false
			});
			$.table.deleteSection(e.source.index + 3, {
				animated : false
			});
		} else {
			Ti.API.info("e.source.index = " + e.source.index);

			sections = [];
			sections.push(organizationCompactSection);
			sections.push(keyContactsSection);
			for (var i = 0; i < contactsSectionsArray.length; i++) {
				if (i == e.source.index) {
					sections.push(e.source.fullSection);
				} else {
					sections.push(contactsSectionsArray[i]);
				}
			};
			$.table.sections = sections;
		}
	});
}

function updateNotificationCount() {
	var notificationCount = Ti.App.Properties.getInt('notificationCount');
	if (OS_IOS) {
		if (notificationCount && notificationCount > 0) {
			$.notificationLbl.text = notificationCount + "";
			$.notificationV.visible = true;
		} else {
			$.notificationV.visible = false;
			$.notificationLbl.text = 0 + "";
		}
	}
}

if (OS_IOS) {
	Ti.App.addEventListener("notificationupdate", updateNotificationCount);
	updateNotificationCount();
}

function openSettingScreen() {
	var openGuideInfo = Alloy.createController("SettingScreen").getView();
	if (OS_IOS) {
		Alloy.Globals.contactNavWin.openWindow(openGuideInfo);
	}
}

function openNotificationScreen() {
	var notificationScreen = Alloy.createController("NotificationScreen").getView();
	if (OS_IOS) {
		notificationScreen.open();
	}
}

function removeSection(e) {
	Ti.API.info("expandSection");
	$.table.insertSectionBefore(0, organizationCompactSection, {
		animated : false
	});
	$.table.deleteSection(1, {
		animated : false
	});
}

function displayTableView() {
	setTimeout(function(e) {
		sections = [];
		sections.push(organizationCompactSection);
		sections.push(keyContactsSection);
		for (var i = 0; i < contactsSectionsArray.length; i++) {
			sections.push(contactsSectionsArray[i]);
		};
		$.table.sections = sections;
		$.table.visible = true;
	}, 10);
}

if (OS_ANDROID) {
	sections = [];
	sections.push(organizationCompactSection);
	sections.push(keyContactsSection);
	for (var i = 0; i < contactsSectionsArray.length; i++) {
		sections.push(contactsSectionsArray[i]);
	};
	$.table.sections = sections;
}

// function addSection(e) {
// Ti.API.info("expandSection");
// $.table.deleteSection(0);
// $.table.insertSectionBefore(0, $.organizationSection);
// }

if (OS_IOS && Alloy.Globals.notificationNavWindow != null) {
	$.settingBtn.visible = false;
	$.notificationBtn.visible = false;
	$.notificationV.visible = false;
}

$.contactDetailWindow.addEventListener('close', function(e) {
	Ti.App.removeEventListener("notificationupdate", updateNotificationCount);
});
