'use strict';
angular.module('logiWebMain').run(runBlock);
runBlock.$inject = ['ongoingTripsService'];
function runBlock(ongoingTripsService) {
    ongoingTripsService.init();
};
angular.module('logiWebMain').factory('ongoingTripsService', ["$q", function ($q) {
        var ser = {};
        ser.state = {
            stale: false,
            refreshing: false,
            error:null
        };
        ser.ongoingTrips = [];

        //local
        var defer = $q.defer();

        //init
        ser.init = function(){
            ser.refreshing = true;
            Parse.Cloud.run('GetMyAssignedTrips', {}).then(function (results) {
                ser.ongoingTrips = filter(results);
                ser.refreshing = false;
                defer.resolve();
            },
            function (user, error) {
                ser.state.error = error;
                ser.refreshing = false;
                defer.reject();
            });
        }
        ser.init();
        //local methods
        function filter(results) {
            var trips = [];
            if (results.length != 0) {
                for (var i = 0; i < results.length; i++) {
                    var order = {};
                    order["tripId"] = results[i].id;
                    order["gpsId"] = results[i].get("GpsId");
                    order["orderId"] = results[i].get("OrderId");
                    order["startTime"] = results[i].get("StartTime");
                    order["startLocation"] = (results[i].get("StartLocation").latitude + "," + results[i].get("StartLocation").longitude);
                    order["endLocation"] = (results[i].get("EndLocationLong") + " , " + results[i].get("EndLocationLat"));
                    order["salesId"] = results[i].get("SalesId");
                    order["kamId"] = results[i].get("KamId");
                    trips.push(order);
                }
                return trips;
            }
        }

        //controller methods
        ser.getongoingTrips = function () {
            return defer.promise;
        }
        return ser;
    }])
