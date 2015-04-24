'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * D2l grade Schema
 */
var D2lGradeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill D2l grade name',
		trim: true
	},
	Assignment:{
		type: Schema.ObjectId,
		ref:'D2lHwsSubmit'
	},
	grade:{
		type:Number,
		default:0
	},
	created: {
		type: Date,
		default: Date.now
	},
	student: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	instructor: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	class:{
		type: Schema.ObjectId,
		ref:'D2lClass'
	},
	comment:{
		type: String
	}
});

mongoose.model('D2lGrade', D2lGradeSchema);
