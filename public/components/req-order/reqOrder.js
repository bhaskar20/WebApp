'use strict';
angular
    .module("logiWebMain")
    .controller("reqOrderCtrl", ["$scope", "reqOrderService", function($scope, reqOrderService) {
        $scope.addReqOder = function() {
            // body...
        }
        reqOrderService.getReqOrder().then(function(results) {
            var orders = [];
            if (results.length != 0) {
                for (var i = 0; i < results.length; i++) {
                    var order = {};
                    order["bookerId"] = results[i].get("BookerId");
                    order["startLocation"] = results[i].get("StartLocation").latitude + " , " + results[i].get("StartLocation").longitude;
                    order["endLocation"] = results[i].get("EndLocationLong") + " , " + results[i].get("EndLocationLat");
                    order["tons"] = results[i].get("Tons");
                    order["startTime"] = results[i].get("StartTime");
                    orders.push(order);
                }
                $scope.orders = orders;
                $scope.$apply;
            }
        })
    }]);
