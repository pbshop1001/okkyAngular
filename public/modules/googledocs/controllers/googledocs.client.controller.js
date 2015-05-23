'use strict';

// Googledocs controller
angular.module('googledocs').controller('GoogledocsController', GoogledocsController);

	function GoogledocsController($scope, $stateParams, $location, $timeout, Authentication, Googledocs, D2lClassesOwnership, D2lLessonsByClass) {
		$scope.authentication = Authentication;

		// Create new Googledoc
		$scope.create = function() {
			// Create new Googledoc object
			var googledoc = new Googledocs ({
				name: this.name,
				link: this.link,
				contentType: this.contentType,
				class: this.class._id,
				lesson: this.lesson._id,
				gdocId: this.gdocId
			});

			// Redirect after save
			googledoc.$save(function(response) {
				$location.path('googledocs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Googledoc
		$scope.remove = function(googledoc) {
			if ( googledoc ) { 
				googledoc.$remove();

				for (var i in $scope.googledocs) {
					if ($scope.googledocs [i] === googledoc) {
						$scope.googledocs.splice(i, 1);
					}
				}
			} else {
				$scope.googledoc.$remove(function() {
					$location.path('googledocs');
				});
			}
		};

		// Update existing Googledoc
		$scope.update = function() {
			var googledoc = $scope.googledoc;

			googledoc.$update(function() {
				$location.path('googledocs/' + googledoc._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Googledocs
		$scope.find = function() {
			$scope.googledocs = Googledocs.query();
		};

		// Find existing Googledoc
		$scope.findOne = function() {
			$scope.googledoc = Googledocs.get({ 
				googledocId: $stateParams.googledocId
			});
		};

		// Load Class
		$scope.loadClasses = function() {
			//console.log('Load Class is invoked');
			return $timeout(function() {
				$scope.classes = D2lClassesOwnership.query();
			}, 650);
		};

		$scope.loadLessons = function(classId) {
			return $timeout(function() {
				$scope.lessons = D2lLessonsByClass.query({d2lClassId: classId});
			}, 650);
		}

		$scope.$on('handleEmit', function(event, args) {
			console.log('broadcast is invoked');
			$scope.gdocId=args.message;
			$scope.$digest();
		});
	}
