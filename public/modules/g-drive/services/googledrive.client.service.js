///*
// * Created by Kevin on 2014-10-29.
//* */

'use strict';

angular.module('g-drive').factory('Googledrive', [
    '$q','configGdrive',
	function($q, configGdrive) {
		return {
			createFolder: createFolder,
			findFolder: findFolder,
			getGoogleDriveInfo: getGoogleDriveInfo,
			setupPicker: setupPicker,
			listFolder: listFolder,
			createFile: createFile,
            /////////
            plusTest: plusTest
		};

		function createFolder(FolderName, accessToken){
			var request = gapi.client.request({
				'path': '/drive/v2/files/',
				'method': 'POST',
				'headers': {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + accessToken
				},
				'body':{
					"title" : FolderName,
					"mimeType" : "application/vnd.google-apps.folder"
				}
			});
			request.execute(function(resp) {
				console.log(resp);
			});
		}

		// Search Folder
		function findFolder(callback){
			//console.log('Service: '+query);
			gapi.client.load('drive', 'v2').then(function(){
				var request = gapi.client.drive.files.list({
					q: "title contains 'Open'",
					//q:  query,
					maxResults:10,
					fields: 'items(id\,title)'
				});
				request.then(function(resp){
					callback(resp);
				});
			});
		}

        // create File
        function createFile(callback){
            gapi.client.load('drive', 'v2').then(function(){
                var request = gapi.client.drive.files.list({
                    q: "title contains 'URI-'",
                    fields: 'items(id\,title)'
                });
                request.then(function(resp){
                    //callback(resp);
                });
            });
        }

		function getGoogleDriveInfo(){
			gapi.client.load('drive', 'v2').then(function() {
				var request = gapi.client.drive.about.get();
				request.execute(function (resp) {
					console.log('Current user name: ' + resp.name);
					console.log('Root folder ID: ' + resp.rootFolderId);
					console.log('Total quota (bytes): ' + resp.quotaBytesTotal);
					console.log('Used quota (bytes): ' + resp.quotaBytesUsed);
				});
			});
		}

		//Google File Picker Platform
		function setupPicker(accessToken, callback){
			console.log('from gdrive service');
			var callbackAfterFindFolder = function(resp){
				var folderID = resp.result.items[0].id;
				var picker = new google.picker.PickerBuilder()
					.setOAuthToken(accessToken)

					//.setOAuthToken("ya29.NQGgHdO9RRpPL_NSzdY7BHnDa7irQ9sVyYj-0NJKeOK-fWZdZ_7msD8oquqWdKBsAl_Om4Zd1WO84Q")
					.setDeveloperKey(configGdrive.developerKey)
					//.addView(new google.picker.DocsUploadView().setParent(folderID))
					//.addView(new google.picker.DocsView().setParent(folderID))
					.addView(new google.picker.DocsView())
					.enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
					.setLocale('us')
					//.enableFeature(google.picker.Feature.NAV_HIDDEN)
					.setCallback(callback)
					.build();
				picker.setVisible(true);
			}
			findFolder(callbackAfterFindFolder);
		}

		function listFolder(){
            var deffered = $q.defer();
			console.log('listForlder');
			gapi.client.load('drive', 'v2').then(function() {
				var request = gapi.client.drive.files.list({
					maxResults:10,
					fields: 'etag,items(thumbnailLink,id,webViewLink,webContentLink,title)'
				});
				request.then(function(resp){
					console.log('result File list');
					//console.log(resp)
					deffered.resolve(resp.result);
				});
			});
            return deffered.promise;
		}

        function plusTest(){
            var deffered = $q.defer();
            gapi.client.load('plus', 'v1').then(function(){
                var request = gapi.client.plus.activities.list({
                    'userId' : 'me',
                    'collection' : 'public'
                });

                request.execute(function(resp) {
                    var numItems = resp.items.length;
                    for (var i = 0; i < numItems; i++) {
                        //console.log('ID: ' + resp.items[i].id + ' Content: ' + resp.items[i].object.content);
                        deffered.resolve(resp.items);
                    }
                });
            });
            return deffered.promise;
        }
	}
]);
