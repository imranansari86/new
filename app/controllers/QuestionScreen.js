// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
function backtoPrevious() {
	if(OS_IOS){
		args.navWindow.closeWindow($.questionScreen);
	}else{
		$.questionScreen.close();
	}
}

Alloy.Globals.questionScreen = $.questionScreen;
Alloy.Globals.questionScreen.navWindow = args.navWindow;
/*
 * Button hover on click..
 */
$.firstBtn.addEventListener('touchstart', function(e) {
	$.firstBtn.backgroundColor = "#69b086";
	Alloy.Globals.questionNumber = 1;
	// setTimeout(function() {
	// $.firstBtn.backgroundColor = "#3386b7";
	// }, 800);
});
$.secondBtn.addEventListener('touchstart', function(e) {
	$.secondBtn.backgroundColor = "#69b086";
	Alloy.Globals.questionNumber = 2;

});
$.thirdBtn.addEventListener('touchstart', function(e) {
	$.thirdBtn.backgroundColor = "#69b086";
	Alloy.Globals.questionNumber = 3;
});

$.firstBtn.addEventListener('touchend', function(e) {
	$.firstBtn.backgroundColor = "#3386b7";
	var questionfirstScreen = Alloy.createController('QuestionFirstScreen').getView();
	$.questionScreen.add(questionfirstScreen);

});
$.secondBtn.addEventListener('touchend', function(e) {
	$.secondBtn.backgroundColor = "#3386b7";
	var questionfirstScreen = Alloy.createController('QuestionFirstScreen').getView();
	$.questionScreen.add(questionfirstScreen);
});
$.thirdBtn.addEventListener('touchend', function(e) {
	$.thirdBtn.backgroundColor = "#3386b7";
	var questionfirstScreen = Alloy.createController('QuestionFirstScreen').getView();
	$.questionScreen.add(questionfirstScreen);
});

myAlert = Ti.UI.createAlertDialog({
	cancel : 1,
	buttonNames : ['Confirm', 'Cancel'],
	message : L("survey_cancel_msg"),
	title : 'Volunteer Care'
});
myAlert.addEventListener('click', function(e) {
	if (e.index != "1")
		backtoPrevious();

});
if (OS_ANDROID) {
	var activity = $.questionScreen.activity;

activity.onCreateOptionsMenu = function(e) {
	var menu = e.menu;
	var menuItem = menu.add({
		title : "Cancel",
		showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	});
	menuItem.addEventListener("click", function(e) {
		myAlert.show();
	});
};

	$.questionScreen.addEventListener('android:back', function(e) {
	});
}
