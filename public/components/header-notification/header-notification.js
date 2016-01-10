'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('logiWebMain')
	.directive('headerNotification',function(){
		return {
        templateUrl:'components/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
    	}
	});


