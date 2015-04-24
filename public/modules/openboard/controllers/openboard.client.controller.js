'use strict';


angular.module('openboard')
//	.config(function($mdThemingProvider) {})
	.controller('OpenboardController', OpenboardController);
function OpenboardController($scope, $log, $mdDialog, $mdSidenav, $window, $http, Authentication, Users, D2lHws, D2lGrades, D2lClassesOwnership, D2lHwsSubmitsTrue, UsersRole) {

	//Init
	$scope.authentication = Authentication;
	var authentication = Authentication;
	$scope.user = Authentication.user;
	$scope.roles = [{name: 'Student',value:'student'},{name: 'Instructor', value:'instructor'}];

	$scope.hws = D2lHws.query();
	$scope.hws.$promise.then(function(result){
		$scope.hwsCopy = [].concat(result);
	});
	$scope.classes = D2lClassesOwnership.query();
	$scope.classes.$promise.then(function(result){
		$scope.classesCopy = [].concat(result);
	});
	$scope.submittedHW = D2lHwsSubmitsTrue.query();
	$scope.submittedHW.$promise.then(function(result){
		$scope.submittedHWCopy = [].concat(result);
	});
	$scope.gradeCollection = D2lGrades.query();
	$scope.gradeCollection.$promise.then(function (result) {
		$scope.gradeCollectionCopy = [].concat(result);
	});

	$scope.options = {
		chart: {
			type: 'multiBarChart',
			height: 450,
			margin : {
				top: 20,
				right: 20,
				bottom: 60,
				left: 45
			},
			clipEdge: true,
			staggerLabels: true,
			transitionDuration: 500,
			stacked: false,
			showControls:false,
			xAxis: {
				axisLabel: 'Assignment Name',
				showMaxMin: false,
				tickFormat: function(d){
					return d;
					//return d3.requote(d);

				}
			},
			yAxis: {
				axisLabel: 'Percentage(%)',
				axisLabelDistance: 40,
				tickFormat: function(d){
					return d3.format('d')(d);
				}
			},
			//yDomain:[0,100]
		}
	};

	$scope.data1 =
		[
			{
		"values" : [{
			"y" : 75,
			"x" : "Kevin"
		}, {
			"y" : 90,
			"x" : "Eric"
		}, {
			"y" : 95,
			"x" : "Jason"
		}],
		"key" : "Assignment1"
	}, {
		"values" : [{
			"y" : 46,
			"x" : "Kevin"
		}, {
			"y" : 100,
			"x" : "Eric"
		}, {
			"y" : 100,
			"x" : "Jason"
		}],
		"key" : "Assignment2"
	},{
		"values" : [{
			"y" : 65,
			"x" : "Kevin"
		}, {
			"y" : 70,
			"x" : "Eric"
		}, {
			"y" : 35,
			"x" : "Jason"
		}],
		"key" : "Assignment3"
	},
		{
			"values" : [{
				"y" : 45,
				"x" : "Kevin"
			}, {
				"y" : 90,
				"x" : "Eric"
			}, {
				"y" : 85,
				"x" : "Jason"
			}],
			"key" : "Assignment4"
		}];

	$scope.openDoc = function(docId){
		var url = 'https://docs.google.com/document/d/'+docId+'/edit';
		$window.open(url);
	};

	$scope.scrollTo = function(elementId){
		var target = $("#"+elementId).offset().top;

		$mdSidenav('left').close()
			.then(function(){
				$log.debug("close LEFT is done");
				console.log(target);
				TweenMax.to($window, 1.2, {scrollTo:{y:target}, ease:Power4.easeOut});
			});
	};

	$scope.linkHW = function(hw){
		var AppScriptAPI = 'https://script.google.com/macros/s/AKfycbzoXxZDgzjLOJdqGUGYCWSpIT7n2sHyvnIo2W7E5jmXI_2sryj3/exec?';
		var param = 'docId='+hw.gdocId+
			'&userId='+authentication.user.username+
			'&title='+hw.title+
			'&dDate='+new Date(hw.dDate)+
			'&userIdRef='+Authentication.user._id+
			'&instructorRef='+hw.class.user+
			'&classId='+hw.class._id;
		$window.open(AppScriptAPI+param);
	};

    $scope.copyHWTemplate = function(gdocId){
        var AppScriptAPI = 'https://script.google.com/macros/s/AKfycbzoXxZDgzjLOJdqGUGYCWSpIT7n2sHyvnIo2W7E5jmXI_2sryj3/exec?';
        var param = 'docId='+gdocId+'&userIdRef='+Authentication.user._id+'&task=copy';
        $window.open(AppScriptAPI+param);
    };

	$scope.toggleLeftOpen = function() {
		$mdSidenav('left').toggle()
			.then(function(){
                TweenMax.to($("md-backdrop "),0.1,{position:'fixed'});
				//$log.debug("toggle left is done");

			});
	};

	function DialogController($scope, $mdDialog){
		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	}

	// This function should be combined later
	$scope.showSignUpTutorial = function(ev) {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'modules/openboard/template/authentication/signup-dialog.tpl.html',
			targetEvent: ev
		})
		TweenMax.to($("md-backdrop"),0.5,{position:'fixed'});
	};

	$scope.showSignInTutorial = function(ev, elementId) {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'modules/openboard/template/authentication/signin-dialog.tpl.html',
			targetEvent: ev,
            clickOutsideToClose: true
		}).then(function(answer){
                //var target = $("#"+elementId).offset().top;
                //TweenMax.to($window, 1.2, {scrollTo:{y:target}, ease:Power4.easeOut});
            },function(){
                //console.log('cancel');
            }
        );
		TweenMax.to($("md-backdrop"),0.5,{position:'fixed'});
	};

	$scope.showNewClass = function(ev){
		$mdDialog.show({
			controller: D2lClassDialogCtrl,
			templateUrl: 'modules/openboard/template/tutorial/newClass-dialog.tpl.html',
			targetEvent: ev,
			clickOutsideToClose: true
		}).then(
			function(){
				//var target = $("#step4").offset().top;
        //TweenMax.to($window, 1.2, {scrollTo:{y:target}, ease:Power4.easeOut});
        $log.debug('created Class');
				$scope.classes = D2lClassesOwnership.query();
				$scope.classesCopy = [].concat($scope.classes);

            },
			function(){
                $log.debug('cancel');
            }
		);
		function D2lClassDialogCtrl($scope, $mdDialog, D2lClasses){
			$scope.cancel = function() {
				$mdDialog.cancel();
			};
			$scope.create = function() {
				// Create new D2l class object
				var d2lClass = new D2lClasses ({
					name: this.name,
					prefix:this.prefix
				});
				// Redirect after save
				d2lClass.$save(function(response) {
					$mdDialog.hide();
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};
		}
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
                $log.debug('cancel');
            },
            function(){
                //$log.debug('created Assignment');
                $scope.hws = D2lHws.query();
                $scope.hwsCopy = [].concat($scope.hws);
            }
        );

		function D2lHwDialogCtrl(scope, $timeout, $mdDialog, D2lHws, D2lClassesOwnership, GDriveSelectResult){

			scope.$on('handleEmit', function(event, args) {
				console.log('broadcast is invoked');
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
				console.log('B');;
			};
			scope.docs = GDriveSelectResult;
			scope.project = {gdocId : scope.docs.id};

			var dDate = new Date();
			//dDate.setHours(23,59,59,999);

			scope.project = {
				dDate: dDate
				//gdocId : scope.docs.id
				//desc: 'Nuclear Missile Defense System',
			};

			scope.loadClasses = function() {
				console.log('Load Class is invoked');
				return $timeout(function() {
					scope.classes = D2lClassesOwnership.query();
				}, 650);
			};

			scope.createNewRecord = function() {
				console.log('Create');
				// Create new D2l hw object
				scope.project.dDate;//.setHours(23,59,59,999);
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

	$scope.setRoleAsStudent = function(){
		$scope.user.roles ="student";
		var user = new Users($scope.user);
		user.$update(function(response) {
			$scope.success = true;
			Authentication.user = response;
			$scope.user = response;
			$mdDialog.hide();
		}, function(response) {
			$scope.error = response.data.message;
		});
	};

	$scope.ownHwUpdate = function(){

	}

	$scope.allHwUpdate = function(){

	}

	$scope.openSubmission = function(docId){

	}
}
