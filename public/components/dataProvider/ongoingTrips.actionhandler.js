angular.module("logiWebMainDataProvider")
.factory('ongoingTripsActionHandler', ongoingTripsActionHandler)
    .run(runBlock);

runBlock.$inject = [];
function runBlock() {

}
ongoingTripsActionHandler.$inject = ["flux", "$log", "ongoingTripsDataHandler", "ONGOINGTRIPSACTIONS"];
function ongoingTripsActionHandler(flux, $log, ongoingTripsDataHandler, ONGOINGTRIPSACTIONS) {
    var service = {
        getOngoingTrips_ActionHandler: _getOngoingTrips_ActionHandler
    }
    return service;

    function _getOngoingTrips_ActionHandler() {
        try {
            flux.dispatch(ONGOINGTRIPSACTIONS.ongoingTrips_Refreshing, null);
        }
        catch (e) {
            $log.error('ongoingTripsActionHandler: ' + ONGOINGTRIPSACTIONS.ongoingTrips_Refreshing + ' dispatch failed - ' + e);
        }
        try {
            ongoingTripsDataHandler.getTrips().then(ongoingTripsDataSuccessHandler, ongoingTripsDataFailureHandler);
        }
        catch (e) {
            $log.error('ongoingTripsActionHandler: Error while fetching data for ongoingTrips - ' + e);
        }
    }
    function ongoingTripsDataSuccessHandler(success) {
        //TODO Refine DATA HERE
        try {
            flux.dispatch(ONGOINGTRIPSACTIONS.ongoingTrips_RefreshComplete, { status: success.status, data: success.data });
        }
        catch (e) {
            $log.error('ongoingTripsActionHandler: ' + ONGOINGTRIPSACTIONS.ongoingTrips_RefreshComplete + ' flux dispatch failed - ' + e);
        }
    }

    function ongoingTripsDataFailureHandler(error) {
        try {
            flux.dispatch(ONGOINGTRIPSACTIONS.ongoingTrips_RefreshError, { status: error.status, data: null });
        }
        catch (e) {
            $log.error('ongoingTripsActionHandler: ' + ONGOINGTRIPSACTIONS.ongoingTrips_RefreshError + ' flux dispatch failed - ' + e);
        }
    }
}
