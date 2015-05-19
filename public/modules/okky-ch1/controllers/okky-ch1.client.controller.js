'use strict';

angular.module('okky-ch1').controller('OkkyCh1Controller', ['$scope','$http',
	function($scope, $http) {
		// Okky ch1 controller logic
		// ...
		$scope.title = "Model";
		$http.get('/d2l-classes')
			.success(function(data) {
				$scope.title = data;

		}).error(function(error){
				$scope.error = error;
		})

	}
]).controller('OkkyCh1Controller2', ['$scope','$http',
	function($scope, $http) {
		// Okky ch1 controller logic
		// ...
		$scope.title = "SpringMVC";

	}
]);
