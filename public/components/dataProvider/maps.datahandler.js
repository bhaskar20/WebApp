angular.module("logiWebMainDataProvider").factory("mapsDataHandler", mapsDataHandler);
mapsDataHandler.$inject = ['$http','$q','$log'];
function mapsDataHandler($http,$q,$log){
    var locationPromise = null;
    var service = {
        getLocation: _getLocation
    };
    return service;
    function _getLocation(params,forceRef){
        var canceller = $q.defer();
        if (locationPromise) {
            return locationPromise.promise;
        }
        function _cancel(userStatus) {
            $log.info(userStatus);
            canceller.resolve(userStatus);
        }
        //TODO ADD URL
        var _promise = $http({
            method: 'GET',
            url: '/api/getDataAtTimeForMultipleGps/',
            params:{
                gpsIds:JSON.stringify(params),
                time:Date.now()
            },
            timeout: canceller.promise,
            responseType: 'json',
            cache: false     
        });            

        locationPromise = {
            promise: _promise,
            cancel: _cancel
        };
        return locationPromise.promise;
    }
}
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