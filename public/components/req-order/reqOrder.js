'use strict';
angular
    .module("logiWebMain")
    .controller("reqOrderCtrl", ["$scope", "reqOrderService", '$window', function($scope, reqOrderService, $window) {
        $scope.addReqOder = function() {
            // body...
        }
        $scope.orders = [];
        $scope.init = function() {
            reqOrderService.getReqOrder().then(function(results) {
                var orders = [];
                if (results.length != 0) {
                    for (var i = 0; i < results.length; i++) {
                        var order = {};
                        order["id"] = results[i].id;
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
        }
        $scope.init();
        $scope.acceptOrder = function(id) {
            reqOrderService.accept(id).then(function(results) {
                $scope.init();
            }, function(user, err) {
                if (err) {
                    $window.alert("something bad happend");
                }
            })
        }
        $scope.denyOrder = function(id) {
            reqOrderService.deny(id).then(function(results) {
                $scope.init();
            }, function(user, err) {
                if (err) {
                    $window.alert("something bad happend");
                }
            })
        }
    }]);
