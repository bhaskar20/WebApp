'use strict';
angular.module('logiWebMain').factory('mapService', ["$q", "ongoingTripsService", "$http", "$interval", function ($q, ongoingTripsService, $http, $interval) {
    var ser = {};

    ser.gpsModels = [];
    ser.state = {
        stale: false,
        refreshing: false,
        error: null
    };
    var defer = $q.defer();
    var canceller = null;

    ser.init = function () {
        ser.state.refreshing = true;
        canceller = $q.defer();
        ongoingTripsService.getongoingTrips().then(function(){
            var ongoingTrips = ongoingTripsService.ongoingTrips;
            var _gpsId = ongoingTrips.map(function (el) {
                return el.gpsId;
            });
            $http({
                method: "GET",
                url: '/api/getDataAtTimeForMultipleGps',
                //take _gpsId
                params: {
                    "gpsIds": _gpsId,
                    //gpsIds: _gpsId;
                    time: Date.now()
                },
                responseType: 'json',
                timeout:canceller.promise,
                cache: false
            }).then(function (res) {
                ser.gpsModels = ongoingTrips.map(function (el) {
                    var copy = el;
                    res.data.forEach(function (r) {
                        if (r.gpsId === copy.gpsId) {
                            _.extend(copy, r);
                        }
                    });
                    return copy;
                    //merge the objkects
                });
                ser.state.refreshing = false;
                defer.resolve();
            }, function (err) {
                ser.state.refreshing = false;
                //handle error
                defer.reject();
            });
        })
    }
    //cancel unfinished request and make new one in every 10 secs 
    $interval(function () {
        canceller.resolve();
        ser.init();
    },10000);

    ser.getInitLocations = function () {
        return defer.promise;
    }

    ser.getSpecificLocations = function (gpdId,time) {
        var defer = $q.defer();
        $http({
            method: "GET",
            url: '/api/getDataAtTimeForOneGps/',
            params: {
                "gpsId":gpdId,
                //gpsIds: _gpsId;
                //todo time
                "time": Date.now()
            },
            responseType: 'json',
            //timeout: canceller.promise,
            cache: false
        }).then(function (res) {    
            defer.resolve(res);
        }, function (err) {
            //handle error
            defer.reject(err);
        });
        return defer.promise;
    }
    return ser;
}])