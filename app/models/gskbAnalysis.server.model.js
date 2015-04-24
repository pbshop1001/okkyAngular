
/**
 * Created by kruny1001 on 1/21/15.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GskbAnalysisSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    result:{
        type: Schema.Types.Mixed,
    },
    date:{
        type: Date
    }
});

mongoose.model('gskbAnalysis', GskbAnalysisSchema);
