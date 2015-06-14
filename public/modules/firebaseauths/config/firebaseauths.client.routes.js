'use strict';

//Setting up route
angular.module('firebaseauths').constant('FIREBASE_URI', 'https://pbshop.firebaseio.com/');

angular.module('firebaseauths').config(['$stateProvider',
	function($stateProvider) {
		// Firebaseauths state routing
		$stateProvider.
		state('firebase-test', {
			url: '/firebase-test',
			templateUrl: 'modules/firebaseauths/views/test/firebase-test.client.view.html'
		}).
		state('listFirebaseauths', {
			url: '/firebaseauths',
			templateUrl: 'modules/firebaseauths/views/list-firebaseauths.client.view.html'
		}).
		state('createFirebaseauth', {
			url: '/firebaseauths/create',
			templateUrl: 'modules/firebaseauths/views/create-firebaseauth.client.view.html'
		}).
		state('viewFirebaseauth', {
			url: '/firebaseauths/:firebaseauthId',
			templateUrl: 'modules/firebaseauths/views/view-firebaseauth.client.view.html'
		}).
		state('editFirebaseauth', {
			url: '/firebaseauths/:firebaseauthId/edit',
			templateUrl: 'modules/firebaseauths/views/edit-firebaseauth.client.view.html'
		});
	}
]);