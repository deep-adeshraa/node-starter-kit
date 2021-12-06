var mongoose = require('mongoose');

var softwareSchema = mongoose.Schema({
    name: String,
    tag: String,
    rating: { type: Number, min: 0, max: 5, default: 0 },
    details: String
});

// create the model for software and expose it to our app
module.exports = mongoose.model('Software', softwareSchema);