'use strict';

angular.module('d2l').controller('D2lStuController', ['$scope',
	function($scope) {
		$scope.menus = [{title:"Previous Classes", desc:""},{title:"Classes", desc:""},{title:"Events", desc:""},{title:"Portfolio", desc:"linkedin, Google+, facebook, link"},{title:"ToDo", desc:""}];
	}
]);
