var methods = require('../helper/gpsApiHelper.js');
var express = require('express');
var router = express.Router();
var moment = require('moment');

router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
//bhaskar 25th feb
// do we really need two methods(getDataAtTimeForOneGps,getDataAtTimeForMultipleGps)?? can't we have a single route like getDataAtTimeForGps,we can send one or multiple gps id's in a array
router.get("/getDataAtTimeForOneGps", function (req, res) {
    //res.set({'content-type': 'application/json'});
    //console.log("in getDataAtTimeForOneGps");
    //console.log(req.query.gpsId);
    //console.log(req.query.time);
    //res.json({message:"ITs; working"});
    var result = methods.getDataAtTimeForOneGps(req.query.gpsId, req.query.time);
    result.exec(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
    console.log(result);
    
});
router.get("/getDataAtTimeForMultipleGps", function (req, res) {
    //console.log("here");
    console.log(req.query.gpsIds);
    //console.log(req.query.time);
    //var arr = req.query.gpsIds.split(",");
    var result = methods.getDataAtTimeForMultipleGps(req.query.gpsIds, req.query.time);
    result.exec(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
});
router.get("/getDataBWTimeForOneGps/:gpsId/:startTime/:endTime", function (req, res) {
    var result = methods.getDataBWTimeForOneGps(req.params.gpsId, req.params.startTime, req.params.endTime);
    send.json(result);
});
router.get("/getDataBWTimeForMultipleGps/:gpsIds/:startTime/:endTime", function (req, res) {
    var result = methods.getDataBWTimeForOneGps(JSON.parse(req.params.gpsIds), req.params.startTime, req.params.endTime);
    send.json(result);
});

module.exports = router;

