var Gps = require('../models/gpsApiModel.js');



module.exports = {
    getDataAtTimeForOneGps: function (gpsId, time,cb) {
        // whatever
        //console.log("in helper");
        return Gps.
          findOne({
              gpsId: gpsId,
              action: { $in: ['ping', 'alarm'] }
          }).
        //where('timeStamp').lt(time).
        sort({ 'timeStamp': 1 }).
              //limit(1).
        select({ gpsId: 1, timeStamp: 1, location: 1, speed: 1, action: 1 })
        //console.log("end helper");
    },

    getDataAtTimeForMultipleGps: function (gpsArray, time) {
        // whateve
        return Gps.
          find({
              gpsId: { $in: gpsArray },
              action: { $in: ['ping', 'alarm'] }
          }).
          //where('timeStamp').lt(time).
          sort({ 'timeStamp': 1 }).
            limit(1).
          select({ gpsId: 1, timeStamp: 1, location: 1, speed: 1, action: 1 })
    },

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
          sort({ 'timeStamp': -1 }).
          select({ gpsId: 1, timeStamp: 1, location: 1, speed: 1, action: 1 }).
          exec(function (err, result) {
              if (err) throw err;
              console.log(result);
          });
    }

};
