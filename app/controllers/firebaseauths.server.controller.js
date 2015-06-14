'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Firebaseauth = mongoose.model('Firebaseauth'),
	_ = require('lodash');

/**
 * Create a Firebaseauth
 */
exports.create = function(req, res) {
	var firebaseauth = new Firebaseauth(req.body);
	firebaseauth.user = req.user;

	firebaseauth.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(firebaseauth);
		}
	});
};

/**
 * Show the current Firebaseauth
 */
exports.read = function(req, res) {
	res.jsonp(req.firebaseauth);
};

/**
 * Update a Firebaseauth
 */
exports.update = function(req, res) {
	var firebaseauth = req.firebaseauth ;

	firebaseauth = _.extend(firebaseauth , req.body);

	firebaseauth.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(firebaseauth);
		}
	});
};

/**
 * Delete an Firebaseauth
 */
exports.delete = function(req, res) {
	var firebaseauth = req.firebaseauth ;

	firebaseauth.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(firebaseauth);
		}
	});
};

/**
 * List of Firebaseauths
 */
exports.list = function(req, res) { 
	Firebaseauth.find().sort('-created').populate('user', 'displayName').exec(function(err, firebaseauths) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(firebaseauths);
		}
	});
};

/**
 * Firebaseauth middleware
 */
exports.firebaseauthByID = function(req, res, next, id) { 
	Firebaseauth.findById(id).populate('user', 'displayName').exec(function(err, firebaseauth) {
		if (err) return next(err);
		if (! firebaseauth) return next(new Error('Failed to load Firebaseauth ' + id));
		req.firebaseauth = firebaseauth ;
		next();
	});
};

/**
 * Firebaseauth authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.firebaseauth.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};



/**
 * List of Firebaseauths
 */
exports.getGeo = function(req, res) {
	console.log('login');
	var get_ip = require('ipware')().get_ip;
	var ip_info = get_ip(req);
	console.log(ip_info);
	res.jsonp(ip_info);
};

