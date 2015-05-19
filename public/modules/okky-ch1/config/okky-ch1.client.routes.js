'use strict';

//Setting up route
angular.module('okky-ch1').config(['$stateProvider',
	function($stateProvider) {
		// Okky ch1 state routing
		$stateProvider.
		state('okky-ch1', {
			url: '/okky-ch1',
			templateUrl: 'modules/okky-ch1/views/okky-ch1.client.view.html'
		});
	}
]);