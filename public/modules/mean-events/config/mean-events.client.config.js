'use strict';

// Configuring the Articles module
angular.module('mean-events').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Mean events', 'mean-events', 'dropdown', '/mean-events(/create)?');
		//Menus.addSubMenuItem('topbar', 'mean-events', 'List Mean events', 'mean-events');
		//Menus.addSubMenuItem('topbar', 'mean-events', 'New Mean event', 'mean-events/create');
	}
]);
