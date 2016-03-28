'use strict';
angular.module('logiWebMain')
    .factory('orderService', [function() {
        var orderService = {};

        orderService.getOrder = function() {
            return Parse.Cloud.run('GetMyOrderInfo', {
                "OrderDone": false
            }).then(function(results) {
                    return results;
                },
                function(user, error) {
                    return error;
                });
        };
        orderService.assignTrucksToOrder = function (data) {
            return Parse.Cloud.run('AssignTripsToParticularOrder', {
                "OrderId": data.OrderId, "StartLocationLat": data.StartLocationLat,
                "StartLocationLong": data.StartLocationLong,
                "EndLocationLat": data.EndLocationLat,
                "EndLocationLong": data.EndLocationLong,
                "TripList": data.TripList
            }).then(function(results) {
                    return results;
                },
                function(user, error) {
                    return error;
                });
        }
        return orderService;
    }])
