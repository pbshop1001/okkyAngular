'use strict';

//Googledocs service used to communicate Googledocs REST endpoints
angular.module('googledocs').factory('Googledocs', ['$resource',
	function($resource) {
		return $resource('googledocs/:googledocId', { googledocId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]).factory('GoogledocsByLesson', ['$resource',
	function($resource) {
		return $resource('googledocsByLesson/:lessonId', { lessonId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);