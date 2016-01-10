'use strict';
angular.module('logiWebMain')
    .factory('loginService', ["$state", "sessionService", function($state, sessionService) {
        var loginService = {};

        loginService.login = function(credentials) {
            return Parse.User.logIn(credentials.username, credentials.password).then(
                function(user) {
                    sessionService.create(user.id, user.get('username'), user.get('role'));
                    return user;
                },
                function(user, error) {
                    console.log(user);
                    return error;
                }
            );
        };

        loginService.logout = function() {
            sessionService.destroy();
            Parse.User.logout();
        }
        loginService.isAuthenticated = function() {
            var user = sessionService.getSession();
            return !!user
        };

        // loginService.isAuthorized = function(authorizedRoles) {
        //     if (!angular.isArray(authorizedRoles)) {
        //         authorizedRoles = [authorizedRoles];
        //     }
        //     return (loginService.isAuthenticated() &&
        //         authorizedRoles.indexOf(Session.userRole) !== -1);
        // };

        return loginService;
    }])
