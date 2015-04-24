'use strict';


module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var crawlings = require('../../app/controllers/crawlings.server.controller');

	var wiki = require('../../app/controllers/crawling/wiki.js');

	// Crawlings Routes
	app.route('/crawlings')
		.get(crawlings.list)
		.post(users.requiresLogin, crawlings.create);

	app.route('/crawlings/:crawlingId')
		.get(crawlings.read)
		.put(users.requiresLogin, crawlings.hasAuthorization, crawlings.update)
		.delete(users.requiresLogin, crawlings.hasAuthorization, crawlings.delete);

	//scrap route
	app.route('/scrap').get(wiki.search);

	// Finish by binding the Crawling middleware
	app.param('crawlingId', crawlings.crawlingByID);
};
