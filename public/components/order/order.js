'use strict';
angular
    .module("logiWebMain")
    .controller("orderCtrl", ["$scope", "orderService","$uibModal",function($scope, orderService,$uibModal) {
        $scope.assignLoadOrder = function() {
            // todo
        }
        $scope.orders = [];
        $scope.init = function() {
            orderService.getOrder().then(function(results) {
                var orders = [];
                if (results.length != 0) {
                    for (var i = 0; i < results.length; i++) {
                        var order = {};
                        order["id"] = results[i].id;
                        if (results[i].get("OrderType")) {
                            order["orderType"] = "Client";
                        } else {
                            order["orderType"] = "Agent";
                        }
                        order["startLocation"] = (results[i].get("StartLocation").latitude + "," + results[i].get("StartLocation").longitude);
                        order["endLocation"] = (results[i].get("EndLocationLong") + " , " + results[i].get("EndLocationLat"));
                        order["tons"] = results[i].get("Tons");
                        order["tonDone"] = results[i].get("TonDone");
                        order["deadline"] = results[i].get("DeadLine");
                        order["waitTime"] = results[i].get("WaitTime");
                        orders.push(order);
                    }
                    $scope.orders = orders;
                    $scope.$apply();
                }
            });
        }
        $scope.init();
        $scope.sayHi = function () {
            console.log("Hii");
        };
        $scope.assignTrip = function(id) {
            $scope.assignTripOrderId=id;
            var assignModalInstance = $uibModal.open({
                animation: 'true',
                templateUrl: 'components/order/assignTrips.html',
                controller: 'assignTripCtrl',
                backdrop:'static',
                size: size,
                resolve:{
                    id:function () {
                        return $$scope.assignTripOrderId;
                    }
                }
            });
        }
    }])
    // .controller('assignTripCtrl', ['$scope','$uibModalInstance','orderService','id', function($scope, $uibModalInstance,orderService,id){
    //    $scope.orderId = id;
    //    $scope.res = {}
    //    $scope.ok =function (res) {
           

    //    }
    //    $scope.close = function (res) {
           
    //    }
    // }])