'use strict';
angular
    .module("logiWebMain")
    .controller("ongoingTripsCtrl", ["$scope", "ongoingTripsService", function($scope, ongoingTripsService) {
        $scope.trips = [];
        $scope.isRefreshing = ongoingTripsService.state.refreshing;
        $scope.error = ongoingTripsService.state.error;
        ongoingTripsService.getongoingTrips().then(function() {
            $scope.trips = ongoingTripsService.ongoingTrips;
        });
    }]);
