'use strict';

angular.module('googledocs').directive('gdocsCreate', gdocsCreate);
angular.module('googledocs').directive('gdocsEdit', gdocsEdit);
angular.module('googledocs').directive('gdocsList', gdocsList);
angular.module('googledocs').directive('gdocsView', gdocsView);

function gdocsCreate() {
	return {
		templateUrl: 'modules/googledocs/views/create-googledoc.client.view.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
		}
	};
}

function gdocsEdit() {
	return {
		templateUrl: 'modules/googledocs/views/edit-googledoc.client.view.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
		}
	};
}

function gdocsList() {
	return {
		templateUrl: 'modules/googledocs/views/list-googledocs.client.view.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
		}
	};
}

function gdocsView() {
	return {
		templateUrl: 'modules/googledocs/views/view-googledoc.client.view.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
		}
	};
}
