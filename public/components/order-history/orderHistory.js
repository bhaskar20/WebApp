'use strict';
angular
    .module("logiWebMain")
    .controller("orderHistoryCtrl", ["$scope", "orderHistoryService", function($scope, orderHistoryService) {
        $scope.orders = [];
        orderHistoryService.getOrderHistory().then(function(results) {
            var orders = [];
            if (results.length != 0) {
                for (var i = 0; i < results.length; i++) {
                    var order = {};
                    order["orderNo"]=results[i].id;
                    if (results[i].get("OrderType")) {
                        order["orderType"] = "Client";
                    } else {
                        order["orderType"] = "Agent";
                    }
                    order["startLocation"] = (results[i].get("StartLocation").latitude + "," + results[i].get("StartLocation").longitude);
                    order["endLocation"] = (results[i].get("EndLocationLong") + " , " + results[i].get("EndLocationLat"));
                    order["tons"] = results[i].get("Tons");
                    order["tonDone"] = results[i].get("TonDone");
                    order["CompletedTime"] = "NA"
                    order["deadline"] = results[i].get("DeadLine");
                    order["waitTime"] = results[i].get("WaitTime");
                    orders.push(order);
                }
                $scope.orders=orders;
                $scope.$apply()
            }
        });
    }]);
