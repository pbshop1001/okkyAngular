'use strict';

angular.module('util').directive('keyMenu', [
	function() {
		return {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				element.bind("keydown keypress", function (event) {
					if(event.which === 13) {
						scope.$apply(function (){
							scope.$eval(attrs.ngEnter);
						});

						event.preventDefault();
					}else{
						console.log(event.which);
					}
				});
			}
		};
	}
]);