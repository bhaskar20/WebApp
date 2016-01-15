'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('logiWebMain')
    .controller('headerController',['$scope',function ($scope) {
        $scope.user = "bhas";
        $scope.logoutUser = function() {
                $scope.user = "change";
            };
    }])
	.directive('header',function(){
		return {
        templateUrl:'components/header/header.html',
        restrict: 'E',
        scope:false,
        replace: true
    	}
	})
	


