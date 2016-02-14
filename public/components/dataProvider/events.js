angular.module('logiWebMainDataProvider')
.constant('APPACTIONS', {
    init: 'init'
})
.constant('MAPSACTIONS', {
    maps_init:'maps-init',
    maps_Refreshing: 'maps-refreshing',
    maps_RefreshComplete: 'maps-refresh-complete',
    maps_RefreshError: 'maps-refresh-error',
})
.constant('ONGOINGTRIPSACTIONS', {
    //todo
    ongoingTrips_init: 'ongoingTrips-init',
    ongoingTrips_Refreshing: 'ongoingTrips-refreshing',
    ongoingTrips_RefreshComplete: 'ongoingTrips-refresh-complete',
    ongoingTrips_RefreshError: 'ongoingTrips-refresh-error',
})
/*
 * (function (angular) {
    angular.module('CF.RUI.DataProvider')
    .constant('ruiRelationshipActions', {
        Relationships_Refreshing: 'RUI_Relationships_Refreshing',
        Relationships_RefreshComplete: 'RUI_Relationships_RefreshComplete',
        Relationships_RefreshError: 'RUI_Relationships_Error',
        Relationships_Updating: 'RUI_Relationships_Updating',
        Relationships_UpdateComplete: 'RUI_Relationships_UpdateComplete',
        Relationships_UpdateError: 'RUI_Relationships_UpdateError'
    })
    .constant('ruiHouseholdActions', {
        Relationships_Household_Refreshing: 'RUI_RelationshipsHH_Refreshing',
        Relationships_Household_RefreshComplete: 'RUI_RelationshipsHH_RefreshComplete',
        Relationships_Household_RefreshError: 'RUI_RelationshipsHH_Error'
    })
    .constant('ruiActionStatus', {
        Stale: 'Stale',
        Refreshing: 'Refreshing',
        RefreshComplete: 'RefreshComplete',
        Error: 'Error'
    })
    .constant('ruiTreeActions', {
            RUITree_Refreshing: 'RUI_RUITree_Refreshing',
            RUITree_RefreshComplete: 'RUI_RUITree_RefreshComplete',
            RUITree_RefreshError: 'RUI_RUITree_Error',
            RUITree_Updating: 'RUI_RUITree_Updating',
            RUITree_UpdateComplete: 'RUI_RUITree_UpdateComplete',
            RUITree_UpdateError: 'RUI_RUITree_UpdateError',
            RUITree_AddComplete: 'RUI_RUITree_AddComplete'
      })
    .constant('profileActions', {
        RUI_Profile_Refreshing: 'RUI_Profile_Refreshing',
        RUI_Profile_RefreshComplete: 'RUI_Profile_RefreshComplete',
        RUI_Profile_Error: 'RUI_Profile_Error'
    });
})(window.angular);
 */