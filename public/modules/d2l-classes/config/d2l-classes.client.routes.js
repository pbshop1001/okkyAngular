'use strict';

//Setting up route
angular.module('d2l-classes').config(['$stateProvider',
	function($stateProvider) {
		// D2l classes state routing
		$stateProvider.
		state('view-class-detail', {
			url: '/view-class-detail',
			templateUrl: 'modules/d2l-classes/views/view-class-detail.client.view.html'
		}).


			// Test Animation View
			state('d2lClassInfo', {
				abstract: true,
				url: '/class',
				templateUrl: 'modules/d2l-classes/views/d2l-class-info.client.view.html'
			}).
				state('d2lClassInfo.contact', {
					url: '/class-contact',
					controller:'contactController',
					templateUrl: 'modules/d2l-classes/views/class-contact.client.view.html'
				}).
				state('d2lClassInfo.about', {
					url: '/about',
					controller:'aboutController',
					templateUrl: 'modules/d2l-classes/views/class-about.client.view.html'
				}).
				state('d2lClassInfo.home', {
					url: '/home',
					controller:'mainController',
					templateUrl: 'modules/d2l-classes/views/class-home.client.view.html'
				}).

			state('listD2lClasses', {
				url: '/d2l-classes',
				templateUrl: 'modules/d2l-classes/views/list-d2l-classes.client.view.html'
			}).
			state('listD2lClassesAll', {
				url: '/d2l-classesAll',
				templateUrl: 'modules/d2l-classes/views/list-d2l-classesAll.client.view.html'
			}).
			state('createD2lClass', {
				url: '/d2l-classes/create',
				templateUrl: 'modules/d2l-classes/views/create-d2l-class.client.view.html'
			}).
			state('viewD2lClass', {
				url: '/d2l-classes/:d2lClassId',
				templateUrl: 'modules/d2l-classes/views/view-d2l-class.client.view.html'
			}).
			state('editD2lClass', {
				url: '/d2l-classes/:d2lClassId/edit',
				templateUrl: 'modules/d2l-classes/views/edit-d2l-class.client.view.html'
			});
	}
]);