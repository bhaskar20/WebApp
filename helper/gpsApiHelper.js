var Gps = require('../models/gpsApiModel.js');
var Promise = require("node-promise");
var moment = require('moment');


module.exports = {
    getDataAtTimeForOneGps: function (gpsId, time) {
        return Gps.
          findOne({
              gpsId: gpsId,
              action: { $in: ['ping', 'alarm'] }
          }).
        where('timeStamp').lt(time).
        sort({ 'timeStamp': 1 }).
        select({ gpsId: 1, timeStamp: 1, location: 1, speed: 1, action: 1 })
    },

    getDataAtTimeForMultipleGps: function (gpsArray, time) {
        var q = [];
        console.log(gpsArray);
        for (var i = 0; i < gpsArray.length; i++) {
            var prom = this.getDataAtTimeForOneGps(gpsArray[i], time).exec(function (err, result) {
                if (err) {
                    console.log(err);
                };

            });
            q.push(prom);
        }
        return Promise.all(q, function (res) {
            return res;
        }, function (err) {
            throw err;
        });
    },


    //return Gps.
    //  find({
    //      gpsId: { $in: gpsArray },
    //      action: { $in: ['ping', 'alarm'] }
    //  }).
    //    sort({ 'timeStamp': 1 }).
    //select({ gpsId: 1, timeStamp: 1, location: 1, speed: 1, action: 1 })
    //bhaskar
    //we can ignore optimization and make query for each gpsid in array, using getDataAtTimeForOneGps, and club the results or we can process the result from above query
    //and send the response
    //we need latest gpscoord for each gpsid in gpsArray,
    //where('timeStamp').lt(time).
    //sort({ 'timeStamp': 1 }).
    //  limit(1).
    //select({ gpsId: 1, timeStamp: 1, location: 1, speed: 1, action: 1 })
    //},

    getDataBWTimeForOneGps: function (gps, startTime, endTime) {
        // whateve
        Gps.
          find({
              gpsId: gps
          }).
          where('timeStamp').lt(endTime).gt(startTime).
          sort({ 'timeStamp': -1 }).
          select({ gpsId: 1, timeStamp: 1, location: 1, speed: 1, action: 1 }).
          exec(function (err, result) {
              if (err) throw err;
              console.log(result);
          });
    },

    getDataBWTimeForMultipleGps: function (gpsArray, startTime, endTime) {
        // whateve
        Gps.
          find({
              gpsId: { $in: gpsArray }
          }).
          where('timeStamp').lt(endTime).gt(startTime).
            //bhaskar
            //we will face same problem as above in this funtion too
          sort({ 'timeStamp': -1 }).
          select({ gpsId: 1, timeStamp: 1, location: 1, speed: 1, action: 1 }).
          exec(function (err, result) {
              if (err) throw err;
              console.log(result);
          });
    }

};
