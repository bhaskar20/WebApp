(function(angular) {
    angular.module('logiWebMain')
        .factory('sessionService', [function() {
            var session = {};
            var user = {};
            session.create = function(id,name,role) {
                user.id=id;
                user.name=name;
                user.role=role;
            }
            session.destroy = function(id,name,role) {
                user.id=null;
                user.name=null;
                user.role=null;
            }
            session.getSession =function() {
            	return Parse.User.current();
            }
            return session;

        }])
})(angular);
