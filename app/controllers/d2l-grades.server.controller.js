'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	D2lGrade = mongoose.model('D2lGrade'),
	_ = require('lodash');

/**
 * Create a D2l grade
 */
exports.create = function(req, res) {
	//var d2lGrade = new D2lGrade(req.body);
	//d2lGrade.user = req.user;

	//Check whether it is already existing
	// require user id and hw id


	D2lGrade.find({Assignment: req.body.Assignment, student:req.body.student}).exec(function(err, result){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {

			if(result.length == 0){
				var d2lGrade = new D2lGrade(req.body);
				d2lGrade.save(function(err) {
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						res.jsonp(d2lGrade);
					}
				});
			}
			else{
				//update
				req.d2lGrade = result[0];
				var d2lGrade = req.d2lGrade ;
				d2lGrade = _.extend(d2lGrade , req.body);
				d2lGrade.save(function(err) {
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						res.jsonp(d2lGrade);
					}
				});
			}
		}
	});
};

/**
 * Show the current D2l grade
 */
exports.read = function(req, res) {
	res.jsonp(req.d2lGrade);
};

/**
 * Update a D2l grade
 */
exports.update = function(req, res) {
	var d2lGrade = req.d2lGrade ;

	d2lGrade = _.extend(d2lGrade , req.body);

	d2lGrade.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lGrade);
		}
	});
};

/**
 * Delete an D2l grade
 */
exports.delete = function(req, res) {
	var d2lGrade = req.d2lGrade ;

	d2lGrade.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lGrade);
		}
	});
};

/**
 * List of D2l grades
 */
exports.list = function(req, res) {
	var populationQuery = [{path:'class', select:'name prefix'}, {path:'student', select:'displayName email username'}, {path:'instructor', select:'displayName email username'}];
	D2lGrade.find().sort('-created').populate(populationQuery).exec(function(err, d2lGrades) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lGrades);
		}
	});
};

/**
 * D2l grade middleware
 */
exports.d2lGradeByID = function(req, res, next, id) { 
	D2lGrade.findById(id).populate('user', 'displayName').exec(function(err, d2lGrade) {
		if (err) return next(err);
		if (! d2lGrade) return next(new Error('Failed to load D2l grade ' + id));
		req.d2lGrade = d2lGrade ;
		next();
	});
};

/**
 * D2l grade authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.d2lGrade.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};


exports.listByClass= function(req, res) {
	var populationQuery = [
		//{path:'class', select:'name prefix'},
		{path:'student', select:'displayName email username'},
		{path:'instructor', select:'displayName email username'}];
	D2lGrade.find({class: req.params.classId}).sort('-created').populate(populationQuery).exec(function(err, d2lGrades) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(d2lGrades);
		}
	});
};