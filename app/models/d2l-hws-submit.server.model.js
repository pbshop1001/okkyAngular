'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * D2l hws submit Schema
 */
var D2lHwsSubmitSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill D2l hws submit name',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	class:{
		type: Schema.ObjectId,
		ref: 'D2lClass'
	},
	instructor:{
		type:Schema.ObjectId,
		ref: 'User'
	},
	originId:{
		type: String,
		trim: true
	},
	docId: {
		type: String,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	userEmail: {
		type: String,
		trim: true
	},
	submission:{
    type: Boolean,
    default: false
	}

});

mongoose.model('D2lHwsSubmit', D2lHwsSubmitSchema);
