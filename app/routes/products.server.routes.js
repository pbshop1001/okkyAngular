'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var products = require('../../app/controllers/products.server.controller');
    var banners = require('../../app/controllers/banners.server.controller');

	// Products Routes
	app.route('/products')
		.get(products.list)
		.post(users.requiresLogin, products.create);
	
	app.route('/products/:productId')
		.get(products.read)

		// TODO: Production
		// this should be able when production release
		//.put(users.requiresLogin, products.hasAuthorization, products.update)
		.put(users.requiresLogin, products.update)

		//.delete(users.requiresLogin, products.hasAuthorization, products.delete);
		.delete(users.requiresLogin, products.hasAuthorization, products.delete);

    app.route('/products/list/:bannerId')
        .get(products.listByParentId);

	app.route('/products/find/:userId')
		.get(products.findProductsByUserId);

	// Finish by binding the Product middleware
	app.param('productId', products.productByID);

    app.param('bannerId', banners.bannerByID);
};
