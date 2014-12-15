var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MediaSchema = new Schema({
    user: String,
    created: Number,
    description: String,
    source_url: String,
    image_url: String,
    width: Number,
    height: Number
});

module.exports = mongoose.model('Media', MediaSchema);