'use strict';
angular
    .module("logiWebMain")
    .controller("assignedTripsCtrl", ["$scope", "assignedTripsService", function($scope, assignedTripsService) {
        $scope.trips = [];
        $scope.isRefreshing = assignedTripsService.state.refreshing;
        $scope.error = assignedTripsService.state.error;
        assignedTripsService.getAssignedTrips().then(function () {
            $scope.trips = assignedTripsService.assignedTrips;
        });

        $scope.startTrip = function (tripId) {
            reqOrderService.start(tripId).then(function (results) {
                $scope.init();
            }, function (user, err) {
                if (err) {
                    $window.alert("something bad happend");
                }
            })
        }
    }]);
