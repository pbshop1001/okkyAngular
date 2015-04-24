'use strict';

angular.module('size-util').controller('SizeUtil.sizeOfWidthController', ['$scope',
	function($scope) {
        $scope.width = window.innerWidth;

        $('.bottom-sheet-dashboard').width(window.innerWidth - 74);
        $(window).on("resize.doResize", function (){
            $scope.width = window.innerWidth;
            if($scope.width < 600)
                $scope.screen = 'sm size';
            else if($scope.width <  960)
                $scope.screen = 'md size';
            else
                $scope.screen = 'bg size';
            $('.bottom-sheet-dashboard').width(window.innerWidth - 74);
            $scope.$apply(function(){

                //do something to update current scope based on the new innerWidth and let angular update the view.
            });
        });

        $scope.$on("$destroy",function (){
            $(window).off("resize.doResize"); //remove the handler added earlier
        });
	}
]);
