// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.tipsNavWin = $.tipsNavWin;
var categoriesList = [];
var featuredTipsList = [];

if (OS_ANDROID) {
	$.tipsWindow.addEventListener("focus", function(e) {
		if (Alloy.Globals.searchMenuItem) {
			Alloy.Globals.searchMenuItem.visible = false;
		}
	});
	$.tipsWindow.addEventListener("open", function(e) {
		setTimeout(function() {
			fetchTips();
		}, 300);
	});
}

function getTipsBySingleApi() {
	Alloy.Globals.LoadingScreen.open();
	var url = Alloy.Globals.Constants.DOMAIN_URL + 'getFeaturedTipWithCategoryLists';
	var lastId = "";
	var userId = Ti.App.Properties.getObject("userDetails").user.id;
	var param = {
		'authKey' : 'llB8eTk=oKtG',
		'app_version' : Titanium.App.version,
		'user_id' : userId
		//'max_id' : lastId
	};
	Ti.API.info('url Tips listing : ' + url);
	Ti.API.info('Tips parameters : ' + JSON.stringify(param));

	Alloy.Globals.Communicator.post(url, param, function(e) {

		Ti.API.info('Response after post Tips :  ' + JSON.stringify(e));
		try {
			if (e.success) {
				var responseData = JSON.parse(e.response);
				if (responseData.status == "true") {
					Ti.API.info('data of tips : ' + JSON.stringify(responseData.data));
					var categoriesList = responseData.data.categories;
					var featuredTipsList = responseData.data.featuredTips;
					Ti.API.info("categoriesList.length = " + categoriesList.length);
					Ti.API.info("featuredTipsList.length = " + featuredTipsList.length);

					if (categoriesList.length > 0 || featuredTipsList.length > 0) {
						$.noResultLbl.visible = false;
						$.tipsListNotificationTable.visible = true;
						showTipsList(categoriesList, featuredTipsList);
						if (categoriesList.length > 0) {
							Alloy.Globals.DbManager.Save_CategoriesAllList(categoriesList);
						}
						if (featuredTipsList.length > 0) {
							Alloy.Globals.DbManager.Save_TipsAllList(featuredTipsList);
							var abcfeaturedTipsList = Alloy.Globals.DbManager.Get_FeaturedtipsAllList();
							Ti.API.info('get Data from featured Tips:' + JSON.stringify(abcfeaturedTipsList));
						}
					} else {
						$.noResultLbl.text = L('noResultfound');
						$.noResultLbl.visible = true;
						$.tipsListNotificationTable.visible = false;
					}
					Ti.API.info("responseData.total_records = " + responseData.total_records);

				} else if (responseData.status == "false") {
					$.noResultLbl.text = L('some_error');
					$.noResultLbl.visible = true;
				} else {
					$.noResultLbl.text = L('some_error');
					$.noResultLbl.visible = true;
				}
			} else {
				$.noResultLbl.text = L('some_error');
				$.noResultLbl.visible = true;
			}
		} catch(e) {
			$.noResultLbl.text = L('some_error');
			$.noResultLbl.visible = true;
		}
		isLoading = false;
		Alloy.Globals.LoadingScreen.close();
	});
}

