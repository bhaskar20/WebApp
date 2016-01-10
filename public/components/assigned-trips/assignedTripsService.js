'use strict';
angular.module('logiWebMain')
    .factory('assignedTripsService', [function() {
        var assignedTripsService = {};

        assignedTripsService.getassignedTrips = function() {
            return Parse.Cloud.run('GetMyAssignedTrips', {}).then(function(results) {
                    return results;
                },
                function(user, error) {
                    return error;
                });
        };
        return assignedTripsService;
    }])
