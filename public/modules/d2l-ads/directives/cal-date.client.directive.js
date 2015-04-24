'use strict';

angular.module('d2l-ads').directive('calDate', [
	function() {
		return {
			template: '<div class="ad1-calendarHolder" >'
								+'<div class="ad1-calendar">'
								+'<div class="ad1-month">{{date.month}}</div>'
								+'<div class="ad1-day">{{date.date}}</div>'
								+'<div class="ad1-year">{{date.year}}</div>'
								+'</div>'
								+'<div class="ad1-timer"  ng-mouseover="ad1TimerHover()">'
								+'<div class="ad1-sec">1</div>'
								+'</div>'
								+'</div>',
			restrict: 'E',
			link:{
				pre: function preLink(scope, iElement, iAttrs, controller) {
					//console.log('pre: '+ iElement);
				},
				post: function postLink(scope, iElement, iAttrs, controller) {
					$(".ad1-calendarHolder").hover(
						function() {
							TweenLite.to($(this).find('.ad1-timer'), 1.2, {rotationY:360, ease:Back.easeOut});
						},
						function() {
							TweenLite.to($(this).find('.ad1-timer'), 1.2, {rotationY:0, ease:Back.easeOut});
						}
					);
					//console.log('post: '+ iElement);
				}
			}
		};
	}
]);
