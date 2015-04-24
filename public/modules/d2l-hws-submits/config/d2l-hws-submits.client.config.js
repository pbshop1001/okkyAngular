'use strict';

// Configuring the Articles module
angular.module('d2l-hws-submits').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'D2l hws submits', 'd2l-hws-submits', 'dropdown', '/d2l-hws-submits(/create)?');
		Menus.addSubMenuItem('topbar', 'd2l-hws-submits', 'List D2l hws submits', 'd2l-hws-submits');
		Menus.addSubMenuItem('topbar', 'd2l-hws-submits', 'New D2l hws submit', 'd2l-hws-submits/create');
	}
]);