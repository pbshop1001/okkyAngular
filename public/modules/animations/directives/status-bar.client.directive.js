'use strict';

angular.module('animations').directive('statusBar', statusBar);

function statusBar() {
		return {
			restrict: 'A',
			controller: statusBarCtrl,

			link: function postLink(scope, element, attrs) {
				var renderer = PIXI.autoDetectRenderer(150, 700,{backgroundColor: 0xf1c40f});
				element.append(renderer.view);
				element.append('<div>{{title}}</div>');

				var stage = new PIXI.Container();

				animate();

				function animate() {
					requestAnimationFrame(animate);
					renderer.render(stage);
				}
			}
	};
}

function statusBarCtrl($scope){
	$scope.title = 'statusBarCtrl';

}


angular.module('animations').directive('statusBarSvg', statusBarSvg);

function statusBarSvg() {
	return {
		templateUrl:'modules/animations/directives/template/statusBarSvg.html',
		restrict: 'E',
		controller: statusBarSvgCtrl,
		link: function postLink(scope, element, attrs) {
		}
	};
}

function statusBarSvgCtrl($scope){
	$scope.title = 'statusBarCtrl';

}
