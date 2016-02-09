angular.module("logiWebMainDataProvider")
    .run(function(){
    //specific to this store
})
.store("mapsStore", ['MAPSACTIONS', function(MAPSACTIONS){
    var _handlers = {};
    var _exports = {};
    var _mapModels = {};

    //Methods to handle data update from dispatcher
    //init handler
    _handlers[MAPSACTIONS.maps_init] = _handleMapsInit;
    //ui refresh handler
    _handlers[MAPSACTIONS.maps_Refreshing] = handleMapRefresh;
    //ui show and update store 
    _handlers[MAPSACTIONS.maps_RefreshComplete] = updateMapRefresh;
    //handle error
    _handlers[MAPSACTIONS.maps_RefreshError] = handleError;

    _exports = {
        //methods for ui to call to get data
    }
    var storeDefinition = {
        handlers: _handlers,
        exports: _exports,
        mapModels: _mapModels
    }
    return storeDefinition;

    var _handleMapInit = function () {
        //handle initial map load
    }
    var handleMapRefresh = function () {
        //handle map refresh
    }
    var updateMapRefresh = function () {
        //update and show map
    }
    var handleError = function () {
        //handle map errors
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
}
])
/*
 * (function (angular) {
    'use strict';
    angular.module('CF.RUI.DataProvider').store('ruiHouseholdStore', HouseholdStore);

    angular.module('CF.RUI.DataProvider').run(runBlock);

    //Refreshes the Household store whenever it becomes stale after a profile changed event is received from finder
    runBlock.$inject = ['ruiHouseholdActions', 'ruiActionStatus', 'householdActionHandler', 'ruiHouseholdStore', '$rootScope'];
    function runBlock(ruiHouseholdActions, ruiActionStatus, householdActionHandler, ruiHouseholdStore, $rootScope) {
        $rootScope.$listenTo(ruiHouseholdStore, ruiHouseholdActions.Relationships_Household_Refreshing + ruiActionStatus.Stale, function () {
            //TODO Do Null check and other data condition checks
            householdActionHandler.refreshHouseholdInfo(ruiHouseholdStore.getCurrentHousehold());
        });
    }

    HouseholdStore.$inject = ['FINDER_CONTEXT_DISPATCHES', 'ruiHouseholdActions', 'ruiActionStatus', '$timeout', 'householdActionHandler'];
    function HouseholdStore(FINDER_CONTEXT_DISPATCHES, ruiHouseholdActions, ruiActionStatus, $timeout, householdActionHandler) {
        var _handlers = {}, _exports = {};
        var isRefreshing = false, isStale = false, errorInfo = null;
        //Store models
        var _householdModels = {

        };

        //Methods to handle data update from dispatcher 
        //Refresh handlers
        _handlers[FINDER_CONTEXT_DISPATCHES.HOUSEHOLD_CHANGED] = _handleHouseholdRefresh;
        _handlers[FINDER_CONTEXT_DISPATCHES.CONTEXT_CHANGED] = _handleContextRefresh;

        //Store stale handlers
        _handlers[ruiHouseholdActions.Relationships_Household_Refreshing] = refreshHouseholdData;

        //Success handlers
        _handlers[ruiHouseholdActions.Relationships_Household_RefreshComplete] = updateHouseholdData;

        //Error handlers
        _handlers[ruiHouseholdActions.Relationships_Household_RefreshError] = updateHouseholdErrorData;

        //Methods UI components can access once they have the data_success event from store
        _exports = {
            getCurrentHousehold: _getCurrentHousehold,
            getHouseholdData: _getHouseholdData,
            getStoreStatus: _getStoreStatus
        };

        //Store definition
        var storeDefinition = {
            ruiHouseholdModels: _householdModels,
            currentHousehold: null,
            handlers: _handlers,
            exports: _exports
        };

        return storeDefinition;

        function resetStore() {
            isRefreshing = false;
            isStale = false;
            errorInfo = null;
            //note that this not really bound to the store definition object
            this.currentHousehold = null;
            this.ruiHouseholdModels = null;
        }

      
function _getCurrentHousehold() {
    var self = this;
    return self.currentHousehold;
}

function _getHouseholdData(hhId) {
    
    var self = this;
    var retVal = self.ruiHouseholdModels;
    //store is stale. Emit stale event so that cosumer may update it
    if (!isRefreshing && isStale) {
        self.refreshHouseholdData();
    }

    //TODO: Implement logic to return data with that HH(may not be necessary)
    return retVal;
}

function _getStoreStatus() {
    
    var self = this;
    return { isRefreshing: isRefreshing, isStale: isStale, errorInfo: errorInfo };
}


function _handleHouseholdRefresh(hhObj) {

    var self = this;
   
    if (self.currentHousehold == null) {
        resetStore.call(self);
        isRefreshing = true;
        //Can granularize once finder schema is available            
        //Notify all consumers of the stale state of the store models who will refresh the data
        emitStoreChange.call(self, ruiHouseholdActions.Relationships_Household_Refreshing + ruiActionStatus.Stale);
        //householdActionHandler.refreshHouseholdInfo();
    }
    self.currentHousehold = hhObj;
            

}

function _handleContextRefresh() {
            
    var self = this;
            
    resetStore.call(self);
    isRefreshing = true;
    // isContextRefreshTriggered = true;
    emitStoreChange.call(self, ruiHouseholdActions.Relationships_Household_Refreshing + ruiActionStatus.Stale);
            
           
}

//Stale stores handlers
function refreshHouseholdData() {
    
    var self = this;
    isRefreshing = true;
    //TODO Update store models  
    //Notify the real UI consumers so that they can show spinner
    emitStoreChange.call(self, ruiHouseholdActions.Relationships_Household_Refreshing);
}

//Data success store refresh handlers
function updateHouseholdData(successObj) {
    
    var self = this;
    isRefreshing = false;
    isStale = false;
    //TODO Update relationship model on success
    self.ruiHouseholdModels = successObj.data.HouseHoldMembers;
    emitStoreChange.call(self, ruiHouseholdActions.Relationships_Household_RefreshComplete);
}

//Data failure store refresh handlers
function updateHouseholdErrorData(errorObj) {
    
    var self = this;
    isRefreshing = false;
    isStale = false;
    //TODO: set error info on store
    emitStoreChange.call(self, ruiHouseholdActions.Relationships_Household_RefreshError);
}

//Emit change events to the UI subscribers so that they can act on store state change
function emitStoreChange(type) {
    
    var self = this;
    //Publish store stale change events only if there are active UI listeners
    if (self.listeners(type).length > 0) {
        $timeout(function () {
            self.emit(type);
        }, 0, true);
    }
}
}
})(window.angular);
 */