'use strict';
angular
    .module("logiWebMain")
    .controller("assignedTripsCtrl", ["$scope", "assignedTripsService", function($scope, assignedTripsService) {
        $scope.trips = [];
        assignedTripsService.getassignedTrips().then(function(results) {
            var trips = [];
            if (results.length != 0) {
                for (var i = 0; i < results.length; i++) {
                    var order = {};
                    order["tripId"]=results[i].id;
                    order["gpsId"]=results[i].get("GpsId");
                    order["orderId"]=results[i].get("OrderId");
                    order["startTime"]=results[i].get("StartTime");
                    order["startLocation"] = (results[i].get("StartLocation").latitude + "," + results[i].get("StartLocation").longitude);
                    order["endLocation"] = (results[i].get("EndLocationLong") + " , " + results[i].get("EndLocationLat"));
                    order["salesId"] = results[i].get("SalesId");
                    order["kamId"] = results[i].get("KamId");
                    trips.push(order);
                }
                $scope.trips=trips;
                $scope.$apply()
            }
        });
    }]);
