'use strict';

// D2l lessons controller
angular.module('d2l-lessons').controller('D2lLessonsController', D2lLessonsController);
	function D2lLessonsController($scope, $timeout, $state, $stateParams, $mdDialog, $location, Authentication, D2lLessons, D2lClassesOwnership, D2lExamples, GoogledocsByLesson) {
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

		$scope.loadGDocs = function(){
			$scope.gdocs = GoogledocsByLesson.query({lessonId: $stateParams.d2lLessonId});
		};

		$scope.showNewAssign = function(ev){
			$mdDialog.show({
				controller: D2lHwDialogCtrl,
				templateUrl: 'modules/openboard/template/tutorial/newAssign-dialog.tpl.html',
				targetEvent: ev,
				clickOutsideToClose: false,
				preserveScope: false,
				locals: {project:{gdocId: ''}},
				bindToController: true,
				//onComplete: reset

			}).then(
				function(){
					//$log.debug('cancel');
				},
				function(){
					//$log.debug('created Assignment');
					$scope.hws = D2lHwsByClass.get({classId: $scope.d2lClass._id},function(result){
						$scope.hwsCopy = [].concat(result);
					});
				}
			);

			function D2lHwDialogCtrl(scope, $timeout, $mdDialog, D2lHws, D2lClassesOwnership, GDriveSelectResult){

				scope.$on('handleEmit', function(event, args) {
					//console.log('broadcast is invoked');
					scope.project.gdocId=args.message;
					scope.$digest();
				});
				scope.cancel = function(){
					$mdDialog.cancel();
					scope.docs = "";
					scope.project = '';
					scope.projectForm = '';
					args.message = '';
					scope.$digest();
					//console.log('B');;
				};
				scope.docs = GDriveSelectResult;
				scope.project = {gdocId : scope.docs.id};

				var dDate = new Date();
				dDate.setHours(23,59,59,999);

				scope.project = {
					dDate: dDate
					//gdocId : scope.docs.id
					//desc: 'Nuclear Missile Defense System',
				};

				scope.loadClasses = function() {
					//console.log('Load Class is invoked');
					return $timeout(function() {
						scope.classes = D2lClassesOwnership.query();
					}, 650);
				};

				scope.createNewRecord = function() {
					//console.log('Create');
					// Create new D2l hw object
					scope.project.dDate.setHours(23,59,59,999);
					var d2lHw = new D2lHws (scope.project);
					d2lHw.class = d2lHw.class._id;

					// Redirect after save
					d2lHw.$save(function(response) {
						//$location.path('d2l-hws/' + response._id);
						// Clear form fields
						scope.name = '';
						scope.project.gdocId = '';
						scope.projectForm = null;
						$mdDialog.cancel();
						scope.project = null;

					}, function(errorResponse) {
						scope.error = errorResponse.data.message;
					});
				};
			}
		};
	}
