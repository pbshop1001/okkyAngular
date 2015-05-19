'use strict';

angular.module('admin-page').controller('AdminPageController', adminPageCtrl);


function adminPageCtrl() {
	var vm = this;
	vm.title="Admin Page";
	vm.description="Description";

	vm.menus = [
		{title: "Dashboard"},
		{title: "News"},
		{title: "Pages"},
		{title: "Media", subMenu:[{title:"Video Gallery"},{title:"Photo Gallery"}]},
		{title: "Graph & Charts"},
		{title: "Events"},
		{title: "Other Contents"},
		{title: "Admin Tools"},
	];
}


