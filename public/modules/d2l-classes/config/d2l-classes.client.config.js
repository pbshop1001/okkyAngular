'use strict';

// Configuring the Articles module
angular.module('d2l-classes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'D2l classes', 'd2l-classes', 'dropdown', '/d2l-classes(/create)?');
		Menus.addSubMenuItem('topbar', 'd2l-classes', 'List D2l classes', 'd2l-classes');
		Menus.addSubMenuItem('topbar', 'd2l-classes', 'New D2l class', 'd2l-classes/create');
	}
]);