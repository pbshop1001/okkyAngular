'use strict';

//D2l classes service used to communicate D2l classes REST endpoints
angular.module('d2l-classes').factory('D2lClasses', ['$resource',
	function($resource) {
		return $resource('d2l-classes/:d2lClassId', { d2lClassId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]).factory('D2lClassesOwnership', ['$resource',
	function($resource) {
		return $resource('d2l-classes/i', { d2lClassId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
