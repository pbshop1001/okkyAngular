'use strict';

angular.module('admin-page').controller('AdminPageController', adminPageCtrl);


function adminPageCtrl($scope, $location, $mdDialog, Authentication) {

	$scope.authentication = Authentication;
	$scope.user = Authentication.user;

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


	$scope.showSignInTutorial = function() {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'modules/openboard/template/authentication/signin-dialog.tpl.html',
			//targetEvent: ev,
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

	console.log($scope.authentication.user);
	// If user is signed in then redirect back home
	if ($scope.authentication.user ==="") {
		$scope.showSignInTutorial();
	}

	var vm = this;
	vm.defaultMenu = 'Class';
	vm.availMenus = ['Class', 'Example', 'gDocs'];

	vm.class = true;
	vm.example = false;
	vm.gDocs = false;

	$scope.$watch('vm.defaultMenu', function(newVar) {
		if(newVar ==="Class"){
			vm.class = true;
			vm.example = false;
			vm.gDocs = false;
		}else if(newVar ==="Example"){
			vm.class = false;
			vm.example = true;
			vm.gDocs = false;
		}else if(newVar ==="gDocs"){
			vm.class = false;
			vm.example = false;
			vm.gDocs = true;
		}
	});

	vm.title="Admin Page";
	vm.description="Description";

	vm.menus = [
		{title: "Dashboard"},
		{title: "News"},
		{title: "Pages"},
		{title: "Media", subMenu:[{title:"Video Gallery"},{title:"Photo Gallery"}]},
		{title: "Graph & Charts"},
		{title: "Events"},
		{title: "Other Contents"},
		{title: "Admin Tools"},
	];
}


