'use strict';

// D2l lessons controller
angular.module('d2l-lessons').controller('D2lLessonsController', ['$scope', '$timeout', '$state', '$stateParams', '$location', 'Authentication', 'D2lLessons','D2lClassesOwnership','D2lExamples',
	function($scope, $timeout, $state, $stateParams, $location, Authentication, D2lLessons, D2lClassesOwnership, D2lExamples) {
		$scope.authentication = Authentication;

		console.log('lesson ctrl')
		//var wistiaEmbed = Wistia.embed("ocowx278d5");
		//var contentType = true;

		// Create new D2l lesson
		$scope.create = function() {
			console.log(this.class);
			// Create new D2l lesson object
			var d2lLesson = new D2lLessons ({
				name: this.name,
				class: this.project.class._id,
				contentType: this.contentType,
				example: this.example,
				body: this.body
			});

			// Redirect after save
			d2lLesson.$save(function(response) {
				$location.path('d2l-lessons/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing D2l lesson
		$scope.remove = function(d2lLesson) {
			if ( d2lLesson ) { 
				d2lLesson.$remove();

				for (var i in $scope.d2lLessons) {
					if ($scope.d2lLessons [i] === d2lLesson) {
						$scope.d2lLessons.splice(i, 1);
					}
				}
			} else {
				$scope.d2lLesson.$remove(function() {
					$location.path('d2l-lessons');
				});
			}
		};

		// Update existing D2l lesson
		$scope.update = function() {
			$scope.d2lLesson.class = $scope.d2lLesson.class._id;
			console.log('update');
			var d2lLesson = $scope.d2lLesson;

			d2lLesson.$update(function() {
				$location.path('d2l-lessons/' + d2lLesson._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of D2l lessons
		$scope.find = function() {
			$scope.d2lLessons = D2lLessons.query();
		};

		// Find existing D2l lesson
		$scope.findOne = function() {
			$scope.d2lLesson = D2lLessons.get({ 
				d2lLessonId: $stateParams.d2lLessonId
			});
			if($state.current.name === 'editD2lLesson')
				$scope.d2lLesson.$promise.then(function(data){
					$scope.d2lLesson.example = _.pluck(_.dropWhile(data.example, 'name link'),'_id');
				});
		};

		// Load Class
		$scope.loadClasses = function() {
			//console.log('Load Class is invoked');
			return $timeout(function() {
				$scope.classes = D2lClassesOwnership.query();
			}, 650);
		};

		// check Box
		$scope.loadExamples = function(){
			return $timeout(function() {
				$scope.examples = D2lExamples.query();
			}, 650);
		};
		$scope.toggle = function (item, list) {
			var idx = list.indexOf(item._id);
			if (idx > -1) list.splice(idx, 1);
			else list.push(item._id);
		};
		$scope.exists = function (item, list) {
			return list.indexOf(item._id) > -1;
		};

	}
]);