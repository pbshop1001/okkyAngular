'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var d2lGrades = require('../../app/controllers/d2l-grades.server.controller');

	// D2l grades Routes
	app.route('/d2l-grades')
		.get(d2lGrades.list)
		.post(d2lGrades.create);

	app.route('/d2l-grades/:d2lGradeId')
		.get(d2lGrades.read)
		.put(users.requiresLogin, d2lGrades.hasAuthorization, d2lGrades.update)
		.delete(users.requiresLogin, d2lGrades.hasAuthorization, d2lGrades.delete);


	app.route('/d2l-grades/byClass/:classId')
		.get(d2lGrades.listByClass)

	// Finish by binding the D2l grade middleware
	app.param('d2lGradeId', d2lGrades.d2lGradeByID);
};
