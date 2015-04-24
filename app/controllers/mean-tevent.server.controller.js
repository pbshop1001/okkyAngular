'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    MeanEvent = mongoose.model('MeanEvent'),
    _ = require('lodash');

/**
 * Create a Mean tevent
 */
exports.create = function(req, res) {
    var meanEvent = new MeanEvent(req.body);
    meanEvent.user = req.user;

    meanEvent.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(meanEvent);
        }
    });
};

/**
 * Show the current Mean tevent
 */
exports.read = function(req, res) {
    res.jsonp(req.meanEvent);
};

/**
 * Update a Mean tevent
 */
exports.update = function(req, res) {
    var meanEvent = req.meanEvent ;

    meanEvent = _.extend(meanEvent , req.body);

    meanEvent.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(meanEvent);
        }
    });
};

/**
 * Delete an Mean tevent
 */
exports.delete = function(req, res) {
    var meanEvent = req.meanEvent ;

    meanEvent.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(meanEvent);
        }
    });
};

/**
 * List of Mean tevents
 */
exports.list = function(req, res) {
    MeanEvent.find().sort('-created').populate('user', 'displayName').exec(function(err, meanEvents) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(meanEvents);
        }
    });
};

/**
 * Mean event middleware
 */
exports.meanEventByID = function(req, res, next, id) {
    MeanEvent.findById(id).populate('user', 'displayName').exec(function(err, meanEvent) {
        if (err) return next(err);
        if (! meanEvent) return next(new Error('Failed to load Mean event ' + id));
        req.meanEvent = meanEvent ;
        next();
    });
};

/**
 * Mean event authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.meanEvent.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};
