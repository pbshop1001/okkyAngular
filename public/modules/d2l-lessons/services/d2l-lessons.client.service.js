'use strict';

//D2l lessons service used to communicate D2l lessons REST endpoints
angular.module('d2l-lessons').factory('D2lLessons', ['$resource',
	function($resource) {
		return $resource('d2l-lessons/:d2lLessonId', { d2lLessonId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]).factory('D2lLessonsOwnership', ['$resource',
	function($resource) {
		return $resource('/d2l-lessonsByClassId/:d2lClassId', { d2lClassId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]).factory('D2lLessonsByClass', ['$resource',
	function($resource) {
		return $resource('/d2l-lessonsByClassId/:d2lClassId', { d2lClassId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])
;