'use strict';

// Mean events controller
angular.module('mean-events').controller('MeanEventsController', ['$scope', '$stateParams', '$location', 'Authentication', 'MeanEvents',
	function($scope, $stateParams, $location, Authentication, MeanEvents) {
		$scope.authentication = Authentication;
		console.log($scope.authentication);
		// Create new Mean event
		$scope.create = function() {
			// Create new Mean event object
			var meanEvent = new MeanEvents ({
				name: this.name
			});

			// Redirect after save
			meanEvent.$save(function(response) {
				$location.path('mean-events/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Mean event
		$scope.remove = function(meanEvent) {
			if ( meanEvent ) { 
				meanEvent.$remove();

				for (var i in $scope.meanEvents) {
					if ($scope.meanEvents [i] === meanEvent) {
						$scope.meanEvents.splice(i, 1);
					}
				}
			} else {
				$scope.meanEvent.$remove(function() {
					$location.path('mean-events');
				});
			}
		};

		// Update existing Mean event
		$scope.update = function() {
			var meanEvent = $scope.meanEvent;

			meanEvent.$update(function() {
				$location.path('mean-events/' + meanEvent._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Mean events
		$scope.find = function() {
			$scope.meanEvents = MeanEvents.query();
		};

		// Find existing Mean event
		$scope.findOne = function() {
			$scope.meanEvent = MeanEvents.get({ 
				meanEventId: $stateParams.meanEventId
			});
		};
	}
]);
