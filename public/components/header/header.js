'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('logiWebMain')
	.directive('header',function(){
		return {
        templateUrl:'components/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});


