'use strict';
angular
    .module("logiWebMain")
    .controller("contactController",["$scope",function ($scope) {
    	$scope.contactData = {};
    	$scope.message ="";
    	$scope.submitForm = function (){
    		Parse.Cloud.run('SaveContactForm', {
                "Name": $scope.contactData.name,
                "Email":$scope.contactData.email,
                "Telephone":$scope.contactData.telephone,
                "Message":$scope.contactData.message
            }).then(function(results) {
            		$scope.contactData = {};
            		//$scope.message = "Successfully submitted the form";
            		$scope.$apply();
                },
                function(user, error) {
                    return error;
                    //$scope.message = "something wrong occured, please submit the form again";
                	$scope.$apply();
                });
    	}
    }]);