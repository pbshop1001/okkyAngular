'use strict';

angular.module('d2l').factory('D2LOauth', ['configGdrive',
	function(configGdrive) {
        var testStr = 'asdfasdfsdfsf';
        var accessToken;
        var permalLink = 'http://drive.google.com/uc?export=view&id=';
        var arrive = false;
        var authName = 'Authorize';
        var isAuth = false;

		return {
            getAccessToken: getAccessToken,
            authenticateWithGoogle: authenticateWithGoogle,
            //setupPicker: setupPicker,
            createNewAccountFolder: createNewAccountFolder
		};

        function getAccessToken() {
            return true;
        }

        function authenticateWithGoogle(){
            window.gapi.auth.authorize({
                'client_id': configGdrive.clientId,
                'scope':configGdrive.scopes,
                'immediate': false
            }, handleAuthentication);
        }

        function handleAuthentication(result){
            console.log(testStr);
            if(result && !result.error){
                isAuth = true;
                authName = 'Deauthorize';
                accessToken = 'ya29.FgGTDUyLSY6oSvDzClGVcrwws2xf2PJ6JHC5uXkRoutVf6k8BLamn4t9dsvKBG0sHtZR34tYjP6CHg';
                //accessToken = result.access_token;
                console.log(accessToken);
                /*callGooglePlus();setFilePicker();listFolder();getGoogleDriveInfo();createFolder();*/

                //createNewAccountFolder();
                //setFilePicker(); // singleFile
                //findTargetUriFolder();
            }else{
                console.log(result);
                console.log('ERROR: '+result.error);
                console.log('fail to authentication')
            }
            //$scope.$digest();
        }

        // Google PlatForm Service
        //function setupPicker() {
        //    function pickerCallback(data) {
        //        if(data.action == google.picker.Action.PICKED){
        //            //do something
        //            $scope.files = data.docs;
        //            $scope.arrive = true;
        //
        //            // make shorten URL
        //            var request = gapi.client.urlshortener.url.get({
        //                'shortUrl': 'http://goo.gl/fbsS'
        //            });
        //            request.then(function(response) {
        //                appendResults(response.result.longUrl);
        //            }, function(reason) {
        //                console.log('Error: ' + reason.result.error.message);
        //            });
        //
        //            //alert('URL: ' + data.docs[0].url);
        //            $scope.$digest()
        //        }else if(data.action ==google.picker.Action.CANCEL){
        //            //alert('goodbye');
        //        }
        //    }
        //    Googledrive.setupPicker(accessToken, pickerCallback);
        //}

        // Create New Account Folder
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
                    //$scope.rootGdriveFolderID = resp.result.items[0].id
                    //$scope.$digest();
                }
            }
            Googledrive.findFolder(callback);
        }
	}
]);
