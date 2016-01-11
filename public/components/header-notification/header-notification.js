'use strict';
angular.module('logiWebMain')
    .directive('headerNotification', function() {
        return {
            templateUrl: 'components/header-notification/header-notification.html',
            controller: 'headerNotificationCtrl',
            restrict: 'E',
            replace: true,
        }
    })
    .controller('headerNotificationCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', function($scope, $rootScope, AUTH_EVENTS) {
        $scope.logout = function() {
            // body...
            console.log("yes");
        }
        // $scope.logOut = function() {
        //     Parse.User.logout().then(function(argument) {
        //         $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        //         console.log("user logout");
        //     });
        // };
    }])
