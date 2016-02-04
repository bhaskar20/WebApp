'use strict';
angular
    .module("logiWebMain")
    .controller("mapController", ["$scope", "mapService", "uiGmapGoogleMapApi", function ($scope, mapService, uiGmapGoogleMapApi) {
        uiGmapGoogleMapApi.then(function (maps) {
            $scope.mapOpts = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        });
        //set markers for each gpsid location https://angular-ui.github.io/angular-google-maps/#!/api/markers

    }])