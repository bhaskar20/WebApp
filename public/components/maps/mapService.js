'use strict';
angular.module('logiWebMain')
    .factory('mapService', ["$q",function ($q) {
        var mapService = {};
        mapService.ongoingTrips;
        mapService.errors = [];
        var init = function () {
            var defer = $q.defer();
            Parse.Cloud.run('GetMyAssignedTrips', {}).then(function (results) {
                mapService.ongoingTrips = results;
                _.forEach(results, function (result) {
                    //todo save info required
                    defer.resolve();
                })
            },
                function (user, error) {
                    mapService.errors.push(error);
                    defer.reject();
                });
            defer.then(function () {
                //call gps api for initial coordinates of gpsids
            })
        }
        init();

        mapService.setWatch = function (arr) {
            //for each item in arr, set interval and call api in 10-15 sec and return current pos
        }

        return mapService;
    }])