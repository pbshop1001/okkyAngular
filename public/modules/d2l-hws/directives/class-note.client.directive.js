'use strict';

angular.module('d2l-hws').directive('classNoteCreate', classNoteCreate);
angular.module('d2l-hws').directive('classNoteList', classNoteList);
	function classNoteCreate() {
		return {
			templateUrl: 'modules/d2l-hws/views/create-d2l-hw.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
			}
		};
	};
function classNoteList() {
	return {
		templateUrl: 'modules/d2l-hws/views/list-d2l-hws.client.view.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {

		}
	};
};
