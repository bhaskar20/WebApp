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
    function ongoingTripsDataSuccessHandler(results) {
        var ongoingTrips = [];
        try{
                if (results.length != 0) {
                    for (var i = 0; i < results.length; i++) {
                        var order = {};
                        order["tripId"]=results[i].id;
                        order["gpsId"]=results[i].get("GpsId");
                        order["orderId"]=results[i].get("OrderId");
                        order["startTime"]=results[i].get("StartTime");
                        order["startLocation"] = (results[i].get("StartLocation").latitude + "," + results[i].get("StartLocation").longitude);
                        order["endLocation"] = (results[i].get("EndLocationLong") + " , " + results[i].get("EndLocationLat"));
                        order["salesId"] = results[i].get("SalesId");
                        order["kamId"] = results[i].get("KamId");
                        ongoingTrips.push(order);
                    }                   
                }
            }
        catch (e) {
            $log.error('ongoingTripsActionHandler: ' + + ' data parse failed - ' + e);
        }
        try {
            flux.dispatch(ONGOINGTRIPSACTIONS.ongoingTrips_RefreshComplete, { data: ongoingTrips });
        }
        catch (e) {
            $log.error('ongoingTripsActionHandler: ' + ONGOINGTRIPSACTIONS.ongoingTrips_RefreshComplete + ' flux dispatch failed - ' + e);
        }
    }

    function ongoingTripsDataFailureHandler(user,error) {
        try {
            flux.dispatch(ONGOINGTRIPSACTIONS.ongoingTrips_RefreshError, { status: error.status, data: null });
        }
        catch (e) {
            $log.error("User: " + user);
            $log.error('ongoingTripsActionHandler: ' + ONGOINGTRIPSACTIONS.ongoingTrips_RefreshError + ' flux dispatch failed - ' + e);
        }
    }
}
