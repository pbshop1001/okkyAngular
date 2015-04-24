'use strict';



module.exports = function(app) {
	var gs = require('../../app/controllers/gs-api.server.controller');

	app.route('/gsapiv1/:useremail').get(gs.tst);
};
