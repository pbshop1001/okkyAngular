'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Banner Schema
 */
var BannerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Banner name',
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
    bannerTag: {
        type: String,
        default:'',
        trim: true

    }
});

mongoose.model('Banner', BannerSchema);