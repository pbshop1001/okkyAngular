'use strict';

//Crawlings service used to communicate Crawlings REST endpoints
angular.module('crawlings').factory('Crawlings', ['$resource',
	function($resource) {
		return $resource('crawlings/:crawlingId', { crawlingId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);