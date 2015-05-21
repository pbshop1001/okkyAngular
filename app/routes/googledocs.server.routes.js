'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var googledocs = require('../../app/controllers/googledocs.server.controller');

	// Googledocs Routes
	app.route('/googledocs')
		.get(googledocs.list)
		.post(users.requiresLogin, googledocs.create);

	app.route('/googledocs/:googledocId')
		.get(googledocs.read)
		.put(users.requiresLogin, googledocs.hasAuthorization, googledocs.update)
		.delete(users.requiresLogin, googledocs.hasAuthorization, googledocs.delete);

	app.route('/googledocsByLesson/:lessonId')
		.get(googledocs.listGoogleDocsByLesson);

	// Finish by binding the Googledoc middleware
	app.param('googledocId', googledocs.googledocByID);
};
