'use strict';

angular.module('util').directive('bigPanel', ['$interval',
	function($interval) {
		return {
			templateUrl: 'modules/util/directives/template/bigPanel.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Big panel directive logic
				// ...
				var toggle = false;
				//$interval(function() {
				//	if(!toggle){
				//		TweenLite.to('#bigPanel', .7, {y:'-200%'});
				//	}
				//	else {
				//		//TweenLite.to('#bigPanel', .7, {y:'0%'});
				//	}
				//	toggle = !toggle;
				//	console.log(toggle);
				//
				//}, 30);
			}
		};
	}
]);