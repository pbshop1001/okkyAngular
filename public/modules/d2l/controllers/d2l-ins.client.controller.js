'use strict';

angular.module('d2l').controller('D2lInsController', ['$scope',
	function($scope) {
		$scope.menus = [{title:"Classes", desc:""},{title:"Events", desc:""},{title:"Profile", desc:"linkedin, Google+, facebook, link"},{title:"ToDo", desc:""},{title:"Previous Classes", desc:""}];
	}
]);
