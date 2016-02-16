'use strict';
angular.module('logiWebMain').run(["mapService", function (mapService) {
    //todo init
}])
angular.module('logiWebMain').factory('mapService', ["$q", "ongoingTripsService", "$http", function ($q, ongoingTripsService, $http) {
    var ser = {};

    ser.tripModels = [];
    ser.state = {
        stale: false,
        refreshing: false,
        error: null
    };
    var defer = $q.defer();

    var init = function () {
        ser.state.refreshing = true;
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
                cache: false
            }).then(function (res) {
                ser.state.refreshing = false;
                defer.resolve(res);
            }, function (err) {
                ser.state.refreshing = false;
                //handle error
                defer.reject(err);
            });
        })
    }
    init();

    ser.getInitLocations = function () {
        return defer.promise;
    }
    ser.getSpecificLocations = function () {
        //todo
    }
    return ser;
}])