'use strict';

angular.module('crawlings').controller('ScrapController', ['$scope','$http',
	function($scope, $http) {

		$scope.scrapResult = "";
		$scope.scrap = function(){

			$http.get('/scrap').
				success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					console.log(data);
					$scope.scrapResult = data;
				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
		}

	}
]);