// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
Ti.API.info('args ' + JSON.stringify(args));
function backtoScreen() {
	var parentView = $.PsychologistContactDetails.parent;
	parentView.remove($.PsychologistContactDetails);
}

$.headingLbl.text = args.event;
if (args.event == "Yes") {
	$.detail.text = L("PsychologistPoints");
} else if (args.event == "No") {
	$.detail.text = L("PsychologistPoints_No");
}

function openOnlineAsst() {
	var onlineAsstScreen = Alloy.createController('RequestForOnlineAssessmnt').getView();
	$.PsychologistContactDetails.add(onlineAsstScreen);
}

function dailNumber(e) {
	var numberIS = e.source.text;
	Ti.Platform.openURL('tel:' + numberIS);
}

function openEmail(e) {
	var emailIS = e.source.text;
	// Ti.Platform.openURL('tel:' + numberIS);
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Volunteer App";
	emailDialog.toRecipients = [emailIS];
	//emailDialog.messageBody = '<b>Write meesage..!</b>';
	emailDialog.open();
}

/*
 * touch start end function
 */
function touchStart(e) {
	e.source.backgroundColor = "#69b086";

}

function touchEnd(e) {
	e.source.backgroundColor = "#3386b7";
}

/*
 * dial number
 */

function dailNumber(e) {
	var numberIS = e.source.text;
	Ti.Platform.openURL('tel:' + numberIS);
}

function openEmail(e) {
	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.subject = "I want to contact my Psychologist";
	emailDialog.toRecipients = ['example@gmail.com'];
	emailDialog.open();
}
