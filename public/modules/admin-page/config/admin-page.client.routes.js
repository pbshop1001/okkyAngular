'use strict';

//Setting up route
angular.module('admin-page').config(['$stateProvider',
	function($stateProvider) {
		// Admin page state routing
		$stateProvider.
		state('test-pixi', {
			url: '/test-pixi',
			templateUrl: 'modules/admin-page/views/test-pixi.client.view.html'
		}).
		state('admin-page', {
			url: '/admin-page',
			templateUrl: 'modules/admin-page/views/admin-page.client.view.html',
				onEnter: function(){
					console.log('onEnter');
				},
				onExit: function(){
					console.log('onExit');

				}
		});
	}
]);