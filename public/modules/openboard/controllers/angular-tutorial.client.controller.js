'use strict';

angular.module('openboard').controller('AngularCtrl', AngularCtrl);

function AngularCtrl($scope, $state, $http, $mdDialog, $mdSidenav, $log, Authentication){
    $scope.classContents = [{topic:"Introduction"},{topic:"C++"},{topic:"Input/Flow Control"},{topic:"Functions"},{topic:"Arrays"},{topic:"File IO"},];
    $scope.homeContents = {
        mainTitle : "AngularJS",
        subTitleText: "가장 쉽게 접근 할 수 있는 최신 AngularJS 강좌 입니다.",
        classTitle:"시작하면서",
        classSubTitle: "최근 가장 HOT한 MVW framework에 대한 강좌 입니다. 초보자도 쉽게 접근 할 수 있도록 강의가 준비 될 것입니다."
    };
    $scope.authentication = Authentication;
    $scope.notice = "Prototype";
    $scope.date = {
        month: moment().format("MMM").toUpperCase(),
        date: moment().date(),
        year: moment().year()
    };
    $scope.goTo = function(stateName){
        $state.go(stateName);
    };
    $scope.colorBorder = {
        header: "blue"
    };
}
