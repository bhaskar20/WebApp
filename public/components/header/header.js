'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('logiWebMain')
    .controller('headerController',['$scope','$rootScope','AUTH_EVENTS',function ($scope,$rootScope,AUTH_EVENTS) {
        $scope.user = "bhas";
        $scope.logoutUser = function() {
            Parse.User.logOut().then(function (res) {
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            },function (user,err) {
                console.log("something bad happeed");
            });
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
	


