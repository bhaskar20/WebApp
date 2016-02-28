'use strict';
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
            ser.state.refreshing = true;
            return Parse.Cloud.run('GetMyOnGoingTrips', {}).then(function (results) {
                if (results.length == 0) { defer.reject(); return;}
                ser.ongoingTrips = filter(results);
                ser.state.refreshing = false;
                defer.resolve();
            },
            function (user, error) {
                ser.state.error = error;
                ser.state.refreshing = false;
                defer.reject();
            });
        }
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
        ser.stop = function (tripId) {
            var deferred = $q.defer();
            Parse.Cloud.run('EndTrip', { "TripId": tripId }).then(function (results) {
                deferred.resolve(results);
            }, function (user, error) {
                ser.state.error.push(error);
                ser.state.refreshing = false;
                deferred.reject();
            });
            return deferred.promise;
        };
        return ser;
    }])
