'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var d2lLessons = require('../../app/controllers/d2l-lessons.server.controller');

	// D2l lessons Routes
	app.route('/d2l-lessons')
		.get(d2lLessons.list)
		.post(users.requiresLogin, d2lLessons.create);

	// return Ownership
	app.route('/d2l-lessonsByClassId/:d2lClassId')
		.get(d2lLessons.listLessonByClass);

	app.route('/d2l-lessons/:d2lLessonId')
		.get(d2lLessons.read)
		.put(users.requiresLogin, d2lLessons.hasAuthorization, d2lLessons.update)
		.delete(users.requiresLogin, d2lLessons.hasAuthorization, d2lLessons.delete);

	// Finish by binding the D2l lesson middleware
	app.param('d2lLessonId', d2lLessons.d2lLessonByID);
};
