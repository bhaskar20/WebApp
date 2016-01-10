(function(angular) {
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
            return reqOrderService;
        }])

})(angular);
