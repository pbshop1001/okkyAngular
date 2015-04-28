'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * D2l lesson Schema
 */
var D2lLessonSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill D2l lesson name',
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
		type: Boolean,
		default: true
	},
	example:[{
		type: Schema.ObjectId,
		ref: 'D2lExample'
	}],
	body:{
		type:'String',
		default: '',
		trim: true

	}
});

mongoose.model('D2lLesson', D2lLessonSchema);