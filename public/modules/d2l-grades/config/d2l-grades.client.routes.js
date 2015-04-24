'use strict';

//Setting up route
angular.module('d2l-grades').config(['$stateProvider',
	function($stateProvider) {
		// D2l grades state routing
		$stateProvider.
		state('listD2lGrades', {
			url: '/d2l-grades',
			templateUrl: 'modules/d2l-grades/views/list-d2l-grades.client.view.html'
		}).
		state('createD2lGrade', {
			url: '/d2l-grades/create',
			templateUrl: 'modules/d2l-grades/views/create-d2l-grade.client.view.html'
		}).
		state('viewD2lGrade', {
			url: '/d2l-grades/:d2lGradeId',
			templateUrl: 'modules/d2l-grades/views/view-d2l-grade.client.view.html'
		}).
		state('editD2lGrade', {
			url: '/d2l-grades/:d2lGradeId/edit',
			templateUrl: 'modules/d2l-grades/views/edit-d2l-grade.client.view.html'
		});
	}
]);