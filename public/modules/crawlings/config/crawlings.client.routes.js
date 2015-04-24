'use strict';

//Setting up route
angular.module('crawlings').config(['$stateProvider',
	function($stateProvider) {
		// Crawlings state routing
		$stateProvider.
		state('scrap', {
			url: '/scrap',
			templateUrl: 'modules/crawlings/views/scrap.client.view.html'
		}).
		state('listCrawlings', {
			url: '/crawlings',
			templateUrl: 'modules/crawlings/views/list-crawlings.client.view.html'
		}).
		state('createCrawling', {
			url: '/crawlings/create',
			templateUrl: 'modules/crawlings/views/create-crawling.client.view.html'
		}).
		state('viewCrawling', {
			url: '/crawlings/:crawlingId',
			templateUrl: 'modules/crawlings/views/view-crawling.client.view.html'
		}).
		state('editCrawling', {
			url: '/crawlings/:crawlingId/edit',
			templateUrl: 'modules/crawlings/views/edit-crawling.client.view.html'
		});
	}
]);