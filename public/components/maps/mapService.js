'use strict';
angular.module('logiWebMain').run(["mapService", function (mapService) {
    //todo init
}])
angular.module('logiWebMain').factory('mapService', ["$q", "ongoingTripsService", "$http", "$interval", function ($q, ongoingTripsService, $http, $interval) {
    var ser = {};

    ser.gpsModels = [];
    ser.state = {
        stale: false,
        refreshing: false,
        error: null
    };
    var defer = $q.defer();
    var init = function () {
        ser.state.refreshing = true;
        var canceller = $q.defer();
        ongoingTripsService.getongoingTrips().then(function(){
            var ongoingTrips = ongoingTripsService.ongoingTrips;
            var _gpsId = ongoingTrips.map(function (el) {
                return el.gpsId;
            });
            $http({
                method: "GET",
                url: '/api/getDataAtTimeForMultipleGps/',
                params: {
                    "gpsIds": ["0358899056710760","0358899056710760"],
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
                        if (r.gpsId = copy.gpsId) {
                            _.extend(copy, r);
                        }
                    })
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

    $interval(function () {
        canceller.resolve();
        init();
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
                "gpsIds":gpdId,
                //gpsIds: _gpsId;
                //todo time
                "time": Date.now()
            },
            responseType: 'json',
            timeout: canceller.promise,
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