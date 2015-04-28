'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	D2lExample = mongoose.model('D2lExample'),
	_ = require('lodash');

/**
 * Create a D2l example
 */
exports.create = function(req, res) {
	var d2lExample = new D2lExample(req.body);
	d2lExample.user = req.user;

	d2lExample.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lExample);
		}
	});
};

/**
 * Show the current D2l example
 */
exports.read = function(req, res) {
	res.jsonp(req.d2lExample);
};

/**
 * Update a D2l example
 */
exports.update = function(req, res) {
	var d2lExample = req.d2lExample ;

	d2lExample = _.extend(d2lExample , req.body);

	d2lExample.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lExample);
		}
	});
};

/**
 * Delete an D2l example
 */
exports.delete = function(req, res) {
	var d2lExample = req.d2lExample ;

	d2lExample.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lExample);
		}
	});
};

/**
 * List of D2l examples
 */
exports.list = function(req, res) { 
	D2lExample.find().sort('-created').populate('user', 'displayName').exec(function(err, d2lExamples) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lExamples);
		}
	});
};

/**
 * D2l example middleware
 */
exports.d2lExampleByID = function(req, res, next, id) { 
	D2lExample.findById(id).populate('user', 'displayName').exec(function(err, d2lExample) {
		if (err) return next(err);
		if (! d2lExample) return next(new Error('Failed to load D2l example ' + id));
		req.d2lExample = d2lExample ;
		next();
	});
};

/**
 * D2l example authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.d2lExample.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
