'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	D2lLesson = mongoose.model('D2lLesson'),
	_ = require('lodash');

/**
 * Create a D2l lesson
 */
exports.create = function(req, res) {
	var d2lLesson = new D2lLesson(req.body);
	d2lLesson.user = req.user;

	d2lLesson.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lLesson);
		}
	});
};

/**
 * Show the current D2l lesson
 */
exports.read = function(req, res) {
	res.jsonp(req.d2lLesson);
};

/**
 * Update a D2l lesson
 */
exports.update = function(req, res) {
	var d2lLesson = req.d2lLesson ;

	d2lLesson = _.extend(d2lLesson , req.body);

	d2lLesson.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lLesson);
		}
	});
};

/**
 * Delete an D2l lesson
 */
exports.delete = function(req, res) {
	var d2lLesson = req.d2lLesson ;

	d2lLesson.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lLesson);
		}
	});
};

/**
 * List of D2l lessons
 */
exports.list = function(req, res) { 
	D2lLesson.find().sort('-created').populate('user', 'displayName').exec(function(err, d2lLessons) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lLessons);
		}
	});
};

/**
 * D2l lesson middleware
 */
exports.d2lLessonByID = function(req, res, next, id) {
	var populationQuery = [{path:'class', select:'name prefix'},{path:'user', select:'displayName'}];
	D2lLesson.findById(id).populate(populationQuery).exec(function(err, d2lLesson) {
		if (err) return next(err);
		if (! d2lLesson) return next(new Error('Failed to load D2l lesson ' + id));
		req.d2lLesson = d2lLesson ;
		next();
	});
};

/**
 * D2l lesson authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.d2lLesson.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};


exports.listLessonByClass = function(req, res) {
	var populationQuery = [{path:'class', select:'name prefix'}];
	D2lLesson.find({class:req.param('d2lClassId')}).populate(populationQuery).sort('created').exec(function(err, d2lLessons) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lLessons);
		}
	});
};
