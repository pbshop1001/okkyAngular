'use strict';

//Setting up route
angular.module('present').config(['$stateProvider',
	function($stateProvider) {
		// Present state routing
		$stateProvider.
		state('okky1', {
			url: '/okky1',
			templateUrl: 'modules/present/views/okky1.client.view.html'
		}).
		state('open-board-present', {
			url: '/open-board-present',
			templateUrl: 'modules/present/views/open-board-present.client.view.html'
		});
	}
]);