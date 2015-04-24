'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Crawling Schema
 */
var CrawlingSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Crawling name',
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

mongoose.model('Crawling', CrawlingSchema);