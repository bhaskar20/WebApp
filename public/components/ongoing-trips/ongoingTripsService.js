'use strict';
angular.module('logiWebMain')
    .factory('ongoingTripsService', [function() {
        var ongoingTripsService = {};

        ongoingTripsService.getongoingTrips = function() {
            return Parse.Cloud.run('GetMyAssignedTrips', {}).then(function(results) {
                    return results;
                },
                function(user, error) {
                    return error;
                });
        };
        return ongoingTripsService;
    }])
