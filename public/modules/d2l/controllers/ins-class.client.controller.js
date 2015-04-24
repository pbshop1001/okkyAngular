'use strict';

angular.module('d2l').controller('InsClassController', ['$scope','$http','CreateFile',
	function($scope,$http,CreateFile) {

		var objFile = CreateFile.create();
		console.log(objFile.getInfo());

		TweenMax.set($('#fileCreator'), {alpha:0, yPercent:-150});
		$scope.assignments = [];


		$scope.createHWbtn = function(){
			$scope.isOpen = !$scope.isOpen;
			if($scope.isOpen){
				console.log("open");
				TweenMax.to($('#fileCreator'), 1, {alpha:1, yPercent:0, display:"block",   ease: Power2.easeOut, paused:false});
			}

			else{
				console.log("close");
				TweenMax.to($('#fileCreator'), 1, {alpha:0, yPercent:-150, display:"none", ease: Power2.easeOut, paused:false});
			}
			$scope.assignment = '';
		}

		$scope.createFolder = function(){

		}

		$scope.publishFile = function(){

		}

		$scope.listGPlus = function(){
			$http.get('/gs').success(function(data, status, headers, config){
				$scope.userInfo = data;
				console.log('data', data);
				console.log('status', status);
				console.log('headers', headers);
				console.log('config', config);
			});
		}
	}
]);
