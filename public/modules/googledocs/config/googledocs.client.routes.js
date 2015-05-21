'use strict';

//Setting up route
angular.module('googledocs').config(['$stateProvider',
	function($stateProvider) {
		// Googledocs state routing
		$stateProvider.
		state('listGoogledocs', {
			url: '/googledocs',
			templateUrl: 'modules/googledocs/views/list-googledocs.client.view.html'
		}).
		state('createGoogledoc', {
			url: '/googledocs/create',
			templateUrl: 'modules/googledocs/views/create-googledoc.client.view.html'
		}).
		state('viewGoogledoc', {
			url: '/googledocs/:googledocId',
			templateUrl: 'modules/googledocs/views/view-googledoc.client.view.html'
		}).
		state('editGoogledoc', {
			url: '/googledocs/:googledocId/edit',
			templateUrl: 'modules/googledocs/views/edit-googledoc.client.view.html'
		});
	}
]);