var methods = require('../helper/gpsHelper.js');
var express = require('express');
var router = express.Router();

router.get("/api/getDataAtTimeForOneGps/:gpsId/:time", function (req, res) {
    var result = methods.getDataAtTimeForOneGps(req.params.gpsId, req.params.time);
    send.json(result);
});
router.get("/api/getDataAtTimeForMultipleGps/:gpsIds/:time", function (req, res) {
    var result = methods.getDataAtTimeForMultipleGps(JSON.parse(req.params.gpsIds), req.params.time);
    send.json(result);
});
router.get("/api/getDataBWTimeForOneGps/:gpsId/:startTime/:endTime", function (req, res) {
    var result = methods.getDataBWTimeForOneGps(req.params.gpsId, req.params.startTime, req.params.endTime);
    send.json(result);
});
router.get("/api/getDataBWTimeForMultipleGps/:gpsIds/:startTime/:endTime", function (req, res) {
    var result = methods.getDataBWTimeForOneGps(JSON.parse(req.params.gpsIds), req.params.startTime, req.params.endTime);
    send.json(result);
});

module.exports = router;

