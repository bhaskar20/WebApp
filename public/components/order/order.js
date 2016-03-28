'use strict';
angular
    .module("logiWebMain")
    .controller("orderCtrl", ["$scope", "orderService", "$uibModal", function($scope, orderService, $uibModal) {
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
                        order["endLocation"] = (results[i].get("EndLocationLong") + "," + results[i].get("EndLocationLat"));
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
        $scope.assignTrip = function(id, start, end) {
            $scope.tempData = {
                "orderId": id,
                "startLocationLat": start.split(',')[0],
                "startLocationLong": start.split(',')[1],
                "endLocationLat": end.split(',')[0],
                "endLocationLong": end.split(',')[1]
            }
            var assignModalInstance = $uibModal.open({
                animation: 'true',
                templateUrl: 'components/order/assignTrips.html',
                controller: 'assignTripCtrl',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    data: function() {
                        return $scope.tempData;
                    }
                }
            });
            assignModalInstance.result.then(function() {
                $scope.init();
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });
        }

    }])
    .controller('assignTripCtrl', ['$scope', '$uibModalInstance', 'orderService', 'data', function($scope, $uibModalInstance, orderService, data) {
        $scope.id = data.orderId;
        $scope.res = {
            "OrderId": data.orderId,
            "StartLocationLat": data.startLocationLat,
            "StartLocationLong": data.startLocationLong,
            "EndLocationLat": data.endLocationLat,
            "EndLocationLong": data.endLocationLong,
            "TripList": []
        }
        $scope.tempTruck = {};
        $scope.add = function() {
            $scope.res.TripList.push($scope.tempTruck);
            $scope.tempTruck = {};
        }
        $scope.ok = function() {
            orderService.assignTrucksToOrder($scope.res).then(function (result) {
                $uibModalInstance.close(result);
            },function (user,err) {
                console.log("Something bad occured at assignTrucksToOrder ");
            })
        }
        $scope.close = function(res) {
            $uibModalInstance.dismiss('cancel');
        }
    }])
//test
