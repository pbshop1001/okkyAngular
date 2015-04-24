'use strict';

// D2l hws submits controller
angular.module('d2l-hws-submits').controller('D2lHwsSubmitsController', ['$scope', '$stateParams', '$location', 'Authentication', 'D2lHwsSubmits',
	function($scope, $stateParams, $location, Authentication, D2lHwsSubmits) {
		$scope.authentication = Authentication;

		// Create new D2l hws submit
		$scope.create = function() {
			// Create new D2l hws submit object
			var d2lHwsSubmit = new D2lHwsSubmits ({
				name: this.name
			});

			// Redirect after save
			d2lHwsSubmit.$save(function(response) {
				$location.path('d2l-hws-submits/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing D2l hws submit
		$scope.remove = function(d2lHwsSubmit) {
			if ( d2lHwsSubmit ) { 
				d2lHwsSubmit.$remove();

				for (var i in $scope.d2lHwsSubmits) {
					if ($scope.d2lHwsSubmits [i] === d2lHwsSubmit) {
						$scope.d2lHwsSubmits.splice(i, 1);
					}
				}
			} else {
				$scope.d2lHwsSubmit.$remove(function() {
					$location.path('d2l-hws-submits');
				});
			}
		};

		// Update existing D2l hws submit
		$scope.update = function() {
			var d2lHwsSubmit = $scope.d2lHwsSubmit;

			d2lHwsSubmit.$update(function() {
				$location.path('d2l-hws-submits/' + d2lHwsSubmit._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of D2l hws submits
		$scope.find = function() {
			$scope.d2lHwsSubmits = D2lHwsSubmits.query();
		};

		// Find existing D2l hws submit
		$scope.findOne = function() {
			$scope.d2lHwsSubmit = D2lHwsSubmits.get({ 
				d2lHwsSubmitId: $stateParams.d2lHwsSubmitId
			});
		};
	}
]);