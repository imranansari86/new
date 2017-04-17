/**
 * Communicator.js
 *
 * This file handles all the complexity related to network communication. It connects to the server and returns the response.
 * It also checks for the internet connection, errors in response and handles them gracefully.
 */
var Communicator = {};
/**
 * This is a generic function for performing POST requests
 */
exports.post = function(url, data, callback) {
	if (Titanium.Network.online) {
		// Create an HTTPClient.
		var httpClient = Ti.Network.createHTTPClient();
		httpClient.setTimeout(20000);

		// Define the callback.
		httpClient.onload = function(e) {

			Ti.API.info('*****************web service response - timestamp: ' + new Date() + '*********************');
			if (e.success) {
				if (this.status == 200) {

					if (this.responseText != null && this.responseText.trim().length > 0) {
						var responseData = JSON.parse(this.responseText);
						if (responseData.response_code == "2") {
							var result = {};
							result.success = false;
							result.message = "This version of VolunteerCare app is expired. Go to app store and download the latest version";
							callback(result);
							
							var appUpdateWin = Alloy.createController("AppUpdateScreen").getView();
							appUpdateWin.open();
						} else {
							var result = {};
							result.success = true;
							result.response = this.responseText;
							callback(result);
						}
					} else {
						var result = {};
						result.success = false;
						var MSG_NO_DATA = Alloy.Globals.Constants.MSG_NO_DATA;
						result.message = MSG_NO_DATA;
						callback(result);
					}
				} else {
					var result = {};
					result.success = false;
					var MSG_STATUS_CODE = Alloy.Globals.Constants.MSG_STATUS_CODE;
					result.message = MSG_STATUS_CODE + this.status;
					callback(result);
				}
			} else {
				var result = {};
				result.success = false;
				result.message = e.error;
				callback(result);
			}
		};
		httpClient.onerror = function(e) {
			var result = {};
			result.success = false;
			Ti.API.info('e.error ' + e.error);
			if (e.error == 'HTTP error') {
				result.message = Alloy.Globals.Constants.UNABLE_TO_CONNECT;
			} else {
				result.message = e.error;
			}
			callback(result);
		};

		// Send the request data.
		try {
			httpClient.open('POST', url);
			httpClient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

			Ti.API.info('*****************web service call - timestamp: ' + new Date() + '*********************');

			httpClient.send(data);
		} catch(e) {
			Alloy.Globals.toast(e.message);
		}

	} else {

		var result = {};
		result.success = false;
		var MSG_NO_NETWORK = Alloy.Globals.Constants.MSG_NO_NETWORK;
		result.message = MSG_NO_NETWORK;
		callback(result);

	}
};

/**
 * This is a generic function for performing POST requests (Multi Part Header Request)
 */
exports.postProfileImage = function(url, data, ProfileImage, callback) {
	if (Titanium.Network.online) {
		// Create an HTTPClient.
		var httpClient = Ti.Network.createHTTPClient();
		httpClient.setTimeout(10000);

		// Define the callback.
		httpClient.onload = function(e) {
			Ti.API.info('*****************web service response - timestamp: ' + new Date() + '*********************');
			if (e.success) {
				if (this.status == 200) {

					if (this.responseText != null && this.responseText.trim().length > 0) {
						var result = {};
						result.success = true;
						result.response = this.responseText;
						callback(result);
					} else {
						var result = {};
						result.success = false;
						var MSG_NO_DATA = Alloy.Globals.Constants.MSG_NO_DATA;
						result.message = MSG_NO_DATA;
						callback(result);
					}
				} else {
					var result = {};
					result.success = false;
					var MSG_STATUS_CODE = Alloy.Globals.Constants.MSG_STATUS_CODE;
					result.message = MSG_STATUS_CODE + this.status;
					callback(result);
				}
			} else {
				var result = {};
				result.success = false;
				result.message = e.error;
				callback(result);
			}
		};
		httpClient.onerror = function(e) {
			var result = {};
			result.success = false;
			Ti.API.info('e.error ' + e.error);
			if (e.error == 'HTTP error') {
				result.message = Alloy.Globals.Constants.UNABLE_TO_CONNECT;
			} else {
				result.message = e.error;
			}
			callback(result);
		};

		// Send the request data.
		try {
			httpClient.open('POST', url);

			Ti.API.info('*****************web service call - timestamp: ' + new Date() + '*********************');

			httpClient.send({
				LoginToken : data.LoginToken,
				FirstName : data.FirstName,
				LastName : data.LastName,
				Mobile : data.Mobile,
				DealershipId : data.DealershipId,
				CalendarReminderSetting : data.CalendarReminderSetting,
				Image : ProfileImage,
			});
		} catch(e) {
			Alloy.Globals.toast(e.message);
		}

	} else {

		var result = {};
		result.success = false;
		var MSG_NO_NETWORK = Alloy.Globals.Constants.MSG_NO_NETWORK;
		result.message = MSG_NO_NETWORK;
		callback(result);
	}
};

