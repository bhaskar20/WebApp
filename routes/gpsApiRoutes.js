var methods = require('../helper/gpsApiHelper.js');
var express = require('express');
var router = express.Router();
var moment = require('moment');

//router.get('/', function (req, res) {
//    res.json({ message: 'hooray! welcome to our api!' });
//});

//console.log(moment("2016-03-03T02:38:05.000Z").unix());
//bhaskar 25th feb
// do we really need two methods(getDataAtTimeForOneGps,getDataAtTimeForMultipleGps)?? 
//can't we have a single route like getDataAtTimeForGps,we can send one or multiple gps id's in a array
router.get("/getDataAtTimeForOneGps", function (req, res) {
    var result = methods.getDataAtTimeForOneGps(req.query.gpsId, moment.unix(req.query.time));
    result.exec(function (err, result) {
        if (err) { console.log(err); throw err; };
    }).then(function (data) {
        res.json(data);
    });

});
router.get("/getDataAtTimeForMultipleGps", function (req, res) {
    var result = methods.getDataAtTimeForMultipleGps(req.query.gpsIds, moment.unix(req.query.time));
    console.log(result);
    result.then(function (data) {
        res.json(data);
    });
});
//router.get("/getDataBWTimeForOneGps/:gpsId/:startTime/:endTime", function (req, res) {
//    var result = methods.getDataBWTimeForOneGps(req.params.gpsId, req.params.startTime, req.params.endTime);
//    send.json(result);
//});
//router.get("/getDataBWTimeForMultipleGps/:gpsIds/:startTime/:endTime", function (req, res) {
//    var result = methods.getDataBWTimeForOneGps(JSON.parse(req.params.gpsIds), req.params.startTime, req.params.endTime);
//    send.json(result);
//});

module.exports = router;