showTipsList = function(categoriesList, featuredTipsList) {
	Ti.API.info('' + JSON.stringify(categoriesList) + "....featured : " + JSON.stringify(featuredTipsList));
	var sections = [];
	if (categoriesList.length > 0 || featuredTipsList.length > 0) {
		$.noResultLbl.visible = false;
		$.tipsListNotificationTable.visible = true;
		var headerView = Ti.UI.createView({
			backgroundColor : "#F0EFF5",
			height : "40dp",
		});
		var headerTitle = Ti.UI.createLabel({
			font : {
				fontSize : '14dp',
				fontFamily : 'calibril',
				fontWeight : "bold"
			},
			color : '#2E3C45',
			left : "15dp",
			bottom : "5dp",
			text : L('headerFirst_title'),
			textAlign : "left"
		});
		headerView.add(headerTitle);
		var headerView2 = Ti.UI.createView({
			backgroundColor : "#F0EFF5",
			height : "40dp",
		});
		var headerTitle2 = Ti.UI.createLabel({
			font : {
				fontSize : '14dp',
				fontFamily : 'calibril',
				fontWeight : "bold"
			},
			color : '#2E3C45',
			left : "15dp",
			bottom : "5dp",
			text : L('headerSecond_title'),
			textAlign : "left"
		});
		headerView2.add(headerTitle2);

		var sectionFeaturedTipsList = Ti.UI.createTableViewSection({
			headerView : headerView,

		});
		var sectionCategoriesList = Ti.UI.createTableViewSection({
			headerView : headerView2,
		});

		//Featured Sections...
		if (featuredTipsList.length > 0) {
			var featuredRow = Ti.UI.createTableViewRow({
				backgroundColor : "transparent",
				selectedColor : "transparent",
				section1 : "first",
				backgroundSelectedColor : "#D9D9D9"
				//zIndex : 1,
				//detail : categoriesList[i],
			});

			var featuredTipsScrollableView = Ti.UI.createScrollableView({
				left : 0,
				right : 0,
				height : 150,
				// overlayEnabled : true,
				// currentPageIndicatorColor : "#3386b7",
				// pageIndicatorColor : "#fff",
				// pagingControlColor : "transparent",
				// showPagingControl : true,
				// backgroundColor : "#fff",
			});
			if (OS_IOS) {
				featuredTipsScrollableView.overlayEnabled = true;
				featuredTipsScrollableView.currentPageIndicatorColor = "#3386b7";
				featuredTipsScrollableView.pageIndicatorColor = "#ffffff";
				featuredTipsScrollableView.pagingControlColor = "transparent";
				featuredTipsScrollableView.showPagingControl = true;
			}
			var imageArr = [];
			for (var i = 0; i < featuredTipsList.length; i++) {
				Ti.API.info('Hello' + i);
				//	if (featuredTipsList[i].is_featured == 1) {
				var BaseView = Ti.UI.createView({
					backgroundColor : "transparent",
					height : '150dp',
					backgroundColor : "white",
					top : 0,
					width : Ti.UI.FILL,
				});

				var imageView = Ti.UI.createImageView({
					image : featuredTipsList[i].tip_banner,
					// height : Ti.UI.FILL,
					width : Ti.UI.FILL,
					index : i,
					touchEnabled : true,
					top : 0,
					detail : featuredTipsList[i],
					//zIndex:0,
				});
				if (OS_IOS) {
					imageView.height = Ti.UI.FILL;
				}

				imageView.addEventListener('click', function(e) {
					Ti.API.info('On click of imageView : ' + JSON.stringify(e));
					var TipsInfoScreen = Alloy.createController("TipsInfoScreen", e.source.detail).getView();
					if (OS_IOS) {
						Alloy.Globals.tipsNavWin.openWindow(TipsInfoScreen);
					} else if (OS_ANDROID) {
						TipsInfoScreen.open();
					}
				});
				var labelView = Ti.UI.createView({
					backgroundColor : "#66000000",
					height : '30dp',
					top : 0,
					width : Ti.UI.FILL,
				});
				var featuredListTitleLbl = Ti.UI.createLabel({
					textAlign : 'left',
					color : "#fff",
					top : 0,
					text : featuredTipsList[i].list_title,
					height : 30,
					width : "95%",
					font : {
						fontSize : 14,
						fontFamily : 'calibril',
					}
				});
				BaseView.add(imageView);
				BaseView.add(labelView);
				BaseView.add(featuredListTitleLbl);
				imageArr.push(BaseView);
				//	}
			}

			if (OS_IOS) {
				featuredTipsScrollableView.views = imageArr;
			} else {
				//featuredTipsScrollableView.layout = 'horizontal';
				Ti.API.info('imageArr .count ' + imageArr.length);
				for (var i = 0; i < imageArr.length; i++) {
					featuredTipsScrollableView.addView(imageArr[i]);
				};
			}

			featuredRow.add(featuredTipsScrollableView);
			sectionFeaturedTipsList.add(featuredRow);
		} else {
			var nofeaturedRow = Ti.UI.createTableViewRow({
				backgroundColor : "white",
				selectedColor : "transparent",
				touchEnabled : false,
				height : 150,
				section1 : "first",
				backgroundSelectedColor : "white"
			});
			var nofeaturedTipTitleLbl = Ti.UI.createLabel({
				textAlign : 'center',
				color : '#BDBDBD',
				text : L('nofeaturedTipsListAvailable'),
				height : 25,
				font : {
					fontSize : 12,
					fontFamily : 'calibril',
				},
				touchEnabled : false,
			});

			nofeaturedRow.addEventListener('click', function(e) {
				//Nothing to do when click of No featured found
			});

			nofeaturedRow.add(nofeaturedTipTitleLbl);
			sectionFeaturedTipsList.add(nofeaturedRow);
		}
		if (categoriesList.length > 0) {
			for (var i = 0; i < categoriesList.length; i++) {

				var categoriesRow = Ti.UI.createTableViewRow({
					backgroundColor : "#fff",
					category_id : categoriesList[i].category_id,
					detail : categoriesList[i],
					height: 40,
					title : categoriesList[i].name,
					color : "transparent",
					layout : "horizontal",
					selectedColor : "transparent",
					section1 : "second",
					backgroundSelectedColor : "#D9D9D9"
				});

				var leftImage = Ti.UI.createImageView({
					image : categoriesList[i].image,
					height : 20,
					top: 10,
					width : 20,
					left : 20,
				});
				var categoriesTitleLbl = Ti.UI.createLabel({
					left : 15,
					top: 11,
					color : '#2E3C45',
					text : categoriesList[i].name,
					height : 18,
					font : {
						fontSize : 15,
						fontFamily : 'calibril',
					}
				});
				if (OS_IOS)
					categoriesTitleLbl.right = 20;
				if (OS_ANDROID) {
					categoriesTitleLbl.width = "75%";
				}
				categoriesRow.add(leftImage);
				categoriesRow.add(categoriesTitleLbl);
				sectionCategoriesList.add(categoriesRow);
				if (OS_IOS) {
					categoriesRow.hasChild = true;
				} else if (OS_ANDROID) {
					var rightArrow = Ti.UI.createImageView({
						height : 13,
						top: 13.5,
						left : "15dp",
						image : "/images/right_arrow_2.png"
					});
					categoriesRow.add(rightArrow);
				}
			}
		} else {
			var nocategoriesRow = Ti.UI.createTableViewRow({
				backgroundColor : "#ffffff",
				selectedColor : "transparent",
				touchEnabled : false,
				section1 : "first",
				height: 40,
				backgroundSelectedColor : "white"
			});
			var nocategoriesTitleLbl = Ti.UI.createLabel({
				textAlign : 'center',
				color : '#BDBDBD',
				text : L('noCategoriesTipsListAvailable'),
				height : 25,
				top: 7.5,
				font : {
					fontSize : 12,
					fontFamily : 'calibril',
				},
				touchEnabled : false,
			});
			nocategoriesRow.addEventListener('click', function(e) {
				//Nothing to do when click of No category found
			});
			nocategoriesRow.add(nocategoriesTitleLbl);

			sectionCategoriesList.add(nocategoriesRow);
		}

		sections.push(sectionFeaturedTipsList);
		sections.push(sectionCategoriesList);

		$.tipsListNotificationTable.setData(sections);

	} else {
		$.noResultLbl.text = L('noResultfound');
		$.noResultLbl.visible = true;
		$.tipsListNotificationTable.visible = false;
	}
};

