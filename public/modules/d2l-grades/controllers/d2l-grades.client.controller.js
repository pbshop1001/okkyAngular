'use strict';

// D2l grades controller
angular.module('d2l-grades').controller('D2lGradesController', ['$scope', '$stateParams', '$location', 'Authentication', 'D2lGrades',
	function($scope, $stateParams, $location, Authentication, D2lGrades) {
		$scope.authentication = Authentication;

		// Create new D2l grade
		$scope.create = function() {
			// Create new D2l grade object
			var d2lGrade = new D2lGrades ({
				name: this.name
			});

			// Redirect after save
			d2lGrade.$save(function(response) {
				$location.path('d2l-grades/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing D2l grade
		$scope.remove = function(d2lGrade) {
			if ( d2lGrade ) { 
				d2lGrade.$remove();

				for (var i in $scope.d2lGrades) {
					if ($scope.d2lGrades [i] === d2lGrade) {
						$scope.d2lGrades.splice(i, 1);
					}
				}
			} else {
				$scope.d2lGrade.$remove(function() {
					$location.path('d2l-grades');
				});
			}
		};

		// Update existing D2l grade
		$scope.update = function() {
			var d2lGrade = $scope.d2lGrade;

			d2lGrade.$update(function() {
				$location.path('d2l-grades/' + d2lGrade._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of D2l grades
		$scope.find = function() {
			$scope.d2lGrades = D2lGrades.query();
		};

		// Find existing D2l grade
		$scope.findOne = function() {
			$scope.d2lGrade = D2lGrades.get({ 
				d2lGradeId: $stateParams.d2lGradeId
			});
		};
	}
]);