'use strict';

angular.module('util').directive('prism', [
	function() {
		return {
            restrict: 'A',
			link: function postLink(scope, element, attrs) {
				element.ready(function(){
                   Prism.highlightElement(element[0]);
                });
			}
		};
	}
]);
