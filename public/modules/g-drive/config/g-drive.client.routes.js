'use strict';

var CONFIG = {
    clientId: '574563539488-pctm7fr21vcetcfpdf9hhaje9q5vepee.apps.googleusercontent.com',
	developerKey: 'AIzaSyCs0vMbPNaana-11VvKf6RnyQ5wU5L7X_o',
	scopes: [
		'https://www.googleapis.com/auth/drive',
		'https://www.googleapis.com/auth/drive.appdata',
		'https://www.googleapis.com/auth/plus.me',
		'https://www.googleapis.com/auth/paymentssandbox.make_payments'
	]
};

angular.module('g-drive').value('configGdrive', CONFIG);

//Setting up route
angular.module('g-drive').config(['$stateProvider',
	function($stateProvider) {
	}
]);