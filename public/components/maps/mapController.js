'use strict';
angular
    .module("logiWebMain")
    .controller("mapController",["$scope",function ($scope){
    	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    }])