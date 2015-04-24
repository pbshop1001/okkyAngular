'use strict';

angular.module('openboard').directive('opProfile', ['$interval','Authentication',
	function($interval,Authentication) {
		return {
			templateUrl: 'modules/openboard/directives/template/op-profile.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
                var profileOpen = true;
                var user = Authentication.user;
                scope.openProfile = function(){
                    console.log(element.find('md-card-content'));
                    if(profileOpen)
                    {
                        TweenMax.to(element.find('md-card-content'), 1, {autoAlpha:0, display:'none'});
                        TweenMax.to(element, 1, {scale: 0.7});
                    }

                    else{
                        TweenMax.to(element.find('md-card-content'), 1, {autoAlpha:1, display:'block'});
                        TweenMax.to(element, 1, {scale: 1});
                    }

                    profileOpen = !profileOpen;
                }
                scope.closeProfile = function(){
                    console.log(element.find('md-card-content'));
                }
			}
		};
	}
]);
