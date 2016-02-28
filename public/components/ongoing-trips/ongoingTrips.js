'use strict';
angular
    .module("logiWebMain")
    .controller("ongoingTripsCtrl", ["$scope", "ongoingTripsService", function($scope, ongoingTripsService) {
        $scope.trips = [];
        //$scope.isRefreshing = ongoingTripsService.state.refreshing;
        $scope.error = ongoingTripsService.state.error;
        ongoingTripsService.getongoingTrips().then(function() {
            $scope.trips = ongoingTripsService.ongoingTrips;
        });
        $scope.stopTrip = function (tripId) {
            ongoingTripsService.stop(tripId).then(function (results) {
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
            ongoingTripsService.init().then(function () {
                $scope.trips = ongoingTripsService.ongoingTrips;
                $scope.isRefreshing = false;
            })
        };
    }]);
