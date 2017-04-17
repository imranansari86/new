// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.versionLbl.text = "Version " + Titanium.App.version;

function gotoStore(e){
	if(OS_IOS){
		Ti.Platform.openURL("https://itunes.apple.com/us/app/volunteercare/id1193123288?ls=1&mt=8");
	}else{
		Ti.Platform.openURL("https://google.com");
	}
}

if(OS_ANDROID){
	$.updateWindow.addEventListener("android:back", function(e){
		
	});
}
