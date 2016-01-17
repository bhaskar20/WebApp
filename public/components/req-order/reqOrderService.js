angular.module('logiWebMain')
    .factory('reqOrderService', [function() {
        var reqOrderService = {};

        reqOrderService.getReqOrder = function() {
            return Parse.Cloud.run('GetOrderRequestedToMe', {}).then(function(results) {
                    return results;
                },
                function(user, error) {
                    return error;
                });
        };
        reqOrderService.deny = function(id) {
            return Parse.Cloud.run('DenyOrderRequest', {
                "RequestedOrderId": id
            }).then(function(results) {
                    return results;
                },
                function(user, error) {
                    return error;
                });
        };
        reqOrderService.accept = function(id) {
            return Parse.Cloud.run('BookOrder', {
                "RequestedOrderId": id
            }).then(function(results) {
                    return results;
                },
                function(user, error) {
                    return error;
                });
        };
        return reqOrderService;
    }]);
