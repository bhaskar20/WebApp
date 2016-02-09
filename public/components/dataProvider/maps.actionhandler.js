angular.module("logiWebMainDataProvider")
    .run(function () {
        //run
    })
.factory("mapsActionHandler",[function(){
    var service = {};
    return service;
}])

/*
 * (function (angular) {
    'use strict';
    angular.module('CF.RUI.DataProvider')
    .factory('householdActionHandler', HouseholdActionHandler)
    .run(runBlock);

    runBlock.$inject = ['mlNotificationService', '$rootScope', 'householdActionHandler'];
    function runBlock(mlNotificationService, $rootScope, householdActionHandler) {
        mlNotificationService.subscribe('WMTPHHUPDATEFROMFINDER', function (args) {
            householdActionHandler.refreshHouseholdInfo(null);
        });

       
    }

    HouseholdActionHandler.$inject = ['flux', 'ruiHouseholdActions', 'ruiHouseholdDataHandler', '$log'];
    function HouseholdActionHandler(flux, ruiHouseholdActions, ruiHouseholdDataHandler, $log) {
        var service = {
            refreshHouseholdInfo: _refreshHouseholdInfo
        };

        return service;

        //Household Info Refresh Handler
        function _refreshHouseholdInfo(hhParams) {
            try {
                flux.dispatch(ruiHouseholdActions.Relationships_Household_Refreshing, null);
            }
            catch (e) {
                $log.error('RUI: ' + ruiHouseholdActions.Relationships_Household_Refreshing + ' dispatch failed - ' + e);
            }
            try {
                ruiHouseholdDataHandler.getHouseholdMembers(hhParams, true).then(householdDataSuccessHandler, householdDataFailureHandler);
            }
            catch (e) {
                $log.error('RUI: Error while fetching data for Household Members - ' + e);
            }
        }

        function householdDataSuccessHandler(success) {
            try {
                flux.dispatch(ruiHouseholdActions.Relationships_Household_RefreshComplete, { status: success.status, data: success.data });
            }
            catch (e) {
                $log.error('RUI: ' + ruiHouseholdActions.Relationships_Household_RefreshComplete + ' flux dispatch failed - ' + e);
            }
        }

        function householdDataFailureHandler(error) {
            try {
                flux.dispatch(ruiHouseholdActions.Relationships_Household_RefreshError, { status: error.status, data: null });
            }
            catch (e) {
                $log.error('RUI: ' + ruiHouseholdActions.Relationships_Household_RefreshError + ' flux dispatch failed - ' + e);
            }
        }
    }
})(window.angular);
 */