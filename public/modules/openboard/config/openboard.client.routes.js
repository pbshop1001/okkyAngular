'use strict';

//Setting up route
angular.module('openboard').config(['$stateProvider',
	function($stateProvider) {
		// Openboard state routing
		$stateProvider.
		state('class-content', {
			url: '/class-content',
			templateUrl: 'modules/openboard/views/class-content.client.view.html'
		}).
		state('angular-tutorial', {
			url: '/angular-tutorial',
			templateUrl: 'modules/openboard/views/angular-tutorial.client.view.html'
		}).
		state('openboard', {
			url: '/openboard',
			templateUrl: 'modules/openboard/views/openboard.client.view.html'
		});
	}
]);