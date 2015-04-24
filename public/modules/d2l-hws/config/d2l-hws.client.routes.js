'use strict';

//Setting up route
angular.module('d2l-hws').config(['$stateProvider',
	function($stateProvider) {
		// D2l hws state routing
		$stateProvider.
		state('listD2lHws', {
			url: '/d2l-hws',
			templateUrl: 'modules/d2l-hws/views/list-d2l-hws.client.view.html'
		}).
		state('createD2lHw', {
			url: '/d2l-hws/create',
			templateUrl: 'modules/d2l-hws/views/create-d2l-hw.client.view.html'
		}).
		state('viewD2lHw', {
			url: '/d2l-hws/:d2lHwId',
			templateUrl: 'modules/d2l-hws/views/view-d2l-hw.client.view.html'
		}).
		state('editD2lHw', {
			url: '/d2l-hws/:d2lHwId/edit',
			templateUrl: 'modules/d2l-hws/views/edit-d2l-hw.client.view.html'
		});
	}
]);