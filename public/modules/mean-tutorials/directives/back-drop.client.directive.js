'use strict';

// 6/11: create for backdrop for class contents
//
angular.module('mean-tutorials').directive('backDrop', ['$compile',
	function($compile) {
		return {
			restrict: 'A',
			controller: backDropCtrl,
			controllerAs: 'backDrop',
			link: function postLink(scope, element, attrs) {

				var backDrop = angular.element('<div></div>');
				var classEnter = angular.element('<md-button ng-click="backDrop.openClass(lesson._id)" class="md-primary md-raised">Open Class</md-button>');
				backDrop.addClass('backDrop-directive');
				backDrop.append(classEnter);

				$compile(classEnter)(scope);

				element.append(backDrop);

				element.on('mouseenter', function(){
					TweenMax.fromTo(backDrop, 0.5, {alpha:0, display:'none'}, {alpha:1, display:'block'});
				});

				element.on('mouseleave', function(){
					TweenMax.fromTo(backDrop, 0.5, {alpha:1, display:'block'}, {alpha:0, display:'none'});
				});
			}
		};
	}
]);


function backDropCtrl($state){
	var vm = this;
	vm.openClass = function(id){
		$state.go('viewD2lClass', {d2lClassId: id});
	}
}