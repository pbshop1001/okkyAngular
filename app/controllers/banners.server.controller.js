"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Banner = mongoose.model('Banner'),
	_ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Banner already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Banner
 */
exports.create = function(req, res) {
	var banner = new Banner(req.body);
	banner.user = req.user;

	banner.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(banner);
		}
	});
};

/**
 * Show the current Banner
 */
exports.read = function(req, res) {
	res.jsonp(req.banner);
};

/**
 * Update a Banner
 */
exports.update = function(req, res) {
	var banner = req.banner ;

	banner = _.extend(banner , req.body);

	banner.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(banner);
		}
	});
};

/**
 * Delete an Banner
 */
exports.delete = function(req, res) {
	var banner = req.banner ;

	banner.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(banner);
		}
	});
};

/**
 * List of Banners
 */
exports.list = function(req, res) { Banner.find().sort('-created').populate('user', 'displayName').exec(function(err, banners) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(banners);
		}
	});
};

/**
 * Banner middleware
 */
exports.bannerByID = function(req, res, next, id) { Banner.findById(id).populate('user', 'displayName').exec(function(err, banner) {
		if (err) return next(err);
		if (! banner) return next(new Error('Failed to load Banner ' + id));
		req.banner = banner ;
		next();
	});
};

exports.findBannersByUserId = function(req ,res) {
	Banner.find({user: new ObjectId(req.params.userId)}).sort('-created').populate('user', 'displayName').exec(function(err, products) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.header('Content-Type', 'application/json; charset=utf-8');
			res.jsonp(products);
		}
	});
}
/**
 * Banner authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.banner.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};
