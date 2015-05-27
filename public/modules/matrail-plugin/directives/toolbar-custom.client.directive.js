'use strict';

angular.module('matrail-plugin').directive('toolbarCustom', toolbarCustom)

	function toolbarCustom($window) {
		return function postLink(scope, element, attrs) {
				console.log('toolbarCustom Directive');
			  var mdContent = $('#open-board-content');
				angular.element(mdContent).bind("scroll", function() {
					if (this.scrollTop >= 100) {
						TweenLite.to('md-toolbar', 0.7, {minHeight:'39', x:0});
						TweenLite.to('#toggleBtn', 0.7, {x:-10, y:-24, scale:0.7});
					} else {
						TweenLite.to('md-toolbar', 0.7, {minHeight:'65', x:0});
						TweenLite.to('#toggleBtn', 0.7, {x:0, y:0, scale:1});
					}
					scope.$apply();
				});

			};
	}
