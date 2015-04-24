'use strict';

//Setting up route
angular.module('d2l').config(['$stateProvider','$mdIconProvider',
	function($stateProvider,$mdIconProvider) {
		// D2l state routing
		$stateProvider.
		state('lms-start', {
			url: '/lms-start',
			templateUrl: 'modules/d2l/views/lms-start.client.view.html'
		}).
		state('d2l-main', {
			url: '/d2l-main',
			templateUrl: 'modules/d2l/views/d2l-main.client.view.html'
		}).
		state('d2l-stu', {
			url: '/d2l-stu',
			templateUrl: 'modules/d2l/views/d2l-stu.client.view.html'
		}).
		state('d2l-ins', {
			abstract: true,
			url: '/d2l-ins',
			templateUrl: 'modules/d2l/views/d2l-ins.client.view.html'
		}).
			state('d2l-ins.menu',{
				url: '/menu',
				templateUrl: 'modules/d2l/template/ins-menu.html'
			}).
			state('d2l-ins.class', {
				url: '/class',
				templateUrl: 'modules/d2l/template/ins-class.html'
			}).
		state('d2l-ad', {
			url: '/d2l-ad',
			templateUrl: 'modules/d2l/views/d2l-ad.client.view.html'
		}).
		state('d2l-home', {
			url: '/d2l-home',
			templateUrl: 'modules/d2l/views/d2l-home.client.view.html'
		})
		.state('d2l-hw', {
				url: '/d2l/hw',
				templateUrl: 'modules/d2l/views/d2l-hw.client.view.html'
			});

		$mdIconProvider.iconSet("avatar", '/modules/d2l/svg/avatar-icons.svg', 128);
	}
]);
