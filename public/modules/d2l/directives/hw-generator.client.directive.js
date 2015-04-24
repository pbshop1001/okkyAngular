'use strict';

/**
 *  @ngdoc module
 *  @name pbshop.components.select
 */

/*
 [Process Step]

 Check Requirements
 Process payment
 */

/**************************************************************

 ### TODO ###
 **DOCUMENTATION AND DEMOS**

 -[ ] ng-modle with child mdOptions (basic)
 -[ ] ng-modle="foo" ng-model-options="{targetBy: ''}"

 **************************************************************/

angular.module('d2l')

	.directive('d2lHwGenerator', HwGenerator)
	.directive('d2lHwPublisher', HwPublisher)
	.factory('D2lHwPermission', ['$resource',
		function($resource) {
			return $resource('/HWD2l/getPermission/:id', {
				id: '@_id'
			},{getDoc: {method:'GET'}});
		}
	])
	.factory('D2lHwCopy', ['$resource',
		function($resource) {
			return $resource('/HWD2l/copyFile/:id/:userNameDoc', {
				id: '@_id',userNameDoc:'@_userNameDoc'
			},{copyDoc: {method:'GET'}});
		}
	])
	.controller('ToastCtrl', function($scope, $mdToast) {
		$scope.closeToast = function() {
			$mdToast.hide();
		};
	});

function HwGenerator($mdToast, $location, devConfig, D2lHws) {
	return {
		templateUrl: 'modules/d2l/directives/template/d2l-hw-generator-tpl.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
			scope.isOpen=true;
			//scope.devColor = devConfig.directive;
			scope.docTypes = ['Docs', 'Sheets', 'Slides', 'PDF'];

			scope.create = function() {
				console.log('Create');
				// Create new D2l hw object
				var d2lHw = new D2lHws (scope.project);
				// Redirect after save

				d2lHw.$save(function(response) {
					$location.path('d2l-hws/' + response._id);
					// Clear form fields
					scope.name = '';
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};



			scope.publishHW = function() {
				alert('Click');
			}

			scope.toastPosition = {
				bottom: true,
				top: false,
				left: false,
				right: true
			};
			scope.getToastPosition = function() {
				return Object.keys(scope.toastPosition)
					.filter(function(pos) { return scope.toastPosition[pos]; })
					.join(' ');
			};
			scope.showCustomToast = function() {
				$mdToast.show({
					controller: 'ToastCtrl',
					templateUrl: 'modules/d2l/directives/toast-template.html',
					hideDelay: 16000,
					position: scope.getToastPosition()
				});
			};

		}
	};
}

function HwPublisher($timeout, $http, D2lHwPermission, D2lHwCopy, D2lHws){
	return {
		templateUrl: 'modules/d2l/directives/template/d2l-hw-publisher-tpl.html',
		restrict: 'E',
		link:function postLink(scope, element, attrs) {
			scope.listP = function(id){
					scope.result = D2lHwPermission.getDoc({
						id: id
					}).$promise.then(
						//success
						function( value ){
							scope.items = value.items;
							//based On the result
						},
						//error
						function( error ){console.log(error);}
					)
			};

			//Make a Copy
			scope.copyFileTemplate = function(id){

				var users = [{email:"pbshop1001@gmail.com"},{email:"kruny1001@gmail.com"}];

				users.forEach(function(user){
					D2lHwCopy.copyDoc({id:id, userNameDoc: user.email})
						.$promise.then(function(value){console.log(value); alert('copy process is done');},function(error){console.log(error)});
				})



				//D2lHwCopy.copyDoc({id:id})
				//	.$promise.then(function(value){console.log(value); alert('copy process is done');},function(error){console.log(error)});

			}

			scope.gsCopyFile = function(){

				var url = 'http://localhost:8080/api/AKfycbwqcvW0ogVTk4o5-J89Fih5wO2XoNcsiTX_FCfbPXZdhGpIYNHW/cats';
				$http.get(url).success(function(data){console.log(data)}).error(function(data){data});
			}

			//Insert Permissions


			//Create File
			scope.publish = function(id){
				scope.result = D2lHwPermission.getDoc({
					id: id
				}).$promise.then(
					//success
					function( value ){
						scope.items = value.items;
						//based On the result
					},
					//error
					function( error ){console.log(error);}
				)
			};

			scope.loadUsers = function() {
				// Use timeout to simulate a 650ms request.
				scope.users = [];
				scope.d2lhws = D2lHws.query();

				return $timeout(function() {
					scope.users = [
						{ id: 1, name: 'Copy of restFulAPI Test2', docId:'1HP0LZO1chIZSp-wxK0Gx2B5EVDrw9dVnl8y6OkQB5_k' },
						//{ id: 2, name: 'Shaggy Rodgers' },
						//{ id: 3, name: 'Fred Jones' },
						//{ id: 4, name: 'Daphne Blake' },
						//{ id: 5, name: 'Velma Dinkley' },
					];
				}, 650);
			};

		}
	}
}
