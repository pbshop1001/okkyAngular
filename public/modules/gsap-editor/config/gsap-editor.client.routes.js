'use strict';

//Setting up route
angular.module('gsap-editor').config(['$stateProvider',
	function($stateProvider) {
		// Gsap editor state routing
		$stateProvider.
		state('gsap-editor', {
			url: '/gsap-editor',
			templateUrl: 'modules/gsap-editor/views/gsap-editor.client.view.html'
		});
	}
]);