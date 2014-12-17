var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MediaSchema = new Schema({
    user: String,
    created: { type: Date, default: Date.now },
    description: String,
    source_url: String,
    image_url: String,
    width: Number,
    height: Number,
    filename: String,
    mimeType: String
});

module.exports = mongoose.model('Media', MediaSchema);