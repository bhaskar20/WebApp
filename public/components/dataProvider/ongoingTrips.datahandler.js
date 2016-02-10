angular.module("logiWebMainDataProvider").factory("ongoingTripsDataHandler", ongoingTripsDataHandler);
ongoingTripsDataHandler.$inject = ['$http', '$q', '$log'];
function ongoingTripsDataHandler($http, $q, $log) {
    var tripPromise = null;
    var service = {
        getTrips: _getTrips
    };
    return service;
    function _getTrips() {
        //TODO ADD URL
        return Parse.Cloud.run('GetMyAssignedTrips', {});
    }
}