// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function backtoScreen() {
	var parentView = $.contractByPsychologist.parent;
	parentView.remove($.contractByPsychologist);
}
var dataIs;
function getDetail(e) {
	
		if (e.source.titleid == "yes") {
		dataIs = {
			event : L("yes")
		};
	} else if (e.source.titleid == "no") {
		dataIs = {
			event : L("no")
		};
	}
	var PhysoContactScreen = Alloy.createController('PsychologistContactDetails',dataIs).getView();
	$.contractByPsychologist.add(PhysoContactScreen);
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
