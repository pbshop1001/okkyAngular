'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	D2lClass = mongoose.model('D2lClass'),
	_ = require('lodash');

/**
 * Create a D2l class
 */
exports.create = function(req, res) {
	var d2lClass = new D2lClass(req.body);
	d2lClass.user = req.user;

	d2lClass.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lClass);
		}
	});
};

/**
 * Show the current D2l class
 */
exports.read = function(req, res) {
	res.jsonp(req.d2lClass);
};

/**
 * Update a D2l class
 */
exports.update = function(req, res) {
	var d2lClass = req.d2lClass ;

	d2lClass = _.extend(d2lClass , req.body);

	d2lClass.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lClass);
		}
	});
};

/**
 * Delete an D2l class
 */
exports.delete = function(req, res) {
	var d2lClass = req.d2lClass ;

	d2lClass.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lClass);
		}
	});
};

/**
 * List of D2l classes
 */
exports.list = function(req, res) { 
	D2lClass.find().sort('-created').populate('user', 'displayName').exec(function(err, d2lClasses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lClasses);
		}
	});
};


exports.listOwnClass = function(req, res) {
	//console.log(req.user._id);
	D2lClass.find({user:req.user}).sort('-created').populate('user', 'displayName').exec(function(err, d2lClasses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lClasses);
		}
	});
};

/**
 * D2l class middleware
 */
exports.d2lClassByID = function(req, res, next, id) { 
	D2lClass.findById(id).populate('user', 'displayName').exec(function(err, d2lClass) {
		if (err) return next(err);
		if (! d2lClass) return next(new Error('Failed to load D2l class ' + id));
		req.d2lClass = d2lClass ;
		next();
	});
};

/**
 * D2l class authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.d2lClass.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
