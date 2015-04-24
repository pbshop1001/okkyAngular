'use strict';

//Setting up route
angular.module('d2l-hws-submits').config(['$stateProvider',
	function($stateProvider) {
		// D2l hws submits state routing
		$stateProvider.
		state('listD2lHwsSubmits', {
			url: '/d2l-hws-submits',
			templateUrl: 'modules/d2l-hws-submits/views/list-d2l-hws-submits.client.view.html'
		}).
		state('createD2lHwsSubmit', {
			url: '/d2l-hws-submits/create',
			templateUrl: 'modules/d2l-hws-submits/views/create-d2l-hws-submit.client.view.html'
		}).
		state('viewD2lHwsSubmit', {
			url: '/d2l-hws-submits/:d2lHwsSubmitId',
			templateUrl: 'modules/d2l-hws-submits/views/view-d2l-hws-submit.client.view.html'
		}).
		state('editD2lHwsSubmit', {
			url: '/d2l-hws-submits/:d2lHwsSubmitId/edit',
			templateUrl: 'modules/d2l-hws-submits/views/edit-d2l-hws-submit.client.view.html'
		});
	}
]);