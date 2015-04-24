'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var d2lClasses = require('../../app/controllers/d2l-classes.server.controller');

	// D2l classes Routes
	app.route('/d2l-classes')
		.get(d2lClasses.list)
		.post(users.requiresLogin, d2lClasses.create);

	app.route('/d2l-classes/i')
		.get(d2lClasses.listOwnClass);

	app.route('/d2l-classes/:d2lClassId')
		.get(d2lClasses.read)
		.put(users.requiresLogin, d2lClasses.hasAuthorization, d2lClasses.update)
		.delete(users.requiresLogin, d2lClasses.hasAuthorization, d2lClasses.delete);

	// Finish by binding the D2l class middleware
	app.param('d2lClassId', d2lClasses.d2lClassByID);
};
