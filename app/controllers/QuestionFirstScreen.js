// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
function backtoPrevious() {
	$.questionScreen.close();
}

$.firstBtn.addEventListener('touchstart', function(e) {
	$.firstBtn.backgroundColor = "#69b086";
});
$.firstBtn.addEventListener('touchend', function(e) {
	$.firstBtn.backgroundColor = "#3386b7";
});
if (Alloy.Globals.questionNumber == 1) {
	$.questionLable.text = L('firstQuestion_title');
	$.questiontitleId.text = L('fistBtn_title');
	$.questiondescription.text = L('firstAnser_text');
	$.additionalContent.visible = false;
} else if (Alloy.Globals.questionNumber == 2) {
	$.questionLable.text = L('firstQuestion_title');
	$.questiontitleId.text = L('secondBtn_title');
	$.questiondescription.text = L('secondAnswer_text');
	$.additionalContent.visible = false;
} else if (Alloy.Globals.questionNumber == 3) {
	$.questionLable.text = L('firstQuestion_title');
	$.questiontitleId.text = L('thirdBtn_title');
	$.questiondescription.text = L('thirdAnswer_text');
	$.additionalContent.text = L('additional_content');
	$.additionalContent.visible = true;
}
function backtoScreen() {
	Ti.API.info('inside back to screen ');
	var parentView = $.questionfirstScreen.parent;
	Ti.API.info('parentView = : ' + parentView.id);
	parentView.remove($.questionfirstScreen);
}

function openPhyso() {
	var PhysoScreen = Alloy.createController('ContractedByPsychogist').getView();
	$.questionfirstScreen.add(PhysoScreen);
}

function openWebLink(e) {
	Ti.API.info('open link is ' + JSON.stringify(e));
	 Ti.Platform.openURL(e.source.text);
}
