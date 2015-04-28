'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var d2lExamples = require('../../app/controllers/d2l-examples.server.controller');

	// D2l examples Routes
	app.route('/d2l-examples')
		.get(d2lExamples.list)
		.post(users.requiresLogin, d2lExamples.create);

	app.route('/d2l-examples/:d2lExampleId')
		.get(d2lExamples.read)
		.put(users.requiresLogin, d2lExamples.hasAuthorization, d2lExamples.update)
		.delete(users.requiresLogin, d2lExamples.hasAuthorization, d2lExamples.delete);

	// Finish by binding the D2l example middleware
	app.param('d2lExampleId', d2lExamples.d2lExampleByID);
};
