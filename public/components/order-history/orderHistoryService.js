'use strict';
angular.module('logiWebMain')
    .factory('orderHistoryService', [function() {
        var orderHistoryService = {};

        orderHistoryService.getOrderHistory = function() {
            return Parse.Cloud.run('GetMyOrderInfo', {
                "OrderDone": true
            }).then(function(results) {
                    return results;
                },
                function(user, error) {
                    return error;
                });
        };
        return orderHistoryService;
    }])
