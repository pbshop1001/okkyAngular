'use strict';

//Setting up route
angular.module('mean-events').config(['$stateProvider',
	function($stateProvider) {
		// Mean events state routing
		$stateProvider.
		state('listMeanEvents', {
			url: '/mean-events',
			templateUrl: 'modules/mean-events/views/list-mean-events.client.view.html'
		}).
		state('createMeanEvent', {
			url: '/mean-events/create',
			templateUrl: 'modules/mean-events/views/create-mean-event.client.view.html'
		}).
		state('viewMeanEvent', {
			url: '/mean-events/:meanEventId',
			templateUrl: 'modules/mean-events/views/view-mean-event.client.view.html'
		}).
		state('editMeanEvent', {
			url: '/mean-events/:meanEventId/edit',
			templateUrl: 'modules/mean-events/views/edit-mean-event.client.view.html'
		});
	}
]);
