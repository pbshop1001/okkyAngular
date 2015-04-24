'use strict';

angular.module('gsap-editor').controller('GsapEditorController',GsapEditorCtrl);

function GsapEditorCtrl($scope, $http, $cacheFactory) {
    $scope.data = ['dd','dd','dd'];
    $scope.title1 = 'Button';
    $scope.title4 = 'Warn';
    $scope.isDisabled = true;
    $scope.googleUrl = 'http://google.com';



    $http.defaults.cache = $cacheFactory('myCache', {capacity: 2});

    $scope.loadPerson = function(num){
        $http
            .get('//swapi.co/api/people/'+ num + '/')
            .then(function (result){
                console.log(result.data.name);
            });
    }
    //var myCache = $cacheFactory('myCache');
    //myCache.put('key', 'val');
    //console.log(myCache.get('key'));
    //console.log(myCache.info());

}
