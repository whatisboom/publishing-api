var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    mediaId: {
        type: String,
        required: '{PATH} is required.'
    },
    description: String,
    url: String,
    user: {
        type: String,
        required: '{PATH} is required.'
    },
    network: {
        type: String,
        required: '{PATH} is required.'
    }
});

module.exports = mongoose.model('Post', PostSchema);