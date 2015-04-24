'use strict';

//Mean events service used to communicate Mean events REST endpoints
angular.module('mean-events').factory('MeanEvents', ['$resource',
	function($resource) {
		return $resource('mean-events/:meanEventId', { meanEventId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);