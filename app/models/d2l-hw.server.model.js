/*
 user would be student
 class contains instructor's user _id
*/

 'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * D2l hw Schema
 */
var D2lHwSchema = new Schema({
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
	title:{
		type: String,
		default: '',
		trim: true
	},
	desc:{
		type: String,
		default: '',
		trim: true
	},
	totalGrade:{
		type: Number,
		default: 0
	},
	percent:{
		type: Number,
		default: 0
	},
	dDate:{
		type: Date
	},
	content:{
		type: String,
		default: '',
		trim: true
	},
  gdocId:{
	  type: String,
	  default: ''
  }
});

mongoose.model('D2lHw', D2lHwSchema);
