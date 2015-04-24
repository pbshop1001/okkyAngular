/*
* This controller is for authorization for google file picker
* */

'use strict';

angular.module('d2l')
	.factory('GDriveSelectResult', GDriveSelectResult)
	.controller('GDriveFilePickerController', GDriveFilePicker);

// Communicating between controller and Picker
function GDriveSelectResult(){
	var selectedDocs={id:''};
	return selectedDocs;
}


function GDriveFilePicker($scope, Googledrive, configGdrive, GDriveSelectResult) {
	$scope.isAuth = true;
	$scope.docs = [];

	$scope.setupPicker = function() {

		function pickerCallback(data) {
			if(data.action == google.picker.Action.PICKED){
				//do something
				//console.log(data);
				$scope.files = data.docs;
				$scope.arrive = true;
				GDriveSelectResult.id = data.docs[0].id;
				$scope.$emit('handleEmit', {message: GDriveSelectResult.id});
			}else if(data.action ==google.picker.Action.CANCEL){
			}
		}
		Googledrive.setupPicker(accessToken, pickerCallback);
	}



	$scope.authName = 'Authorization';
	$scope.googleDrive={info:'gDriveCtrl'};
	$scope.openMenu = true;

	$scope.hideResult = function(){
		var target = $('.listFolder');
		TweenLite.to(target, 0.5, {autoAlpha: 0, display:'none'})
	};
	$scope.showResult = function(){
		var target = $('.listFolder')
		TweenLite.to(target, 0.5, {autoAlpha: 1, display:'block'})
	};

	$scope.plusTest = function(){
		var promise = Googledrive.plusTest();
		promise.then(
			function(result){
				//    console.log('service is done')
				$scope.gPlus = result;
				$scope.$digest();
			}
		)
	}

	$scope.listingFolderInfo = function(){
		$scope.gDocs = 'dd';
		console.log('gDriveDashCtrl');
		var promise = Googledrive.listFolder();
		promise.then(
			function(result){
				console.log('service is done');
				$scope.gDocs = result.items;
				$scope.$digest();
			}
		)
		//console.log($scope.gDocs);
		//$scope.$digest();

		//var request = gapi.client.drive.files.get({
		//    'fileId': "1Q_CJwJftcL-zabVm0USc1px5HDfbpxu6Klav-XYOzNg"
		//});
		//request.execute(function(resp) {
		//    if (!resp.error) {
		//        console.log('Title: ' + resp.title);
		//        console.log('Description: ' + resp.description);
		//        console.log('MIME type: ' + resp.mimeType);
		//        console.log(resp);
		//        $scope.gDocs = resp;
		//        $scope.$digest();
		//    } else if (resp.error.code == 401) {
		//        // Access token might have expired.
		//        checkAuth();
		//    } else {
		//        console.log('An error occured: ' + resp.error.message);
		//    }
		//});
	}

	// List File
	$scope.listFile = function(){

	}

	var accessToken;
	$scope.arrive = false;
	$scope.authName = 'Authorize';

	$scope.init = function init(){
		window.gapi.load('auth', $scope.authenticateWithGoogle);
		window.gapi.load('picker');
		//gapi.client.load('urlshortener', 'v1');
	}
	$scope.authenticateWithGoogle =function authenticateWithGoogle(){
		window.gapi.auth.authorize({
			'client_id': configGdrive.clientId,

			'scope':configGdrive.scopes,
			'immediate': false
		}, handleAuthentication);
	}

	function handleAuthentication(result){
		if(result && !result.error){
			$scope.isAuth = true;
			$scope.authName = 'Deauthorize';
			accessToken = result.access_token;


			$scope.setupPicker();
			/*
			 callGooglePlus();
			 setFilePicker();
			 listFolder();
			 getGoogleDriveInfo();
			 createFolder();
			 */
			//createNewAccountFolder();
			//setFilePicker(); // singleFile
			//findTargetUriFolder();
		}else{
			console.log(result);
			console.log(result.error);
			console.log('fail to authentication')
		}
		//$scope.$digest();
	}

	function listFolder() {
		Googledrive.listFolder()
	}

	$scope.findFolder = function() {
		console.log('findFolder');
		//var query = "title contains 'URI-' and mimeType = 'application/vnd.google-apps.folder'";
		var query = "mimeType = 'application/vnd.google-apps.folder'";
		Googledrive.findFolder(query, function(result){
			//var numFolder = result.result.items.length;
			console.log(result);
		});
	}

	$scope.listFolderInformation = function(){
		Googledrive.listFolder();
	}


	function createNewAccountFolder(){
		//Pre. Get User Information
		//check if there exists an
		// API /users/me (only allow to have)

		var callback = function(resp){
			console.log(resp.result.items.length);
			if(resp.result.items.length == 0){
				$http.get('users/me')
					.success(function(response) {
						console.log(response);
						var folderName = 'D2l-'+response._id;
						//1. Create A New Folder
						Googledrive.createFolder(folderName, accessToken);
						//2. Update User Information
						//$http.get()
					});
			}
			else{
				console.log('there is already exist')
				$scope.rootGdriveFolderID = resp.result.items[0].id
				$scope.$digest();
			}
		}
		Googledrive.findFolder(callback);
	}
}
