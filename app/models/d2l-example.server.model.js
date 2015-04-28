'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * D2l example Schema
 */
var D2lExampleSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill D2l example name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	class:{
		type: Schema.ObjectId,
		ref: 'D2lClass'
	},
	contentType:{
		type: 'Boolean',
		default: true
	},
	link:{
		type: 'String',
		default: '',
		trim: true
	},
	body:{
		type:'String',
		default: '',
		trim: true
	}
});

mongoose.model('D2lExample', D2lExampleSchema);