// Get Data from Database...

function fetchTips() {
	featuredTipsList = Alloy.Globals.DbManager.Get_FeaturedtipsAllList();
	categoriesList = Alloy.Globals.DbManager.Get_categoriesAllList();
	Ti.API.info('featuredTipsList :' + JSON.stringify(featuredTipsList));
	if (featuredTipsList.length > 0 || categoriesList.length > 0) {
		Ti.API.info('show list when DB has data');
		showTipsList(categoriesList, featuredTipsList);
	} else {
		Ti.API.info('show list when DB blank');
		getTipsBySingleApi();
	}
}

if (OS_IOS) {
	fetchTips();
}

Ti.App.addEventListener('dataUpdatedTips', function(e) {
	Ti.API.info('Call Fire Event On tips category Or FeaturedTips Screen');
	featuredTipsList = Alloy.Globals.DbManager.Get_FeaturedtipsAllList();
	categoriesList = Alloy.Globals.DbManager.Get_categoriesAllList();
	
	Ti.API.info("featuredTipsList length: " + featuredTipsList.length);
	Ti.API.info("categoriesList length: " + categoriesList.length);
	
	// if (featuredTipsList.length > 0 || categoriesList.length > 0) {
	showTipsList(categoriesList, featuredTipsList);
	// }
});

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

function openCategoriesWiseScreen(e) {
	Ti.API.info('categoreis :  ' + JSON.stringify(e));
	if (e.row.section1 == "first") {
		//Nothing to do on click of page indicator...
	} else {
		var CategoryWiseListScreen = Alloy.createController("CategoryWiseListScreen", e.row.detail).getView();
		if (OS_IOS) {
			Alloy.Globals.tipsNavWin.openWindow(CategoryWiseListScreen);
		} else if (OS_ANDROID) {
			CategoryWiseListScreen.open();
		}
	}

}

function openSettingScreen() {
	var SettingScreen = Alloy.createController("SettingScreen").getView();
	if (OS_IOS) {
		Alloy.Globals.tipsNavWin.openWindow(SettingScreen);
	} else if (OS_ANDROID) {
		SettingScreen.open();
	}
}

function openNotificationScreen() {
	var notificationScreen = Alloy.createController("NotificationScreen").getView();
	if (OS_IOS) {
		notificationScreen.open();
	} else if (OS_ANDROID) {
		notificationScreen.open();
	}
}

// $.tipsWindow.addEventListener('blur', function(e) {
// Ti.App.removeEventListener("notificationupdate", updateNotificationCount);
// });
//
// if (OS_IOS) {
// $.tipsWindow.addEventListener('focus', function(e) {
// Ti.App.addEventListener("notificationupdate", updateNotificationCount);
// });
// }
