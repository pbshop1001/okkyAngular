'use strict';

//Setting up route
angular.module('d2l-examples').config(['$stateProvider',
	function($stateProvider) {
		// D2l examples state routing
		$stateProvider.
		state('listD2lExamples', {
			url: '/d2l-examples',
			templateUrl: 'modules/d2l-examples/views/list-d2l-examples.client.view.html'
		}).
		state('createD2lExample', {
			url: '/d2l-examples/create',
			templateUrl: 'modules/d2l-examples/views/create-d2l-example.client.view.html'
		}).
		state('viewD2lExample', {
			url: '/d2l-examples/:d2lExampleId',
			templateUrl: 'modules/d2l-examples/views/view-d2l-example.client.view.html'
		}).
		state('editD2lExample', {
			url: '/d2l-examples/:d2lExampleId/edit',
			templateUrl: 'modules/d2l-examples/views/edit-d2l-example.client.view.html'
		});
	}
]);