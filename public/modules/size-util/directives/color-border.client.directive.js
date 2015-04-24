'use strict';

angular.module('size-util').directive('colorBorder', [
	function() {
		return {
            scope:{
                color : '@colorBorder'
            },
			link: function postLink(scope, element, attrs) {
                //element.css('border-color', scope.color);
                //element.css('border-style', 'solid');
                //element.css('border-width', '1px');
								//console.log('from colorBorder Directive: '+scope.color);
								TweenLite.set(element.children(), {
                    borderColor: scope.color,
                    borderStyle: 'solid',
                    borderWidth: '1px'
                });
			}
		};
	}
]);
