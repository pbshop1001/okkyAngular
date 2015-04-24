"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Mean event Schema
 */
var MeanEventSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Mean event name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('MeanEvent', MeanEventSchema);
