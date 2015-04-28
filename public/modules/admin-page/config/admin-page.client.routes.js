'use strict';

//Setting up route
angular.module('admin-page').config(['$stateProvider',
	function($stateProvider) {
		// Admin page state routing
		$stateProvider.
		state('admin-page', {
			url: '/admin-page',
			templateUrl: 'modules/admin-page/views/admin-page.client.view.html'
		});
	}
]);