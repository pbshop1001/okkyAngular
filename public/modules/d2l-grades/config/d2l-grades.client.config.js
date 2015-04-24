'use strict';

// Configuring the Articles module
angular.module('d2l-grades').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'D2l grades', 'd2l-grades', 'dropdown', '/d2l-grades(/create)?');
		Menus.addSubMenuItem('topbar', 'd2l-grades', 'List D2l grades', 'd2l-grades');
		Menus.addSubMenuItem('topbar', 'd2l-grades', 'New D2l grade', 'd2l-grades/create');
	}
]);