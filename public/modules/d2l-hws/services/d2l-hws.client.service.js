'use strict';

//D2l hws service used to communicate D2l hws REST endpoints
angular.module('d2l-hws')
	.factory('D2lHws', ['$resource',
		function($resource) {
			return $resource('d2l-hws/:d2lHwId', { d2lHwId: '@_id'
			}, {
				update: {
					method: 'PUT'
				}
			});
		}
	])
	.factory('D2lHwsByClass', ['$resource',
		function($resource) {
			return $resource('/d2l-hws/byClass/:classId', { classId: '@_id'
			}, {
				get: {
					method: 'GET', isArray: true
				}
			});
		}
	])
	.factory('D2lHwsByOriginDocId', ['$resource',
		function($resource) {
			return $resource('/d2l-hws/getGDoc/:gdocId', { gdocId: '@_id'
			}, {
				get: {
					method: 'GET', isArray: true
				}
			});
		}
	]);

//''/d2l-hws/getGDoc/:gdocId'
