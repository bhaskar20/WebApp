angular.module("logiWebMainDataProvider")
    .run(runBlock)
runBlock.$inject = ['APPACTIONS', '$rootScope', 'ongoingTripsStore'];
function runBlock(APPACTIONS, $rootScope, ongoingTripsStore) {
}
angular.module("logiWebMainDataProvider").store("ongoingTripsStore", ['ONGOINGTRIPSACTIONS', function (ONGOINGTRIPSACTIONS) {
    var _handlers = {};
    var _exports = {};
    var _ongoingTripsModels = {};

    //Methods to handle data update from dispatcher
    //init handler
    _handlers[APPACTIONS.init] = _handleInit;
    //ui refresh handler
    //_handlers[MAPSACTIONS.maps_Refreshing] = handleMapRefresh;
    //ui show and update store 
    //_handlers[MAPSACTIONS.maps_RefreshComplete] = updateMapRefresh;
    //handle error
    //_handlers[MAPSACTIONS.maps_RefreshError] = handleError;

    _exports = {
        //methods for ui to call to get data
        getOngoingTrips: _getOngoingTrips
    }
    var storeDefinition = {
        handlers: _handlers,
        exports: _exports,
        ongoingTripsModels: _ongoingTripsModels
    }
    return storeDefinition;

    function _getOngoingTrips() {
        var self = this;
        return self.ongoingTripsModels;
    }
    function handleInit() {
        //todo
    }
    function emitStoreChange(type) {
        var self = this;
        //Publish store stale change events only if there are active UI listeners
        if (self.listeners(type).length > 0) {
            $timeout(function () {
                self.emit(type);
            }, 0, true);
        }
    }
}])