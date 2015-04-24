'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var d2lHwsSubmits = require('../../app/controllers/d2l-hws-submits.server.controller');

	// D2l hws submits Routes
	app.route('/d2l-hws-submits')
		.get(d2lHwsSubmits.list)
		.post(d2lHwsSubmits.create);

	app.route('/d2l-hws-submits/submitted')
		.get(d2lHwsSubmits.listSubmission);

	app.route('/d2l-hws-submits/submitted/byClass/:classId')
		.get(d2lHwsSubmits.listSubmissionByClass)


	app.route('/d2l-hws-submits/:d2lHwsSubmitId')
		.get(d2lHwsSubmits.read)
		.put(users.requiresLogin, d2lHwsSubmits.hasAuthorization, d2lHwsSubmits.update)
		.delete(users.requiresLogin, d2lHwsSubmits.hasAuthorization, d2lHwsSubmits.delete);

	app.route('/d2l-hws-submits/getBydocId/:docId/:userId')
		.get(d2lHwsSubmits.getSubmitInfo);

	app.route('/d2l-hws-submits/getBydocIdGS/:docId')
		.get(d2lHwsSubmits.getSubmitInfoGS)
		.put(d2lHwsSubmits.updateSubmitInfoGS);



	// Finish by binding the D2l hws submit middleware
	app.param('d2lHwsSubmitId', d2lHwsSubmits.d2lHwsSubmitByID);
};
