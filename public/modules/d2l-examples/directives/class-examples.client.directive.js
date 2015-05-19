'use strict';

angular.module('d2l-examples').directive('classExCreate', classExCreate);
angular.module('d2l-examples').directive('classExList', classExteList);
function classExCreate() {
	return {
		templateUrl: 'modules/d2l-examples/views/create-d2l-example.client.view.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
		}
	};
};
function classExteList() {
	return {
		templateUrl: 'modules/d2l-examples/views/list-d2l-examples.client.view.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {

		}
	};
};
