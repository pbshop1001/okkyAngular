'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * User by ID
 */
exports.tst = function(req, res) {
	User.findOne({
		email: req.params.useremail
	}).exec(function(err, user) {
		req.profile = user;
		res.json(req.profile || null);
	});

};
