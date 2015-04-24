'use strict';

//D2l grades service used to communicate D2l grades REST endpoints
angular.module('d2l-grades').factory('D2lGrades', ['$resource',
	function($resource) {
		return $resource('d2l-grades/:d2lGradeId', { d2lGradeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]).factory('D2lGradesByClass', ['$resource',
	function($resource) {
		return $resource('d2l-grades/byClass/:classId', { classId: '@_id'
		}, {
			get: {
				method: 'GET', isArray:true
			}
		});
	}
]);