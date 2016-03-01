'use strict';
angular
    .module("logiWebMain")
    .controller("assignedTripsCtrl", ["$scope", "assignedTripsService", function($scope, assignedTripsService) {
        $scope.trips = [];
        //$scope.isRefreshing = assignedTripsService.state.refreshing;
        $scope.error = assignedTripsService.state.error;
        assignedTripsService.getAssignedTrips().then(function () {
            $scope.trips = assignedTripsService.assignedTrips;
        });
        $scope.startTrip = function (tripId) {
            assignedTripsService.start(tripId).then(function (results) {
                if (results) {
                    $scope.refresh();
                }
                else {
                    $window.alert("something bad happend,please try again");
}
            }, function (err) {
                if (err) {
                    $window.alert("something bad happend");
                }
            })
        }
        $scope.refresh = function () {
            $scope.isRefreshing = true;
            assignedTripsService.init().then(function () {
                $scope.trips = assignedTripsService.assignedTrips;
                $scope.isRefreshing = false;
            })
        };
    }]);
