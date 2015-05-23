'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Googledoc = mongoose.model('Googledoc'),
	_ = require('lodash');

/**
 * Create a Googledoc
 */
exports.create = function(req, res) {
	var googledoc = new Googledoc(req.body);
	googledoc.user = req.user;

	googledoc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(googledoc);
		}
	});
};

/**
 * Show the current Googledoc
 */
exports.read = function(req, res) {
	res.jsonp(req.googledoc);
};

/**
 * Update a Googledoc
 */
exports.update = function(req, res) {
	var googledoc = req.googledoc ;

	googledoc = _.extend(googledoc , req.body);

	googledoc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(googledoc);
		}
	});
};

/**
 * Delete an Googledoc
 */
exports.delete = function(req, res) {
	var googledoc = req.googledoc ;

	googledoc.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(googledoc);
		}
	});
};

/**
 * List of Googledocs
 */
exports.list = function(req, res) { 
	Googledoc.find().sort('-created').populate('user', 'displayName').exec(function(err, googledocs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(googledocs);
		}
	});
};

/**
 * Googledoc middleware
 */
exports.googledocByID = function(req, res, next, id) {
	var populationQuery = [{path:'class', select:'name prefix'}, {path:'lesson', select:'name'},];
	Googledoc.findById(id).populate(populationQuery).exec(function(err, googledoc) {
		if (err) return next(err);
		if (! googledoc) return next(new Error('Failed to load Googledoc ' + id));
		req.googledoc = googledoc ;
		next();
	});
};

/**
 * Googledoc authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.googledoc.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

exports.listGoogleDocsByLesson = function(req, res){
	var populationQuery = [{path:'class', select:'name prefix'}];
	Googledoc.find({lesson:req.param('lessonId')}).populate(populationQuery).sort('created').exec(function(err, googleDocs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(googleDocs);
		}
	});
}
