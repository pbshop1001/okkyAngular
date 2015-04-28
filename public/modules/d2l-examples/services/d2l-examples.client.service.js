'use strict';

//D2l examples service used to communicate D2l examples REST endpoints
angular.module('d2l-examples').factory('D2lExamples', ['$resource',
	function($resource) {
		return $resource('d2l-examples/:d2lExampleId', { d2lExampleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);