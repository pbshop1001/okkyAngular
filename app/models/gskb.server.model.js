/**
 * Created by kruny1001 on 1/21/15.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GskbSchema = new Schema({
    label: {
        type: String,
        default: '',
        trim: true
    },
    species:{
        type: String,
        required: '',
        trim: true
    },
    source:{
        type: String,
        default: '',
        trim: true
    },
    regType:{
        type: String,
        default: '',
        trim: true
    },
    chip:{
        type: String,
        default: '',
        trim: true
    },
    detailsUrl:{
        type: String,
        default: '',
        trim: true
    },
    nGenes:{
        type: Number,
        default:0
    },
    descriptionBrief: {
        type: String,
        default:'',
        trim: true
    },
    descriptionFull: {
        type: String,
        default:'',
        trim: true
    },
    pubmed: {
        type: String,
        default:''
    },
    firstAuthor: {
        type: String,
        default:'',
        trim: true
    },
    paperTtitle: {
        type: String,
        default:'',
        trim: true
    },
    year: {
        type: Number,
        default:0
    },
    citation: {
        type: String,
        default:'',
        trim: true
    },
    comment: {
        type: String,
        default:'',
        trim: true
    },
    genes: {
        type: String,
        default:'',
        trim: true
    },
    genesSym: {
        type: String,
        default:'',
        trim: true
    }
});

mongoose.model('gskb', GskbSchema,'gskb');
