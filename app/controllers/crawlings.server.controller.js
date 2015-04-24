'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Crawling = mongoose.model('Crawling'),

	_ = require('lodash');



/**
 * Create a Crawling
 */
exports.create = function(req, res) {
	var crawling = new Crawling(req.body);
	crawling.user = req.user;

	crawling.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crawling);
		}
	});
};

/**
 * Show the current Crawling
 */
exports.read = function(req, res) {
	res.jsonp(req.crawling);
};

/**
 * Update a Crawling
 */
exports.update = function(req, res) {
	var crawling = req.crawling ;

	crawling = _.extend(crawling , req.body);

	crawling.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crawling);
		}
	});
};

/**
 * Delete an Crawling
 */
exports.delete = function(req, res) {
	var crawling = req.crawling ;

	crawling.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crawling);
		}
	});
};

/**
 * List of Crawlings
 */
exports.list = function(req, res) { 
	Crawling.find().sort('-created').populate('user', 'displayName').exec(function(err, crawlings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crawlings);
		}
	});
};

/**
 * Crawling middleware
 */
exports.crawlingByID = function(req, res, next, id) { 
	Crawling.findById(id).populate('user', 'displayName').exec(function(err, crawling) {
		if (err) return next(err);
		if (! crawling) return next(new Error('Failed to load Crawling ' + id));
		req.crawling = crawling ;
		next();
	});
};

/**
 * Crawling authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.crawling.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
