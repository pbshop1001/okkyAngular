/**
 * Created by kruny1001 on 1/21/15.
 */

'use strict';

module.exports = function(app) {
    //var users = require('../../app/controllers/users.server.controller');
    var gskb = require('../../app/controllers/gskb.server.controller');

    // gskbs Routes
    app.route('/gskbs')
        .get(gskb.list);

    app.route('/gs')
        .get(gskb.gs);

	  app.route('/gskbs/indexQuery')
		  .get(gskb.indexQuery);

    app.route('/gskbs/totalIndex')
        .get(gskb.getTotalbyKeyword);

		app.route('/gskbs/query/:index')
			.get(gskb.queryIndex);

		//app.param('g', products.gskbByID);
		//app.get('/gskbs/listdocs',
		//	passport.authenticate('google', { scope : ['profile', 'email'] }));

    /*
    app.route('/products/list/:bannerId')
        .get(products.listByParentId);

    app.route('/products/find/:userId')
        .get(products.findProductsByUserId);

    // Finish by binding the Product middleware
    app.param('g', products.gskbByID);

    app.param('bannerId', banners.bannerByID);
    */
};
