'use strict';
angular
    .module("logiWebMain")
    .controller("mapController", ["$scope", "mapService", "uiGmapGoogleMapApi", function ($scope, mapService, uiGmapGoogleMapApi) {
        uiGmapGoogleMapApi.then(function (maps) {
            //$scope.marker = [];
            $scope.marker = mapService.gpsModels;
            $scope.mapOpts = { center: { latitude: 21, longitude: 78 }, zoom: 13 };
        });
        //set markers for each gpsid location https://angular-ui.github.io/angular-google-maps/#!/api/markers

    }])