exports.postLeadData = function(url, data, ProfileImage, callback) {
	if (Titanium.Network.online) {
		// Create an HTTPClient.
		var httpClient = Ti.Network.createHTTPClient();
		httpClient.setTimeout(10000);

		// Define the callback.
		httpClient.onload = function(e) {
			Ti.API.info('*****************web service response - timestamp: ' + new Date() + '*********************');

			if (e.success) {
				if (this.status == 200) {

					if (this.responseText != null && this.responseText.trim().length > 0) {
						var result = {};
						result.success = true;
						result.response = this.responseText;
						callback(result);
					} else {
						var result = {};
						result.success = false;
						var MSG_NO_DATA = Alloy.Globals.Constants.MSG_NO_DATA;
						result.message = MSG_NO_DATA;
						callback(result);
					}
				} else {
					var result = {};
					result.success = false;
					var MSG_STATUS_CODE = Alloy.Globals.Constants.MSG_STATUS_CODE;
					result.message = MSG_STATUS_CODE + this.status;
					callback(result);
				}
			} else {
				var result = {};
				result.success = false;
				result.message = e.error;
				callback(result);
			}
		};
		httpClient.onerror = function(e) {
			var result = {};
			result.success = false;
			Ti.API.info('e.error ' + e.error);
			if (e.error == 'HTTP error') {
				result.message = Alloy.Globals.Constants.UNABLE_TO_CONNECT;
			} else {
				result.message = e.error;
			}
			callback(result);
		};

		// Send the request data.
		try {
			httpClient.open('POST', url);

			Ti.API.info('*****************web service call - timestamp: ' + new Date() + '*********************');

			httpClient.send({
				LoginToken : data.LoginToken,
				FirstName : data.FirstName,
				LastName : data.LastName,
				Email : data.Email,
				//VehicleId : data.VehicleId,
				//Make : data.make,
				//Model : data.model,
				PostCode : data.PostCode,
				Mobile : data.Mobile,
				LeadId : data.LeadId,
				Image : ProfileImage,
				DealershipId : data.selectedDealer,
				ServiceCustomer : data.serviceUser,
				ValidPhone : data.validPhone,
				ValidEmail : data.validEmail,
			});
		} catch(e) {
			Alloy.Globals.toast(e.message);
		}

	} else {

		var result = {};
		result.success = false;
		var MSG_NO_NETWORK = Alloy.Globals.Constants.MSG_NO_NETWORK;
		result.message = MSG_NO_NETWORK;
		callback(result);

	}
};

exports.postImages = function(url, data, postImage, callback) {
	if (Titanium.Network.online) {
		// Create an HTTPClient.
		var httpClient = Ti.Network.createHTTPClient();
		httpClient.setTimeout(10000);

		// Define the callback.
		httpClient.onload = function(e) {
			Ti.API.info('*****************web service response - timestamp: ' + new Date() + '*********************');
			if (e.success) {
				if (this.status == 200) {

					if (this.responseText != null && this.responseText.trim().length > 0) {
						var responseData = JSON.parse(this.responseText);
						if (responseData.response_code == "2") {
							var result = {};
							result.success = false;
							result.message = "This version of VolunteerCare app is expired. Go to app store and download the latest version";
							callback(result);
						} else {
							var result = {};
							result.success = true;
							result.response = this.responseText;
							callback(result);
						}
					} else {
						var result = {};
						result.success = false;
						var MSG_NO_DATA = Alloy.Globals.Constants.MSG_NO_DATA;
						result.message = MSG_NO_DATA;
						callback(result);
					}
				} else {
					var result = {};
					result.success = false;
					var MSG_STATUS_CODE = Alloy.Globals.Constants.MSG_STATUS_CODE;
					result.message = MSG_STATUS_CODE + this.status;
					callback(result);
				}
			} else {
				var result = {};
				result.success = false;
				result.message = e.error;
				callback(result);
			}
		};
		httpClient.onerror = function(e) {
			var result = {};
			result.success = false;
			Ti.API.info('e.error ' + e.error);
			if (e.error == 'HTTP error') {
				result.message = Alloy.Globals.Constants.UNABLE_TO_CONNECT;
			} else {
				result.message = e.error;
			}
			callback(result);
		};

		// Send the request data.
		try {
			httpClient.open('POST', url);

			Ti.API.info('*****************web service call - timestamp: ' + new Date() + '*********************');

			httpClient.send({
				LoginToken : data.LoginToken,
				VehicleId : data.vehicleID,
				Type : data.Type,
				VehicleEvaluationId : data.evalID,
				Image : postImage,
			});
		} catch(e) {
			Alloy.Globals.toast(e.message);
		}

	} else {

		var result = {};
		result.success = false;
		var MSG_NO_NETWORK = Alloy.Globals.Constants.MSG_NO_NETWORK;
		result.message = MSG_NO_NETWORK;
		callback(result);

	}
};

