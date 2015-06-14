'use strict';

angular.module('firebaseauths').controller('fire1', AuthenticationController)

function AuthenticationController($scope, $firebaseObject, $firebaseArray, $firebaseAuth, FIREBASE_URI, Authentication, FirebaseSchema) {

	$scope.authentication = Authentication;
	var userInfo = $scope.authentication.user
	if(userInfo._id)
		$scope.presences = FirebaseSchema.runCheckPresenceStatus();
	else
		console.log('required login');

	$scope.logOut = FirebaseSchema.removeLogin;

	//console.log($scope.authentication);
	//var ref = new Firebase('https://pbshop.firebaseio.com/data');
	//var ref2 = new Firebase("https://pbshop.firebaseio.com/messages");
	//
	//var syncObject = $firebaseObject(ref);
	//syncObject.$bindTo($scope, "data");
	//
	//$scope.messages = $firebaseArray(ref2);
	//
	//$scope.addMessage = function(){
	//	$scope.messages.$add({
	//		text: $scope.newMessageText
	//	});
	//}
	//
	////var auth = $firebaseAuth(refAuth);
	////auth.$authWithOAuthPopup("facebook").then(function(authData) {
	////	console.log("Logged in as:", authData.uid);
	////}).catch(function(error) {
	////	console.log("Authentication failed:", error);
	////});
	//
	//var amOnline = new Firebase(FIREBASE_URI+'.info/connected');
	//var userRef = new Firebase(FIREBASE_URI+'presence/'+userInfo._id);
	//var userRefs = new Firebase(FIREBASE_URI+'presence');
	//
	//$scope.presences = $firebaseArray(userRefs);
	//
	//amOnline.on('value', function(snapshot) {
	//	if (snapshot.val()) {
	//		userRef.onDisconnect().set('☆ offline');
	//		if(userInfo._id)
	//			userRef.set('★ online');
	//	}
	//});
	//document.onIdle = function () {
	//	userRef.set('☆ idle');
	//}
	//
	//document.onAway = function () {
	//	userRef.set('☄ away');
	//}
	//document.onBack = function (isIdle, isAway) {
	//	userRef.set('★ online');
	//}


}
