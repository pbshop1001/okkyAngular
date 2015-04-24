"use strict";

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var meanEvents = require('../../app/controllers/mean-events.server.controller');

	// Mean events Routes
	app.route('/mean-events')
		.get(meanEvents.list)
		.post(users.requiresLogin, meanEvents.create);

	app.route('/mean-events/:meanEventId')
		.get(meanEvents.read)
		.put(users.requiresLogin, meanEvents.hasAuthorization, meanEvents.update)
		.delete(users.requiresLogin, meanEvents.hasAuthorization, meanEvents.delete);

	// Finish by binding the Mean event middleware
	app.param('meanEventId', meanEvents.meanEventByID);
};
