'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var firebaseauths = require('../../app/controllers/firebaseauths.server.controller');

	app.route('/geolocation')
		.get(firebaseauths.getGeo);
	// Finish by binding the Firebaseauth middleware

	// Firebaseauths Routes
	app.route('/firebaseauths')
		.get(firebaseauths.list)
		.post(users.requiresLogin, firebaseauths.create);



	app.route('/firebaseauths/:firebaseauthId')
		.get(firebaseauths.read)
		.put(users.requiresLogin, firebaseauths.hasAuthorization, firebaseauths.update)
		.delete(users.requiresLogin, firebaseauths.hasAuthorization, firebaseauths.delete);




	app.param('firebaseauthId', firebaseauths.firebaseauthByID);
};
