'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Googledoc Schema
 */
var GoogledocSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Googledoc name',
		trim: true
	},
	link:{
		type: String,
		default:''
	},
	contentType:{
		type:String,
		default: false
	},
	class:{
		type: Schema.ObjectId,
		ref: 'D2lClass'
	},
	lesson:{
		type: Schema.ObjectId,
		ref: 'D2lLesson'
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

mongoose.model('Googledoc', GoogledocSchema);