// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function FinishAssesment(e) {
	if (OS_IOS)
		$.finishOnlineAssest.close();
	if (OS_ANDROID)
		$.finishOnlineAssest.close();
}

if (OS_ANDROID) {
	$.finishOnlineAssest.addEventListener('android:back', function(e) {
		Ti.API.info('inside back button');
	});
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

function openInBrowser(e) {
	var openLink = e.source.text;
	var result = Ti.Platform.openURL(openLink);
}
