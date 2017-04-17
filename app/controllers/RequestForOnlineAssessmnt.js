// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function backtoScreen() {
	var parentView = $.requestForOnlineAssist.parent;
	parentView.remove($.requestForOnlineAssist);
}

var dataIs;
function openClickAssist(e) {
	if (e.source.titleid == "yes") {
		dataIs = {
			event : L("yes")
		};
	} else if (e.source.titleid == "no") {
		dataIs = {
			event : L("no")
		};
	} else if (e.source.titleid == "maybe") {
		dataIs = {
			event : L("maybe")
		};
	}
	var OnclickAssitScreen = Alloy.createController('OnclickOnlineAssist', dataIs).getView();
	$.requestForOnlineAssist.add(OnclickAssitScreen);
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
