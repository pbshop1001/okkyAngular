'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	D2lHw = mongoose.model('D2lHw'),
	D2lClass = mongoose.model('D2lClass'),
	User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create a D2l hw
 */
exports.create = function(req, res, next) {
	var d2lHw = new D2lHw(req.body);
	d2lHw.user = req.user;
	//Not Working
	//d2lHw.class = req.body.class._id;
	//d2lHw.class = D2lClass({_id: req.body.class._id});

	d2lHw.save(function(err) {
		if (err) {
            console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {

			res.jsonp(d2lHw);

		}
	});
};

/**
 * Show the current D2l hw
 */
exports.read = function(req, res) {
	D2lClass.populate(req.d2lHw, {path:"class", model: 'D2lClass'},function(error, found){
		//console.log(found);
		res.jsonp(found);
	});
	//res.jsonp(req.d2lHw);
};

/**
 * Update a D2l hw
 */
exports.update = function(req, res) {
	var d2lHw = req.d2lHw ;

	d2lHw = _.extend(d2lHw , req.body);

	d2lHw.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lHw);
		}
	});
};

/**
 * Delete an D2l hw
 */
exports.delete = function(req, res) {
	var d2lHw = req.d2lHw ;

	d2lHw.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lHw);
		}
	});
};

/**
 * List of D2l hws
 */
exports.list = function(req, res) { 
	D2lHw.find().sort('-created').populate('user', 'displayName').exec(function(err, d2lHws) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {

            D2lClass.populate(d2lHws, {path:"class", model: 'D2lClass'},function(error, found){
                    //console.log(found);
                    res.jsonp(found);
                });

		}
	});
};

/**
 * D2l hw middleware
 */
exports.d2lHwByID = function(req, res, next, id) { 
	D2lHw.findById(id).populate('user', 'displayName').exec(function(err, d2lHw) {
		if (! d2lHw) return next(new Error('Failed to load D2l hw ' + id));
		if (err) return next(err);
		req.d2lHw = d2lHw ;
		//console.log(d2lHw);
		next();
	});
};

/**
 * D2l hw authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.d2lHw.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

exports.getOriginDoc = function(req, res){
	D2lHw.find({gdocId: req.params.gdocId}).exec(function(err, result){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			D2lClass.populate(result, {path:"class", model: 'D2lClass'},function(error, found){
				User.populate(result, {path:"user", model:"User", select:'displayName email'}, function(error, user){
					res.jsonp(user);
				});

			});
		}
	});
}

exports.listByClass = function(req, res){
	D2lHw.find({class: req.params.classId}).exec(function(err, result){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			D2lClass.populate(result, {path:"class", model: 'D2lClass'},function(error, found){
				User.populate(result, {path:"user", model:"User", select:'displayName email'}, function(error, user){
					res.jsonp(user);
				});

			});
		}
	});
}
