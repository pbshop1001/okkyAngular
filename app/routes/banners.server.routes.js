"use strict";

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var banners = require('../../app/controllers/banners.server.controller');

	var expressJwt = require('express-jwt');
	var jwtSecret = 'fjkdlsajfoew239053/3uk';
	//app.use(expressJwt({ secret:jwtSecret }).unless({ path: ['/banners']}));

	// Banners Routes

	app.route('/banners')
		.get(banners.list)
		.post(users.requiresLogin, banners.create);

	app.route('/banners/:bannerId')
		.get(banners.read)
		.put(users.requiresLogin, banners.hasAuthorization, banners.update)
		.delete(users.requiresLogin, banners.hasAuthorization, banners.delete);

	app.route('/banners/find/:userId')
		.get(banners.findBannersByUserId);

	// Finish by binding the Banner middleware
	app.param('bannerId', banners.bannerByID);
};
