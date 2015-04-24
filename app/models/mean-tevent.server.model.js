'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * MeanTevent Schema
 */
var MeanTeventSchema = new Schema({
	title:{
        type: String,
        default: '',
        required: 'Please fill Event title',
        trim: true
    },
    content:{
        type: String,
        default: '',
        required: 'Please fill Event content',
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

mongoose.model('MeanTevent', MeanTeventSchema);
