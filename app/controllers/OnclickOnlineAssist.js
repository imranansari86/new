// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
Ti.API.info('args' + JSON.stringify(args));
Ti.API.info('args evnt' + args.event);

	$.headingLbl.text = args.event;
if (args.event == "Yes") {
	$.detail.text = L("online_self_assesment_label_YES");
	$.questionNoTitle.text = L("question2Of3");
	$.selfAssesLink.visible = true;
} else if (args.event == "No") {
	$.detail.text = L("online_self_assesment_label_No");
	$.questionNoTitle.text = L("question2Of3");
	$.selfAssesLink.visible = false;
} else if (args.event == "Maybe") {
	$.detail.text = L("online_self_assesment_label_Maybe");
	$.questionNoTitle.text = L("question3Of3");
	$.selfAssesLink.visible = false;
}

function backtoScreen() {
	var parentView = $.onClickOnlineAsst.parent;
	parentView.remove($.onClickOnlineAsst);
}

function openFinishAsst() {
	var OpenFinishScreen = Alloy.createController('FinishMentalAssest').getView();
	if (OS_IOS)
		Alloy.Globals.questionScreen.navWindow.openWindow(OpenFinishScreen);
	if (OS_ANDROID)
		OpenFinishScreen.open();
		
	setTimeout(function(){
		if(OS_IOS){
			Alloy.Globals.questionScreen.navWindow.closeWindow(Alloy.Globals.questionScreen);	
		}else{
			Alloy.Globals.questionScreen.close();
		}
	}, 100);
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

function openWebLink(e) {
	Ti.API.info('open link is ' + JSON.stringify(e));
	 Ti.Platform.openURL(e.source.text);
}

