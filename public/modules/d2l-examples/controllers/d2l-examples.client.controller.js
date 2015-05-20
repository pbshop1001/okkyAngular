'use strict';

// D2l examples controller
angular.module('d2l-examples').controller('D2lExamplesController', ['$scope', '$stateParams', '$location', 'Authentication', 'D2lExamples','D2lClassesOwnership',
	function($scope, $stateParams, $location, Authentication, D2lExamples, D2lClassesOwnership) {
		$scope.authentication = Authentication;

		$scope.classes = D2lClassesOwnership.query();

		// Create new D2l example
		$scope.create = function() {
			// Create new D2l example object
			var d2lExample = new D2lExamples ({
				name: this.name,
				class: this.class._id,
				link: this.link
			});

			// Redirect after save
			d2lExample.$save(function(response) {
				$location.path('d2l-examples/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing D2l example
		$scope.remove = function(d2lExample) {
			if ( d2lExample ) { 
				d2lExample.$remove();

				for (var i in $scope.d2lExamples) {
					if ($scope.d2lExamples [i] === d2lExample) {
						$scope.d2lExamples.splice(i, 1);
					}
				}
			} else {
				$scope.d2lExample.$remove(function() {
					$location.path('d2l-examples');
				});
			}
		};

		// Update existing D2l example
		$scope.update = function() {
			$scope.d2lExample.class = $scope.d2lExample.class._id;
			var d2lExample = $scope.d2lExample;

			d2lExample.$update(function() {
				$location.path('d2l-examples/' + d2lExample._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of D2l examples
		$scope.find = function() {
			$scope.d2lExamples = D2lExamples.query();
		};

		// Find existing D2l example
		$scope.findOne = function() {
			$scope.d2lExample = D2lExamples.get({ 
				d2lExampleId: $stateParams.d2lExampleId
			});
		};


	}
]);