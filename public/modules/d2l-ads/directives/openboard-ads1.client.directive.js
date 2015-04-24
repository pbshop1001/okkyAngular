'use strict';

angular.module('d2l-ads').directive('openboardAds1', [
	function() {
		return {
			templateUrl: '/modules/d2l-ads/directives/template/openboard-ads1.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
                scope.insertDriveIconURL = 'modules/d2l-ads/svg/gdoc.svg';
                var papers =[];
                papers.push($('#paper1'));
                papers.push($('#paper2'));
                papers.push($('#paper3'));
                papers.push($('#paper4'));
                papers.push($('#paper5'));
                TweenMax.to(papers[0], 2, {x:400, y:200, rotation: 12});
                TweenMax.to(papers[1], 2, {x:-400, y:-400, rotation: -12});
                TweenMax.to(papers[2], 2, {x:200, y:-400, rotation: 22});
                TweenMax.to(papers[3], 2, {x:600, y:-400, rotation: 62});
                TweenMax.to(papers[4], 2, {x:-200, y:600, rotation: 2});


                var tl = new TimelineLite();
                tl.set("#content", {visibility:"visible"})
                    .from(".titleH1Ads1", 0.5, {left:100, autoAlpha:0}) // autoAlpha handles both css properties visibility and opacity.
                    .from(".titleH2Ads1", 0.5, {left:-100, autoAlpha:0}, "-=0.25") //add tween 0.25 seconds before previous tween ends
                    .from("#feature", 0.5, {scale:0.5, autoAlpha:0}, "feature") // add feature label at start position of this tween
                    .from("#description", 0.5, {left:100, autoAlpha:0}, "feature+=0.25") // add tween 0.25 seconds after the feature label
                    .staggerFrom(".ad1-nav img", 0.5, {scale:0, rotation:-180, autoAlpha:0}, 0.2, "stagger");
			}
		};
	}
]);
