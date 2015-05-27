'use strict';

angular.module('mean-tutorials')
	.controller('MeanLoginCtrl', MeanLoginCtrl)
	.controller('MeanHomeController',MeanHomeController);

function MeanLoginCtrl($scope, Authentication, $mdDialog){
	$scope.authentication = Authentication;
}

function MeanHomeController($scope, $state, $http, $mdDialog, Authentication, D2lClasses) {

	//Initialization
	$scope.authentication = Authentication;

	//Course list
	$scope.courses = D2lClasses.query();

	//  Openboard Introduction Contents
	$scope.homeContents = {
		mainTitle : "ng-SKorea",
		subTitleText: "에 오신 것을 환영 합니다."
	};

	$scope.notice = "Alpha";

	$scope.date = {
		month: moment().format("MMM").toUpperCase(),
		date: moment().date(),
		year: moment().year()
	}

	$scope.goTo = function(stateName){
		$state.go(stateName);
	}

	// Extract Contents
	$http.get('modules/mean-tutorials/data/home.json').success(function(data) {
		$scope.dataFromJson = data;
		$scope.projects = $scope.dataFromJson.projects;
		$scope.announcements = $scope.dataFromJson.announcements;
		$scope.techs = $scope.dataFromJson.techs;
	});

	$scope.goToClass = function(id){
		console.log(id);
		$state.go('viewD2lClass', {d2lClassId:id});
	}

	$scope.gotoState = function(state) {
		$state.go(state);
	}

	// This function should be combined later
	$scope.showSignUpTutorial = function(ev) {
		console.log('mean home');
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'modules/mean-tutorials/template/authentication/signup-dialog.tpl.html',
			targetEvent: ev
		})
	};

	$scope.mouseEnter = function(target){
		TweenLite.to(target.srcElement, 0.7, {scale:1.2})
	}

	$scope.mouseLeave = function(target){
		TweenLite.to(target.srcElement, 0.7, {scale:1})
	}
}
