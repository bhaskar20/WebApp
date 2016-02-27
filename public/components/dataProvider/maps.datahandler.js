angular.module("logiWebMainDataProvider")
.factory("mapsDataHandler", [function () {
    var service = {};
    return service;

    /*
 (function (angular) {
    'use strict';

    angular.module('CF.RUI.DataProvider').factory('ruiHouseholdDataHandler', HouseholdMembersService);

    HouseholdMembersService.$inject = ['$http', '$q', '$log', 'ruiCommonUtils'];
    function HouseholdMembersService($http, $q, $log, ruiCommonUtils) {
        var service = {
            getHouseholdMembers: _getHouseholdMembers
        };
        var householdPromise = null;

        return service;

        function _getHouseholdMembers(hhParams, forceRefresh) {
            var canceller = $q.defer();
            //Check if already fetched or forced refresh
            if (forceRefresh === true) {
                if (householdPromise) {
                    householdPromise.cancel('RUI: Household data fetch Interrupted');
                }
                householdPromise = null;
            }

            if (householdPromise) {
                return householdPromise.promise;
            }

            function _cancel(userStatus) {
                $log.info(userStatus);
                canceller.resolve(userStatus);
            }

            var _promise = $http({
                method: 'GET',
                url: 'REST?RestPath=/FamilyTree/HouseholdMembers?ts=' + new Date().getTime(),
                timeout: canceller.promise,
                responseType: 'json',
                cache: false
                
            });            

            householdPromise = {
                promise: _promise,
                cancel: _cancel
            };
            return householdPromise.promise;
        }
    }
})(window.angular);
     */
}])