// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var gpsDataSave = new Schema({
    action: { type: String, required: true },
    gpsId: { type: String, required: true },
    timeStamp: { "type": Date, default: Date.now, required: true },
    location: { type: [Number], index: '2d' },
    speed: { type: Number },
    course: { "type": Object },
    terminalInfo: { "type": Object },
    Others: { "type": Object },
    alarmData: { "type": Object }
});

// the schema is useless so far
// we need to create a model using it
var Gps = mongoose.model('gpsdatas', gpsDataSave);

// make this available to our users in our Node applications
module.exports = Gps;