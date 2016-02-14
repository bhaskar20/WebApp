angular.module("logiWebMainDataProvider")
    .run(runBlock)
runBlock.$inject = ['APPACTIONS', '$rootScope', 'ongoingTripsActionHandler', 'ongoingTripsStore'];
function runBlock(APPACTIONS, $rootScope, ongoingTripsActionHandler, ongoingTripsStore) {
    $rootScope.$listenTo(ongoingTripsStore, APPACTIONS.init, function () {
        ongoingTripsActionHandler.getOngoingTrips_ActionHandler();
    })
}
angular.module("logiWebMainDataProvider").store("ongoingTripsStore", ['ONGOINGTRIPSACTIONS', "APPACTIONS", 'ongoingTripsActionHandler', '$rootScope', function (ONGOINGTRIPSACTIONS, APPACTIONS, ongoingTripsActionHandler,$rootScope) {
    var _handlers = {};
    var _exports = {};
    var _initialize = function () {
        this.state = this.immutable({
            ongoingTrips: []
        });
    }
    var isRefreshing = false;

    //Methods to handle data update from dispatcher
    //init handler
    //ui refresh handler
    _handlers[ONGOINGTRIPSACTIONS.ongoingTrips_Refreshing] = _handleOngoingTripsRefresh;
    //ui show and update store 
    _handlers[ONGOINGTRIPSACTIONS.ongoingTrips_RefreshComplete] = _updateOngoingTripsRefresh;
    //handle error
    _handlers[ONGOINGTRIPSACTIONS.ongoingTrips_RefreshError] = _handleOngoingTripsError;

    _exports = {
        //methods for ui to call to get data
        getOngoingTrips: _getOngoingTrips
    }
    var storeDefinition = {
        handlers: _handlers,
        exports: _exports,
        initialize : _initialize
    }
    return storeDefinition;

    function _getOngoingTrips() {
        var self = this;
        return self.state.ongoingTrips;
    }
    function _handleOngoingTripsRefresh() {
        var self = this;
        var isrefreshing = true;
        emitStoreChange(ONGOINGTRIPSACTIONS.ongoingTrips_Refreshing);
    }
    function _updateOngoingTripsRefresh(obj) {
        var self = this;
        self.state.ongoingTrips = obj;
        emitStoreChange(ONGOINGTRIPSACTIONS.ongoingTrips_RefreshComplete)
        //emitStoreChange.call(self, ONGOINGTRIPSACTIONS.ongoingTrips_RefreshComplete);
    }
    function _handleOngoingTripsError() {

    }
    function emitStoreChange(name) {
        $rootScope.$broadcast(name);
    }
}])