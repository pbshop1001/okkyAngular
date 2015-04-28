'use strict';

// D2l classes controller
angular.module('d2l-classes').controller('D2lClassesController',
	['$scope', '$sce', '$stateParams', '$window',
		'$location', '$mdDialog', 'Authentication', 'D2lHws',
		'D2lGradesByClass','D2lClasses','D2lHwsByClass','D2lHwsSubmitsTrue',
		'D2lGrades','D2lHwsSubmitsTrueByClass','D2lHwsByOriginDocId',
		'D2lClassesOwnership','D2lLessonsOwnership',
	function($scope, $sce, $stateParams, $window, $location, $mdDialog, Authentication, D2lHws,D2lGradesByClass, D2lClasses, D2lHwsByClass, D2lHwsSubmitsTrue, D2lGrades, D2lHwsSubmitsTrueByClass, D2lHwsByOriginDocId, D2lClassesOwnership, D2lLessonsOwnership) {

		$scope.classOwner = false;


		$scope.id = $stateParams.d2lClassId;
		$scope.authentication = Authentication;
		var authentication = Authentication;
		$scope.user = Authentication.user;
		$scope.calendarAvail = true;

		if($scope.user.additionalProvidersData !== undefined)
			$scope.gUser = $scope.user.additionalProvidersData.google.email.split('@')[0];
		else if($scope.user.provider==="google"){
			$scope.gUser = $scope.user.providerData.email.split('@')[0];
		}
		else{
			$scope.calendarAvail = false;
		}

		$scope.calendar = function() {
			var src;
			if($scope.calendarAvail){
				src = "https://www.google.com/calendar/embed?showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&mode=AGENDA&height=300&wkst=1&bgcolor=%23FFFFFF&src="+$scope.gUser+"%40gmail.com&color=%23691426&ctz=America%2FChicago";
			}
			return $sce.trustAsResourceUrl(src);
		}
		$scope.numClasses = 0;

		$scope.classContents = [{topic:"Introduction"},{topic:"C++"},{topic:"Input/Flow Control"},{topic:"Functions"},{topic:"Arrays"},{topic:"File IO"},];
		$scope.copyHWTemplate = function(gdocId){
			var AppScriptAPI = 'https://script.google.com/macros/s/AKfycbzoXxZDgzjLOJdqGUGYCWSpIT7n2sHyvnIo2W7E5jmXI_2sryj3/exec?';
			var param = 'docId='+gdocId+'&userIdRef='+Authentication.user._id+'&task=copy';
			$window.open(AppScriptAPI+param);
		};

		// Create new D2l class
		$scope.create = function() {
			// Create new D2l class object
			var d2lClass = new D2lClasses ({
				name: this.name,
				prefix:this.prefix
			});

			// Redirect after save
			d2lClass.$save(function(response) {
				//console.log('ddd');
				$mdDialog.hide();
				//$location.path('d2l-classes/' + response._id);

				// Clear form fields
				$scope.name = '';
                $scope.prefix = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing D2l class
		$scope.remove = function(d2lClass) {
			if ( d2lClass ) { 
				d2lClass.$remove();

				for (var i in $scope.d2lClasses) {
					if ($scope.d2lClasses [i] === d2lClass) {
						$scope.d2lClasses.splice(i, 1);
					}
				}
			} else {
				$scope.d2lClass.$remove(function() {
					$location.path('d2l-classes');
				});
			}
		};

		// Update existing D2l class
		$scope.update = function() {
			var d2lClass = $scope.d2lClass;

			d2lClass.$update(function() {
				$location.path('d2l-classes/' + d2lClass._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of D2l classes
		$scope.find = function() {
			$scope.d2lClasses = D2lClassesOwnership.query();
		};


		$scope.lessons = D2lLessonsOwnership.query({d2lClassId: $stateParams.d2lClassId});


		$scope.linkHW = function(hw){
			console.log('dd');
			var AppScriptAPI = 'https://script.google.com/macros/s/AKfycbzoXxZDgzjLOJdqGUGYCWSpIT7n2sHyvnIo2W7E5jmXI_2sryj3/exec?';
			var param = 'docId='+hw.gdocId+
				'&userId='+authentication.user.username+
				'&title='+hw.title+
				'&dDate='+hw.dDate+
				'&userIdRef='+Authentication.user._id+
				'&instructorRef='+hw.class.user+
				'&classId='+hw.class._id;
			console.log(hw.dDate);
			$window.open(AppScriptAPI+param);
		};

		$scope.openDoc = function(docId){
			var url = 'https://docs.google.com/document/d/'+docId+'/edit';
			$window.open(url);
		};

		// Find a list of D2l classes
		$scope.findAll = function() {
			$scope.d2lClasses = D2lClasses.query();

		};

		// Find existing D2l class
		$scope.findOne = function() {
			$scope.d2lClass = D2lClasses.get({
				d2lClassId: $stateParams.d2lClassId
			});

			$scope.d2lClass.$promise.then(function(result){
				if(Authentication.user._id === result.user._id) {
					$scope.classOwner =true;
				}
				$scope.numClasses = result.length;

				$scope.hws = D2lHwsByClass.get({classId: result._id},function(result){
					$scope.hwsCopy = [].concat(result);
				});

				$scope.submittedHW = D2lHwsSubmitsTrueByClass.get({classId: result._id},function(result){
					$scope.submittedHWCopy = [].concat(result);

					result.forEach(function(value, index){
						$scope.submittedHWCopy[index].hwInfo = D2lHwsByOriginDocId.get({gdocId: result[index].originId}, function(result){
							//$scope.submittedHWCopy.hwInfo = result[0];
						});
					})
				});

				$scope.gradeCollection = D2lGradesByClass.get({classId:$stateParams.d2lClassId});
				$scope.gradeCollection.$promise.then(function (result) {
					$scope.gradeCollection = result;
					$scope.gradeCollectionCopy = [].concat(result);
					result.forEach(function(value, index){
						$scope.gradeCollectionCopy[index].name = result[index].name.split(":")[0];
					})
					//D2lHws
				});
			});
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

		$scope.openAdminMenu = function(){
			alert('dd');
		}
	}
]);

angular.module('d2l-classes')
	.controller('mainController', function($scope, $state) {
		$scope.pageClass = 'page-home';
		$scope.goTo = function(name){
			$state.go(name);
		}
	})
	.controller('aboutController', function($scope, $state) {
		$scope.pageClass = 'page-about';
		$scope.goTo = function(name){
			$state.go(name);
		}
	})
	.controller('contactController', function($scope, $state) {
		$scope.pageClass = 'page-contact';
		$scope.goTo = function(name){
			$state.go(name);
		}
	});

