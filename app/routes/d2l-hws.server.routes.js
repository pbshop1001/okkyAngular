'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var d2lHws = require('../../app/controllers/d2l-hws.server.controller');

	// D2l hws Routes
	app.route('/d2l-hws')
		.get(d2lHws.list)
		.post(users.requiresLogin, d2lHws.create);

	app.route('/d2l-hws/:d2lHwId')
		.get(d2lHws.read)
		.put(users.requiresLogin, d2lHws.hasAuthorization, d2lHws.update)
		.delete(users.requiresLogin, d2lHws.hasAuthorization, d2lHws.delete);

	app.route('/d2l-hws/getGDoc/:gdocId')
		.get(d2lHws.getOriginDoc)

	app.route('/d2l-hws/byClass/:classId')
		.get(d2lHws.listByClass)

	// Finish by binding the D2l hw middleware
	app.param('d2lHwId', d2lHws.d2lHwByID);
};
