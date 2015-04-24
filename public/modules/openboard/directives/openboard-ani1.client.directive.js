'use strict';

angular.module('openboard').directive('openboardAni1', [
	function() {
		return {

			templateUrl: "/modules/openboard/directives/template/openboard-ani1.html",
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Openboard ani1 directive logic
				// ...

				$('#play').click(play);

				var body1 = $('#body1');
				var body2 = $('#body2');
				var body3 = $('#body3');

				var face1 = $('#face1');
				var face2 = $('#face2');
				var flag = $('#flag');
				var a1 = $('.assign');

				var tl = new TimelineMax({repeat: 2, repeatDelay: 1});

				var t1 = TweenMax.to([body1, face1], 0.7, {display: 'none'});

				var t2 = TweenMax.to([body2, face2], 0.2, {display: 'block'});

				var f1 = TweenMax.from(flag, 1, {display: 'none', xPercent: 200, yPercent: -200, scale: 0.2})

				var ta1 = TweenMax.to(a1, 4, {x:1500});

				tl.add(ta1).add(f1).add(t1).add(t2).play();

				function play() {
					tl.restart();
				}
			}
		}
	}
]);