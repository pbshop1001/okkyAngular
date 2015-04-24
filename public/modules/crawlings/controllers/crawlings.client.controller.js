'use strict';

// Crawlings controller
angular.module('crawlings').controller('CrawlingsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Crawlings',
	function($scope, $stateParams, $location, Authentication, Crawlings) {
		$scope.authentication = Authentication;

		// Create new Crawling
		$scope.create = function() {
			// Create new Crawling object
			var crawling = new Crawlings ({
				name: this.name
			});

			// Redirect after save
			crawling.$save(function(response) {
				$location.path('crawlings/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Crawling
		$scope.remove = function(crawling) {
			if ( crawling ) { 
				crawling.$remove();

				for (var i in $scope.crawlings) {
					if ($scope.crawlings [i] === crawling) {
						$scope.crawlings.splice(i, 1);
					}
				}
			} else {
				$scope.crawling.$remove(function() {
					$location.path('crawlings');
				});
			}
		};

		// Update existing Crawling
		$scope.update = function() {
			var crawling = $scope.crawling;

			crawling.$update(function() {
				$location.path('crawlings/' + crawling._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Crawlings
		$scope.find = function() {
			$scope.crawlings = Crawlings.query();
		};

		// Find existing Crawling
		$scope.findOne = function() {
			$scope.crawling = Crawlings.get({ 
				crawlingId: $stateParams.crawlingId
			});
		};
	}
]);