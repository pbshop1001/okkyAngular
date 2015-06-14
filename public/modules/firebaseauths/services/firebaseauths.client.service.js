'use strict';

//Firebaseauths service used to communicate Firebaseauths REST endpoints
angular.module('firebaseauths').factory('Firebaseauths', ['$resource',
	function($resource) {
		return $resource('firebaseauths/:firebaseauthId', { firebaseauthId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);