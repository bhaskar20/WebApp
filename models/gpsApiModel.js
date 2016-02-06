// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var gpsSchema = new Schema({
    gpsId: { type: String, required: true },
    location: { type: [Number, Number], required: true },
    speed: { type: Number, required: true },
    createdAt: { "type": Date, default: Date.now, required: true }
});

// the schema is useless so far
// we need to create a model using it
var Gps = mongoose.model('Gps', gpsSchema);

// make this available to our users in our Node applications
module.exports = Gps;