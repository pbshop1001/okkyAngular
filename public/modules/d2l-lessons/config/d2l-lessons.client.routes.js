'use strict';

//Setting up route
angular.module('d2l-lessons').config(['$stateProvider',
	function($stateProvider) {
		// D2l lessons state routing
		$stateProvider.
		state('listD2lLessons', {
			url: '/d2l-lessons',
			templateUrl: 'modules/d2l-lessons/views/list-d2l-lessons.client.view.html'
		}).
		state('createD2lLesson', {
			url: '/d2l-lessons/create',
			templateUrl: 'modules/d2l-lessons/views/create-d2l-lesson.client.view.html'
		}).
		state('viewD2lLesson', {
			url: '/d2l-lessons/:d2lLessonId',
			templateUrl: 'modules/d2l-lessons/views/view-d2l-lesson.client.view.html'
		}).
		state('editD2lLesson', {
			url: '/d2l-lessons/:d2lLessonId/edit',
			templateUrl: 'modules/d2l-lessons/views/edit-d2l-lesson.client.view.html'
		});
	}
]);