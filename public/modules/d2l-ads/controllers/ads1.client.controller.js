'use strict';

angular.module('d2l-ads').controller('Ads1Controller', ['$scope',
	function($scope) {
        $scope.date = {
            month: moment().format("MMM").toUpperCase(),
            date: moment().date(),
            year: moment().year()
        }
        $scope.animationC1=function(){
            var c = $('.ad1-calendarHolder');
            TweenMax.to(c, 0.6, {x:0, y:0, scale:0.4, transformOrigin: "50% 50%"});
        }

        $scope.animationC2=function(){
            var c = $('.ad1-calendarHolder');
            TweenMax.to(c, 0.6, {x:0, y:0, scale:1, transformOrigin: "50% 50%"});
        }

        $scope.init = function(){
	          //var tl = new TimelineMax();
	          //
	          //var Tween1 = TweenMax.to($('#testDate'), 3.6, {x:0, y:0, scale:0.2, transformOrigin: "0% 0%"});
	          //var Tween2 = TweenMax.to($('#testTool'), 0.6, {height:100, y:30});
	          //tl.add(Tween1).add(Tween2);
        }


        $scope.menus = [{title: "Animation1", desc:""}, {title: "Animation2", desc:""}, {title: "Animation3", desc:""}]
		var iconData = [
			{name: 'icon-home'        , color: "#777" },
			{name: 'icon-user-plus'   , color: "rgb(89, 226, 168)" },
			{name: 'icon-google-plus2', color: "#A00" },
			{name: 'icon-youtube4'    , color:"#00A" },
			// Use theming to color the font-icon
			{name: 'icon-settings'    , color:"#A00", theme:"md-warn md-hue-5"}
		];
		// Create a set of sizes...
		$scope.sizes = [
			{size:12,padding:0},
			{size:21,padding:2},
			{size:36,padding:6},
			{size:48,padding:10}
		];
		$scope.fonts = [].concat(iconData);
		$scope.it = $scope.sizes[3];
		var gdoc = $('.s48');
	//	TweenMax.to(gdoc, 2, {scale:2});
		$scope.animate = function() {
			TweenMax.to(gdoc, 2, {scaleY:2});
		}

		$scope.animate2 = function() {
			TweenMax.to(gdoc, 2, {scale:2});
		}

		$scope.animate3 = function() {
			TweenMax.to(gdoc, 2, {scaleX:1, scaleY:1});
		}

		function sizeUp(size){
			var gdoc = $('.s48');
			TweenMax.to(gdoc, 2, {scale:size});
		}
	}
]);
