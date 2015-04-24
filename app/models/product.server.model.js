"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Product name',
		trim: true
	},
    parentId:{
        type: String,
        required: ''
    },
    mainimg:{
        type: String,
        default: ''
    },
    imgs:{
        type: String,
        default: ''
    },
    price:{
        type: Number,
        default: 0
    },
    description:{
        type: String,
        default: ''
    },
    detailDesc:{
        type: String,
        default:''
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

mongoose.model('Product', ProductSchema);
