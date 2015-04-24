'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * D2l class Schema
 */
var D2lClassSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill D2l class name',
		trim: true
	},
    prefix: {
        type: String,
        default: '',
        trim: true
    },
	created: {
		type: Date,
		default: Date.now
	},
	// Instructor
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('D2lClass', D2lClassSchema);
