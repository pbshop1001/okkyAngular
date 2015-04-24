/**
 * Created by kruny1001 on 1/21/15.
 */

'use strict';

module.exports = function(app) {
    //var users = require('../../app/controllers/users.server.controller');
    var gskbAnalysis = require('../../app/controllers/gskbAnalysis.server.controller');

    // gskbs Routes
    app.route('/gskbs-analysis/year')
        .get(gskbAnalysis.list)
        .post(gskbAnalysis.getTotalIndexByYear);

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
