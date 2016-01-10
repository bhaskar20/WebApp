'use strict';
angular
    .module("logiWebMain")
    .controller("loginCtrl", ["$scope", "$rootScope", "AUTH_EVENTS", "loginService",
        function($scope, $rootScope, AUTH_EVENTS, loginService) {
            $scope.credentials = {
                username: '',
                password: ''
            };
            $scope.login = function(credentials) {
                loginService.login(credentials).then(function(user) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    //$scope.setCurrentUser(user);
                }, function(error) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
            }
        }
    ])
