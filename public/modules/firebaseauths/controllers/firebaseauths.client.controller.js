'use strict';

// Firebaseauths controller
angular.module('firebaseauths').controller('FirebaseauthsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Firebaseauths',
	function($scope, $stateParams, $location, Authentication, Firebaseauths) {
		$scope.authentication = Authentication;

		// Create new Firebaseauth
		$scope.create = function() {
			// Create new Firebaseauth object
			var firebaseauth = new Firebaseauths ({
				name: this.name
			});

			// Redirect after save
			firebaseauth.$save(function(response) {
				$location.path('firebaseauths/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Firebaseauth
		$scope.remove = function(firebaseauth) {
			if ( firebaseauth ) { 
				firebaseauth.$remove();

				for (var i in $scope.firebaseauths) {
					if ($scope.firebaseauths [i] === firebaseauth) {
						$scope.firebaseauths.splice(i, 1);
					}
				}
			} else {
				$scope.firebaseauth.$remove(function() {
					$location.path('firebaseauths');
				});
			}
		};

		// Update existing Firebaseauth
		$scope.update = function() {
			var firebaseauth = $scope.firebaseauth;

			firebaseauth.$update(function() {
				$location.path('firebaseauths/' + firebaseauth._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Firebaseauths
		$scope.find = function() {
			$scope.firebaseauths = Firebaseauths.query();
		};

		// Find existing Firebaseauth
		$scope.findOne = function() {
			$scope.firebaseauth = Firebaseauths.get({ 
				firebaseauthId: $stateParams.firebaseauthId
			});
		};
	}
]);